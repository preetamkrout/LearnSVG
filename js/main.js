const domPath = document.querySelector("svg path");
const svgContainer = document.querySelector("svg");
let startX = 0,
    startY = 0,
    isDrawing = false;

svgContainer.setAttribute("width", window.innerWidth);
svgContainer.setAttribute("height", window.innerHeight);
function drawSign (e) {
    if (!isDrawing) {
        return;
    }
    console.log(e.type);
    let pathD = `${domPath.getAttribute("d")}  L${e.offsetX} ${e.offsetY}`;
    domPath.setAttribute("d", pathD);
}

function penSet (e) {
    [startX, startY, isDrawing] = [e.offsetX, e.offsetY, true];
    let dPath = `${domPath.getAttribute("d")} M${startX} ${startY}`;
    domPath.setAttribute("d", dPath);
}
svgContainer.addEventListener("mousedown", penSet);
svgContainer.addEventListener("touchstart", penSet);
svgContainer.addEventListener("mouseup", (e) => {
    isDrawing = false;
    console.log(e.type);
});
svgContainer.addEventListener("mouseleave", (e) => {
    isDrawing = false;
    console.log(e.type);
});
svgContainer.addEventListener("touchend", (e) => {
    isDrawing = false;
    console.log(e.type);
});
svgContainer.addEventListener("mousemove", drawSign);