from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
import chromadb
import uuid

client = chromadb.Client()
collection = client.create_collection(name="chat_memory")

loader = TextLoader("knowledge_base.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
splits = text_splitter.split_documents(documents)

for doc in splits:
    collection.add(documents=[doc.page_content], ids=[str(uuid.uuid4())])

print("Knowledge base loaded.")
