# MockMate

<html>
  <p>
    A web app that connects to your Spotify account and uses AI to humorously critique your music taste and guess your MBTI, heavily inspired by <a         href="https://pudding.cool/2021/10/judge-my-music/">pudding.cool</a>. Built with React for the frontend and Flask for the backend, leveraging the Spotify API for user data and the DeepSeek API for AI-generated insights.
  </p>
</html>

## Features
<html>
  <dl>
    <dt>Spotify Integration:</dt>
    <dd>- Log in and fetch top 10 tracks</dd>
    <dt>AI Integration:</dt>
    <dd>- Uses DeepSeek API via OpenRouter to judge music taste</dd>
    <dt>Custom Image Generation:</dt>
    <dd>- Generates a downloadable image with AI generated message and top tracks</dd>
  </dl>
</html>

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





