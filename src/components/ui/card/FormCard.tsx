// src/components/ui/card/FormCard.tsx
'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormCard = ({ 
  title, 
  description, 
  children, 
  className = "" 
}: FormCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};