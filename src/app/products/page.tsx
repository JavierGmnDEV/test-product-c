import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProducts, getProductCategories, deleteProduct } from '@/lib/actions/actions';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ServerError } from '@/components/ui/server-error';
import { DeleteButton } from '@/components/ui/delete-button';

// Make this page dynamic to handle searchParams
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  try {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const query = params.query || '';
    const category = params.category || '';

    const { products, totalPages } = await getProducts(page, 10, query, category);
    const categories = await getProductCategories();

    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
          </div>
          <Link href="/products/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </Link>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex gap-4">
              <div className="flex-1">
                <Input
                  name="query"
                  placeholder="Buscar productos..."
                  defaultValue={query}
                />
              </div>
              <div className="w-48">
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-input rounded-md"
                  defaultValue={category}
                  aria-label="Filtrar por categoría"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Productos */}
        <div className="grid gap-6">
          {products.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay productos</h3>
                <p className="text-muted-foreground mb-4">
                  {query || category ? 'No se encontraron productos con los filtros aplicados.' : 'Comienza agregando tu primer producto.'}
                </p>
                <Link href="/products/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Producto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {product.description || 'Sin descripción'}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="font-medium">${product.price}</span>
                        <span className="text-muted-foreground">
                          Stock: {product.stock}
                        </span>
                        {product.category && (
                          <span className="text-muted-foreground">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/products/edit/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteButton productId={product.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/products?page=${pageNum}${query ? `&query=${query}` : ''}${category ? `&category=${category}` : ''}`}
                >
                  <Button
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                  >
                    {pageNum}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">Gestiona tu inventario de productos</p>
          </div>
          <Link href="/products/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </Link>
        </div>
        
        <ServerError 
          title="Error al Cargar Productos"
          message="No se pudieron cargar los productos desde el servidor. Verifica tu conexión a internet e intenta de nuevo."
        />
      </div>
    );
  }
} 