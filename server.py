from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
from openai import OpenAI
import os
from pathlib import Path
import json
from flask_cors import CORS

BASE_DIR = Path(__file__).parent.resolve()
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

app = Flask(__name__, static_folder='build/static', template_folder='build')
CORS(app)

qualification = ""
job_desc = ""
prev_qna = ""

@app.route("/set_data", methods=['POST'])
def set_data():
    try:
        json_data = request.get_json()
        if not json_data:
            return jsonify({"error": "No JSON provided"}), 400
        
        qualification = json_data.get('qualification', "first-year student")
        job_desc = json_data.get('jobDescription', "")
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
    
    global qualification, job_desc
    client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://openrouter.ai/api/v1", timeout=600)

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat:free",
        messages=[
            {"role": "system", "content": f"You are an interviewer for the job description: {job_desc} and are interviewing a {qualification}"},
            {"role": "user", "content": "Create the first interview question to ask the interviewee. Output the question in a json format. The json format must have key name 'question' and the question is in the value of that key"},
        ],
        response_format={"type": "json_object"}
    )
    
    question = response.choices[0].message.content.strip('`')
    parsed = question.replace('json', '')
    cleaned = parsed.strip()
    
    question_json = json.loads(cleaned)
    
    return question_json

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
    
    return question_json

@app.route('/')
@app.route('/interview')
@app.route('/results')
def serve_react():
    return send_from_directory('build', 'index.html')

@app.route('/logo192.png')
def logo192():
    return send_from_directory('build', 'logo192.png', mimetype='image/x-icon')

@app.route('/logo512.png')
def logo512():
    return send_from_directory('build', 'logo512.png', mimetype='image/x-icon')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('build', 'favicon.ico', mimetype='image/x-icon')

if __name__ == "__main__":
    app.run(debug="True")
    
