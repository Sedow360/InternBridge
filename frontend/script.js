// Global variables
let currentUser = null;
const API_BASE = 'http://localhost:5000/api';

// DOM elements
const resumeForm = document.getElementById('resume-form');
const loadingScreen = document.getElementById('loading-screen');
const resultsSection = document.getElementById('results');
const homeSection = document.getElementById('home');
const fileInput = document.getElementById('resume');
const fileName = document.getElementById('file-name');
const successModal = document.getElementById('success-modal');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadInternships();
});

// Event listeners
function setupEventListeners() {
    // File upload
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            fileName.textContent = e.target.files[0].name;
        } else {
            fileName.textContent = 'Choose Resume File';
        }
    });

    // Form submission
    resumeForm.addEventListener('submit', handleResumeSubmission);

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
}

// Handle resume form submission
async function handleResumeSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(resumeForm);
    
    // Validate form
    if (!formData.get('name') || !formData.get('email') || !formData.get('resume')) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show loading screen
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE}/upload-resume`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data;
            displayResults(data);
            showResults();
        } else {
            throw new Error(data.error || 'Upload failed');
        }
    } catch (error) {
        console.error('Error uploading resume:', error);
        alert('Error processing resume: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Load all internships
async function loadInternships() {
    try {
        const response = await fetch(`${API_BASE}/internships`);
        const internships = await response.json();
        
        if (response.ok) {
            displayAllInternships(internships);
        }
    } catch (error) {
        console.error('Error loading internships:', error);
    }
}

// Display results after resume processing
function displayResults(data) {
    // User info
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
        <h3>Welcome, ${data.user_id ? 'User' : 'Guest'}!</h3>
        <p>We've analyzed your resume and found ${data.extracted_skills.length} relevant skills.</p>
    `;
    
    // Extracted skills
    const skillsContainer = document.getElementById('extracted-skills');
    skillsContainer.innerHTML = `
        <div class="skills-container">
            <h4>Your Skills</h4>
            <div class="skills-list">
                ${data.extracted_skills.map(skill => `
                    <span class="skill-tag">${skill}</span>
                `).join('')}
            </div>
        </div>
    `;
    
    // Recommendations
    displayRecommendations(data.recommendations);
}

// Display recommended internships
function displayRecommendations(recommendations) {
    const recommendationsList = document.getElementById('recommendations-list');
    
    if (recommendations.length === 0) {
        recommendationsList.innerHTML = `
            <div class="no-recommendations">
                <p>No specific recommendations found, but check out all available internships below!</p>
            </div>
        `;
        return;
    }
    
    recommendationsList.innerHTML = recommendations.map(internship => 
        createInternshipCard(internship, true)
    ).join('');
}

// Display all internships
function displayAllInternships(internships) {
    const internshipsList = document.getElementById('internships-list');
    
    internshipsList.innerHTML = internships.map(internship => 
        createInternshipCard(internship, false)
    ).join('');
}

// Create internship card HTML
function createInternshipCard(internship, isRecommended = false) {
    const matchInfo = isRecommended ? `
        <div class="match-info">
            <small>Match Score: ${Math.round(internship.match_score * 100)}% • ${internship.matched_skills} skills matched</small>
        </div>
    ` : '';
    
    return `
        <div class="internship-card ${isRecommended ? 'recommended' : ''}">
            <div class="card-header">
                <h4>${internship.title}</h4>
                <div class="company">${internship.company}</div>
                ${matchInfo}
            </div>
            
            <div class="card-body">
                <p>${internship.description}</p>
                
                <div class="card-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${internship.location || 'Location not specified'}</span>
                    </div>
                    ${internship.salary ? `
                        <div class="meta-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>${internship.salary}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="requirements">
                    <h5>Requirements</h5>
                    <p>${internship.requirements}</p>
                </div>
                
                <button class="btn btn-apply" onclick="applyForInternship(${internship.id})" ${!currentUser ? 'disabled title="Please upload your resume first"' : ''}>
                    <i class="fas fa-paper-plane"></i>
                    Apply Now
                </button>
            </div>
        </div>
    `;
}

// Apply for internship
async function applyForInternship(internshipId) {
    if (!currentUser || !currentUser.user_id) {
        alert('Please upload your resume first to apply for internships');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentUser.user_id,
                internship_id: internshipId
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccessModal();
        } else {
            throw new Error(data.error || 'Application failed');
        }
    } catch (error) {
        console.error('Error applying for internship:', error);
        alert('Error submitting application: ' + error.message);
    }
}

// UI helper functions
function showLoading() {
    loadingScreen.classList.remove('hidden');
}

function hideLoading() {
    loadingScreen.classList.add('hidden');
}

function showResults() {
    homeSection.style.display = 'none';
    resultsSection.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function showSuccessModal() {
    successModal.classList.remove('hidden');
}

function closeModal() {
    successModal.classList.add('hidden');
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Smooth scrolling for navigation
function smoothScroll(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateFileType(file) {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    return allowedTypes.includes(file.type);
}

function validateFileSize(file, maxSizeMB = 16) {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    return file.size <= maxSize;
}

// Enhanced form validation
resumeForm.addEventListener('input', function(e) {
    const input = e.target;
    
    // Real-time validation
    if (input.type === 'email') {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    }
    
    if (input.type === 'file') {
        const file = input.files[0];
        if (file) {
            if (!validateFileType(file)) {
                alert('Please upload a PDF, DOCX, or TXT file');
                input.value = '';
                fileName.textContent = 'Choose Resume File';
                return;
            }
            
            if (!validateFileSize(file)) {
                alert('File size must be less than 16MB');
                input.value = '';
                fileName.textContent = 'Choose Resume File';
                return;
            }
        }
    }
});

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Handle dropdown menus on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        const dropdownToggle = e.target.closest('.dropdown-toggle');
        if (dropdownToggle) {
            e.preventDefault();
            const dropdown = dropdownToggle.parentElement;
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle dropdown
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.display = 'none';
                });
                menu.style.display = 'block';
            }
        }
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Handle browser back button
window.addEventListener('popstate', function(e) {
    // Handle navigation state changes if needed
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
        closeModal();
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);
