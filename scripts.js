
// Script for scroll animations

const hiddenElement = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }else{
            entry.target.classList.remove("visible");
        }
    });
});

hiddenElement.forEach((element) => {
    observer.observe(element);
});

// const insetElement = document.querySelectorAll(".contact-card");
// const observer2 = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("inset-box");
//         }else{
//             entry.target.classList.remove("inset-box");
//         }
//     });
// });

// insetElement.forEach((element) => {
//     observer2.observe(element);
// });

//Script for rotating cards

let constrain = 175;
let mouseOverContainer = document.querySelectorAll(".swervo-container");
let ex1Layer = document.querySelectorAll(".swervo");
let isRotated = false;

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

 function transformElement(el, xyEl) {
    isRotated = true;
    el.style.transform  = transforms.apply(null, xyEl);

}

function resetRotation() {
    for(let i = 0; i < ex1Layer.length; i++){ //Really inefficient, but it works
        ex1Layer[i].style.transform = "none"; // Reset the rotation
    }
    isRotated = false;
  }

for(let i = 0; i < mouseOverContainer.length; i++){
    mouseOverContainer[i].onmousemove = function(e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([ex1Layer[i]]);
    

    window.requestAnimationFrame(function(){
        if (isRotated){
            // console.log(ex1Layer[element]);
            transformElement(ex1Layer[i], position);
        }else{
            resetRotation(ex1Layer[i]);
        }
        
    });
    };
};

function addRotation(){
    isRotated = true;
}

ex1Layer.forEach((element) =>{
    console.log(element);
    element.addEventListener('mouseenter', addRotation);
    element.addEventListener('mouseleave', resetRotation);
});