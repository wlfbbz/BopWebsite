document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const submitButton = signupForm.querySelector('button');
    const messageDiv = document.getElementById('message');
    
    // Add honeypot field
    const honeypotInput = document.createElement('input');
    honeypotInput.type = 'text';
    honeypotInput.name = 'website'; // Bots often fill fields named 'website'
    honeypotInput.style.display = 'none';
    signupForm.appendChild(honeypotInput);

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Check honeypot
        if (honeypotInput.value) {
            console.log('Bot detected');
            return;
        }

        // Check submission timestamp
        const now = Date.now();
        const lastSubmission = localStorage.getItem('lastSubmission');
        if (lastSubmission && now - parseInt(lastSubmission) < 30000) { // 30 seconds
            messageDiv.innerHTML = "Please wait before submitting again.";
            messageDiv.style.display = 'block';
            return;
        }

        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            // Get reCAPTCHA token
            const token = await grecaptcha.execute('6LdM9iYrAAAAAM-10_Nq1ho9xvaYKZd_fsCAeqBB', {action: 'submit'});
            
            const formData = new FormData(signupForm);
            formData.append('recaptcha_token', token);
            formData.append('timestamp', now.toString());

            const response = await fetch(signupForm.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.result === "success") {
                localStorage.setItem('lastSubmission', now.toString());
                signupForm.style.display = 'none';
                messageDiv.innerHTML = "Thank you for signing up! We will notify you when it's out. Happy New Year ✨";
            } else {
                messageDiv.innerHTML = "Submission failed. Please try again.";
            }
        } catch (error) {
            messageDiv.innerHTML = "Error submitting form. Please check your connection and try again.";
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Sign up for early access';
            messageDiv.style.display = 'block';
        }
    });
});