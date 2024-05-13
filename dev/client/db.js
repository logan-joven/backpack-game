import pg from 'pg';

// PostgreSQL connection pool configuration
const pool = new pg.Pool({
  user: 'default',
  host: 'ep-billowing-star-a65vgmqb-pooler.us-west-2.aws.neon.tech',
  database: 'verceldb',
  password: '2HTYv6yrloqb',
  port: 5432, // PostgreSQL default port
});

export { pool };