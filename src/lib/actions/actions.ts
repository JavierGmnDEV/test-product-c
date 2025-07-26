"use server"

import { eq, ilike, sql, and, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";

type PaginatedProducts = {
  products: typeof products.$inferSelect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  query?: string,
  category?: string
): Promise<PaginatedProducts> => {
  // Calcular el offset
  const offset = (page - 1) * limit;

  // Construir filtro
  let whereClause;
  if (query && category) {
    whereClause = and(ilike(products.name, `%${query}%`), eq(products.category, category));
  } else if (query) {
    whereClause = ilike(products.name, `%${query}%`);
  } else if (category) {
    whereClause = eq(products.category, category);
  }

  // Obtener productos paginados
  const productsData = await db
    .select()
    .from(products)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(products.createdAt);

  // Obtener el conteo total de productos
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(whereClause);

  const total = totalResult[0]?.count ?? 0;
  const totalPages = Math.ceil(total / limit);

  return {
    products: productsData,
    total,
    page,
    limit,
    totalPages,
  };
};

export const getProductById = async (id: number) => {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .then(rows => rows[0]);

  if (!product) {
    throw new Error(`Producto con ID ${id} no encontrado`);
  }
  
  return product;
};


// Crear
export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}) => {
  const newProduct = await db.insert(products).values({
    name: data.name,
    description: data.description || null,
    price: String(data.price),
    category: data.category || null,
    stock: data.stock || 0,
  }).returning();

  revalidatePath("/products");
  return newProduct[0];
};

// Actualizar 
export const updateProduct = async (
  id: number, 
  data: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
  }
) => {
  const existingProduct = await getProductById(id);
  
  const updatedProduct = await db
    .update(products)
    .set({
      name: data.name || existingProduct.name,
      description: data.description !== undefined ? data.description : existingProduct.description,
      price: data.price !== undefined ? String(data.price) : existingProduct.price,
      category: data.category !== undefined ? data.category : existingProduct.category,
      stock: data.stock !== undefined ? data.stock : existingProduct.stock,
    })
    .where(eq(products.id, id))
    .returning();

  revalidatePath("/products");
  revalidatePath(`/products/edit/${id}`);
  return updatedProduct[0];
};

// Eliminar un producto
export const deleteProduct = async (id: number) => {
  await db.delete(products).where(eq(products.id, id));
  
  revalidatePath("/products");
  return { success: true, message: `Producto ${id} eliminado` };
};

// Actualizar el stock de un producto
export const updateStock = async (id: number, quantity: number) => {
  const existingProduct = await getProductById(id);
  
  const newStock = existingProduct.stock + quantity;
  if (newStock < 0) {
    throw new Error("Stock no puede ser negativo");
  }

  await db
    .update(products)
    .set({
      stock: newStock,
    })
    .where(eq(products.id, id));

  revalidatePath("/products");
  return newStock;
};


// Obtener las categorías únicas
export const getProductCategories = async () => {
  const result = await db
    .selectDistinctOn([products.category], { category: products.category })
    .from(products)
    .where(isNotNull(products.category));

  return result.map(item => item.category).filter(Boolean) as string[];
};