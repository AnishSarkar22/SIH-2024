// Cache DOM elements to avoid repeated queries
const container = document.getElementById("container");
const roleInput = document.getElementById('role');
const loginMentorToggle = document.getElementById('loginMentorToggle');
const loginMenteeToggle = document.getElementById('loginMenteeToggle');
const socialContainer = document.getElementById('socialContainer');
const signUpMentorToggle = document.getElementById("signUpMentorToggle");
const signUpMenteeToggle = document.getElementById("signUpMenteeToggle");

let selectedRole = "mentee"; // Initially, mentee is selected

// Set default role to 'mentee' and add event listeners on window load
window.onload = function() {
  setRole('mentee');
  addEventListeners();
};

function addEventListeners() {
  document.getElementById('loginButton').addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  document.getElementById('signUpButton').addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });

  loginMentorToggle.addEventListener('click', () => {
    socialContainer.style.display = 'none';
    setRole('mentor');
  });

  loginMenteeToggle.addEventListener('click', () => {
    socialContainer.style.display = 'block';
    setRole('mentee');
  });

  signUpMentorToggle.addEventListener("click", () => {
    setRole("mentor");
  });

  signUpMenteeToggle.addEventListener("click", () => {
    setRole("mentee");
  });
}

function setRole(role) {
  selectedRole = role;
  roleInput.value = role;
  updateButtonClasses(role);
}

function updateButtonClasses(role) {
  const isActiveMentor = role === "mentor";
  const isActiveMentee = role === "mentee";

  loginMentorToggle.classList.toggle('active', isActiveMentor);
  loginMenteeToggle.classList.toggle('active', isActiveMentee);
  signUpMentorToggle.classList.toggle('active', isActiveMentor);
  signUpMenteeToggle.classList.toggle('inactive', !isActiveMentor);
  signUpMenteeToggle.classList.toggle('active', isActiveMentee);
  signUpMentorToggle.classList.toggle('inactive', !isActiveMentee);
}
document.getElementById('signUpButton').addEventListener('click', () => {
  const container = document.getElementById('container');
  container.classList.add('right-panel-active');
});
document.getElementById('loginButton').addEventListener('click', () => {
  const container = document.getElementById('container');
  container.classList.remove('right-panel-active');
});

window.onload = function() {
  const flashPopup = document.getElementById('flash-message-popup');
  if (flashPopup) {
    flashPopup.style.display = 'block'; // Show the popup if there are messages
  }
};

window.onload = function() {
  const flashPopup = document.getElementById('flash-message-popup');
  if (flashPopup) {
    flashPopup.style.display = 'block'; // Show the popup if there are messages
  }
};


document.addEventListener('DOMContentLoaded', function() {
  const flashMessageBox = document.getElementById('flash-message-box');
  if (flashMessageBox) {
    setTimeout(function() {
      flashMessageBox.style.display = 'none';
    }, 5000); // 5000 milliseconds = 5 seconds
  }
});