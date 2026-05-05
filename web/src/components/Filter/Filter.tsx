import styles from "./Filter.module.css";

const categories = ["Tudo", "JavaScript", "React", "Tailwind CSS", "Node.js"];

export function Filter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`${styles.button} ${
            selected === cat ? styles.active : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
