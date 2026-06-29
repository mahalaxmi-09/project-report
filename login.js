// Initialize elements when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initRotatingCircle();
    initPasswordToggle();
    initLoginForm();
});

// --- ROTATING ANIMATION BARS ---
function initRotatingCircle() {
    const circleContainer = document.getElementById("circleContainer");
    if (!circleContainer) return;

    const numBars = 50;
    let activeBars = 0;

    // Create and position bars
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.transform = `rotate(${(360 / numBars) * i}deg) translateY(-170px)`;
        circleContainer.appendChild(bar);
    }

    // Set animation loop
    const intervalId = setInterval(() => {
        // Query elements within the container to verify they exist
        const bars = circleContainer.querySelectorAll(".bar");
        if (bars.length > 0) {
            bars[activeBars % numBars].classList.add("active");

            if (activeBars > 8) {
                bars[(activeBars - 8) % numBars].classList.remove("active");
            }
            activeBars++;
        } else {
            // Safety: clear interval if container was removed/changed
            clearInterval(intervalId);
        }
    }, 100);
}

// --- PASSWORD SHOW/HIDE TOGGLE ---
function initPasswordToggle() {
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (togglePassword && password && eyeIcon) {
        togglePassword.addEventListener("click", () => {
            const isPassword = password.type === "password";
            password.type = isPassword ? "text" : "password";
            
            // Toggle eye icon class
            eyeIcon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
        });
    }
}

// --- LOGIN FORM VALIDATION & PROCESS ---
function initLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // Feedback and error label elements
    const formFeedback = document.getElementById("formFeedback");
    const emailValidationMsg = document.getElementById("email-validation");
    const passwordValidationMsg = document.getElementById("password-validation");
    const submitBtn = document.getElementById("login-submit-btn");
    const forgotPasswordLink = document.getElementById("forgot-password-link");

    if (!loginForm || !emailInput || !passwordInput || !formFeedback) return;

    // Optional: Safe listener for forgot password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showFeedback("Password reset instructions are managed by your corporate IT SSO panel. Please contact IT support.", "error");
        });
    }

    // Email input realtime validation clearing
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('invalid-field');
        if (emailValidationMsg) emailValidationMsg.innerText = '';
    });

    // Password input realtime validation clearing
    passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('invalid-field');
        if (passwordValidationMsg) passwordValidationMsg.innerText = '';
    });

    // Handle Form submission (Naturally supports Enter key inside input fields)
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop default browser refresh

        // Clear previous state
        hideFeedback();
        let isValid = true;

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;

        // 1. Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            emailInput.classList.add('invalid-field');
            if (emailValidationMsg) emailValidationMsg.innerText = 'Corporate email is required.';
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('invalid-field');
            if (emailValidationMsg) emailValidationMsg.innerText = 'Please enter a valid email format (e.g. user@brandsparkx.com).';
            isValid = false;
        }

        // 2. Password Length Validation
        if (!passwordValue) {
            passwordInput.classList.add('invalid-field');
            if (passwordValidationMsg) passwordValidationMsg.innerText = 'Access password is required.';
            isValid = false;
        } else if (passwordValue.length < 6) {
            passwordInput.classList.add('invalid-field');
            if (passwordValidationMsg) passwordValidationMsg.innerText = 'Password must be at least 6 characters.';
            isValid = false;
        }

        if (!isValid) return;

        // 3. Simulated Corporate Auth Verification
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "VERIFYING...";
        }

        setTimeout(() => {
            // For PMO workspace access, accept any valid email format and 6+ character password
            sessionStorage.setItem('brandsparkx_logged_in', 'true');
            sessionStorage.setItem('brandsparkx_user_email', emailValue);
            
            showFeedback("✅ Successfully logged in! Access granted.", "success");
            
            // Redirect to dashboard using replace() after 800ms
            setTimeout(() => {
                window.location.replace('index.html');
            }, 800);
        }, 1000);
    });

    // Helper functions for feedback banner
    function showFeedback(message, type = 'error') {
        formFeedback.innerText = message;
        formFeedback.className = `form-feedback ${type}-state`;
        formFeedback.style.display = 'block';
    }

    function hideFeedback() {
        formFeedback.innerText = '';
        formFeedback.style.display = 'none';
    }
}
