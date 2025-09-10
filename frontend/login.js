// DOM elements
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('password-toggle');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Password toggle
    passwordToggle.addEventListener('click', togglePassword);
    
    // Mobile navigation
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Social login buttons
    document.querySelector('.btn-google').addEventListener('click', handleGoogleLogin);
    document.querySelector('.btn-linkedin').addEventListener('click', handleLinkedInLogin);
    
    // Forgot password link
    document.querySelector('.forgot-password').addEventListener('click', handleForgotPassword);
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
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
    showLoading(true);
    
    // Simulate login process (replace with actual API call)
    setTimeout(() => {
        showLoading(false);
        
        // For demo purposes, accept any email/password combination
        if (email && password) {
            showMessage('Login successful! Redirecting...', 'success');
            
            // Store user session if remember me is checked
            if (remember) {
                localStorage.setItem('internbridge_remember', 'true');
                localStorage.setItem('internbridge_email', email);
            }
            
            // Redirect to main page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage('Invalid email or password', 'error');
        }
    }, 1500);
}

// Toggle password visibility
function togglePassword() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = passwordToggle.querySelector('i');
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
function showLoading(show) {
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
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
