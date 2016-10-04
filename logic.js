var canvas;
var context;
var dragging = false;
var dragStartLocation;
var snapshot;
window.addEventListener('load', init, false);
//Begin - Orientation Functions
function calculateAngle(start, current) {
    var angle = 360 - Math.atan2(current.y - start.y, current.x - start.x) * 180 / Math.PI;
    return angle;
}

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    return {
        x: x,
        y: y
    };
}

function takeSnapShot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapShot() {
    context.putImageData(snapshot, 0, 0);
}
//Draw Functions
function draw(position) {

    var fillBox = document.getElementById("fillBox");
    var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    var polygonSides = document.getElementById('polygonSides').value;
    var polygonAngle = calculateAngle(dragStartLocation, position);
    var lineCap = document.querySelector('input[type="radio"][name="lineCap"]:checked').value;
    var writeCanvas = document.getElementById('textInput').value;
    var xor = document.getElementById('xor');
    context.lineCap = lineCap;

    switch (shape) {
      case "circle":
            iwannadrawa.circle(position);
            break;
        case "square":
            iwannadrawa.square(position);
            break;
        case "line":
            iwannadrawa.line(position);
            break;
        case "ellipse":
            iwannadrawa.ellipse(position);
            break;
        case "rectangle":
            iwannadrawa.rectangle(position);
            break;
        case "polygon":
            iwannadrawa.polygon(position, polygonSides, polygonAngle * (Math.PI / 180));
            break;
    }

    if (xor.checked) {
        context.globalCompositeOperation = "xor";
    } else {
        context.globalCompositeOperation = "source-over";
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
  }

var iwannadrawa = {
  line: function (position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
  },
  circle: function (position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI);
  },
  ellipse: function (position) {
    var w = position.x - dragStartLocation.x;
    var h = position.y - dragStartLocation.y;
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    var cw = (dragStartLocation.x > position.x) ? true : false;
    console.log(cw);
    context.ellipse(dragStartLocation.x, dragStartLocation.y, Math.abs(w), Math.abs(h), 0, 2 * Math.PI, false);
  },
  rectangle: function (position) {
    console.log(position.x, dragStartLocation.x);
    var w = position.x - dragStartLocation.x;
    var h = position.y - dragStartLocation.y;
    context.beginPath();
    context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
  },
  polygon: function (position, sides, angle) {
    var coordinates = [];
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    for (var index = 0; index < sides; index++) {
        coordinates.push({
            x: dragStartLocation.x + radius * Math.cos(angle),
            y: dragStartLocation.y - radius * Math.sin(angle)
        })
        angle += (2 * Math.PI) / sides;
    }
    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (var index = 0; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.closePath();
  }
};

//Drag Functions
function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapShot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapShot();
        position = getCanvasCoordinates(event);
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapShot();
    var position = getCanvasCoordinates(event);
    draw(position);
}
//change width, fill, stroke and backgroundColor
function changeLineWidth() {
    context.lineWidth = this.value;
    //event.stopPropagation() prevents the event from bubbling up the DOM tree, parent handlers are not notified of the event.
    event.stopPropagation();
}

function changeFillStyle() {
    context.fillStyle = this.value;
    event.stopPropagation();
}

function changeStrokeStyle() {
    context.strokeStyle = this.value;
    event.stopPropagation();
}

function changeBackgroundColor() {
    context.save();
    context.fillStyle = document.getElementById('backgroundColor').value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function init() {
    // Create Canvas
    canvas = document.getElementById('canvas');
    // Define elements
    var lineWidth = document.getElementById('lineWidth');
    var fillColor = document.getElementById('fillColor');
    var strokeColor = document.getElementById('strokeColor');
    var canvasColor = document.getElementById('backgroundColor');
    var clearCanvas = document.getElementById('clearCanvas');
    var textInput = document.getElementById('textInput');
    //Define Canvas Context
    context = canvas.getContext('2d');
    context.strokeStyle = 'rebeccapurple';
    context.lineWidth = lineWidth.value;
    context.fillStyle = fillColor.value;
    //Event Listeners
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener('input', changeLineWidth, false);
    fillColor.addEventListener('input', changeFillStyle, false);
    strokeColor.addEventListener('input', changeStrokeStyle, false);
    canvasColor.addEventListener('input', changeBackgroundColor, false);
    clearCanvas.addEventListener('click', eraseCanvas, false);
    textInput.addEventListener('input', writeCanvas, false);
}

function writeCanvas() {
    context.font = '55px Impact';
    context.fillText(textInput.value, 25, 175);
    console.log(textInput.value);
}

function eraseCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
