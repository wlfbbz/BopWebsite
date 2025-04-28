document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const submitButton = signupForm.querySelector('button');
    const messageDiv = document.getElementById('message');
    let isSubmitting = false;

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        if (isSubmitting) return;
        isSubmitting = true;

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            const formData = new FormData(signupForm);
            const response = await fetch(signupForm.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.result === "success") {
                signupForm.style.display = 'none';
                messageDiv.innerHTML = "Thank you for signing up! We'll notify you when it's ready. ✨";
                messageDiv.style.display = 'block';
            } else {
                messageDiv.innerHTML = data.message || "Submission failed. Please try again.";
                messageDiv.style.display = 'block';
                grecaptcha.reset();
            }
        } catch (error) {
            messageDiv.innerHTML = "Error submitting form. Please check your connection and try again.";
            messageDiv.style.display = 'block';
            grecaptcha.reset();
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Sign up for early access';
            isSubmitting = false;
        }
    });
});