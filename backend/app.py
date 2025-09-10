from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sqlite3
import PyPDF2
from docx import Document
import nltk
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
from datetime import datetime

# Download required NLTK data (run once)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = '../uploads'
DATABASE = 'internbridge.db'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Database initialization
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create internships table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS internships (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT NOT NULL,
            description TEXT NOT NULL,
            requirements TEXT NOT NULL,
            location TEXT NOT NULL,
            salary TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            skills TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create applications table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            internship_id INTEGER,
            resume_path TEXT,
            status TEXT DEFAULT 'pending',
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (internship_id) REFERENCES internships (id)
        )
    ''')
    
    # Insert sample internships
    sample_internships = [
        ("Product Management Intern", "TechCorp", 
         "Join our product team to help build the next generation of digital products. You'll work closely with engineers, designers, and stakeholders.",
         "Business, Marketing, or related field. Strong analytical skills. Experience with product management tools preferred.",
         "Remote", "$2000-3000/month"),
        
        ("Software Engineering Intern", "DevCompany",
         "Build scalable web applications and work on exciting projects with our engineering team.",
         "Computer Science or related field. Knowledge of Python, JavaScript, or similar languages.",
         "New York, NY", "$3000-4000/month"),
        
        ("Data Science Intern", "DataTech",
         "Analyze large datasets and build machine learning models to drive business insights.",
         "Statistics, Data Science, or related field. Experience with Python, SQL, and ML libraries.",
         "San Francisco, CA", "$3500-4500/month"),
        
        ("Marketing Intern", "GrowthCo",
         "Support digital marketing campaigns and help grow our brand presence across social media.",
         "Marketing, Communications, or related field. Creative mindset and social media experience preferred.",
         "Austin, TX", "$1500-2500/month"),
        
        ("UX Design Intern", "DesignStudio",
         "Design user-centered experiences for mobile and web applications.",
         "Design, HCI, or related field. Portfolio required. Experience with Figma or similar tools.",
         "Seattle, WA", "$2500-3500/month"), 
        
         ("AI Research Intern", "IIT Delhi", 
     "Work on cutting-edge AI research projects under faculty mentorship.", 
     "Strong knowledge of Python, ML, and statistics. Familiarity with TensorFlow or PyTorch preferred.", 
     "Delhi", "₹15,000/month"),
     
    ("Cybersecurity Intern", "CERT-In", 
     "Assist in cybersecurity threat analysis and vulnerability research for national networks.", 
     "Computer Science background, knowledge of cryptography, ethical hacking skills preferred.", 
     "Bengaluru", "₹12,000/month"),
     
    ("Data Science Intern", "NIC", 
     "Analyze large datasets from e-Governance projects and derive insights.", 
     "Proficiency in Python/R, data visualization. SQL knowledge preferred.", 
     "Remote", "₹10,000/month"),
     
    ("Web Development Intern", "Digital India Corporation", 
     "Develop scalable web applications for government services.", 
     "HTML, CSS, JavaScript required. Experience with React/Angular preferred.", 
     "New Delhi", "₹8,000/month"),
     
    ("Blockchain Intern", "Ministry of Finance", 
     "Research blockchain solutions for digital payments and record-keeping.", 
     "Knowledge of blockchain frameworks (Ethereum/Hyperledger). Solidity preferred.", 
     "Mumbai", "₹18,000/month"),
     
    ("Embedded Systems Intern", "DRDO", 
     "Develop embedded systems for defense applications.", 
     "C/C++ programming required. Knowledge of microcontrollers, RTOS preferred.", 
     "Pune", "₹13,000/month"),
     
    ("Robotics Intern", "IIT Bombay Robotics Lab", 
     "Assist in building and programming robotic prototypes for industrial and research applications.", 
     "Python/C++, robotics kits experience. ROS preferred.", 
     "Mumbai", "₹14,000/month"),
     
    ("Aerospace Software Intern", "HAL", 
     "Work on avionics software systems for aerospace applications.", 
     "Strong in C, avionics standards knowledge. MATLAB/Simulink preferred.", 
     "Bengaluru", "₹20,000/month"),
     
    ("Natural Language Processing Intern", "CDAC", 
     "Contribute to NLP models for Indian regional languages.", 
     "Python, NLP libraries required. Deep learning preferred.", 
     "Hyderabad", "₹12,000/month"),
     
    ("IoT Intern", "MeitY", 
     "Assist in developing IoT applications for smart city projects.", 
     "Knowledge of IoT protocols, Arduino/Raspberry Pi. Cloud IoT platforms preferred.", 
     "New Delhi", "₹10,000/month"),
     
    ("Quantum Computing Intern", "IISc Bangalore", 
     "Research quantum algorithms and simulators.", 
     "Strong math background, Python required. Qiskit knowledge preferred.", 
     "Bengaluru", "₹25,000/month"),
     
    ("Augmented Reality Intern", "NIC", 
     "Design AR applications for digital governance and citizen services.", 
     "Unity/Unreal Engine skills required. C#/C++ preferred.", 
     "Remote", "₹9,000/month"),
     
    ("Machine Learning Intern", "ISRO", 
     "Develop ML models for satellite image analysis.", 
     "Python, TensorFlow required. Image processing skills preferred.", 
     "Thiruvananthapuram", "₹18,000/month"),
     
    ("Game Development Intern", "Doordarshan", 
     "Develop educational games for children.", 
     "Unity/Unreal Engine required. 3D modeling preferred.", 
     "Delhi", "₹8,000/month"),
     
    ("Autonomous Vehicles Intern", "IIT Madras", 
     "Assist in research on self-driving car algorithms.", 
     "Python/C++, ROS required. Computer vision preferred.", 
     "Chennai", "₹20,000/month"),
     
    ("Health Informatics Intern", "AIIMS", 
     "Work on predictive analytics for healthcare data.", 
     "Python/R required. Healthcare data experience preferred.", 
     "Delhi", "₹12,000/month"),
     
    ("Big Data Intern", "NIC Cloud Division", 
     "Handle petabyte-scale government data systems.", 
     "Hadoop/Spark required. Cloud platforms preferred.", 
     "Remote", "₹15,000/month"),
     
    ("Mobile App Development Intern", "MyGov", 
     "Develop Android/iOS apps for citizen engagement.", 
     "Flutter/React Native required. Firebase preferred.", 
     "New Delhi", "₹9,000/month"),
     
    ("Renewable Energy Software Intern", "MNRE", 
     "Develop monitoring systems for solar/wind projects.", 
     "Python, SCADA knowledge required. IoT integration preferred.", 
     "Jaipur", "₹14,000/month"),
     
    ("Computer Vision Intern", "IIT Kharagpur", 
     "Assist in developing computer vision solutions for agriculture and industry.", 
     "Python, OpenCV required. Deep learning preferred.", 
     "Kharagpur", "₹13,000/month"),
     
    ("DevOps Intern", "NIC", 
     "Automate deployments for e-Gov platforms.", 
     "Linux, Docker required. Kubernetes preferred.", 
     "Remote", "₹12,000/month"),
     
    ("AI for Education Intern", "NPTEL", 
     "Work on adaptive learning systems using AI.", 
     "Python, ML required. NLP preferred.", 
     "Chennai", "₹11,000/month"),
     
    ("Cyber-Physical Systems Intern", "IISc", 
     "Research real-time cyber-physical control systems.", 
     "C++, real-time OS required. Control systems preferred.", 
     "Bengaluru", "₹16,000/month"),
     
    ("E-Governance Software Intern", "NIC", 
     "Assist in design and deployment of e-governance solutions.", 
     "Database, portal development basics required.", 
     "Lucknow", "₹8,000/month"),
     
    ("Space Robotics Intern", "ISRO Robotics Division", 
     "Contribute to space robotics projects like rover design.", 
     "C++, ROS required. Computer vision preferred.", 
     "Bengaluru", "₹20,000/month")
    ]
    
    cursor.execute("SELECT COUNT(*) FROM internships")
    if cursor.fetchone()[0] == 0:  # Only insert if table is empty
        cursor.executemany('''
            INSERT INTO internships (title, company, description, requirements, location, salary)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', sample_internships)
    
    conn.commit()
    conn.close()

