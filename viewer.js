let current = 1;
let total = 1;
let story = "";

const image = document.getElementById("page");
const counter = document.getElementById("counter");

async function init() {

    const response = await fetch("stories/stories.json");
    const stories = await response.json();

    const params = new URLSearchParams(window.location.search);
    story = params.get("story");

    if (!story || !stories[story]) {
        story = Object.keys(stories)[0];
    }

    total = stories[story].pages;

    document.title = stories[story].title;

    loadPage();
}

function loadPage() {

    const number = String(current).padStart(3, "0");

    image.src = `stories/${story}/${number}.jpg`;

    counter.textContent = `${current} / ${total}`;

}

function next() {

    if (current < total) {
        current++;
        loadPage();
    }

}

function previous() {

    if (current > 1) {
        current--;
        loadPage();
    }

}

function first() {

    current = 1;
    loadPage();

}

function last() {

    current = total;
    loadPage();

}

document.getElementById("left").onclick = previous;
document.getElementById("right").onclick = next;
document.getElementById("first").onclick = first;
document.getElementById("last").onclick = last;

image.onclick = next;

document.addEventListener("keydown", function(e){

    switch(e.key){

        case "ArrowLeft":
            previous();
            break;

        case "ArrowRight":
            next();
            break;

        case "Home":
            first();
            break;

        case "End":
            last();
            break;

    }

});

init();