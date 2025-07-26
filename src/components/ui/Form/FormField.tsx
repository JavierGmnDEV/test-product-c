// src/components/ui/form/FormField.tsx
'use client';

import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { ReactNode } from 'react';
import { UseFormReturn, ControllerRenderProps, Path, FieldValues } from 'react-hook-form';

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectOptions?: { value: string; label: string }[];
  render?: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => ReactNode;
}

export function FormField<TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  inputProps = {},
  selectOptions = [],
  render,
}: FormFieldProps<TFieldValues>) {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {render ? (
              render(field)
            ) : type === 'select' ? (
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label={label}
              >
                <option value="">{placeholder || 'Seleccionar...'}</option>
                {selectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                value={field.value ?? ''}
              />
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                value={field.value ?? ''}
                onChange={(e) => {
                  if (type === 'number') {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? 0 : value);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}