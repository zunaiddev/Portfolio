document.addEventListener("DOMContentLoaded", function () {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
				}
			});
		},
		{ threshold: 0.2 }
	); // 50% of the element must be visible

	document
		.querySelectorAll(".animated-component")
		.forEach((el) => observer.observe(el));
});

let $form = document.querySelector("#form");

$form.addEventListener("submit", function (e) {
	e.preventDefault();
	window.alert(
		"I apologize, but this functionality is currently not working. Please contact me via email."
	);
	$form.reset();
});
