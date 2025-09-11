// Global variables
let currentUser = null;
const API_BASE = '';

// DOM elements
const resumeForm = document.getElementById('resume-form');
const loadingScreen = document.getElementById('loading-screen');
const resultsSection = document.getElementById('results');
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
            showSuccessModal();
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
        <h3>${data.name}</h3>
        <p>${data.email}</p>
        <p>${data.education}</p>
    `;

    // Display extracted skills
    if (data.skills && data.skills.length > 0) {
        const skillsDiv = document.getElementById('extracted-skills');
        skillsDiv.innerHTML = `
            <h4>Skills Detected:</h4>
            <div class="skills-tags">
                ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
    }
}

// Display all available internships
function displayAllInternships(internships) {
    const internshipsList = document.getElementById('internships-list');
    
    if (!internships || internships.length === 0) {
        internshipsList.innerHTML = '<p>No internships available at the moment.</p>';
        return;
    }
    
    internshipsList.innerHTML = internships.map(internship => `
        <div class="internship-card">
            <h4>${internship.title}</h4>
            <p class="company">${internship.company}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${internship.location}</p>
            <p class="duration"><i class="fas fa-clock"></i> ${internship.duration}</p>
            <div class="skills-required">
                ${internship.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <button class="btn btn-apply" onclick="applyForInternship(${internship.id})">Apply Now</button>
        </div>
    `).join('');
}

// Show/hide loading screen
function showLoading() {
    loadingScreen.classList.remove('hidden');
}

function hideLoading() {
    loadingScreen.classList.add('hidden');
}

// Show results section
function showResults() {
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Modal functions
function showSuccessModal() {
    successModal.classList.remove('hidden');
}

function closeModal() {
    successModal.classList.add('hidden');
}

// Apply for internship
async function applyForInternship(internshipId) {
    if (!currentUser) {
        alert('Please upload your resume first');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                internshipId: internshipId
            })
        });
        
        if (response.ok) {
            showSuccessModal();
        } else {
            throw new Error('Application failed');
        }
    } catch (error) {
        console.error('Error applying for internship:', error);
        alert('Error applying for internship: ' + error.message);
    }
}
