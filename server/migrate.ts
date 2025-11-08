import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from '@shared/schema';

/**
 * Run database migrations
 * This should be called on server startup in production
 */
export async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString || !connectionString.includes('postgresql://')) {
    console.log('⚠️  Skipping migrations - not using PostgreSQL');
    return;
  }
  
  try {
    console.log('🔄 Running database migrations...');
    
    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    const db = drizzle(pool, { schema });
    
    // Run migrations from the migrations folder
    await migrate(db, { migrationsFolder: './migrations' });
    
    console.log('✅ Database migrations completed successfully');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}
