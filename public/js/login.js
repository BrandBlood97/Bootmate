const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/students/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the search page
      document.location.replace('/search');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#firstName-signup').value.trim();
  const lastName = document.querySelector('#lastName-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const employmentOpportunities = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
  const collaboration = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

  if (firstName && lastName && email && password && employmentOpportunities && collaboration) {
    const response = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password, employmentOpportunities, collaboration }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/search');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
