var canvas,
    context,
    dragging = false, //this will be dragging if mouse move is followed by mouse down
    dragStartLocation,
    snapshot;

//getBoundingClientRect
//The returned value is a DOMRect object, which contains read-only left, top, right and
//bottom properties describing the border-box in pixels. top and left are relative to the top-left of the viewport.

// rect is a DOMRect object with six properties: left, top, right, bottom, width, height
//var rect = obj.getBoundingClientRect();

//define mouse coordinates
function getCanvasCoordinates(event){
  var x = event.clientX - canvas.getBoundingClientRect().left;
  var y = event.clientY - canvas.getBoundingClientRect().top;

  //return object where x is x and y is y
  return {x: x, y:y};
}

//this avoids dragging the image
//The getImageData() method returns an ImageData object that copies the pixel data for the specified rectangle on a canvas.
 function takeSnapShot () {
  snapshot = context.getImageData(0,0, canvas.width, canvas.height);
}
//These must be added to dragStart()
 function restoreSnapShot () {
  context.putImageData(snapshot,0,0);
}

function drawLine(position){
  context.beginPath();
  context.moveTo(dragStartLocation.x, dragStartLocation.y);//this will be the first point and during mouse up the line will be drawn
  context.lineTo(position.x, position.y); //current position of x and y during mouseMove event
  context.stroke(); // The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods. So Cool!
}

//The arc() method creates an arc/curve (used to create circles, or parts of circles). To create a circles set start angle to 0 and end angle to 2*Math.PI
function drawCircle (position){ //takes position during mouse up
  var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x),2) + Math.pow((dragStartLocation.y - position.y), 2));
  context.beginPath();
  context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2*Math.PI);
  // context.fill();
}


function drawEllipse (position){

  var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x),2) + Math.pow((dragStartLocation.y - position.y), 2));
  context.beginPath();
  //Used the .ellipse method instead of arc to give an extra radius, radius x and radius

  context.ellipse(dragStartLocation.x, dragStartLocation.y, radius, 75, 45, 2 * Math.PI, false);
}


function drawRect (position) {
  context.beginPath();
  context.rect(dragStartLocation.x, dragStartLocation.y, position.x, position.y)
}



function drawPolygon (position, sides, angle){
  var coordinates = [],
  radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x),2) + Math.pow((dragStartLocation.y - position.y), 2)),
  index = 0;

  for(index = 0 ; index < sides; index++){
    coordinates.push({x:dragStartLocation.x + radius*Math.cos(angle) , y:dragStartLocation.y - radius* Math.sin(angle)})
    angle += ( 2 * Math.PI) / sides;
  };

  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);

  for(index = 0; index < sides; index++){
    context.lineTo(coordinates[index].x, coordinates[index].y);
  }

  context.closePath();
  // context.fill();

}

function draw(position){
  var fillBox = document.getElementById("fillBox"),
  shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
  polygonSides = document.getElementById('polygonSides').value,
  polygonAngle = document.getElementById('polygonAngle').value;

  if (shape === "circle") {
    drawCircle(position);
  }
  if (shape === "square") {
    drawPolygon(position, 4, Math.PI / 4);
  }
  if (shape === "line") {
    drawLine(position);
  }
  if (shape === "ellipse") {
    drawEllipse(position);
  }
  if (shape === "rect") {
    drawRect(position);
  }
  if (shape === "polygon") {
    drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
  };
  if (fillBox.checked){
    context.fill();
  } else {
    context.stroke();
  }
}

//define dragstart, drag and dragStop
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
    //generic
    draw(position)
  }
}

//Drag Stop
function dragStop(event) {
  dragging = false; //dragging stops here
  restoreSnapShot();
  var position = getCanvasCoordinates(event);
  //generic
  draw(position)
}

//Line Width Here
function changeLineWidth(){
  context.lineWidth = this.value;
  //**important**
  //event.stopPropagation() prevents the vent from bubblim up the DOM tree, preventing any parent handlers from being notified of the event.
  event.stopPropagation();
}
//Fill Color
function changeFillStyle(){
  context.fillStyle = this.value;
  event.stopPropagation();
}
//Stroke Color
function changeStrokeStyle(){
  context.strokeStyle = this.value;
  event.stopPropagation();
}

//function invoked when document is fully loaded
function init(){
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  var lineWidth = document.getElementById('lineWidth'),
  fillColor = document.getElementById('fillColor'),
  strokeColor = document.getElementById('strokeColor');
  // context.strokeStyle = 'rebeccapurple';

  // var imgElement = document.getElementById("logo");
  // context.fillStyle = context.createPattern(imgElement, 'repeat');
  context.lineWidth = lineWidth.value;
  context.lineCap = 'square';
  context.fillStyle = fillColor.value;
  //shapes made transparent by overlapping shapes
  context.globalCompositeOperation = 'xor';


  //event listeners below
  canvas.addEventListener('mousedown', dragStart, false);
  canvas.addEventListener('mousemove', drag, false);
  canvas.addEventListener('mouseup', dragStop, false);
  lineWidth.addEventListener('input', changeLineWidth, false);
  fillColor.addEventListener('input', changeFillStyle, false);
  strokeColor.addEventListener('input', changeStrokeStyle, false);
}

window.addEventListener('load', init, false);
