const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#firstName-signup").value.trim();
  const last_name = document.querySelector("#lastName-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const graduation_month = document
    .querySelector("#graduationMonth-signup")
    .value.trim();
  const looking_for_work =
    document.querySelector("#employment-signup").value === "true";
  const seeking_collab =
    document.querySelector("#collaboration-signup").value === "true";

  if (first_name && last_name && email && password) {
    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        graduation_month,
        looking_for_work,
        seeking_collab,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/search");
      return;
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
