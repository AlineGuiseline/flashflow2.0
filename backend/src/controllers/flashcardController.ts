import { Request, Response } from "express";
import { connectDB } from "../database";
import { randomUUID } from "crypto";
import { CATEGORIES } from "../utils/categories";

export async function createFlashcard(req: Request, res: Response) {
  const { question, answer, category } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ error: "Pergunta e resposta são obrigatórias" });
  }

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "Categoria inválida" });
  }

  const db = await connectDB();
  const id = randomUUID();
  const created_at = new Date().toISOString();

  await db.run(`INSERT INTO flashcards VALUES (?, ?, ?, ?, ?)`, [
    id,
    question,
    answer,
    category,
    created_at,
  ]);

  res.status(201).json({ id, question, answer, category, created_at });
}

export async function getFlashcards(req: Request, res: Response) {
  const db = await connectDB();
  const cards = await db.all(`SELECT * FROM flashcards`);
  res.json(cards);
}

export async function updateFlashcard(req: Request, res: Response) {
  const { id } = req.params;
  const { question, answer, category } = req.body;

  const db = await connectDB();

  await db.run(
    `UPDATE flashcards SET question=?, answer=?, category=? WHERE id=?`,
    [question, answer, category, id],
  );

  res.json({ message: "Atualizado" });
}

export async function deleteFlashcard(req: Request, res: Response) {
  const { id } = req.params;
  const db = await connectDB();

  await db.run(`DELETE FROM flashcards WHERE id=?`, [id]);

  res.json({ message: "Deletado" });
}
