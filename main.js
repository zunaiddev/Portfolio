document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
        entries => {
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
        .forEach(el => observer.observe(el));
    
    setYear();
});

const body = document.querySelector("body");
const form = document.querySelector("#form");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const subject = form.querySelector("#subject");
const message = form.querySelector("#message");
const wordCount = form.querySelector(".word-count");
const button = document.getElementById("button");

message.addEventListener("input", function (e) {
    wordCount.innerText = e.target.value.length + "/150";
});

form.addEventListener("submit", async e => {
    e.preventDefault();

    name.addEventListener("input", validateName);
    email.addEventListener("input", validateEmail);
    subject.addEventListener("input", validateSubject);
    message.addEventListener("input", validateMessage);

    if (!validateForm()) {
        return;
    }

    if (localStorage.getItem("notAllowed") === "true") {
        showToast("You have exceed maximum number of Limit try again later", "warning");
        console.log("Not Allowed!");
        return;
    }

    let requests = JSON.parse(localStorage.getItem("requests"));

    if (requests && requests.count >= 10 && requests.allowedAt > Date.now()) {
        localStorage.setItem("notAllowed", "true");
        setTimeout(function () {
            localStorage.removeItem("requests");
            localStorage.setItem("notAllowed", "false");

            showToast("You can send your query now.");
        }, 300000);
        return;
    }

    setLoader();

    let response = await submitData(getData());

    if (response === null) {
        removeLoader("Submit");
        showToast("I apologize an error occurred at server side. please try again or mail me.", "error", 5000);
        return;
    }

    localStorage.setItem("requests", JSON.stringify({
        count: requests ? requests.count + 1 : 1,
        allowedAt: new Date().setMinutes(new Date().getMinutes() + 5),
    }));

    removeLoader("Thanks");
    button.disabled = true;
    setTimeout(() => {
        removeLoader("Submit");
        button.disabled = false;
    }, 2000);
    form.reset();

    name.removeEventListener("input", validateName);
    email.removeEventListener("input", validateEmail);
    subject.removeEventListener("input", validateSubject);
    message.removeEventListener("input", validateMessage);
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
    let value = name.value.trim();

    if (value === '' || value < 3 || !value.match(/^[a-zA-Z\s'-]+$/)) {
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
    button.innerText = '';
    button.innerHTML = '<div class="loader"></div>';
    button.disabled = true;
}

function removeLoader(text) {
    button.innerHTML = '';
    button.innerText = text;
    button.disabled = false;
}

async function submitData(data) {
    const KEY = 'ab4lhkcVeevV896r9ixCQeaf2SmMuRgFA';
    const URL = 'https://intact-roanna-api-v9-6a640f42.koyeb.app/api/public/submit';

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

function showToast(text = "This is a toast", icon = "info", duration = 3000) {
    let toaster = document.createElement("div");
    let toast = document.createElement("div");

    toaster.setAttribute("class", "toaster");
    toast.setAttribute("class", "toast");

    toast.innerHTML = `<img src="/assets/images/${icon}Icon.svg" alt="Toast icon"/><span>${text}</span>`;

    toaster.appendChild(toast);
    body.appendChild(toaster);

    setTimeout(() => toast.style.transform = "translateY(0%)", 100);

    setTimeout(async function () {
        toast.style.transform = "translateY(-130%)";
        await new Promise(resolve => setTimeout(resolve, 900));
        body.removeChild(toaster);
    }, duration);
}