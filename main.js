document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {threshold: 0.2}
    );

    document
        .querySelectorAll(".animated-component")
        .forEach((el) => observer.observe(el));
});

let form = document.querySelector("#form");

const validationMessages = {
    name: {
        valueMissing: 'Please enter your name.',
        tooShort: 'name must be at least 3 characters.',
    },
    email: {
        valueMissing: 'Please enter an email address.',
        typeMismatch: 'Please enter a valid email.',
    },
    message: {
        valueMissing: 'Please enter a message.',
        tooShort: 'message must be at least 10 characters.',
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(validateName())
    validateEmail();
    form.reset();
});

// function validateForm() {
//
//     let emailValue = email.value.trim();
//     let messageValue = message.value.trim();
//
//     return true;
// }

function validateName() {
    console.log("validateName()");
    let nameValue = document.getElementById("name").value.trim();
    let nameError = document.querySelector("#nameError");

    if (nameValue !== "" || nameValue.length <= 2) {
        nameError.innerText = "Please enter a valid name.";
        nameError.style.display = "block";
        return false;
    }

    nameError.style.display = "none";
    return true;
}

function validateEmail() {
    let email = document.getElementById("email");
    let emailError = document.querySelector("#emailError");
    if (!email.validity.valid) {
        emailError.style.display = "block";
        email.setCustomValidity("Invalid email format!");
        return false;
    } else {
        emailError.style.display = "none";
        email.setCustomValidity("");
        return true;
    }
}