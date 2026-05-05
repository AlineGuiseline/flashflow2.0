import { useState } from "react";
import type { Flashcard as FlashcardType } from "../types/Flashcard";

interface Props {
  card: FlashcardType;
}

export function Flashcard({ card }: Props) {
  const [flip, setFlip] = useState(false);

  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? card.answer : card.question}
    </div>
  );
}
