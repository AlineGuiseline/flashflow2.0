import { useEffect, useState } from "react";
import { api } from "./services/api";
import { Flashcard } from "./components/Flashcard/Flashcard";
import type { Flashcard as FlashcardType } from "./types/Flashcard";
import styles from "./App.module.css";
import logo from "./assets/flashflow-logo.svg";
import emptyLogo from "./assets/empty-logo.svg";
import { NewFlashcardButton } from "./components/NewFlashcardButton/NewFlashcardButton";
import { Filter } from "./components/Filter/Filter";
import { FlashcardModal } from "./components/FlashcardModal/FlashcardModal";
import deleteBgIcon from "./assets/delete-bg-icon.svg";
import newCardIcon from "./assets/new-card-icon.svg";

export default function App() {
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [editingCard, setEditingCard] = useState<FlashcardType | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function load() {
    const data = (await api.get()) as FlashcardType[];
    setCards(data);
  }

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Tudo");

  const filteredCards = cards.filter(
    (card) => selectedCategory === "Tudo" || card.category === selectedCategory,
  );

  function handleOpenCreate() {
    setEditingCard(null);
    setIsModalOpen(true);
  }

  function handleEdit(card: FlashcardType) {
    setEditingCard(card);
    setIsModalOpen(true);
  }

  async function handleSubmit(data: {
    question: string;
    answer: string;
    category: string;
  }) {
    if (editingCard) {
      await api.update(editingCard.id, data);
    } else {
      await api.create(data);
    }

    setIsModalOpen(false);
    setEditingCard(null);
    load();
  }

  async function handleDelete() {
    if (!deletingCardId) return;

    await api.delete(deletingCardId);
    setDeletingCardId(null);
    load();
  }

  return (
    <div className={styles.generalWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logoArea}>
          <img src={logo} alt="Flash Flow Logo" />
          <h1>Flash Flow</h1>
        </div>

        <NewFlashcardButton onClick={handleOpenCreate} />
      </nav>

      <div className={styles.header}>
        <div className={styles.headerText}>
          <span>Painel de Aprendizado</span>
          <h2>Domine tecnologia com foco total.</h2>
        </div>

        <Filter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className={styles.cardsArea}>
        {filteredCards.length > 0 ? (
          <div className={styles.flashcardsArea}>
            {filteredCards.map((c) => (
              <Flashcard
                key={c.id}
                card={c}
                onEdit={handleEdit}
                onDelete={setDeletingCardId}
              />
            ))}
            <div className={styles.newCard} onClick={handleOpenCreate}>
              <img src={newCardIcon} alt="New Card Icon" />
              <h3>Criar novo card</h3>
              <p>
                Adicione um novo desafio à sua biblioteca e mantenha o ritmo.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.emptyArea}>
            <img src={emptyLogo} alt="Empty Logo" />
            <p className={styles.empty}>
              Você ainda não possui flashcards. <br /> Que tal criar um para
              começar?
            </p>
            <NewFlashcardButton onClick={handleOpenCreate} />
          </div>
        )}
      </div>

      {deletingCardId && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModal}>
            <img
              className={styles.deleteBgIcon}
              src={deleteBgIcon}
              alt="Deletar card"
            />

            <div className={styles.textArea}>
              <h3>Tem certeza que deseja excluir este card?</h3>
              <p>
                Esta ação não pode ser desfeita e o card será removido
                permanentemente da sua biblioteca.
              </p>
            </div>

            <div className={styles.deleteActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDeletingCardId(null)}
              >
                Cancelar
              </button>

              <button className={styles.deleteBtn} onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <FlashcardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCard}
      />
    </div>
  );
}
