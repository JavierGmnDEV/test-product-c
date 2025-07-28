import { defineConfig } from "drizzle-kit";

// Solo cargar .env en desarrollo
if (process.env.NODE_ENV === 'development') {
  const { config } = await import('dotenv');
  config({ path: '.env' });
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
