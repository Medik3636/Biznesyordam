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

  const sessionConfig = {
    store: new MemoryStoreSession({
      checkPeriod: 86400000, // 24 hours
      ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
      stale: false
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key-dev-only",
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
      secure: false, // Must be false for Render (proxy handles HTTPS)
      httpOnly: true,
      sameSite: "lax" as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
      domain: undefined // Let browser handle domain
    },
    rolling: true,
    proxy: true
  } as session.SessionOptions;

  console.log('🔧 Session config:', {
    name: sessionConfig.name,
    cookie: sessionConfig.cookie,
    proxy: sessionConfig.proxy
  });

  return sessionConfig;
}
