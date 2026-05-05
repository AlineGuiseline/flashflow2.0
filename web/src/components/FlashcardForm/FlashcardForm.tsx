import { useState } from "react";

interface Props {
  onSubmit: (data: {
    question: string;
    answer: string;
    category: string;
  }) => void;
  onCancel: () => void;
}

export function FlashcardForm({ onSubmit, onCancel }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("JavaScript");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ question, answer, category });
      }}
      className="flex flex-col gap-3"
    >
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>JavaScript</option>
        <option>React</option>
        <option>Tailwind CSS</option>
        <option>Node.js</option>
      </select>

      <textarea
        placeholder="Pergunta"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <textarea
        placeholder="Resposta"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>

        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
