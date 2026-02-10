import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./db/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Initialize Drizzle with the pool
export const db = drizzle(pool, { schema });

// Handle pool errors
pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client:", err);
});

// Handle pool connection
pool.on("connect", () => {
  console.log("New client connected to the pool");
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 SIGTERM received, closing database pool...");
  await pool.end();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("🛑 SIGINT received, closing database pool...");
  await pool.end();
  process.exit(0);
});
