const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const signUpMentorToggle = document.getElementById("signUpMentorToggle");
const signUpMenteeToggle = document.getElementById("signUpMenteeToggle");
let selectedRole = ""; // Initially, no role is selected

signUpMentorToggle.addEventListener("click", () => {
  selectedRole = "mentor";
  updateButtonClasses();
});

signUpMenteeToggle.addEventListener("click", () => {
  selectedRole = "mentee";
  updateButtonClasses();
});

function updateButtonClasses() {
  signUpMentorToggle.classList.remove("active", "inactive");
  signUpMenteeToggle.classList.remove("active", "inactive");

  if (selectedRole === "mentor") {
    signUpMentorToggle.classList.add("active");
    signUpMenteeToggle.classList.add("inactive");
  } else if (selectedRole === "mentee") {
    signUpMentorToggle.classList.add("inactive");
    signUpMenteeToggle.classList.add("active");
  }
}
