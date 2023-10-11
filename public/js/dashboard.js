// Fetch the username using an AJAX request
function fetchUsername() {
  fetch('/user/getUsername')
    .then(response => response.json())
    .then(data => {
      const welcomeUsernameElement = document.getElementById('welcomeUsername');
      welcomeUsernameElement.textContent = data.username;
    })
    .catch(error => console.error('Error fetching username:', error));
}

document.addEventListener('DOMContentLoaded', fetchUsername);
