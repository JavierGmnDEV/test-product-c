
// src/components/ui/form/ProductForm.tsx
'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';
import { useRouter } from 'next/navigation';
import { ProductFormValues } from '@/lib/schemas/products';
import { useProductForm } from '@/lib/hooks/useProductForm';
import { productService } from '@/lib/services/productService';

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSubmitSuccess?: () => void;
}

export const ProductForm = ({ 
  initialData, 
  onSubmitSuccess
}: ProductFormProps) => {
  const router = useRouter();
  
  const { form, categories, isLoading, isLoadingCategories, onSubmit } = useProductForm({
    initialData,
    productService,
    onSuccess: onSubmitSuccess,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            form={form}
            name="name"
            label="Nombre del Producto"
            placeholder="Ej: Laptop HP"
            description="El nombre completo del producto"
          />
          
          <FormField
            form={form}
            name="price"
            label="Precio (USD)"
            placeholder="Ej: 599.99"
            type="number"
            inputProps={{ step: "0.01", min: "0.01" }}
            description="Precio en dólares americanos"
          />
          
          <FormField
            form={form}
            name="category"
            label="Categoría"
            placeholder={isLoadingCategories ? "Cargando categorías..." : "Seleccionar categoría"}
            type="select"
            selectOptions={categories}
            description="Categoría principal del producto"
          />
          
          <FormField
            form={form}
            name="stock"
            label="Stock Disponible"
            placeholder="Ej: 100"
            type="number"
            inputProps={{ min: "0", step: "1" }}
            description="Cantidad disponible en inventario"
          />
          
          <div className="md:col-span-2">
            <FormField
              form={form}
              name="description"
              label="Descripción"
              placeholder="Ej: Laptop de 15 pulgadas, 8GB RAM"
              type="textarea"
              description="Descripción detallada del producto"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => router.push('/products')}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            disabled={isLoading || isLoadingCategories}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData?.id ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              initialData?.id ? 'Actualizar Producto' : 'Crear Producto'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};