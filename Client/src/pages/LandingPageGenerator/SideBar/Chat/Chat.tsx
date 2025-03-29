import { useState, useEffect, useRef } from "react";
import chatStyles from "./Chat.module.css";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [userInputTone, setUserInputTone] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([
    {
      sender: "ai",
      text: "הדבק כאן את הטקסט שברצונך לשפר ותקבל הצעות לייעול.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userInput },
    ]);
    const input = userInput;
    const tone = userInputTone;
    setUserInputTone("");
    setUserInput("");
    try {
      const response = await fetch("http://localhost:3000/api/getTextSuggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.suggestion || "אין הצעות זמינות." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "אירעה שגיאה בהצגת ההצעות." },
      ]);
    }
  };

  return (
    <div className={chatStyles.chatContainer}>
      <div className={chatStyles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "user"
                ? chatStyles.userMessage
                : chatStyles.aiMessage
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={chatStyles.inputContainer}>
        <input
          type="text"
          placeholder="העתק/הדבק כאן את הטקסט לשינוי..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={chatStyles.input}
        />
        <input
          type="text"
          placeholder="דרישות מיוחדות להצעות..."
          value={userInputTone}
          onChange={(e) => setUserInputTone(e.target.value)}
          className={chatStyles.input}
        />
        <button onClick={handleSend} className={chatStyles.sendButton}>
          שלח
        </button>
      </div>
    </div>
  );
}
