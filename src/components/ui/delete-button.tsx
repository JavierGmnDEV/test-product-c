'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/lib/actions/actions';
import { toast } from 'sonner';

interface DeleteButtonProps {
  productId: number;
}

export function DeleteButton({ productId }: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      toast.success('Producto eliminado correctamente');
      // Refresh the page to show updated list
      window.location.reload();
    } catch {
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
} 