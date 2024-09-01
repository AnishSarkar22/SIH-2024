// EMAIL VALIDATION ON A PRODUCTION BUILD SHOULD ALWAYS BE PERFORMED ON SERVER-SIDE AS WELL AS CLIENT-SIDE (IN CASE BROWSER HAS TURNED JAVASCRIPT OFF). FOR THIS PROJECT, JAVASCRIPT IS LEVERAGED FOR LOCAL VALIDATION ONLY.

const emailAddressInput = document.getElementById("email-address-input"),
  emailAddressSubmitBtn = document.getElementById("submit-email-address"),
  responseMessage = document.getElementById("response-message"),
  regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// FUNCTION WHICH CHECKS IF AN EMAIL IS ENTERED

function checkInputPresent(email) {
  return emailAddressInput.value
    ? convertToLowerCase(email)
    : ((responseMessage.innerHTML = "Please enter an email address"),
      emailAddressInput.classList.add("input-failed"));
}

// FUNCTION WHICH CONVERTS ALL THE CHARACTERS IN THE EMAIL ADDRESS --> LOWER CASE

function convertToLowerCase() {
  convertedEmail = String(emailAddressInput.value).toLowerCase();
  validateEmail();
}

// FUNCTION WHICH VALIDATES THE EMAIL ENTERED

function validateEmail() {
  return regex.test(emailAddressInput.value) == true
    ? ((responseMessage.innerHTML = "Thank you for signing up!"),
      (emailAddressInput.value = ""),
      emailAddressInput.classList.add("input-success"),
      emailAddressInput.classList.remove("input-failed"))
    : ((responseMessage.innerHTML = "Please insert a valid email"),
      emailAddressInput.classList.add("input-failed"));
}

// TRIGGER WHICH CALLS THE FIRST FUNCTION ON 'SUBMIT' BUTTON CLICK

emailAddressSubmitBtn.addEventListener("click", () => {
  email = emailAddressInput;
  checkInputPresent(email);
  return responseMessage;
});

// TRIGGER WHICH CALLS THE FIRST FUNCTION ON 'ENTER' KEY IN INPUT

emailAddressInput.onkeydown = function (e) {
  if (e.keyCode == 13) {
    email = emailAddressInput;
    checkInputPresent(email);
    return responseMessage;
  }
};
