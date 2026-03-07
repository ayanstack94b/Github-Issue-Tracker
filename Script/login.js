document.getElementById("login-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const usernameValue = username.value;
  const passwordValue = password.value;
  //   console.log("clicked", usernameValue, passwordValue);

  if (usernameValue === "admin" && passwordValue === "admin123") {
    window.location.href = "dashboard.html";
  } else if (usernameValue !== "admin" || passwordValue !== "admin123") {
    alert("Please use Username:admin & Pass:admin123 to login");
  }
});
