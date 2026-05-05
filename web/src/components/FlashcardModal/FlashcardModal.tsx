import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./FlashcardModal.module.css";
import folderIcon from "../../assets/folder-icon.svg";

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
        <div className={styles.header}>
          <h2>{initialData ? "Editar Flashcard" : "Criar Flashcard"}</h2>
          <p>Organize seu conhecimento com precisão e clareza.</p>
        </div>

        <div className={styles.componentArea}>
          <label htmlFor="category">Categoria</label>
          <div className={styles.selectWrapper}>
            <img src={folderIcon} alt="Categoria" />

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione a categoria do card
              </option>

              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Tailwind CSS">Tailwind CSS</option>
              <option value="Node.js">Node.js</option>
            </select>
          </div>
        </div>

        <div className={styles.componentArea}>
          <label htmlFor="question">Pergunta</label>
          <input
            type="text"
            id="question"
            placeholder="Ex: O que é uma Closure no JavaScript?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className={styles.componentArea}>
          <label htmlFor="answer">Resposta</label>
          <textarea
            id="answer"
            placeholder="Ex: Uma closure é a combinação de uma função com o ambiente léxico..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <div className={styles.actionArea}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>

          <button className={styles.saveBtn} type="submit">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
