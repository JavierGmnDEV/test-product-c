// src/lib/schemas/product.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  
  description: z.string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .default(""),
  
  price: z.number()
    .min(0.01, "El precio debe ser mayor que 0")
    .max(1000000, "El precio no puede exceder 1,000,000"),
  
  category: z.string()
    .max(50, "La categoría no puede exceder los 50 caracteres")
    .default(""),
  
  stock: z.number()
    .min(0, "El stock no puede ser negativo")
    .int("El stock debe ser un número entero")
    .default(0),
});

// Schema específico para el formulario
export const ProductFormSchema = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  
  description: z.string()
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  
  price: z.number()
    .min(0.01, "El precio debe ser mayor que 0")
    .max(1000000, "El precio no puede exceder 1,000,000"),
  
  category: z.string()
    .max(50, "La categoría no puede exceder los 50 caracteres"),
  
  stock: z.number()
    .min(0, "El stock no puede ser negativo")
    .int("El stock debe ser un número entero"),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;