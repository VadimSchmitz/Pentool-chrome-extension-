//undo and redo functionality https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx
//https://jsfiddle.net/WebWanderer/d9j1gufv/1/

    let points = [];
    let creatingPath = true;

    let background = new Image();
    background.src = "http://i.imgur.com/yf6d9SX.jpg";
    
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
        canvas.style.opacity = "50%";
    
        body.appendChild(canvas);
        body.style.overflow = "hidden";

        //set backtround image of canvas
        background.onload = function(){
            ctx.drawImage(background,0,0);   
        }
        canvasId = document.getElementById("canvasId");
    }
    
    canvas.addEventListener('mousedown', function (e) {
        if (creatingPath) {
            points.push(getMousePos(canvas, e));
            drawCircle(ctx, e.clientX, e.clientY, 2);
            
            //drawline between two last points
            if (points.length > 1) {
                drawLine(ctx, points[points.length - 1].x, points[points.length - 1].y, points[points.length - 2].x, points[points.length - 2].y);
            }
    
            //if the first and the last point are 20 pixels apart, close the path 
            if (points.length > 1 && Math.abs(points[0].x - points[points.length - 1].x) < 20 && Math.abs(points[0].y - points[points.length - 1].y) < 20) {
                drawLine(ctx, points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
                creatingPath = false;

                body.style.overflow = "scroll";

                clipSelection(ctx);
            }

            //todo
            //if closed save to clipboard and show download png button
        }
    })


    //creates a 2dpath that is used for clip
    function clipSelection(ctx){
        let path = new Path2D();
        path.moveTo(points[0].x, points[0].y);

        console.log(points.length);

        for (let i = 1; i < points.length; i++) {
            path.lineTo(points[i].x, points[i].y);
            console.log('map');
        }
    
        path.closePath();
        ctx.clip(path);

        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // function saveToClipboard() {
    //     chrome.clipboard.setImageData(
    //         imageData,
    //         "png"
    //     )
    // }

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
    
    // // create button with even listener
    // const el = document.createElement('button');
    
    // el.addEventListener('click', function handleClick(event) {
    //     console.log('element clicked ????????????', event);
    // });
    
    // el.textContent = 'Hello world';
    
    // el.style.backgroundColor = 'salmon';
    // el.style.width = '150px';
    // el.style.height = '150px';
    // el.style.position = 'absolute';
    // el.style.top = "5%";
    // el.style.left = "50%";;
    