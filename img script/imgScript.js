/*
    1. Image is direct child of its own div element
    2. images script will hit have class "js-image"
*/
var font = document.createElement("link");
font.type = "text/css";
font.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css";
font.rel = "stylesheet"
document.getElementsByTagName("head")[0].appendChild(font);
var styles = document.getElementsByTagName("style")[0] ? document.getElementsByTagName("style")[0] : document.createElement("style");
styles.innerHTML += ".js-buttons{z-index:100; position: absolute;border: none;font-size: 45px;background-color: transparent;}.left-js-button{top: 50%;left: 10px;transform: translateY(-50%);}.right-js-button{top: 50%;right: 10px;transform: translateY(-50%);}";

const container = document.querySelectorAll(".container");
container.forEach(element =>{
    element.querySelectorAll("img").forEach(e => e.style.position = "absolute");
    var images = element.parentNode;
    element.style.position = "relative";
    var leftButton = document.createElement('button');
    leftButton.classList.add("js-buttons");
    leftButton.classList.add("left-js-button")
    leftButton.setAttribute('onclick', "moveToLeft(this)");
    leftButton.innerHTML = "<i class=\"fas fa-arrow-left\"></i>";
    var rightButton = document.createElement('button');
    rightButton.classList.add("js-buttons");
    rightButton.classList.add("right-js-button");
    rightButton.setAttribute('onclick', "moveToRight(this)");
    rightButton.innerHTML = "<i class=\"fas fa-arrow-right\"></i>"
    element.appendChild(leftButton);
    element.appendChild(rightButton);
});
let lCounter = 0;
function moveToLeft(e){
    //e.parentNode.style.left = ""
    var images = e.parentNode.querySelectorAll("img");
    var i = images.length;
    lCounter = lCounter == i-1 ? lCounter = 0 : lCounter+1;
    images.forEach( image =>{
        if(image == images[lCounter]){
            image.style.zIndex = i;
        } else {
            image.style.zIndex = image.style.zIndex - 1;
        }
    });
    
}
function moveToRight(e){
    //e.parentNode.style.left = `${window.innerWidth - e.parentNode.firstElementChild.width}px`;
    var images = e.parentNode.querySelectorAll("img");
    var i = images.length;
    lCounter = lCounter == 0 ? lCounter = i-1 : lCounter-1;
    images.forEach( image =>{
        if(image == images[lCounter]){
            image.style.zIndex = i;
        } else {
            image.style.zIndex = image.style.zIndex - 1;
        }
    });
    
}