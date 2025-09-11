// DOM elements
const studentLoginForm = document.getElementById('student-login-form');
const companyLoginForm = document.getElementById('company-login-form');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const passwordToggles = document.querySelectorAll('.password-toggle');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Login form submissions
    studentLoginForm.addEventListener('submit', (e) => handleLogin(e, 'student'));
    companyLoginForm.addEventListener('submit', (e) => handleLogin(e, 'company'));
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
    
    // Password toggles
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => togglePassword(toggle));
    });
    
    // Mobile navigation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Social login buttons
    document.querySelector('.btn-google').addEventListener('click', handleGoogleLogin);
    document.querySelector('.btn-linkedin').addEventListener('click', handleLinkedInLogin);
    
    // Forgot password links
    document.querySelectorAll('.forgot-password').forEach(link => {
        link.addEventListener('click', handleForgotPassword);
    });
}

// Switch between tabs
function switchTab(tabType) {
    // Update tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.tab === tabType) {
            button.classList.add('active');
        }
    });
    
    // Update tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.content === tabType) {
            content.classList.add('active');
        }
    });
    
    // Update features section
    const studentFeatures = document.getElementById('student-features');
    const companyFeatures = document.getElementById('company-features');
    const featuresTitle = document.getElementById('features-title');
    
    if (tabType === 'student') {
        studentFeatures.classList.add('active');
        companyFeatures.classList.remove('active');
        featuresTitle.textContent = 'Why Students Choose InterBridge?';
    } else {
        studentFeatures.classList.remove('active');
        companyFeatures.classList.add('active');
        featuresTitle.textContent = 'Why Companies Choose InterBridge?';
    }
}

// Handle login form submission
function handleLogin(e, userType) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    const companyId = formData.get('company_id'); // Only for company login
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    showLoading(true, userType);
    
    // Simulate login process (replace with actual API call)
    setTimeout(() => {
        showLoading(false, userType);
        
        // For demo purposes, accept any email/password combination
        if (email && password) {
            const message = userType === 'student' 
                ? 'Student login successful! Redirecting...' 
                : 'Company login successful! Redirecting to dashboard...';
            
            showMessage(message, 'success');
            
            // Store user session if remember me is checked
            if (remember) {
                localStorage.setItem('interbridge_remember', 'true');
                localStorage.setItem('interbridge_email', email);
                localStorage.setItem('interbridge_usertype', userType);
                if (companyId) {
                    localStorage.setItem('interbridge_company_id', companyId);
                }
            }
            
            // Redirect based on user type
            setTimeout(() => {
                if (userType === 'student') {
                    window.location.href = 'index.html';
                } else {
                    // For companies, redirect to a company dashboard (create this later)
                    window.location.href = 'index.html?view=company';
                }
            }, 2000);
        } else {
            showMessage('Invalid email or password', 'error');
        }
    }, 1500);
}

// Toggle password visibility
function togglePassword(toggleElement) {
    const targetId = toggleElement.dataset.target;
    const passwordInput = document.getElementById(targetId);
    
    if (!passwordInput) return;
    
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = toggleElement.querySelector('i');
    if (type === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

// Toggle mobile navigation
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Handle Google login
function handleGoogleLogin(e) {
    e.preventDefault();
    showMessage('Google login is not implemented yet', 'info');
}

// Handle LinkedIn login
function handleLinkedInLogin(e) {
    e.preventDefault();
    showMessage('LinkedIn login is not implemented yet', 'info');
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    showMessage('Forgot password feature is not implemented yet', 'info');
}

// Show loading state
function showLoading(show, userType = 'student') {
    const form = userType === 'student' ? studentLoginForm : companyLoginForm;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    } else {
        submitBtn.disabled = false;
        if (userType === 'student') {
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login as Student';
        } else {
            submitBtn.innerHTML = '<i class="fas fa-building"></i> Login as Company';
        }
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-${getMessageIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 5000);
}

// Get message icon based on type
function getMessageIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Get message color based on type
function getMessageColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Auto-fill email if remembered
document.addEventListener('DOMContentLoaded', function() {
    const rememberedEmail = localStorage.getItem('internbridge_email');
    const rememberMe = localStorage.getItem('internbridge_remember');
    
    if (rememberMe === 'true' && rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
});

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

// Handle form input animations
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key on login form
    if (e.key === 'Enter' && document.activeElement.closest('#login-form')) {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileNav();
    }
});
