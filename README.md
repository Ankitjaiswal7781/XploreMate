# 🌍✨ XploreMate — Your Ultimate Travel Companion

### 🏠 Home Page
| ![Home Page 1](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Home%20Page%201.png) | ![Home Page 2](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Home%20Page%202.png) |
|:--:|:--:|
| **Home Page 1** | **Home Page 2** |

---

### 💻 Frontend Views
| ![Frontend 1](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Frontend%201.png) | ![Frontend 2](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Frontend%202.png) |
|:--:|:--:|
| **Frontend UI 1** | **Frontend UI 2** |

---

### 💬 Chatbot Assistant
| ![Chatbot UI](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Chatbot%20UI.png) |
|:--:|
| **AI Chatbot Interface — Ask travel questions and get intelligent responses** |

---

### 🔐 Login Page
| ![Login Page](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/login.png) |
|:--:|
| **Secure Login for Users and Guides** |

---

### 📍 Footer Section
| ![Footer Section](https://github.com/Ankitjaiswal7781/XploreMate/blob/main/Footer%20Section.png) |
|:--:|
| **Footer Section with Navigation & Contact Info** |

> **XploreMate** is a modern full-stack travel platform that connects **travelers** with **local guides** to make every journey effortless, personalized, and unforgettable.  
> Built with ❤️ by Team XploreMate as a **College Major Project** — blending innovation, AI, and real-world travel assistance.

---

## 🚀 Table of Contents

- [🌟 Overview](#-overview)
- [🧠 Features](#-features)
- [🧩 Tech Stack](#-tech-stack)
- [⚙️ Project Architecture](#️-project-architecture)
- [🗺️ Modules & Highlights](#️-modules--highlights)
- [🖼️ Screenshots](#️-screenshots)
- [💡 AI Integration (RAG Chatbot)](#-ai-integration-rag-chatbot)
- [🔐 Authentication & Security](#-authentication--security)
- [💳 Stripe Integration](#-stripe-integration)
- [👥 Team Members](#-team-members)
- [🛠️ Installation & Setup](#️-installation--setup)
- [📫 Feedback & Support](#-feedback--support)

---

## 🌟 Overview

**XploreMate** is a **MERN-based travel platform** designed to enhance how travelers plan trips and connect with guides.  
It offers a seamless experience for:
- Booking verified **local guides**
- Managing **travel itineraries**
- AI-powered **chat assistance** using a **RAG (Retrieval-Augmented Generation)** model
- Secure **Stripe-based payments**
- **Dynamic dashboards** for both users and guides

---

## 🧠 Features

✅ **User-Friendly Interface** — Built with React + Tailwind for speed and elegance  
✅ **Search & Explore** — Browse guides, destinations, and activities with smart filters  
✅ **Guide Profiles** — View experience, expertise, and pricing transparently  
✅ **Instant Booking** — Book tours or guides in a few clicks with Stripe checkout  
✅ **Personalized Recommendations** — Powered by AI (RAG Chain with Llama 3 + HuggingFace Embeddings)  
✅ **Secure Login & JWT Auth** — User and guide authentication with email verification  
✅ **Responsive Design** — Perfectly optimized for mobile, tablet, and desktop  
✅ **Review & Ratings System** — Genuine traveler feedback system  
✅ **Admin Panel (Optional)** — Manage users, bookings, and services  
✅ **Real-time Chatbot Support** — Ask travel-related queries powered by AI  

---

## 🧩 Tech Stack

### 💻 Frontend
- **React.js + Vite**
- **Tailwind CSS**
- **Framer Motion** (for smooth UI animations)
- **Zustand** (for state management)
- **Axios** (for API communication)

### ⚙️ Backend
- **Node.js + Express.js**
- **MongoDB** with Mongoose ORM
- **Stripe API** for secure payments
- **JWT + Bcrypt** for authentication
- **LangChain + HuggingFace + Groq (Llama 3)** for the AI chatbot

### 🧠 AI Integration
- **RAG Pipeline** using:
  - LangChain RetrievalQAChain
  - HuggingFace Embeddings (`sentence-transformers/all-MiniLM-L6-v2`)
  - FAISS Vector Store for document retrieval

---

## ⚙️ Project Architecture


XploreMate/
│
├── client/ # React Frontend (Vite + Tailwind)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── store/
│ │ └── App.tsx
│ └── .env
│
├── server/ # Node + Express Backend
│ ├── controller/
│ ├── models/
│ ├── routes/
│ ├── chatbot/
│ ├── utils/
│ └── .env
│
├── data/ # Knowledge base for RAG
│ └── knowledge.txt
│
└── README.md


---

## 🗺️ Modules & Highlights

### 👤 User Module
- Sign up, verify email, and login securely  
- Explore guides and book them instantly  
- View booking history and status  

### 🧭 Guide Module
- Create and manage tour listings  
- Set custom prices, durations, and traveler limits  
- Accept bookings and update status  

### 🧠 AI Chatbot
- Built with LangChain + Groq Llama 3  
- Answers **travel, tour, visa, hotel, and location-related** queries  
- Uses **RAG (Retrieval-Augmented Generation)** for context-based responses  

### 💳 Payment Module
- Integrated with **Stripe Checkout Sessions**
- Generates dynamic line items for selected services  
- Updates booking status after successful payment  

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](https://github.com/Ankitjaiswal7781/XploreMate/assets/home.png)

### ✈️ Explore Guides
![Explore Guides](https://github.com/Ankitjaiswal7781/XploreMate/assets/guides.png)

### 💬 AI Chatbot
![Chatbot](https://github.com/Ankitjaiswal7781/XploreMate/assets/chatbot.png)

### 💳 Payment Checkout
![Payment Checkout](https://github.com/Ankitjaiswal7781/XploreMate/assets/payment.png)

### 📅 Booking Summary
![Booking Summary](https://github.com/Ankitjaiswal7781/XploreMate/assets/booking.png)

*(You can replace these URLs with your actual screenshots after uploading them to your GitHub repo in `/assets` folder.)*

---

## 💡 AI Integration (RAG Chatbot)

- The chatbot uses **LangChain** to process travel queries.  
- Retrieves context from `knowledge.txt` (travel-related data).  
- Uses **HuggingFace embeddings + FAISS Vector Store** for memory.  
- **Groq Llama 3.3-70B** provides intelligent, concise, and human-like answers.

---

## 🔐 Authentication & Security

- All credentials and API keys stored in `.env` (not pushed to GitHub).  
- JWT-based authentication for users and guides.  
- Secure password hashing using **bcrypt**.  
- HTTPS communication enabled.

---

## 💳 Stripe Integration

- Integrated with **Stripe Checkout Sessions**  
- Dynamic line items for each selected guide service  
- Real-time webhook updates for booking confirmation  
- Auto status updates in MongoDB

---

## 👥 Team Members

| Name | Role | Contribution |
|------|------|---------------|
| **Ankit Kumar** | Full Stack Developer | Frontend + Backend + AI Integration |
| **Member 2** | UI/UX Developer | Responsive UI & Tailwind Styling |
| **Member 3** | Backend Developer | API & Database Design |
| **Member 4** | Tester & Documentation | Testing, Deployment & SRS/Docs |

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Ankitjaiswal7781/XploreMate.git

# Navigate into project
cd XploreMate

# Install dependencies for client and server
cd client && npm install
cd ../server && npm install

# Create .env files in both client/ and server/
# Add your API keys (Stripe, HuggingFace, Groq, MongoDB URI, etc.)

# Start both servers
npm run dev

📫 Feedback & Support

💬 Got feedback or want to collaborate?
Feel free to connect with us via:

📧 ankitkumar@example.com

🌐 LinkedIn Profile

🐙 GitHub: Ankitjaiswal7781

⭐ If you like this project, don’t forget to star the repo and share it!

"Travel smarter, not harder — with XploreMate 🌏💫"


---

Would you like me to:
- 🖼️ Generate **custom banner + section images** (like Home, Booking, Chatbot, etc.) for this README?
That would make your GitHub page look stunning and professional.
