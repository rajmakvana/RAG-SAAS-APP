# 🚀 RAG SaaS Application

A **Retrieval-Augmented Generation (RAG) SaaS backend** that allows users (schools, small companies, organizations) to upload documents and interact with them using an intelligent chatbot.  
The system dynamically decides whether to use **internal documents** or **web search** to answer user queries.

---

## ✨ Features

- 🧵 **Threaded Chat System**
  - Create and manage chat threads
  - Store user & assistant messages
- 📄 **Document Upload & Processing**
  - PDF parsing from buffer
  - Text chunking
  - Metadata storage
- 🔍 **Vector Search (RAG)**
  - Semantic similarity search using embeddings
- 🌐 **Web Search Integration**
  - Fallback to web search when data is not found in documents
- 🧠 **LLM Orchestration**
  - Query rewriting
  - Context generation
  - System-prompt–based responses
- 🔐 **Authentication**
  - JWT-based user authentication
- 🗄 **Relational Database**
  - PostgreSQL with Prisma ORM
- ☁️ **Cloud-First Architecture**
  - No local models required
  - Easy to deploy

---

## 🏗 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL (Neon / Cloud)**

### AI / RAG
- **Embedding Model:** Nomic (Free)
- **Vector Database:** Pinecone
- **Web Search:** Tavily
- **LLM:** OpenAI / Cloud-based LLM

### Storage
- **Cloudinary** – Document storage

---
