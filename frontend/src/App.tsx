import { useEffect, useState } from "react";
import { api } from "./services/api";
import { Flashcard } from "./components/Flashcard";
import { Form } from "./components/Form";
import type { Flashcard as FlashcardType } from "./types/Flashcard";
import styles from "./App.module.css";

export default function App() {
  const [cards, setCards] = useState<FlashcardType[]>([]);

  async function load() {
    const data = (await api.get()) as FlashcardType[];
    setCards(data);
  }

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function handleCreate(data: {
    question: string;
    answer: string;
    category: string;
  }) {
    await api.create(data);
    load();
  }

  return (
    <div className={styles.generalWrapper}>
      <header className={styles.header}>Flash Flow</header>
      <Form onSubmit={handleCreate} />
      {cards.map((c) => (
        <Flashcard key={c.id} card={c} />
      ))}
    </div>
  );
}
