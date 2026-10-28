import pg from 'pg';

// PostgreSQL connection pool configuration
// Credentials come from the POSTGRES_URL environment variable (set in Vercel)
const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

export { pool };
