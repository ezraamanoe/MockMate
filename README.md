# 🤖 MockMate

**Your AI-Powered Mock Interview Companion**

MockMate is a smart web app designed to help you **ace your job interviews**. With personalized questions, voice interaction, and even a "troll mode" for stress testing, it's like having a coach and chaos goblin in one app. 🎤💼🔥

---

## 🚀 Overview

MockMate helps users **practice job interviews** by generating tailored questions based on their **qualifications** and the **job description**. It offers:

- 🎙️ Voice interaction  
- 💬 AI-generated questions  
- ⏱️ Timed responses  
- 📈 Feedback & performance reviews  

---

## ✨ Features

✅ **Personalized Interviews**  
> Smart questions based on your job description and resume.

✅ **Voice Interaction**  
> - Text-to-speech (TTS) for questions  
> - Voice-to-text (STT) for responses  

✅ **Interview Modes**  
- 👔 **Professional Mode** – Standard, polite interviewer  
- 🤨 **Troll Mode** – A rude, stress-test interviewer (if you dare)

✅ **Session Structure**  
- 🎯 Up to **5 questions** per session  
- 🕒 **3-minute timer** per answer

✅ **Performance Review**  
> Immediate and detailed feedback on your responses

---

## 🛠️ Tech Stack

### 🌐 Frontend  
- React.js ⚛️  
- [`react-speech-kit`](https://www.npmjs.com/package/react-speech-kit) (STT)

### 🔧 Backend  
- Flask (Python 🐍)  
- [Neuphonics](https://neuphonic.com) for voice synthesis  
- [OpenRouter](https://openrouter.ai) for AI-powered question generation

---

## 💻 Running the App Locally

### 📦 Prerequisites  
Make sure you have:
- [Python 3.9+](https://www.python.org)  
- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- [Neuphonic API key](https://neuphonic.com) 🔑  
- [OpenRouter API key](https://openrouter.ai) 🔑  

---

Clone the git repository by running:

```
$ git clone https://github.com/ezraamanoe/MockMate.git
$ cd MockMate
```

Set up the flask backend by creating a virual environment and installing requirements:

```
$ python -m venv venv
$ source venv/bin/activate  # (Windows: venv\Scripts\activate)
$ pip install -r requirements.txt
```
Create a `.env ` file in the root directory and add your API keys and credentials:

```
API_KEY=your_openrouter_api_key
NEUPHONIC_API_KEY=your_neuphonic_api_key
```

Install dependencies and create a build for React:

```
$ npm install --force
$ npm run build
```

Run using flask development server:
```
$ python server.py
```

Then, open http://127.0.0.1/5000 on your browser.





