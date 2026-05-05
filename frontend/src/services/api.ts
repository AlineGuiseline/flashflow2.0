const API_URL = import.meta.env.VITE_API_URL;

interface FlashcardInput {
  question: string;
  answer: string;
  category: string;
}

export const api = {
  async get(): Promise<unknown[]> {
    return fetch(`${API_URL}/flashcards`).then((r) => r.json());
  },

  async create(data: FlashcardInput) {
    return fetch(`${API_URL}/flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: FlashcardInput) {
    return fetch(`${API_URL}/flashcards/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async delete(id: string) {
    return fetch(`${API_URL}/flashcards/${id}`, {
      method: "DELETE",
    });
  },
};