# Text extraction functions
def extract_text_from_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        return f"Error reading DOCX: {str(e)}"

def extract_text_from_txt(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        return f"Error reading TXT: {str(e)}"

def extract_skills_from_text(text):
    # Common tech and business skills
    skills_keywords = [
        # Technical skills
        'python', 'javascript', 'java', 'c++', 'html', 'css', 'react', 'node.js', 'sql', 
        'machine learning', 'data analysis', 'statistics', 'excel', 'powerpoint',
        # Business skills
        'project management', 'marketing', 'business analysis', 'communication', 'leadership',
        'team work', 'problem solving', 'analytical thinking', 'strategic planning',
        # Design skills
        'figma', 'photoshop', 'ui/ux', 'design thinking', 'wireframing', 'prototyping'
    ]
    
    text_lower = text.lower()
    found_skills = []
    
    for skill in skills_keywords:
        if skill in text_lower:
            found_skills.append(skill.title())
    
    return list(set(found_skills))  # Remove duplicates

def get_recommendations(user_skills, limit=3):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, title, company, description, requirements FROM internships")
    internships = cursor.fetchall()
    
    recommendations = []
    
    for internship in internships:
        internship_id, title, company, description, requirements = internship
        
        # Combine description and requirements for matching
        internship_text = (description + " " + requirements).lower()
        user_skills_text = " ".join([skill.lower() for skill in user_skills])
        
        # Simple keyword matching score
        matches = 0
        for skill in user_skills:
            if skill.lower() in internship_text:
                matches += 1
        
        if matches > 0:
            score = matches / len(user_skills) if user_skills else 0
            recommendations.append({
                'id': internship_id,
                'title': title,
                'company': company,
                'description': description,
                'requirements': requirements,
                'match_score': score,
                'matched_skills': matches
            })
    
    # Sort by match score
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)
    
    conn.close()
    return recommendations[:limit]

