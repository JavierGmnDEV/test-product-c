import { notFound } from 'next/navigation';
import { FormCard } from '@/components/ui/card/FormCard';
import { ProductForm } from '@/components/ui/Form/ProductForm';
import { getProductById } from '@/lib/actions/actions';
import { ProductFormValues } from '@/lib/schemas/products';

// Make this page dynamic
export const dynamic = 'force-dynamic';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  try {
    const { id } = await params;
    const product = await getProductById(Number(id));
    
    // Convertir los datos de la BD al formato del formulario
    const formData: ProductFormValues = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: typeof product.price === 'string' ? parseFloat(product.price) : Number(product.price),
      category: product.category || '',
      stock: product.stock,
    };
    
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Editar Producto</h1>
          <p className="text-muted-foreground">Modifica la información del producto</p>
        </div>

        <FormCard 
          title="Información del Producto"
          description="Actualiza los datos del producto"
        >
          <ProductForm initialData={formData} />
        </FormCard>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
} 