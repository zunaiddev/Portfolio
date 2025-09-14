const projects = document.querySelector('.projects-body');

fetch("assets/projects.json").then((response) => response.json()).then((data) => {
    projects.appendChild(getProjectUi(data[0]));
    console.log(data);
});


function getProjectUi({name, desc, link, src}) {
    desc = "rhgffgufv"
    const div = document.createElement("div");
    div.classList.add("project");

    div.innerHTML = `<a href="${link}" target="_blank">
                        <div class="image">
                            <img alt="${name}" loading="lazy" src="${src}"/>
                        </div>
                        <div class="info"><h1>${name}</h1><p>${desc}</p></div>
                        <div class="arrow"><img alt="arrow" loading="lazy" src="assets/images/arrow.svg"/></div>
                    </a>`;

    return div;
}

let text = document.querySelector("#temp");

document.querySelector("#button").addEventListener("click", (e) => {
    console.log("removing....");
    copyToClipboard(removeComments(text.value));
    console.log("removed");
});

function removeComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, "");
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied to clipboard:");
        })
        .catch(err => {
            console.error("Failed to copy:", err);
        });
}

// Example usage:
