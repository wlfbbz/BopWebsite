document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    var submitButton = signupForm.querySelector('button');
    var messageDiv = document.getElementById('message');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Basic email validation
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.innerHTML = "Please enter a valid email address";
            messageDiv.style.display = 'block';
            return;
        }

        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            // Get reCAPTCHA token
            const token = await grecaptcha.execute('6LeEMCorAAAAAGfwwqRxJlMPjIbLMDVysSYP1oi0', {action: 'submit'});
            
            // Update hidden input with token
            document.getElementById('recaptcha_token').value = token;
            
            const formData = new FormData(signupForm);
            const response = await fetch(signupForm.action, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.result === "success") {
                signupForm.style.display = 'none';
                messageDiv.innerHTML = "Thank you for signing up! We will notify you when it's out. :)";
                messageDiv.style.display = 'block';
            } else {
                messageDiv.innerHTML = data.message || "Submission failed. Please try again.";
                messageDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Form submission error:', error);
            messageDiv.innerHTML = "Error submitting form. Please check your connection and try again.";
            messageDiv.style.display = 'block';
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Sign up to be first to know';
        }
    });
});