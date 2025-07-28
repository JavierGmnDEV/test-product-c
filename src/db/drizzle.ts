import { drizzle } from 'drizzle-orm/neon-http';

// En desarrollo, cargar .env si existe
if (process.env.NODE_ENV === 'development') {
  try {
    const { config } = await import('dotenv');
    config({ path: ".env" });
  } catch (error) {
    // Si no existe .env, continuar sin él
  }
}

export const db = drizzle(process.env.DATABASE_URL!);
