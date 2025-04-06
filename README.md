# MockMate

## Overview  
MockMate is an AI-powered mock interview web application that helps users practice job interviews with personalized questions based on the job description and user's qualifications. The app features voice interaction, multiple interview modes, and performance reviews.

## Features  
✅ **Personalized Interviews** - Questions generated from job descriptions  
✅ **Voice Interaction** - Text-to-speech questions and voice-to-text answers  
✅ **Two Interview Modes**:  
   - Professional mode  
   - "Troll mode" (mean interviewer for stress testing)  
✅ **Structured Format**:  
   - 5 questions max per session  
   - 3-minute timer per question  
✅ **Performance Review** - Detailed feedback after each session  

## Technologies Used  

### Frontend  
- React.js  
- React-speech-kit STT

### Backend  
- Flask (Python)  
- Neuphonics AI (voice synthesis)  
- OpenRouter AI (question generation)  

## Running the App Locally
<html>
  <dl>
    <dt>Prerequisites:</dt>
    <dd>
      - <a href="https://www.python.org">Python 3.9+</a>
      <br/>
      - <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Node.js and npm</a>
      <br/>
      - <a href="https://neuphonic.com">Neuphonic API key</a> (for API credentials)
      <br/>
      - <a href="https://openrouter.ai">OpenRouter API key</a> (for AI model)
    </dd>
  </dl>
</html>

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
$ npm install
$ npm run build
```

Run using flask development server:
```
$ python3 server.py
```

Then, open http://127.0.0.1/5000 on your browser.





