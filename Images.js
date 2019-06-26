var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

var mineImage = function(xScale, yScale){

    context.scale(xScale, yScale);
    // Draw backround
    context.beginPath();
    context.fillStyle = "rgb(100, 155, 200)";
    context.rect(0, 0, 100, 100);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    for(var i = 0; i < 10; i++){
        let xRand = ((Math.random() -0.5) * 20);
        let yRand = ((Math.random() -0.5) * 20);
        
        let x = (35 + xRand) * Math.cos(2 * Math.PI * i / 10);
        let y = (35 + yRand) * Math.sin(2 * Math.PI * i / 10);

        context.beginPath();
        context.moveTo(50, 50);
        context.lineTo(50 + x, 50 + y);
        context.strokeStyle = "blue";
        context.stroke();

        context.beginPath();
        context.arc(50 + x, 50 + y, 5, 0, Math.PI*2, false);
        context.fillStyle = "red";
        context.fill();
    }

    context.beginPath();
    context.arc(50, 50, 7, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();

    let imageData = context.getImageData(0, 0, 100*xScale, 100*yScale);

    context.resetTransform();
    context.clearRect(0,0, 100, 100);
    return imageData;
}

var FlareImage = function(xScale, yScale){

    context.scale(xScale, yScale);
    // Draw backround
    context.beginPath();
    context.fillStyle = "rgb(100, 155, 200)";
    context.rect(0, 0, 100, 100);
    context.fill();
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.moveTo(10, 25);
    context.quadraticCurveTo(60, 10, 75 ,75);
    context.lineWidth = 7;
    context.strokeStyle = "blue";
    context.stroke();

    context.beginPath();
    context.arc(20, 20, 15, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();

    let imageData = context.getImageData(0, 0, 100*xScale, 100*yScale);

    context.resetTransform();
    context.clearRect(0,0, 100, 100);
    return imageData;
}

var BasicFireworkImage = function(xScale, yScale){

    context.scale(xScale, yScale);
    // Draw backround
    context.beginPath();
    context.fillStyle = "rgb(100, 155, 200)";
    context.rect(0, 0, 100, 100);
    context.fill();
    context.strokeStyle = "black";
    context.stroke();

    // Draw Fuse
    context.beginPath();
    context.moveTo(72.5, 72.5);
    context.bezierCurveTo(80, 70, 80, 90, 95, 95);
    context.strokeStyle = "black";
    context.stroke();

    // Draw Body
    context.beginPath();
    context.moveTo(30, 15);
    context.lineTo(80, 65);
    context.lineTo(65, 80);
    context.lineTo(15, 30);
    context.fillStyle = "rgb(200, 0, 0)";
    context.fill();

    // Draw head
    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(50, 10);
    context.lineTo(10, 50);
    context.fillStyle = "red";
    context.fill();

    let imageData = context.getImageData(0, 0, 100 * xScale, 100 * yScale);

    context.resetTransform();
    context.clearRect(0,0, 100, 100);
    return imageData;
}

var PadlockImage = function(){

    context.beginPath();
    context.fillStyle = "rgb(155, 155, 155)";
    context.strokeStyle = "white";
    context.rect(0, 0, 50, 50);
    context.fill();
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.moveTo(17, 18);
    context.bezierCurveTo(15, 2, 35, 2, 33, 18);
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(13, 21, 24, 24);

    let imageData = context.getImageData(0, 0, 50, 50);

    context.resetTransform();
    context.clearRect(0,0, 50, 50);
    
    return imageData;
}

export const Images = {
    basicFirework: BasicFireworkImage(1, 1),
    miniBasicFirework: BasicFireworkImage(0.25, 0.25),
    flare: FlareImage(1, 1),
    miniFlare: FlareImage(0.25, 0.25),
    mine: mineImage(1, 1),
    miniMine: mineImage(0.25, 0.25),
    padlock: PadlockImage(),
}