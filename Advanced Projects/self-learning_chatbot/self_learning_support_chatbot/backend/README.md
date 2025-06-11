# Self-Learning Support Chatbot

## 🚀 Features
- Starts with no data
- Learns from chat interactions and user feedback
- Embeddable widget
- LangChain + OpenAI + ChromaDB

## 🛠 Setup
1. Clone repo and create virtualenv
2. Fill in `.env` with your OpenAI key
3. Run server:
   ```bash
   uvicorn main:app --reload
   ```
4. Open `index.html` with `chat_widget.js` for testing frontend

## 🧠 Feedback
POST `/feedback` with `{ query, answer, correct, correction }` to train bot over time
