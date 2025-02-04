// let i = 1;
// const interval = setInterval(() => {
// 	achievement1.textContent = `+${i}`;
// 	if (i >= 12) clearInterval(interval); // Stop the interval when done
// 	i++;
// }, 100); // Delay of 100ms

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import {
	getDatabase,
	ref,
	push,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyAHxZV-GwbXnGlX9oQecaNl6Xe0iOamJsI",
	authDomain: "portfolio-ea0dc.firebaseapp.com",
	databaseURL: "https://portfolio-ea0dc-default-rtdb.firebaseio.com",
	projectId: "portfolio-ea0dc",
	storageBucket: "portfolio-ea0dc.firebasestorage.app",
	messagingSenderId: "602484487580",
	appId: "1:602484487580:web:ef4dad872049ae7d444459",
	measurementId: "G-ECCN28GQVB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

let $form = document.querySelector("#form");
let errorMessages = document.querySelectorAll(".error-message");
console.log(errorMessages);
$form.addEventListener("submit", function (e) {
	e.preventDefault();
	verifyForm(new FormData($form));
	// const formDataRef = ref(database, "contacts");

	// push(formDataRef, {
	// 	name: name,
	// 	email: email,
	// 	subject: subject,
	// 	message: message,
	// })
	// 	.then(() => {
	// 		console.log("Data submitted");
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error submitting data: ", error);
	// 	});
});

function verifyForm(data) {
	let name = data.get("name").trim();
	let email = data.get("name").trim();
	let message = data.get("name").trim();

	let isValid = true;

	if (name === "") {
		errorMessages[0].classList.remove("hide");
		isValid = false;
	} else {
		errorMessages[0].classList.add("hide");
	}

	if (email === "") {
		errorMessages[1].classList.remove("hide");
		isValid = false;
	} else {
		errorMessages[1].classList.add("hide");
	}

	if (message === "") {
		errorMessages[3].classList.remove("hide");
		isValid = false;
	} else {
		errorMessages[3].classList.add("hide");
	}

	return isValid;
}
