# CareConnect — Patient Support Platform

> A mini healthcare support web app for NGOs, featuring patient support forms, volunteer registration, and an AI-powered FAQ chatbot.

## Live Demo

🔗 **[View Live Site](https://ayushmanmuni.github.io/CareConnect/)**

---

## What Is This?

CareConnect is a free, web-based platform that helps NGOs connect patients with healthcare volunteers. Patients fill a simple form, and a volunteer (doctor, nurse, counselor) contacts them within 24 hours — completely free of charge.

---

## Features

- **Patient Support Form** — Patients describe their health concern, and get matched with a volunteer. Generates a reference ID for tracking.
- **Volunteer Registration** — Doctors, nurses, counselors, and others can register with their skills and availability.
- **AI Chatbot (CareBot)** — A floating chat assistant that instantly answers common health questions like "Is this free?", "How do I get help?", "Emergency numbers", etc.
- **Smart Data Summary** — Each form submission generates a structured summary (in console) that NGO coordinators can use for triage and resource allocation.

---

## AI / Automation Idea

### CareBot — AI FAQ Assistant

CareBot is a chatbot that sits in the bottom-right corner of the page. Users click it and ask health-related questions in plain English.

**How it works:**
- User types a question (e.g. "How do I get patient support?")
- The bot matches the question against a keyword-weighted FAQ database
- It returns the best matching answer instantly, with a natural typing animation

**What it demonstrates:**
- Keyword-based NLP matching (weighted by relevance)
- Instant 24/7 support without needing a human online
- Auto-triage concept — urgency levels are logged on form submission
- Volunteer-patient matching concept — skills are matched to patient needs

**Future enhancements (production roadmap):**
- Integration with LLM APIs (e.g., Gemini / GPT) for open-ended conversations
- Multi-language support via translation API
- ML-based patient request triage and priority scoring
- Real-time volunteer matching engine

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure, accessibility |
| **CSS3** | Custom design system with CSS variables, glassmorphism, gradients, animations, responsive grid |
| **Vanilla JavaScript** | Form validation, chatbot engine, scroll animations, counter animations, DOM manipulation |
| **Google Fonts (Inter)** | Modern typography |

> **No frameworks or build tools required.** The app is a pure static site — just open `index.html` or deploy to any static hosting.

---

## NGO Use-Case

**Problem:** Underserved communities lack easy access to healthcare guidance. NGOs face bottlenecks in:
- Manually processing patient support requests
- Matching volunteers to patients efficiently
- Answering repetitive FAQ queries (consuming volunteer time)

**Solution:** This web app provides:
1. **Self-service forms** — patients and volunteers can register without phone calls
2. **AI chatbot** — handles 80% of common queries automatically, freeing up coordinator time
3. **Structured data** — auto-summaries enable NGO coordinators to triage and allocate resources faster
4. **Mobile-friendly** — accessible from low-end smartphones in remote areas

---

## How to Run Locally

Just open `index.html` in any browser. No installation needed.

---

*Built as a submission for a healthcare NGO support task.*
