import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ServerErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ServerError({ 
  title = "Error del Servidor",
  message = "No se pudieron cargar los productos. Esto puede deberse a problemas de conexión con la base de datos, errores en el servidor o problemas de red.",
  onRetry 
}: ServerErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {message}
          </p>
          <div className="flex gap-2">
            {onRetry && (
              <Button onClick={onRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Intentar de nuevo
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Recargar página
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 