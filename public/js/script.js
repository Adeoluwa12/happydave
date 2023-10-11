const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the form data to the server for email processing
    sendEmailToServer({ name, email, message });
});

function sendEmailToServer(formData) {
    // Simulating the email sending process
    // In a real-world scenario, you would use a server-side technology (e.g., Node.js with Nodemailer) to send the email.

    // Display a loading message
    alert('Sending your message. Please wait...');

    // Simulate a delay of 2 seconds to simulate the email sending process
    setTimeout(() => {
        alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
        contactForm.reset();
    }, 2000);
}
