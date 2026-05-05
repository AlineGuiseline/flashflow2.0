import { connectDB } from "./index";

export async function initDB() {
  const db = await connectDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS flashcards (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
}
