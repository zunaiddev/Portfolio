
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
    
    setYear();
});

const form = document.querySelector("#form");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const subject = form.querySelector("#subject");
const message = form.querySelector("#message");

form.addEventListener("submit", async e => {
    e.preventDefault();
    const inputFields = [name, email, subject, message];

    inputFields.forEach(input => {
        input.addEventListener('input', () => {
            if (input === name) validateName();
            if (input === email) validateEmail();
            if (input === subject) validateSubject();
            if (input === message) validateMessage();
        });

        input.addEventListener('click', () => removeLoader('submit'));
    });

    if (!validateForm()) {
        return;
    }

    setLoader();
    let response = await makeApiRequest(getData());
    if (response === null) {
        removeLoader("Submit");
        alert("I apologize an error occurred at server side. please try again or mail me.");
        return;
    }

    removeLoader("Thanks");
    form.reset();
});

function validateForm() {
    let isNameValid = validateName();
    let isEmailValid = validateEmail();
    let isMessageValid = validateMessage();
    let isSubjectValid = validateSubject();

    return isNameValid && isEmailValid && isMessageValid && isSubjectValid;
}

function setError(input, errorMessage) {
    let error = form.querySelector(`#${input.name}Error`);
    error.innerText = errorMessage;
    input.style.border = "1px solid red";
    error.classList.remove("error");
}

function removeError(input) {
    let error = form.querySelector(`#${input.name}Error`);
    error.innerText = '';
    input.style.border = "none";

    error.classList.add("error");
}

function validateName() {
    if (name.value.trim() === '' || name.value.length < 3) {
        setError(name, "Please enter a valid name");
        return false;
    }

    removeError(name);
    return true;
}

function validateEmail() {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '' || !regex.test(email.value.trim())) {
        setError(email, "Please enter a valid email");
        return false;
    }

    removeError(email);
    return true;
}

function validateMessage() {
    let messageValue = message.value.trim();
    if (messageValue === '') {
        setError(message, "Please enter a valid message");
        return false;
    } else if (messageValue.length < 15 || messageValue.length > 200) {
        setError(message, "message length must be between 15 and 200 characters.");
        return false;
    }

    removeError(message);
    return true;
}

function validateSubject() {
    let subjectValue = subject.value.trim();
    if (subjectValue === '') {
        setError(subject, "Please select a subject");
        return false;
    }

    removeError(subject);
    return true;
}

function setLoader() {
    const button = document.getElementById("button");
    button.innerText = '';
    button.innerHTML = '<span class="loader"></span>';
}

function removeLoader(text) {
    const button = document.getElementById("button");
    button.innerHTML = '';
    button.innerText = text;
}


async function makeApiRequest(data) {
    const KEY = 'FJwx8RmHlVnt7c9XGrBKNYUQqwqZbBfA';
    let URL = 'https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit';
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': KEY,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

function getData() {
    return {
        name: capitalizeWords(name.value),
        email: email.value.trim().toLowerCase(),
        subject: subject.value,
        message: capitalize(message.value),
    };
}

function capitalize(str) {
    str = str.trim().toLowerCase();
    let finalStr = '';
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            finalStr += str[i].toUpperCase();
            continue;
        }

        if (str[i - 1] === ' ' && str[i] === ' ') {
            continue;
        }

        finalStr += str[i];
    }
    return finalStr;
}

function capitalizeWords(str) {
    str = str.trim();
    let finalStr = '';
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            finalStr += str[i].toUpperCase();
            continue;
        }

        if (str[i - 1] === ' ' && str[i] === ' ') {
            continue;
        }

        if (str[i - 1] === ' ') {
            finalStr += str[i].toUpperCase();
            continue;
        }

        finalStr += str[i].toLowerCase();
    }

    return finalStr;
}

function setYear() {
    document.querySelector(".year").innerText = new Date().getFullYear();
}