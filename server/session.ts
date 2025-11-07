import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

export function getSessionConfig() {
  const isProd = process.env.NODE_ENV === "production";

  // ⚠️ WARNING: MemoryStore is not suitable for production with multiple instances
  // For production, consider using:
  // - connect-pg-simple (PostgreSQL session store)
  // - connect-redis (Redis session store)
  // - express-session with database-backed store
  
  if (isProd) {
    console.warn('⚠️  WARNING: Using MemoryStore in production mode');
    console.warn('⚠️  Sessions will be lost on server restart');
    console.warn('⚠️  Not suitable for multi-instance deployments');
    console.warn('⚠️  Consider using PostgreSQL or Redis session store');
  }

  return {
    store: new MemoryStoreSession({
      checkPeriod: 86400000, // 24 hours
      ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
      stale: false
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key-dev-only",
    resave: false,
    saveUninitialized: false,
    name: 'biznesyordam.sid', // Custom session cookie name
    cookie: {
      secure: isProd,
      httpOnly: true,
      sameSite: isProd ? "none" as const : "lax" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: isProd ? '.biznesyordam.uz' : undefined
    },
    rolling: true, // Reset maxAge on every request
    proxy: isProd // Trust proxy in production (Render uses proxy)
  } as session.SessionOptions;
}
