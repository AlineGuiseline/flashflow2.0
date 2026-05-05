import { Router } from "express";
import {
  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard,
} from "../controllers/flashcardController";

const router = Router();

router.post("/flashcards", createFlashcard);
router.get("/flashcards", getFlashcards);
router.put("/flashcards/:id", updateFlashcard);
router.delete("/flashcards/:id", deleteFlashcard);

export default router;
