/* ============================================
   CareConnect — Application Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────── NAVBAR SCROLL ────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ──────────── MOBILE MENU ────────────
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileBtn.classList.toggle('active');
  });
  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileBtn.classList.remove('active');
    });
  });

  // ──────────── SCROLL FADE-IN ANIMATIONS ────────────
  const fadeTargets = document.querySelectorAll(
    '.step-card, .service-card, .contact-card, .form-wrapper, .section-header'
  );
  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeTargets.forEach(el => fadeObserver.observe(el));

  // ──────────── FORM VALIDATION & SUBMISSION ────────────

  function generateRef(prefix) {
    return prefix + '-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }

  function showError(inputId, msg) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(inputId + '-error');
    if (input) input.classList.add('error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearErrors(form) {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  }

  function simulateSubmit(btn, callback) {
    const textEl = btn.querySelector('.btn-text');
    const loaderEl = btn.querySelector('.btn-loader');
    btn.disabled = true;
    textEl.style.display = 'none';
    loaderEl.style.display = 'inline-block';

    setTimeout(() => {
      textEl.style.display = 'inline';
      loaderEl.style.display = 'none';
      btn.disabled = false;
      callback();
    }, 1500);
  }

  // Patient Support Form
  const patientForm = document.getElementById('patientSupportForm');
  patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(patientForm);
    let valid = true;

    const name = document.getElementById('patient-name');
    const age = document.getElementById('patient-age');
    const phone = document.getElementById('patient-phone');
    const issue = document.getElementById('patient-issue');

    if (!name.value.trim()) { showError('patient-name', 'Name is required'); valid = false; }
    if (!age.value || age.value < 0 || age.value > 120) { showError('patient-age', 'Valid age required'); valid = false; }
    if (!phone.value.trim()) { showError('patient-phone', 'Phone is required'); valid = false; }
    if (!issue.value.trim()) { showError('patient-issue', 'Please describe your concern'); valid = false; }

    if (!valid) return;

    simulateSubmit(document.getElementById('patient-submit-btn'), () => {
      const ref = generateRef('PT');
      document.getElementById('patient-ref').textContent = ref;
      document.getElementById('patient-success').style.display = 'flex';
      patientForm.reset();

      // Auto-summary log (AI concept: data processing)
      console.log('📊 [AI Auto-Summary] Patient Support Request:', {
        reference: ref,
        urgency: document.getElementById('patient-urgency').value,
        timestamp: new Date().toISOString(),
        summary: 'Request logged for triage. AI classification would route this to appropriate volunteer category.'
      });
    });
  });

  // Volunteer Form
  const volForm = document.getElementById('volunteerForm');
  volForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(volForm);
    let valid = true;

    const name = document.getElementById('vol-name');
    const email = document.getElementById('vol-email');
    const skills = document.getElementById('vol-skills');

    if (!name.value.trim()) { showError('vol-name', 'Name is required'); valid = false; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError('vol-email', 'Valid email required');
      valid = false;
    }
    if (!skills.value) { showError('vol-skills', 'Please select a skill'); valid = false; }

    if (!valid) return;

    simulateSubmit(document.getElementById('vol-submit-btn'), () => {
      const ref = generateRef('VL');
      document.getElementById('vol-ref').textContent = ref;
      document.getElementById('vol-success').style.display = 'flex';
      volForm.reset();

      console.log('📊 [AI Auto-Summary] Volunteer Registration:', {
        reference: ref,
        skill: skills.value,
        timestamp: new Date().toISOString(),
        summary: 'Volunteer added. AI matching engine would pair with pending patient requests by skill + location.'
      });
    });
  });


  // ============================================
  //  AI CHATBOT — FAQ Engine (Rule-Based NLP Concept)
  // ============================================

  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chatbot-close');
  const chatMessages = document.getElementById('chatbot-messages');
  const chatForm = document.getElementById('chatbot-input-form');
  const chatInput = document.getElementById('chatbot-input');
  const suggestionsEl = document.getElementById('chatbot-suggestions');

  let chatOpen = false;

  // FAQ knowledge base (simulating AI retrieval)
  const FAQ_DB = [
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
      response: "Hello! 👋 I'm CareBot, your AI health assistant. I can answer questions about our services, patient support process, volunteering, and general health FAQs. How can I help you today?"
    },
    {
      keywords: ['patient', 'support', 'help', 'medical', 'treatment', 'sick', 'doctor'],
      response: "🩺 **Patient Support:** Fill out our Patient Support Form above, and our coordinators will connect you with nearby healthcare providers within 24 hours. The service is completely **free and confidential**. Need urgent help? Mark the urgency as 'Urgent' in the form."
    },
    {
      keywords: ['volunteer', 'join', 'sign up', 'register', 'contribute', 'help out'],
      response: "🤝 **Volunteering:** We'd love to have you! Register through our Volunteer Form. We accept medical professionals, counselors, tech volunteers, and field workers. Roles can be **remote or on-ground**, with flexible hours. You'll also receive a certificate of volunteering."
    },
    {
      keywords: ['cost', 'fee', 'price', 'money', 'charge', 'free', 'payment'],
      response: "💚 All CareConnect services are **100% free** for patients. We are a non-profit NGO funded by donations and grants. There is no hidden fee for patient support or volunteer registration."
    },
    {
      keywords: ['medicine', 'medication', 'drug', 'prescription', 'pharmacy'],
      response: "💊 We don't prescribe medicines directly, but our medical volunteers can guide you on getting prescriptions from certified doctors. For medicine assistance programs, fill out the Patient Support Form with your need."
    },
    {
      keywords: ['mental health', 'depression', 'anxiety', 'stress', 'counseling', 'therapy', 'mental'],
      response: "🧠 **Mental Health Support:** We have volunteer counselors and therapists available. Mental health is just as important as physical health. Submit a Patient Support request selecting your concern, and we'll match you with a counselor. For crisis situations, please call the national helpline: **iCall – 9152987821**."
    },
    {
      keywords: ['emergency', 'urgent', 'ambulance', '911', '108', 'critical'],
      response: "🚨 **Emergency?** Please call emergency services immediately:\n• **Ambulance:** 108 or 112\n• **Emergency:** 112\nOur platform is for non-emergency healthcare support. For life-threatening situations, please seek immediate medical attention."
    },
    {
      keywords: ['location', 'where', 'office', 'city', 'address', 'area', 'available'],
      response: "📍 CareConnect is based in **New Delhi, India** but operates across 35+ communities nationwide. Our volunteer network covers most major cities and rural areas. Enter your location in the Patient Support Form and we'll find the nearest resources."
    },
    {
      keywords: ['covid', 'corona', 'vaccine', 'vaccination', 'booster'],
      response: "🦠 **COVID-19:** For vaccination info, visit your nearest government health center or check [CoWIN](https://www.cowin.gov.in). If you're experiencing symptoms, isolate and contact your local health authority. We can help connect you with telemedicine services through our support form."
    },
    {
      keywords: ['data', 'privacy', 'secure', 'confidential', 'information', 'safe'],
      response: "🔒 **Privacy:** All patient data is kept **strictly confidential** and is only shared with assigned volunteers. We follow data protection best practices. Your information is never sold or shared with third parties."
    },
    {
      keywords: ['ai', 'artificial intelligence', 'chatbot', 'technology', 'tech', 'automation'],
      response: "🤖 **Our AI Approach:** CareBot uses a rule-based NLP engine to provide instant FAQ responses. In the full version, we plan to integrate:\n• ML-powered triage classification\n• Smart volunteer-patient matching\n• Automated data summaries for coordinators\n• Multi-language NLP support"
    },
    {
      keywords: ['thank', 'thanks', 'bye', 'goodbye', 'great', 'awesome'],
      response: "😊 You're welcome! Happy to help. If you need anything else, just ask. Remember — your health matters, and we're here for you! 💙"
    },
    {
      keywords: ['insurance', 'scheme', 'government', 'ayushman', 'pmjay'],
      response: "🏛️ **Government Schemes:** You may be eligible for Ayushman Bharat (PM-JAY) which provides ₹5 lakh health cover per family. Check eligibility at [pmjay.gov.in](https://pmjay.gov.in). Our volunteers can also help you navigate government health schemes."
    },
    {
      keywords: ['donate', 'donation', 'fund', 'sponsor'],
      response: "🙏 **Donations:** Your support keeps us running! Contact us at support@careconnect.org to learn about donation options. Every contribution directly funds patient support programs."
    }
  ];

  const SUGGESTIONS = [
    "How to get patient support?",
    "Is it free?",
    "How to volunteer?",
    "Mental health help",
    "Emergency numbers"
  ];

  function addMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    // Support basic markdown bold
    msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function findAnswer(query) {
    const lower = query.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const faq of FAQ_DB) {
      let score = 0;
      for (const kw of faq.keywords) {
        if (lower.includes(kw)) {
          score += kw.length; // longer keyword matches = more relevant
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.response;
    }

    return "🤔 I'm not sure about that. Here's what I can help with:\n• Patient support process\n• Volunteering info\n• Mental health resources\n• Emergency contacts\n• Privacy & data security\n• Government health schemes\n\nTry asking about one of these topics, or fill out our **Patient Support Form** for personalized help!";
  }

  function renderSuggestions() {
    suggestionsEl.innerHTML = '';
    SUGGESTIONS.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-btn';
      btn.type = 'button';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        handleUserMessage(text);
        suggestionsEl.innerHTML = '';
      });
      suggestionsEl.appendChild(btn);
    });
  }

  function handleUserMessage(text) {
    addMessage(text, 'user');
    showTyping();

    // Simulate AI processing delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      removeTyping();
      const answer = findAnswer(text);
      addMessage(answer, 'bot');
    }, delay);
  }

  // Toggle chatbot
  chatToggle.addEventListener('click', () => {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chatWindow.style.display = 'flex';
      if (chatMessages.children.length === 0) {
        addMessage("👋 Hi! I'm **CareBot**, your AI health assistant.\n\nI can help with:\n• Patient support info\n• Volunteering\n• Health FAQs\n• Emergency resources\n\nAsk me anything or tap a suggestion below!", 'bot');
        renderSuggestions();
      }
      chatInput.focus();
    } else {
      chatWindow.style.display = 'none';
    }
  });

  chatClose.addEventListener('click', () => {
    chatOpen = false;
    chatWindow.style.display = 'none';
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    handleUserMessage(text);
    suggestionsEl.innerHTML = '';
  });

  // ──────────── SMOOTH SCROLL FOR ANCHOR LINKS ────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
