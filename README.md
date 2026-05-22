# 🔥 CookLens — AI Cooking Assistant

<div align="center">

**Your AI-Powered Kitchen Companion**

*Upload any food image. Get instant AI-powered cooking insights, recipes, and guidance.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://python.org/)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Image Analysis** | Upload food images to detect ingredients, cooking stage, and dish type |
| 📋 **Smart Recipes** | Get step-by-step cooking instructions tailored to your dish |
| 🤖 **Cooking Copilot** | Real-time guidance for partially cooked food — next steps, mistake detection, fixes |
| 📊 **Nutrition Insights** | Calorie and macronutrient estimates for every dish |
| 🌶️ **Spice Recommendations** | AI-suggested seasonings to elevate your cooking |
| 🗣️ **Voice Assistant** | Hands-free recipe narration using Web Speech API |
| 🌍 **Multi-Cuisine** | Optimized for Indian, Italian, Japanese, Mexican, Thai, and more |
| 📦 **Dataset Builder** | Generate synthetic training data for fine-tuning your own models |
| 🥫 **Pantry Tracker** | Track your ingredients and get suggestions based on what you have |
| 📜 **Recipe History** | Never lose a recipe — all analyses saved for later |

---

## 🏗️ Architecture

```
┌─────────────────┐     REST API     ┌─────────────────┐     OpenAI API     ┌─────────────┐
│                 │ ◄──────────────► │                 │ ◄────────────────► │             │
│   Next.js 15    │                  │    FastAPI       │                    │  AI Model   │
│   Frontend      │                  │    Backend       │                    │  (GPT-4V /  │
│                 │                  │                 │                    │   Ollama /   │
│  - App Router   │                  │  - Analysis API  │                    │   LLaVA)    │
│  - Tailwind v4  │                  │  - Recipe API    │                    │             │
│  - Framer Motion│                  │  - Dataset API   │                    └─────────────┘
│  - TypeScript   │                  │  - Pantry API    │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/cooklens.git
cd cooklens

# Copy environment template
cp .env.example .env
```

### 2. Start the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 3. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. (Optional) Connect a Real AI Model

**Option A: OpenAI GPT-4V**
```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o
USE_MOCK_DATA=false
```

**Option B: Ollama (Free, Local)**
```bash
# Install Ollama
brew install ollama

# Pull a vision model
ollama pull llama3.2-vision

# Update .env
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_API_KEY=ollama
AI_MODEL=llama3.2-vision
USE_MOCK_DATA=false
```

---

## 🐳 Docker Deployment

```bash
# Build and run both services
docker-compose up --build

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

---

## 📁 Project Structure

```
CookLens/
├── frontend/                    # Next.js 15 App
│   ├── src/
│   │   ├── app/                 # Pages (App Router)
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/              # Design system primitives
│   │   │   ├── layout/          # Navbar, Sidebar, Footer
│   │   │   ├── landing/         # Landing page sections
│   │   │   ├── upload/          # Upload components
│   │   │   ├── analysis/        # Analysis result components
│   │   │   └── recipe/          # Recipe display components
│   │   ├── lib/                 # API client, mock data, utils
│   │   ├── hooks/               # Custom React hooks
│   │   └── types/               # TypeScript types
│   └── public/                  # Static assets
│
├── backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── routers/             # API endpoints
│   │   ├── services/            # Business logic
│   │   ├── models/              # Pydantic schemas
│   │   └── data/                # Mock data & samples
│   └── uploads/                 # Uploaded images
│
├── datasets/                    # Training data
├── docker-compose.yml           # Docker orchestration
├── .env.example                 # Environment template
└── README.md                    # This file
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Analyze a food image |
| `GET` | `/api/analyze/{id}` | Get analysis by ID |
| `POST` | `/api/recipes/generate` | Generate detailed recipe |
| `GET` | `/api/recipes/history` | Get recipe history |
| `DELETE` | `/api/recipes/history` | Clear history |
| `GET` | `/api/pantry` | List pantry items |
| `POST` | `/api/pantry` | Add pantry item |
| `DELETE` | `/api/pantry/{id}` | Remove pantry item |
| `GET` | `/api/pantry/suggestions` | Get dish suggestions |
| `POST` | `/api/dataset/generate` | Generate synthetic data |
| `GET` | `/api/dataset/stats` | Dataset statistics |
| `GET` | `/api/health` | Health check |

### Example Response

```json
{
  "id": "analysis_001",
  "ingredients": [
    {"name": "Chicken", "confidence": 0.95, "emoji": "🍗"},
    {"name": "Tomato Sauce", "confidence": 0.92, "emoji": "🍅"},
    {"name": "Butter", "confidence": 0.88, "emoji": "🧈"}
  ],
  "stage": "cooking",
  "dish_prediction": {
    "name": "Butter Chicken",
    "cuisine": "Indian",
    "confidence": 0.94
  },
  "instructions": [
    {"step_number": 1, "instruction": "Marinate chicken...", "duration": "30 min"},
    {"step_number": 2, "instruction": "Heat butter in pan...", "duration": "5 min"}
  ],
  "remaining_time": "25 minutes",
  "tips": ["Add cream at the end for richness"],
  "copilot": {
    "next_step": "Reduce the sauce on medium heat",
    "readiness_percent": 65
  },
  "nutrition": {
    "calories": 450,
    "protein_g": 35,
    "carbs_g": 12,
    "fat_g": 28
  }
}
```

---

## 🎨 Design System

CookLens uses a cinematic, food-inspired design system:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Deep charcoal canvas |
| Card BG | `#141419` | Glass card backgrounds |
| Amber | `#f59e0b` | Primary accent, CTAs |
| Burgundy | `#7f1d1d` | Secondary accent |
| Saffron | `#f0a500` | Highlights, badges |
| Text | `#f5f5f0` | Primary text |

**Typography**: Playfair Display (headings) + Inter (body) + JetBrains Mono (data)

---

## 🛣️ Roadmap

- [ ] Real-time camera analysis
- [ ] Social sharing of recipes
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Fine-tuned custom vision model
- [ ] Mobile app (React Native)
- [ ] Community recipe contributions

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

<div align="center">

**Built with 🔥 by CookLens Team**

*Powered by AI. Inspired by Cooking.*

</div>
