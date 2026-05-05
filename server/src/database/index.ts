import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function connectDB() {
  const dbPath = process.env.DATABASE_URL;

  if (!dbPath) {
    throw new Error("DATABASE_URL não definida no .env");
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
