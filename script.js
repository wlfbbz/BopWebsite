document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    var submitButton = signupForm.querySelector('button');
    var messageDiv = document.getElementById('message');

signupForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const token = await grecaptcha.execute('6LeEMCorAAAAAGfwwqRxJlMPjIbLMDVysSYP1oi0', {action: 'submit'});
        const formData = new FormData(signupForm);
        formData.append('recaptcha_token', token);  // Add token to form data
        const response = await fetch(signupForm.action, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.result === "success") {
            signupForm.style.display = 'none';
            messageDiv.innerHTML = "Thank you for signing up! We will notify you when it's out.";
            messageDiv.style.display = 'block';
        } else {
            messageDiv.innerHTML = "Submission failed. Please try again.";
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        messageDiv.innerHTML = "Error submitting form. Please check your connection and try again.";
        messageDiv.style.display = 'block';
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Sign up to be first to know';
    }
});
});
