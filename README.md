# CRUD de Productos

Una aplicación CRUD completa para gestionar productos construida con Next.js 15, React Hook Form, Zod, Drizzle ORM y PostgreSQL.

## 🚀 Tecnologías

- **Next.js 15** - Framework de React
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **shadcn/ui** - Componentes de UI
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático

## 📋 Características

- ✅ Crear, leer, actualizar y eliminar productos
- ✅ Validación de formularios con Zod
- ✅ Paginación de productos
- ✅ Búsqueda y filtrado por categoría
- ✅ Diseño responsive
- ✅ Notificaciones con Sonner
- ✅ Principios SOLID aplicados

## 🛠️ Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd crud-productos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env
   DATABASE_URL="tu-url-de-postgresql"
   ```

4. **Ejecutar migraciones de base de datos**
   ```bash
   npm run db:push
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🚀 Despliegue en Vercel

### 1. Preparar el repositorio

Asegúrate de que tu código esté en GitHub con todos los archivos necesarios.

### 2. Configurar base de datos

**Opción A: Neon (Recomendado)**
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta y un nuevo proyecto
3. Copia la URL de conexión

**Opción B: Supabase**
1. Ve a [supabase.com](https://supabase.com)
2. Crea un proyecto
3. Ve a Settings > Database para obtener la URL

### 3. Desplegar en Vercel

1. **Conectar repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa tu repositorio

2. **Configurar variables de entorno**
   - En el dashboard de Vercel, ve a tu proyecto
   - Ve a Settings > Environment Variables
   - Agrega:
     ```
     DATABASE_URL = tu-url-de-postgresql
     ```

3. **Configurar build**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El archivo `vercel.json` ya está configurado

4. **Desplegar**
   - Haz commit y push a tu repositorio
   - Vercel desplegará automáticamente

### 4. Ejecutar migraciones en producción

Después del despliegue, ejecuta las migraciones:

```bash
# En el dashboard de Vercel, ve a Functions y ejecuta:
npm run db:push
```

O usa la consola de Vercel:
```bash
vercel env pull .env
npm run db:push
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── products/          # Páginas de productos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes de UI
├── lib/                  # Utilidades y configuraciones
│   ├── actions/          # Server Actions
│   ├── hooks/            # Custom hooks
│   ├── schemas/          # Esquemas de Zod
│   └── services/         # Servicios de negocio
└── db/                   # Configuración de base de datos
    ├── schema.ts         # Esquema de Drizzle
    └── drizzle.ts        # Configuración de Drizzle
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting
- `npm run db:generate` - Generar migraciones
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:push` - Sincronizar esquema
- `npm run db:studio` - Abrir Drizzle Studio

## 🐛 Solución de Problemas

### Error de conexión a base de datos
- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos esté accesible desde Vercel

### Error de migraciones
- Ejecuta `npm run db:push` después del despliegue
- Verifica que el esquema esté sincronizado

### Error de build
- Verifica que todas las dependencias estén instaladas
- Revisa los logs de build en Vercel

## 📝 Licencia

MIT


