from flask import Flask, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
import os
from pathlib import Path
import json
#from flask_cors import CORS

BASE_DIR = Path(__file__).parent.resolve()
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

app = Flask(__name__)
#CORS(app)

@app.route("/first_question")
def first_question():
    job_desc = '''Summer Internship I.T

Kickstart your career with an exciting 8-week IT internship with a Top Employer.

Gain hands-on experience and develop valuable skills to stand out in the competitive graduate market.

Enjoy hybrid working and great facilities when you're in the office


Start Date: You'll join the Internship programme on 23rd June.

What you can expect

Our Summer Internship is an investment in you and your career. It offers you the opportunity to gain real-world experience, take on real responsibilities, and make a tangible impact. During your time with us, you'll work alongside experienced professionals, network across the business, and develop valuable skills that will set you up for future success.

The IT Division is central to the smooth operation of NFU Mutual. With over £80m in IT change projects managed annually across more than 30 departments and a team of 650 employees, along with 250 third-party offshore staff, our IT function is a dynamic, fast-paced, and innovative environment.

As an IT intern, you'll gain first-hand experience working on real operational casework, helping to resolve issues and ensuring IT services run smoothly for customers, staff, agencies, and regional offices. You'll work on IT change projects, supporting the implementation and rollout of new systems and technologies to enhance business operations. Collaboration will be key, as you will engage with various teams, interact with stakeholders, and understand IT service delivery in action.

Additionally, you will research and present findings on live project bottlenecks, have opportunity to visit agencies and regional centres whilst providing insights and recommendations to improve processes. You'll also get the opportunity to showcase your learning to members of the senior leadership team. Throughout the internship, you'll receive guidance from a programme manager and a buddy, ensuring you feel supported.

Recruitment process

Our recruitment process consists of a few simple steps; a friendly introduction call with a member of our Talent Acquisition team and a skills-focused interview via Microsoft Teams. Successful completion of the programme may even lead to you being fast-tracked through our graduate programme application process for 2025, subject to availability and eligibility.

This vacancy may close early depending on application volumes, so we recommend getting your application in as soon as possible!

What we're looking for

You're passionate about technology and eager to learn, an undergraduate on track for a minimum 2:2 honours degree, ideally in an IT-related subject. Any experience of working in a customer focussed environment is desirable, however this isn't essential to be successful.

A proven interest in IT and a basic proficiency of Microsoft Office 365 is essential. You'll demonstrate strong interpersonal skills as you will be working with various teams and stakeholders across the organisation. A proactive mindset and a can-do attitude will help you make the most of this opportunity.

You'll also demonstrate the following key skills:


Problem-solving abilities, with a logical and proactive approach to challenges.

Strong teamwork capabilities, working well with colleagues to achieve shared goals.

Excellent communication skills, both written and verbal, with the ability to build relationships


At NFU Mutual, we support an inclusive workplace and value all the differences that make us unique. We celebrate the creativity and innovation that comes from diverse perspectives and experiences and share a common vision of doing the right thing for our customers and employees.

We recognise that some candidates may experience barriers during the recruitment process. So, we encourage candidates to discuss any adjustments or accommodations they need to be the best they can be throughout our recruitment process.

We're proud to be a Disability Confident Employer, a Race at Work and Women in Finance Charter signatory and welcome applications from people of all backgrounds, regardless of age, ethnicity, disability, neurodiversity, gender, religion, marital status, sexual orientation, or socioeconomic background.

Salary

This 8-week internship offers a fixed-term contract with a competitive pro-rata salary.

Working at NFU Mutual

We'reone of the UK's leading general insurance and financial services companies. For over 110 yearswe'veput our customers at the heart of everything we do.Ourpeopleare just as important to us.Wepride ourselves on being "a great place to work" and we're one of only 60 companies across the globe to receive a Gallup Exceptional Workplace 2024 award, and one of only 2 companies to receive the award for the ninth consecutive year. We were also named in the LinkedIn Top 25 Companies List 2021, the Glassdoor Best Places to Work UK List 2023 and 2024, and were recognised as a certified UK Top Employer by the Top Employers Institute in 2023 and 2024.

We offer a supportive culture where we empower and inspire our people to perform, offer them opportunities to grow, and recognise and reward their contribution. Our people are proud to work for a company that respects them and their communities, and they trust us to be financially sustainable, so we are successful now and in the future.

Apply now'''
    qualification = 'first-year student'
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