# Routes
@app.route('/')
def home():
    return jsonify({"message": "InterBridge API is running!"})

@app.route('/api/internships', methods=['GET'])
def get_internships():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM internships")
    internships = cursor.fetchall()
    
    result = []
    for internship in internships:
        result.append({
            'id': internship[0],
            'title': internship[1],
            'company': internship[2],
            'description': internship[3],
            'requirements': internship[4],
            'location': internship[5],
            'salary': internship[6],
            'created_at': internship[7]
        })
    
    conn.close()
    return jsonify(result)

@app.route('/api/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400
    
    if 'name' not in request.form or 'email' not in request.form:
        return jsonify({'error': 'Name and email are required'}), 400
    
    file = request.files['resume']
    name = request.form['name']
    email = request.form['email']
    phone = request.form.get('phone', '')
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Save file
    filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    # Extract text based on file type
    if filename.lower().endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif filename.lower().endswith('.docx'):
        text = extract_text_from_docx(file_path)
    elif filename.lower().endswith('.txt'):
        text = extract_text_from_txt(file_path)
    else:
        return jsonify({'error': 'Unsupported file type. Please upload PDF, DOCX, or TXT files.'}), 400
    
    # Extract skills
    skills = extract_skills_from_text(text)
    
    # Save user to database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT OR REPLACE INTO users (name, email, phone, skills)
            VALUES (?, ?, ?, ?)
        ''', (name, email, phone, json.dumps(skills)))
        
        user_id = cursor.lastrowid
        conn.commit()
        
        # Get recommendations
        recommendations = get_recommendations(skills)
        
        response = {
            'message': 'Resume processed successfully!',
            'user_id': user_id,
            'extracted_skills': skills,
            'recommendations': recommendations
        }
        
        conn.close()
        return jsonify(response)
        
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'error': 'Email already exists'}), 400

@app.route('/api/apply', methods=['POST'])
def apply_for_internship():
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'internship_id' not in data:
        return jsonify({'error': 'User ID and Internship ID are required'}), 400
    
    user_id = data['user_id']
    internship_id = data['internship_id']
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Check if user already applied for this internship
    cursor.execute('''
        SELECT id FROM applications 
        WHERE user_id = ? AND internship_id = ?
    ''', (user_id, internship_id))
    
    existing_application = cursor.fetchone()
    
    if existing_application:
        conn.close()
        return jsonify({'error': 'You have already applied for this internship'}), 400
    
    # Create application
    cursor.execute('''
        INSERT INTO applications (user_id, internship_id)
        VALUES (?, ?)
    ''', (user_id, internship_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Application submitted successfully!'})

@app.route('/api/user/<int:user_id>/applications', methods=['GET'])
def get_user_applications(user_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT a.id, a.status, a.applied_at, i.title, i.company, i.location
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE a.user_id = ?
        ORDER BY a.applied_at DESC
    ''', (user_id,))
    
    applications = cursor.fetchall()
    
    result = []
    for app in applications:
        result.append({
            'id': app[0],
            'status': app[1],
            'applied_at': app[2],
            'internship_title': app[3],
            'company': app[4],
            'location': app[5]
        })
    
    conn.close()
    return jsonify(result)