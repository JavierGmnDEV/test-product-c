import { FormCard } from '@/components/ui/card/FormCard';
import { ProductForm } from '@/components/ui/Form/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Crear Producto</h1>
        <p className="text-muted-foreground">Agrega un nuevo producto al inventario</p>
      </div>

      <FormCard 
        title="Información del Producto"
        description="Completa los datos del nuevo producto"
      >
        <ProductForm />
      </FormCard>
    </div>
  );
} 