document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    var messageDiv = document.getElementById('message');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(signupForm);
        var request = new XMLHttpRequest();
        request.open('POST', signupForm.action, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var resp = JSON.parse(request.responseText);
                if(resp.result === "success") {
                    messageDiv.innerHTML = "Thank you for signing up!";
                    messageDiv.style.display = 'block'; // Show the message
                    signupForm.reset(); // Reset form here
                } else {
                    messageDiv.innerHTML = "Submission failed. Please try again.";
                    messageDiv.style.display = 'block';
                }
            } else {
                messageDiv.innerHTML = "Error submitting form. Please try again.";
                messageDiv.style.display = 'block';
            }
        };

        request.onerror = function() {
            messageDiv.innerHTML = "Error submitting form. Please check your connection and try again.";
            messageDiv.style.display = 'block';
        };

        request.send(formData);
    });
});
