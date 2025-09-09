# InterBridge - Internship Matching Platform

InterBridge is a simple, phone-first web application that connects students with internship opportunities using AI-powered resume analysis and recommendation.

## Features

- 📱 **Mobile-First Design**: Optimized for phone usage with responsive design
- 🤖 **AI-Powered Matching**: Uses NLP to extract skills from resumes and match with internships
- 📄 **Resume Processing**: Supports PDF, DOCX, and TXT file formats
- 💼 **Internship Database**: Pre-loaded with sample internships across various fields
- 🎯 **Smart Recommendations**: Provides personalized internship recommendations based on skills
- 📧 **Application Tracking**: Users can apply and track their application status

## Tech Stack

### Backend
- **Flask**: Python web framework
- **SQLite**: Lightweight database for development
- **NLTK**: Natural language processing for resume analysis
- **scikit-learn**: Machine learning for skill matching
- **PyPDF2**: PDF text extraction
- **python-docx**: DOCX file processing

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with flexbox/grid
- **HTML5**: Semantic markup
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Quick Start

### Prerequisites
- Python 3.8 or higher
- Modern web browser

### Installation

1. **Clone/Download the project**
   ```bash
   cd InterBridge
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

5. **Open the frontend**
   - Open `frontend/index.html` in your browser
   - Or serve it with a simple HTTP server:
   ```bash
   # From the frontend directory
   python -m http.server 3000
   ```
   Then visit `http://localhost:3000`

## Usage

1. **Upload Resume**: Fill in your details and upload your resume (PDF, DOCX, or TXT)
2. **Get Recommendations**: The system will analyze your skills and provide personalized internship recommendations
3. **Browse All Internships**: View all available opportunities
4. **Apply**: Click "Apply Now" on internships you're interested in
5. **Track Applications**: Your applications are stored in the database

## Project Structure

```
InterBridge/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   └── interbridge.db        # SQLite database (auto-created)
├── frontend/
│   ├── index.html            # Main HTML file
│   ├── style.css             # Stylesheet
│   └── script.js             # JavaScript functionality
├── uploads/                  # Resume uploads (auto-created)
└── README.md                 # This file
```

## API Endpoints

- `GET /` - Health check
- `GET /api/internships` - Get all internships
- `POST /api/upload-resume` - Upload resume and get recommendations
- `POST /api/apply` - Apply for an internship
- `GET /api/user/<id>/applications` - Get user's applications

## Database Schema

### internships
- id, title, company, description, requirements, location, salary, created_at

### users
- id, name, email, phone, skills, created_at

### applications
- id, user_id, internship_id, resume_path, status, applied_at

## Customization

### Adding New Internships
Edit the `sample_internships` list in `backend/app.py` and restart the server.

### Modifying Skills Detection
Update the `skills_keywords` list in the `extract_skills_from_text()` function.

### Styling Changes
Modify `frontend/style.css` to customize the appearance.

## Deployment Options

### Local Development
- Follow the Quick Start guide above

### Simple Web Hosting
1. Deploy backend to platforms like Heroku, DigitalOcean, or AWS
2. Host frontend on Netlify, Vercel, or GitHub Pages
3. Update the `API_BASE` URL in `script.js`

### Docker (Optional)
```dockerfile
# Create Dockerfile in backend/
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Notes

- This is a development/prototype version
- For production, implement proper authentication
- Add input validation and sanitization
- Use environment variables for configuration
- Consider using a production database like PostgreSQL

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**InterBridge** - Bridging the gap between talent and opportunity! 🌉
