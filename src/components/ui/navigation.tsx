import Link from 'next/link';
import { Package } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/products" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          CRUD Productos
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/products" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link 
            href="/products/create" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Crear
          </Link>
        </div>
      </div>
    </nav>
  );
} 