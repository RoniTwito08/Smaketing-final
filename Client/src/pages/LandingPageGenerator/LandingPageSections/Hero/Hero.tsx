// Hero.tsx
import { useState, useEffect } from "react";
import heroStyles from "./hero.module.css";

interface HeroProps {
  title: string;
  content: string;
  buttonText: string;
}

type ItemType = {
  id: string;
  type: "title" | "content" | "button";
};

const items: ItemType[] = [
  { id: "1", type: "title" },
  { id: "2", type: "content" },
  { id: "3", type: "button" },
];

function Hero({ title, content, buttonText }: HeroProps) {
  const [textValues, setTextValues] = useState<{ [key: string]: string }>({
    "1": title,
    "2": content,
    "3": buttonText,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    setTextValues({
      "1": title,
      "2": content,
      "3": buttonText,
    });
  }, [title, content, buttonText]);

  const handleDoubleClickEdit = (id: string) => {
    setEditingId(id);
    setEditingValue(textValues[id]);
  };

  const handleSaveEdit = (id: string) => {
    setTextValues((prev) => ({ ...prev, [id]: editingValue }));
    setEditingId(null);
    setEditingValue("");
  };

  const renderContent = (item: ItemType) => {
    if (editingId === item.id) {
      return (
        <div className={heroStyles.editContainer}>
          {item.type === "content" ? (
            <textarea
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className={heroStyles.editInput}
            />
          ) : (
            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className={heroStyles.editInput}
            />
          )}
          <button
            onClick={() => handleSaveEdit(item.id)}
            className={heroStyles.saveButton}
          >
            שמור
          </button>
        </div>
      );
    }
    switch (item.type) {
      case "title":
        return (
          <h3
            className={heroStyles.heroTitle}
            onDoubleClick={() => handleDoubleClickEdit(item.id)}
          >
            {textValues[item.id]}
          </h3>
        );
      case "content":
        return (
          <p
            className={heroStyles.heroText}
            onDoubleClick={() => handleDoubleClickEdit(item.id)}
          >
            {textValues[item.id]}
          </p>
        );
      case "button":
        return (
          <button
            className={heroStyles.heroButton}
            onDoubleClick={() => handleDoubleClickEdit(item.id)}
          >
            {textValues[item.id]}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <section className={heroStyles.heroContainer}>
      <div className={heroStyles.heroContent}>
        {items.map((item) => (
          <div key={item.id} className={heroStyles.heroItem}>
            {renderContent(item)}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
