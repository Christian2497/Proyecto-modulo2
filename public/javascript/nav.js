const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () =>{
        //Toggle Nav
        nav.classList.toggle('nav-active');
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`;   
            }
        });
        //burger animation
        burger.classList.toggle('toggle');
    });
  }
  navSlide();

function cambiar(){
    var pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}

function cambiar2(){
    var pdrs = document.getElementById('file-upload-events').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}


function ocultar(){
    document.getElementById('mostrarOcultar').style.display="none";
}
function mostrar(){
    document.getElementById('mostrarOcultar').style.display="block";
}
function ocultarNew(){
    document.getElementById('mostrarOcultarNew').style.display="none";
}
function mostrarNew(){
    document.getElementById('mostrarOcultarNew').style.display="block";
}