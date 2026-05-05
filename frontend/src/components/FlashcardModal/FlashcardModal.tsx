import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./FlashcardModal.module.css";

type FlashcardData = {
  question: string;
  answer: string;
  category: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FlashcardData) => void;
  initialData?: FlashcardData | null;
}

export function FlashcardModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");

  // 🔥 preenche quando for edição
  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
      setCategory(initialData.category);
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("");
    }
  }, [initialData, isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({ question, answer, category });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{initialData ? "Editar Flashcard" : "Novo Flashcard"}</h2>

        <input
          type="text"
          placeholder="Pergunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <textarea
          placeholder="Resposta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">
          {initialData ? "Salvar alterações" : "Criar"}
        </button>
      </form>
    </Modal>
  );
}
