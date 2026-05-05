import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
