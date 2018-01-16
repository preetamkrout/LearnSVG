const domPath = document.querySelector("svg path");
const svgContainer = document.querySelector("svg");
let startX = 0,
    startY = 0,
    isDrawing = false;

function getPointerLocationForEvent (evt) {
    let loc = {};
    if (evt.targetTouches) {
        loc.offsetX = evt.targetTouches[0].clientX;
        loc.offsetY = evt.targetTouches[0].clientY;
    } else {
        loc.offsetX = evt.clientX;
        loc.offsetY = evt.clientY;
    }
    return loc;
}

function onPenDown (evt) {
    evt.preventDefault();
    console.log(evt.type, startX, startY);
    //To remove multiple touch support
    if(evt.touches && evt.touches.length > 1) {
        return;
    }

    let loc = getPointerLocationForEvent(evt);
    [startX, startY, isDrawing] = [loc.offsetX, loc.offsetY, true];
    let dPath = `${domPath.getAttribute("d")}
    M${startX}, ${startY}`;
    domPath.setAttribute("d", dPath);

    if (window.PointerEvent) {
        evt.target.setPointerCapture(evt.pointerId);
    } else {
        //Add event listener to other mouse events
        svgContainer.addEventListener("mousemove", onPenMove, true);
        svgContainer.addEventListener("mouseup", onPenUp, true);
        svgContainer.addEventListener("mouseleave", onPenUp, true);
    }
}

function onPenMove (evt) {
    evt.preventDefault();
    console.log(evt.type, startX, startY);
    if (!isDrawing) return;
    let loc = getPointerLocationForEvent(evt);
    let pathD = `${domPath.getAttribute("d")}
    L${loc.offsetX}, ${loc.offsetY}`;
    domPath.setAttribute("d", pathD);

}

function onPenUp (evt) {
    evt.preventDefault();
    if (evt.type === "mouseleave" && evt.target.nodeName !== "svg") return;
    console.log(evt.type, evt.target.nodeName, startX, startY);
    isDrawing = false;
    if (window.PointerEvent) {
        evt.target.releasePointerCapture(evt.pointerId);
    } else {
        svgContainer.removeEventListener("mousemove", onPenMove, true);
        svgContainer.removeEventListener("mouseup", onPenUp, true);
        svgContainer.removeEventListener("mouseleave", onPenUp, true);
    }
}

function main () {  
    svgContainer.setAttribute("width", window.innerWidth);
    svgContainer.setAttribute("height", window.innerHeight);
    if (window.PointerEvent) {
        //Add pointer events
        svgContainer.addEventListener("pointerdown", onPenDown, true);
        svgContainer.addEventListener("pointermove", onPenMove, true);
        svgContainer.addEventListener("pointerup", onPenUp, true);
        svgContainer.addEventListener("pointercancel", onPenUp, true);
    } else {
        //Touch events
        svgContainer.addEventListener("touchstart", onPenDown, true);
        svgContainer.addEventListener("touchmove", onPenMove, true);
        svgContainer.addEventListener("touchend", onPenUp, true);
        svgContainer.addEventListener("touchcancel", onPenUp, true);
        //Mouse start event
        svgContainer.addEventListener("mousedown", onPenDown, true);
    }
}

main();