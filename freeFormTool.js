//undo and redo functionality https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx

let points = [];

let canvas = document.createElement('canvas');
let ctx = canvas.getContext("2d");
let body = document.getElementsByTagName("body")[0];


if (!document.getElementById("canvasId")) {

    canvas.id = "canvasId";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.zIndex = 99999;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";;
    canvas.style.border = "3px solid black";
    canvas.style.opacity = "100";

    body.appendChild(canvas);

    canvasId = document.getElementById("canvasId");
}

canvas.addEventListener('mousedown', function (e) {
    //when clicked add to array
    points.push(getMousePos(canvas, e));

    //draw circle 
    drawCircle(ctx, e.clientX, e.clientY, 2);

    //draw line between last two points
    if (points.length > 1) {
        drawLine(ctx, points[points.length - 1].x, points[points.length - 1].y, points[points.length - 2].x, points[points.length - 2].y);
    }



    console.log(points);
})


function drawCircle(ctx, x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = "black"
    ctx.fill()
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

 
// create button with even listener
const el = document.createElement('button');

el.addEventListener('click', function handleClick(event) {
  console.log('element clicked 🎉🎉🎉', event);
});

el.textContent = 'Hello world';

el.style.backgroundColor = 'salmon';
el.style.width = '150px';
el.style.height = '150px';
el.style.position = 'absolute';
el.style.top = "5%";
el.style.left = "50%";;

body.appendChild(el);
