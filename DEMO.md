# InterBridge - Live Demo

## ✨ New Features Implemented

### 1. Professional Navigation Menu
- **Blue navbar** similar to PM Internship Scheme website
- **Navigation items**: Home, Login, Opportunities, Language
- **Responsive dropdown** for language selection with Indian languages:
  - English
  - हिंदी (Hindi)
  - বাংলা (Bengali)
  - தமிழ் (Tamil)
  - తెలుగు (Telugu)
  - ગુજરાતી (Gujarati)
  - ಕನ್ನಡ (Kannada)
  - മലയാളം (Malayalam)
  - ਪੰਜਾਬੀ (Punjabi)
  - मराठी (Marathi)

### 2. Dedicated Student Login Page
- **Beautiful login form** with icons and animations
- **Social login options** (Google, LinkedIn - UI only)
- **Password visibility toggle**
- **Remember me functionality**
- **Features showcase** explaining benefits of logging in
- **Fully responsive** design

### 3. Mobile-First Design
- **Hamburger menu** for mobile navigation
- **Touch-friendly** dropdowns and buttons
- **Optimized layouts** for phone screens
- **Smooth animations** and transitions

## 🚀 How to Run

### Method 1: Simple Startup (Recommended)
```bash
# On Windows
double-click start.bat

# On Mac/Linux
chmod +x start.sh
./start.sh
```

### Method 2: Manual Setup
```bash
# 1. Start backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app.py

# 2. Open frontend
# Open frontend/index.html in your browser
```

## 📱 Testing the Application

### 1. Main Page (index.html)
- **Upload a resume** (PDF, DOCX, or TXT)
- **View personalized recommendations**
- **Browse all internships**
- **Apply for positions**

### 2. Login Page (login.html)
- **Test login form** (accepts any email/password for demo)
- **Try social login buttons** (shows "not implemented" message)
- **Test mobile navigation**
- **Try language dropdown** (UI only)

### 3. Mobile Testing
- **Resize browser** window to mobile size
- **Test hamburger menu**
- **Try touch interactions**
- **Test form submissions**

## 🎯 Features Showcase

### Backend API Endpoints
- `GET /api/internships` - List all internships
- `POST /api/upload-resume` - Process resume and get recommendations
- `POST /api/apply` - Submit internship application
- `GET /api/user/{id}/applications` - User's applications

### Frontend Features
- **Resume parsing** with NLP skill extraction
- **Smart recommendations** based on skills
- **Interactive UI** with smooth animations
- **Real-time form validation**
- **Mobile-responsive** design
- **Professional navigation**

### Sample Data
The system comes pre-loaded with 5 sample internships:
1. **Product Management Intern** at TechCorp
2. **Software Engineering Intern** at DevCompany  
3. **Data Science Intern** at DataTech
4. **Marketing Intern** at GrowthCo
5. **UX Design Intern** at DesignStudio

## 🎨 Design Highlights

### Color Scheme
- **Primary Blue**: #2563eb (Navigation)
- **Gradient**: Purple to blue (Hero sections)
- **Green**: #10b981 (Success states)
- **White/Gray**: Clean backgrounds

### Typography
- **Font Family**: Inter (modern, readable)
- **Hierarchy**: Clear headings and body text
- **Responsive**: Scales appropriately on all devices

### UI Components
- **Glassmorphism** effects on forms
- **Smooth hover** animations
- **Professional cards** for internships
- **Modern icons** from Font Awesome
- **Clean dropdowns** and menus

## 📝 Language Support (UI Only)

The language dropdown includes 10 major Indian languages:
- Currently **English only** (functionality not implemented)
- **Future enhancement**: Full i18n support
- **Unicode support** already included in HTML

## 🔧 Customization

### Adding New Internships
Edit `sample_internships` in `backend/app.py`:
```python
("Title", "Company", "Description", "Requirements", "Location", "Salary")
```

### Modifying Skills Detection
Update `skills_keywords` in `backend/app.py`:
```python
skills_keywords = [
    'python', 'javascript', 'java', # Add more skills
]
```

### Styling Changes
- **Colors**: Update CSS variables in `frontend/style.css`
- **Fonts**: Change Google Fonts import in HTML files
- **Layout**: Modify grid systems and flexbox layouts

## 🚀 Next Steps for Production

1. **Authentication System**: Implement real login/signup
2. **Language Localization**: Add i18n support
3. **Database**: Migrate from SQLite to PostgreSQL
4. **File Storage**: Use cloud storage for resumes
5. **Email Notifications**: Send application confirmations
6. **Admin Panel**: Manage internships and users
7. **API Security**: Add authentication and rate limiting
8. **SEO Optimization**: Add meta tags and structured data

## 📞 Support

- Check the main `README.md` for detailed setup instructions
- All features are demo-ready and mobile-optimized
- The system is designed to be easily deployable

---

**InterBridge** - Now with professional navigation and dedicated login experience! 🌉
