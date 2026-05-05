import { useState } from "react";
import styles from "./Flashcard.module.css";
import flipIcon from "../../assets/flip-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

export function Flashcard({ card, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.card}>
      {!flipped ? (
        <div className={styles.face}>
          {/* HEADER */}
          <div className={styles.header}>
            <span className={styles.category}>{card.category}</span>
          </div>

          {/* CONTEÚDO */}
          <p className={styles.question}>{card.question}</p>

          {/* AÇÃO */}
          <button
            className={styles.flipButton}
            onClick={() => setFlipped(true)}
          >
            <img src={flipIcon} alt="Flip Icon" />
          </button>
        </div>
      ) : (
        <div className={styles.face}>
          {/* HEADER COM AÇÕES */}
          <div className={styles.header}>
            <span className={styles.category}>{card.category}</span>

            <div className={styles.actions}>
              <button onClick={() => onEdit(card)}>
                <img src={editIcon} alt="Edit Icon" />
              </button>
              <button onClick={() => onDelete(card.id)}>
                <img src={deleteIcon} alt="Delete Icon" />
              </button>
            </div>
          </div>

          <div className={styles.answerArea}>
            {/* PERGUNTA (MENOR) */}
            <p className={styles.questionPreview}>{card.question}</p>

            {/* RESPOSTA */}
            <p className={styles.answer}>{card.answer}</p>
          </div>

          {/* AÇÃO */}
          <button
            className={styles.flipButton}
            onClick={() => setFlipped(false)}
          >
            <img src={flipIcon} alt="Flip Icon" />
          </button>
        </div>
      )}
    </div>
  );
}
