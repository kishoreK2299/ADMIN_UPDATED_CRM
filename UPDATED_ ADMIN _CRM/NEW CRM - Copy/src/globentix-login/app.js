// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');
const successModal = document.getElementById('successModal');
const signinBtn = document.querySelector('.signin-btn');

// Password visibility toggle functionality
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    if (type === 'text') {
        togglePasswordBtn.classList.remove('fa-eye');
        togglePasswordBtn.classList.add('fa-eye-slash');
    } else {
        togglePasswordBtn.classList.remove('fa-eye-slash');
        togglePasswordBtn.classList.add('fa-eye');
    }
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6; // Minimum 6 characters
}

function showFieldError(input, message) {
    // Remove existing error styling
    input.classList.remove('error');
    
    // Add error styling
    input.classList.add('error');
    input.style.borderColor = '#FF5252';
    
    // Create or update error message
    let errorMsg = input.parentNode.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#FF5252';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginTop = '4px';
        input.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Remove error on focus
    input.addEventListener('focus', function() {
        input.style.borderColor = '';
        input.classList.remove('error');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
    });
}

// Form submission handling
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberCheckbox.checked;
    
    let hasErrors = false;
    
    // Validate email
    if (!email) {
        showFieldError(emailInput, 'Email address is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // Validate password
    if (!password) {
        showFieldError(passwordInput, 'Password is required');
        hasErrors = true;
    } else if (!validatePassword(password)) {
        showFieldError(passwordInput, 'Password must be at least 6 characters long');
        hasErrors = true;
    }
    
    // If validation passes
    if (!hasErrors) {
        // Add loading state to button
        const originalText = signinBtn.innerHTML;
        signinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        signinBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            signinBtn.innerHTML = originalText;
            signinBtn.disabled = false;
            
            // Handle remember me functionality
            if (rememberMe) {
                // In a real application, you would set secure cookies or tokens
                console.log('Remember me option selected');
            }
            
            // Show success modal
            showSuccessModal();
            
            // In a real application, you would:
            // 1. Send credentials to your authentication endpoint
            // 2. Handle the response (success/error)
            // 3. Redirect to dashboard or show appropriate message
            
            console.log('Login attempt:', {
                email: email,
                rememberMe: rememberMe,
                timestamp: new Date().toISOString()
            });
        }, 1500); // Simulate network delay
    }
});

// Success modal functions
function showSuccessModal() {
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Reset form
    loginForm.reset();
    clearAllErrors();
    
    // In a real application, redirect to dashboard
    console.log('Redirecting to dashboard...');
}

// Close modal when clicking outside of it
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && successModal.style.display === 'flex') {
        closeModal();
    }
    
    // Submit form with Enter key (when not in textarea)
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        if (emailInput === document.activeElement || passwordInput === document.activeElement) {
            loginForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Enhanced input interactions
function addInputFocusEffects() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        const container = input.parentElement;
        const icon = container.querySelector('.input-icon');
        
        input.addEventListener('focus', function() {
            container.classList.add('focused');
            if (icon) {
                icon.style.color = '#1E88E5';
            }
        });
        
        input.addEventListener('blur', function() {
            container.classList.remove('focused');
            if (icon) {
                icon.style.color = '#999';
            }
        });
    });
}

// Forgot password handling
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // In a real application, you would redirect to password reset page
    alert('Password reset functionality would be implemented here.\n\nThis would typically redirect to a password reset page or open a modal to collect the user\'s email address.');
    
    console.log('Forgot password clicked');
});

// Remember me checkbox enhancement
rememberCheckbox.addEventListener('change', function() {
    const label = document.querySelector('.checkbox-label');
    if (this.checked) {
        label.style.color = '#1E88E5';
        console.log('Remember me enabled');
    } else {
        label.style.color = '#666';
        console.log('Remember me disabled');
    }
});

// Smooth scroll for any anchor links (if added later)
function smoothScrollToAnchor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add subtle animations on load
function addLoadAnimations() {
    const loginContainer = document.querySelector('.login-container');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    
    // Initial state
    loginContainer.style.opacity = '0';
    loginContainer.style.transform = 'translateY(20px)';
    
    // Animate in
    setTimeout(() => {
        loginContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loginContainer.style.opacity = '1';
        loginContainer.style.transform = 'translateY(0)';
    }, 100);
    
    // Stagger panel animations
    setTimeout(() => {
        leftPanel.style.transform = 'translateX(0)';
        rightPanel.style.transform = 'translateX(0)';
    }, 300);
}

// Form auto-save in memory (for demo purposes)
let formData = {
    email: '',
    password: '',
    rememberMe: false
};

function saveFormData() {
    formData.email = emailInput.value;
    formData.password = passwordInput.value;
    formData.rememberMe = rememberCheckbox.checked;
}

function loadFormData() {
    if (formData.email) emailInput.value = formData.email;
    if (formData.password) passwordInput.value = formData.password;
    rememberCheckbox.checked = formData.rememberMe;
}

// Save form data on input change
emailInput.addEventListener('input', saveFormData);
passwordInput.addEventListener('input', saveFormData);
rememberCheckbox.addEventListener('change', saveFormData);

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Globentix Technologies Login Page Initialized');
    
    // Initialize all functionality
    addInputFocusEffects();
    smoothScrollToAnchor();
    addLoadAnimations();
    loadFormData();
    
    // Focus on email input after page loads
    setTimeout(() => {
        emailInput.focus();
    }, 500);
    
    // Add some demo data for testing (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode detected');
        console.log('Demo credentials: user@globentix.com / password123');
    }
});

// Export functions for potential testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        showSuccessModal,
        closeModal
    };
}