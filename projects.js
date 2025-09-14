const projects = document.querySelector('.projects-body');

fetch("assets/projects.json").then((response) => response.json()).then((data) => {
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