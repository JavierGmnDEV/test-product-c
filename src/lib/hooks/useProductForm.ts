// src/lib/hooks/useProductForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormSchema, ProductFormValues } from '@/lib/schemas/products';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect, useState, useCallback } from 'react';
import { IProductService } from '@/lib/services/productService';

interface UseProductFormProps {
  initialData?: ProductFormValues;
  productService: IProductService;
  onSuccess?: () => void;
}

// Categorías por defecto
const DEFAULT_CATEGORIES = [
  { value: 'Electrónicos', label: 'Electrónicos' },
  { value: 'Ropa', label: 'Ropa' },
  { value: 'Hogar', label: 'Hogar' },
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Libros', label: 'Libros' },
  { value: 'Juguetes', label: 'Juguetes' },
  { value: 'Alimentos', label: 'Alimentos' },
  { value: 'Otros', label: 'Otros' },
];

export function useProductForm({ 
  initialData, 
  productService, 
  onSuccess 
}: UseProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
    },
  });

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const dbCategories = await productService.getCategories();
      
      // Combinar categorías por defecto con las de la BD
      const allCategories = [
        ...DEFAULT_CATEGORIES,
        ...dbCategories.filter(dbCat => 
          !DEFAULT_CATEGORIES.some(defCat => defCat.value === dbCat.value)
        )
      ];
      
      setCategories(allCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar categorías');
      // Mantener categorías por defecto si hay error
    } finally {
      setIsLoadingCategories(false);
    }
  }, [productService]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);
    try {
      if (initialData?.id) {
        await productService.updateProduct(initialData.id, values);
        toast.success('Producto actualizado correctamente');
      } else {
        await productService.createProduct(values);
        toast.success('Producto creado correctamente');
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/products');
        router.refresh();
      }
    } catch (error) {
      toast.error('Ocurrió un error al guardar el producto');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    categories,
    isLoading,
    isLoadingCategories,
    onSubmit: form.handleSubmit(onSubmit),
  };
} 