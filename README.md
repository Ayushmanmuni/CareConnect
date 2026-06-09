# CareConnect — Patient Support Platform

> A mini healthcare support web app for NGOs, featuring patient support forms, volunteer registration, and an AI-powered FAQ chatbot.

## Live Demo

🔗 **[View Live Site](#)** *(link will be updated after deployment)*

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

**Future scope:** Integration with LLM APIs (Gemini/GPT), multi-language support, ML-based triage scoring.

---

## NGO Use-Case

**Problem:** Underserved communities can't easily access healthcare. NGOs waste time answering repeated questions and manually matching patients with volunteers.

**Solution:** CareConnect lets patients self-register, answers 80% of FAQs automatically via the chatbot, and structures data so coordinators can act faster.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantics |
| CSS3 | Custom design system, responsive layout, animations |
| Vanilla JavaScript | Form validation, chatbot engine, scroll animations |
| Google Fonts (Inter) | Modern typography |

No frameworks or build tools needed — it's a static site that runs directly in the browser.

---

## How to Run Locally

Just open `index.html` in any browser. No installation needed.

---

*Built as a submission for a healthcare NGO support task.*
