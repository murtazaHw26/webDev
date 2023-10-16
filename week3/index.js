let counter = 0;
let images = [];
const time = 3000;
images = [
    "images/1.png",
    "images/2.png",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg",
    "images/6.jpeg",
    "images/7.jpeg",
    "images/8.jpeg"
];

function changeSource (){
    let slide = document.getElementsByName('slide')[0];
    slide.src = images[counter];
    counter = (counter + 1) % images.length;
};
setInterval(changeSource, time);
window.onload = function() {
    changeSource();
  };
  
