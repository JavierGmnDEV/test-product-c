// src/lib/services/productService.ts
import { ProductFormValues } from '@/lib/schemas/products';
import { createProduct, updateProduct, getProductCategories } from '@/lib/actions/actions';

export interface IProductService {
  createProduct(data: ProductFormValues): Promise<void>;
  updateProduct(id: number, data: ProductFormValues): Promise<void>;
  getCategories(): Promise<{ value: string; label: string }[]>;
}

export class ProductService implements IProductService {
  async createProduct(data: ProductFormValues): Promise<void> {
    await createProduct(data);
  }

  async updateProduct(id: number, data: ProductFormValues): Promise<void> {
    await updateProduct(id, data);
  }

  async getCategories(): Promise<{ value: string; label: string }[]> {
    const categories = await getProductCategories();
    return categories.map(cat => ({ value: cat, label: cat }));
  }
}

// Singleton instance
export const productService = new ProductService(); 