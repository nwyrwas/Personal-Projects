from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import uuid
import os
import chromadb
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = chromadb.Client()
collection = client.create_collection(name="chat_memory")
embedding = OpenAIEmbeddings()
feedback_log = []

class ChatRequest(BaseModel):
    user_id: str
    message: str

class FeedbackRequest(BaseModel):
    user_id: str
    query: str
    answer: str
    correct: bool
    correction: str = None

@app.post("/chat")
async def chat(req: ChatRequest):
    docs = collection.get(query_texts=[req.message])
    context = " ".join([d for d in docs.get("documents", [""])[0:3]])

    messages = [
        {"role": "system", "content": "You are a helpful support chatbot."},
        {"role": "user", "content": f"{req.message}\nContext: {context}"}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages
    )
    reply = response.choices[0].message.content

    doc_id = str(uuid.uuid4())
    collection.add(documents=[req.message + "\n" + reply], ids=[doc_id])

    return {"reply": reply}

@app.post("/feedback")
async def feedback(req: FeedbackRequest):
    feedback_log.append(req.dict())
    if req.correct and req.correction:
        doc_id = str(uuid.uuid4())
        collection.add(documents=[req.query + "\n" + req.correction], ids=[doc_id])
    return {"status": "Feedback recorded"}

@app.get("/logs")
async def get_feedback():
    return feedback_log
