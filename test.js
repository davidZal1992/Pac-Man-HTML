$(document).ready(function(){
    //move up
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    base_image = new Image();
    base_image.src = './assets/img/Pacman-PNG-Download-Image.png';
    base_image.onload = function(){
    context.drawImage(base_image, 25, 25,50,50);
    }
});