@app.route("/continue_interview")
def continue_interview():
    job_desc = '''Summer Internship I.T

Kickstart your career with an exciting 8-week IT internship with a Top Employer.

Gain hands-on experience and develop valuable skills to stand out in the competitive graduate market.

Enjoy hybrid working and great facilities when you're in the office


Start Date: You'll join the Internship programme on 23rd June.

What you can expect

Our Summer Internship is an investment in you and your career. It offers you the opportunity to gain real-world experience, take on real responsibilities, and make a tangible impact. During your time with us, you'll work alongside experienced professionals, network across the business, and develop valuable skills that will set you up for future success.

The IT Division is central to the smooth operation of NFU Mutual. With over £80m in IT change projects managed annually across more than 30 departments and a team of 650 employees, along with 250 third-party offshore staff, our IT function is a dynamic, fast-paced, and innovative environment.

As an IT intern, you'll gain first-hand experience working on real operational casework, helping to resolve issues and ensuring IT services run smoothly for customers, staff, agencies, and regional offices. You'll work on IT change projects, supporting the implementation and rollout of new systems and technologies to enhance business operations. Collaboration will be key, as you will engage with various teams, interact with stakeholders, and understand IT service delivery in action.

Additionally, you will research and present findings on live project bottlenecks, have opportunity to visit agencies and regional centres whilst providing insights and recommendations to improve processes. You'll also get the opportunity to showcase your learning to members of the senior leadership team. Throughout the internship, you'll receive guidance from a programme manager and a buddy, ensuring you feel supported.

Recruitment process

Our recruitment process consists of a few simple steps; a friendly introduction call with a member of our Talent Acquisition team and a skills-focused interview via Microsoft Teams. Successful completion of the programme may even lead to you being fast-tracked through our graduate programme application process for 2025, subject to availability and eligibility.

This vacancy may close early depending on application volumes, so we recommend getting your application in as soon as possible!

What we're looking for

You're passionate about technology and eager to learn, an undergraduate on track for a minimum 2:2 honours degree, ideally in an IT-related subject. Any experience of working in a customer focussed environment is desirable, however this isn't essential to be successful.

A proven interest in IT and a basic proficiency of Microsoft Office 365 is essential. You'll demonstrate strong interpersonal skills as you will be working with various teams and stakeholders across the organisation. A proactive mindset and a can-do attitude will help you make the most of this opportunity.

You'll also demonstrate the following key skills:


Problem-solving abilities, with a logical and proactive approach to challenges.

Strong teamwork capabilities, working well with colleagues to achieve shared goals.

Excellent communication skills, both written and verbal, with the ability to build relationships


At NFU Mutual, we support an inclusive workplace and value all the differences that make us unique. We celebrate the creativity and innovation that comes from diverse perspectives and experiences and share a common vision of doing the right thing for our customers and employees.

We recognise that some candidates may experience barriers during the recruitment process. So, we encourage candidates to discuss any adjustments or accommodations they need to be the best they can be throughout our recruitment process.

We're proud to be a Disability Confident Employer, a Race at Work and Women in Finance Charter signatory and welcome applications from people of all backgrounds, regardless of age, ethnicity, disability, neurodiversity, gender, religion, marital status, sexual orientation, or socioeconomic background.

Salary

This 8-week internship offers a fixed-term contract with a competitive pro-rata salary.

Working at NFU Mutual

We'reone of the UK's leading general insurance and financial services companies. For over 110 yearswe'veput our customers at the heart of everything we do.Ourpeopleare just as important to us.Wepride ourselves on being "a great place to work" and we're one of only 60 companies across the globe to receive a Gallup Exceptional Workplace 2024 award, and one of only 2 companies to receive the award for the ninth consecutive year. We were also named in the LinkedIn Top 25 Companies List 2021, the Glassdoor Best Places to Work UK List 2023 and 2024, and were recognised as a certified UK Top Employer by the Top Employers Institute in 2023 and 2024.

We offer a supportive culture where we empower and inspire our people to perform, offer them opportunities to grow, and recognise and reward their contribution. Our people are proud to work for a company that respects them and their communities, and they trust us to be financially sustainable, so we are successful now and in the future.

Apply now'''
    qualification = 'first-year student'
    previous_qna = '''"Can you describe a technical problem you've solved, even if it was in a personal project or academic setting, and walk us through how you approached it step by step?" "As a first-year computer science student, I built a Python program to automate organizing my messy downloads folder - it was full of hundreds of unsorted files. The problem was that different file types (PDFs, images, zips) were all mixed together, making it impossible to find anything.

First, I identified the main file extensions I needed to sort (.pdf, .jpg, .zip etc.). Then I wrote a script using os and shutil modules to:

Scan the folder

Check each file's extension

Move it to a corresponding subfolder (Documents, Images, Archives)

The biggest challenge was handling duplicate filenames - my first version would crash if two files had the same name. I solved this by adding a timestamp to duplicates. It's basic but helped me understand file I/O operations and error handling in Python.

This experience taught me how to break down a real-world problem into logical steps and iteratively improve my solution - skills I'm excited to apply in this internship's IT projects."'''
    
    client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://openrouter.ai/api/v1", timeout=600)

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat:free",
        messages=[
            {"role": "system", "content": f"You are an interviewer for the job description: {job_desc} and are interviewing a {qualification}"},
            {"role": "user", "content": f"This has been your previous qna session: {previous_qna} Now, continue this interview by asking another single question to the interviewee that has not been asked before which may or may not be a follow-up. Output the question in a json format. The json format must have key name 'question' and the question is in the value of that key"},
        ],
        response_format={"type": "json_object"}
    )
    
    question = response.choices[0].message.content.strip('`')
    parsed = question.replace('json', '')
    cleaned = parsed.strip()
    
    question_json = json.loads(cleaned)
    
    return question_json

if __name__ == "__main__":
    app.run(debug="True")
    
