function submitForm(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const url = `/api/students/${firstName}`;

  // Make a request to the server with the firstName value
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".search-results").innerHTML = `
            <img class="h-100 col-3" src="/images/background-UCF.png" />
                <h2>${data.first_name} ${data.last_name}</h2>
                <p>Email: ${data.email}</p>
                <p>Looking for Work: <input type="checkbox" ${
                  data.looking_for_work ? "checked" : ""
                }></p>
                <p>Looking for Collaboration: <input type="checkbox" ${
                  data.seeking_collab ? "checked" : ""
                }></p>
                <p>Graduation Month: ${data.graduation_month}</p>
            `;

      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
}

document.querySelector(".search-form").addEventListener("submit", submitForm);
