var video = document.querySelector("video"),
    info = document.querySelector("span"),
    canvas = document.querySelector("canvas");

const REC_WIDTH = 50;
const REC_HEIGHT = 50;

canvas.style.width = '0';
canvas.style.height = '0';

var ctx;
var start_x = 0, start_y = 0, end_x = 20, end_y = 20;

function drawImage(x1,y1,x2,y2){

    canvas.style.width = video.style.width;
    canvas.style.height = video.style.height;

    ctx = canvas.getContext('2d');

    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();

    setTimeout(function(){
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.width = '0';
        canvas.style.height = '0';
    }, 500);
}

function mouseHandler(event) {

    var rect = this.getBoundingClientRect();  // absolute position of element
    var x = (Math.floor(event.clientX - rect.left));
    var y = (Math.floor(event.clientY - rect.top ));

    if (event.type === "mousedown"){
        start_x = x;
        start_y = y;
        info.innerHTML += "New click event" +"<br>";
        info.innerHTML += "Click start: x: " + x + " y: " + y +"<br>";
    } else if (event.type === "mouseup"){
        end_x = x;
        end_y = y;
        info.innerHTML += "Click end: x: " + x + " y: " + y +"<br>" +"<br>" +"<br>";
        drawImage(start_x,start_y,end_x,end_y);
    } else if (event.type === "dblclick") {
        event.preventDefault();
        info.innerHTML += "New click event" +"<br>";
        info.innerHTML += "Click start: x: " + (x - REC_WIDTH/2) + " y: " + (y - REC_HEIGHT/2) +"<br>";
        info.innerHTML += "Click end: x: " + (x + REC_WIDTH/2) + " y: " + (y + REC_HEIGHT/2) +"<br>" +"<br>" +"<br>";
        drawImage(x - REC_WIDTH/2, y - REC_HEIGHT/2, x + REC_WIDTH/2, y + REC_HEIGHT/2);
    }

}

video.addEventListener("dblclick", mouseHandler);

