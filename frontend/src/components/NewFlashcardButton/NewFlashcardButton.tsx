import { Button } from "../Button/Button";

type Props = {
  onClick: () => void;
};

export function NewFlashcardButton({ onClick }: Props) {
  return <Button onClick={onClick}>Novo flashcard</Button>;
}
