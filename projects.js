const container = document.querySelector('.projects-body');
const loadMore = document.querySelector('.load-more button');
let projects = [];
let isShowAll = false;

(async () => {
    let data = await getProjectsData();
    loadMore.innerText = `more`;
    projects = data.map((item) => getProjectUi(item));
    projects.slice(0, 3).forEach((item) => container.appendChild(item));
})();

function getProjectUi({name, desc, link, src}) {
    const div = document.createElement("div");
    div.classList.add("project");

    div.innerHTML = `<a href="${link}" target="_blank">
                        <div class="image">
                            <img src="${src}" alt="${name}" />
                        </div>
                        <div class="info"><h1>${name}</h1><p>${desc}</p></div>
                        <div class="arrow"><img alt="arrow" loading="lazy" src="assets/images/arrow.svg"/></div>
                    </a>`;

    return div;
}

async function getProjectsData() {
    return await (await fetch("assets/other/projects.json")).json();
}

loadMore.addEventListener("click", function () {
    if (isShowAll) hide();
    else showAll();
});

function showAll() {
    projects.slice(3).forEach((item) => container.appendChild(item));
    loadMore.innerText = `less`;
    isShowAll = true;
}

function hide() {
    projects.slice(3).forEach((item) => container.removeChild(item));
    loadMore.innerText = `+${projects.length - 3} more`;
    isShowAll = false;
}

console.log("Project.js");