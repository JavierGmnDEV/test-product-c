# CRUD Productos

Sistema completo de gestión de productos con Next.js, TypeScript, Drizzle ORM y shadcn/ui.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar productos
- ✅ **Validación**: Formularios con validación usando Zod
- ✅ **UI Moderna**: Interfaz con shadcn/ui y Tailwind CSS
- ✅ **Base de Datos**: PostgreSQL con Drizzle ORM
- ✅ **Búsqueda y Filtros**: Por nombre y categoría
- ✅ **Paginación**: Navegación entre páginas de resultados
- ✅ **Notificaciones**: Toast notifications con Sonner
- ✅ **Responsive**: Diseño adaptativo para móvil y desktop

## 📋 Requisitos

- Node.js 18+
- PostgreSQL
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/JavierGmnDEV/test-product-c.git
cd crud-productos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env
```

Editar `.env` con tu configuración de base de datos:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"
```

4. **Configurar la base de datos**
```bash
# Generar migraciones
npx drizzle-kit generate

# Ejecutar migraciones
npx drizzle-kit migrate
```

5. **Ejecutar la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── products/          # Páginas de productos
│   │   ├── page.tsx      # Lista de productos
│   │   ├── create/       # Crear producto
│   │   └── edit/[id]/    # Editar producto
│   └── layout.tsx        # Layout principal
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes de UI
├── lib/                   # Utilidades y configuraciones
│   ├── actions/          # Server Actions
│   ├── schemas/          # Esquemas de validación
│   └── db/               # Configuración de base de datos
└── db/                   # Esquemas de Drizzle
```

## 🎯 Funcionalidades

### Lista de Productos (`/products`)
- ✅ Vista de todos los productos
- ✅ Búsqueda por nombre
- ✅ Filtro por categoría
- ✅ Paginación
- ✅ Acciones: Editar y Eliminar

### Crear Producto (`/products/create`)
- ✅ Formulario con validación
- ✅ Campos: Nombre, Precio, Categoría, Stock, Descripción
- ✅ Select dinámico para categorías
- ✅ Textarea para descripción

### Editar Producto (`/products/edit/[id]`)
- ✅ Carga datos existentes
- ✅ Mismo formulario que crear
- ✅ Actualización en tiempo real

## 🎨 Componentes Principales

### FormCard
Componente wrapper para formularios con título y descripción.

### ProductForm
Formulario reutilizable para crear/editar productos con:
- Validación con Zod
- Manejo de errores
- Loading states
- Redirección automática

### FormField
Campo de formulario genérico que soporta:
- Input (text, number, email, password)
- Textarea
- Select
- Validación automática

## 🔧 Tecnologías Utilizadas

- **Next.js 14**: Framework de React
- **TypeScript**: Tipado estático
- **Drizzle ORM**: ORM para PostgreSQL
- **shadcn/ui**: Componentes de UI
- **Tailwind CSS**: Estilos
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas
- **Sonner**: Notificaciones toast

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

## 🚀 Despliegue

1. **Configurar variables de entorno en producción**
2. **Ejecutar migraciones**: `npx drizzle-kit migrate`
3. **Construir**: `npm run build`
4. **Iniciar**: `npm start`

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request


