import { useState } from "react";
interface FormData {
  question: string;
  answer: string;
  category: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

export function Form({ onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("JavaScript");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ question, answer, category });
      }}
    >
      <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>JavaScript</option>
        <option>React</option>
        <option>Tailwind CSS</option>
      </select>
      <button type="submit">Criar</button>
    </form>
  );
}
