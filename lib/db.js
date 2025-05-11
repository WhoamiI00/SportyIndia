import mysql from 'mysql2/promise';

// Create a pool of connections instead of a single connection
let pool;

export const createConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectTimeout: 100000,
      waitForConnections: true, // Wait for a free connection if pool is full
      connectionLimit: 1, // Max number of connections to create in the pool
      queueLimit: 0 // Limit of queries that can wait for a connection (0 means no limit)
    });
  }
  return pool;
};
