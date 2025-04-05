from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
from openai import OpenAI
import os
from pathlib import Path
import json
from flask_cors import CORS
from pyneuphonic import Neuphonic, TTSConfig
from pyneuphonic.player import AudioPlayer
import time
import threading

BASE_DIR = Path(__file__).parent.resolve()
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

app = Flask(__name__, static_folder='dist', static_url_path="")
CORS(app)

qualification = ""
job_desc = ""
prev_qna = ""
name = ""

@app.route("/set_data", methods=['POST'])
def set_data():
    global name, qualification, job_desc
    try:
        json_data = request.get_json()
        if not json_data:
            return jsonify({"error": "No JSON provided"}), 400
        
        name = json_data.get('name', "")
        qualification = json_data.get('qualification', "first-year student")
        job_desc = json_data.get('jobDescription', "")
        print(f"Qualification: {qualification}, Job Description: {job_desc}")
        return jsonify({"status": "success", "qualification": qualification, "jobDescription": job_desc})
    
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/prev_qna", methods=['POST'])
def prev_qna():
    global prev_qna
    try:
        json_data = request.get_json()
        prev_qna = json_data.get('QnA', "")
        return jsonify({"status": "success", "prevQnA": prev_qna})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/first_question", methods=['POST'])
def first_question():
    global name, qualification, job_desc
    client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://openrouter.ai/api/v1", timeout=600)

    # Create interview question
    response = client.chat.completions.create(
        model="deepseek/deepseek-chat:free",
        messages=[
            {"role": "system", "content": f"You are an interviewer for the job description: {job_desc} and are interviewing a {qualification}"},
            {"role": "user", "content": "Create the first interview question to ask the interviewee. Output the question in a json format. The json format must have key name 'question' and the question is in the value of that key"},
        ],
        response_format={"type": "json_object"}
    )

    # Parse the question into JSON
    question = response.choices[0].message.content.strip('`')
    parsed = question.replace('json', '')
    cleaned = parsed.strip()
    
    question_json = json.loads(cleaned)
    
    question_json["question"] = f"Hi {name}, welcome to the interview. So to get started, let me ask my first question. {question_json.get('question', '')}"
    
    def play_audio():
        client = Neuphonic(api_key=os.getenv('NEUPHONIC_API_KEY'))
        sse = client.tts.SSEClient()

        tts_config = TTSConfig(
            lang_code='en',
            sampling_rate=22050,
            voice_id='f8698a9e-947a-43cd-a897-57edd4070a78'
        )

        with AudioPlayer(sampling_rate=22050) as player:
            question_data = question_json.get("question", "")
            response = sse.send(question_data, tts_config=tts_config)
            player.play(response)

    audio_thread = threading.Thread(target=play_audio)
    audio_thread.start()

    time.sleep(2)
    return jsonify(question_json)

@app.route("/continue_interview", methods=['POST'])
def continue_interview():
    
    global qualification, job_desc, prev_qna
    client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://openrouter.ai/api/v1", timeout=600)

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat:free",
        messages=[
            {"role": "system", "content": f"You are an interviewer for the job description: {job_desc} and are interviewing a {qualification}"},
            {"role": "user", "content": f"This has been your previous qna session: {prev_qna} Now, continue this interview by asking another single question to the interviewee that has not been asked before which may or may not be a follow-up. Output the question in a json format. The json format must have key name 'question' and the question is in the value of that key"},
        ],
        response_format={"type": "json_object"}
    )
    
    question = response.choices[0].message.content.strip('`')
    parsed = question.replace('json', '')
    cleaned = parsed.strip()
    
    question_json = json.loads(cleaned)
    
    def play_audio():
        client = Neuphonic(api_key=os.getenv('NEUPHONIC_API_KEY'))
        sse = client.tts.SSEClient()

        tts_config = TTSConfig(
            lang_code='en',
            sampling_rate=22050,
            voice_id='f8698a9e-947a-43cd-a897-57edd4070a78'
        )

        with AudioPlayer(sampling_rate=22050) as player:
            question_data = question_json.get("question", "")
            response = sse.send(question_data, tts_config=tts_config)
            player.play(response)

    audio_thread = threading.Thread(target=play_audio)
    audio_thread.start()

    time.sleep(2)
    return jsonify(question_json)

@app.route('/')
@app.route('/interview')
@app.route('/results')
def serve_react():
    return send_from_directory('dist', 'index.html')

if __name__ == "__main__":
    app.run(debug="True")