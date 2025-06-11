import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "user123", message: input })
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: "bot", text: data.reply }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-2xl shadow bg-white">
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <span className={msg.sender === "user" ? "bg-blue-100 p-2 rounded-lg inline-block" : "bg-gray-100 p-2 rounded-lg inline-block"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
