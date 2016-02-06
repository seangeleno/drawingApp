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

//define dragstart, drag and dragStop
function dragStart(event) {
  // console.log("Drag Start");
  // console.log(getCanvasCoordinates(event));

  dragging = true;
  dragStartLocation = getCanvasCoordinates(event);
  takeSnapShot();

}
function drag(event) {
//   console.log('mouse move is working');
//   console.log(getCanvasCoordinates(event));

  var position;
  if (dragging === true) {
    position = getCanvasCoordinates(event);
    //pass position into drawLine
    drawLine(position);
  }

 }
function dragStop(event) {
  // console.log('dragStop');
  // console.log(getCanvasCoordinates(event));

  dragging = false; //dragging stops here
  restoreSnapShot();
  var position = getCanvasCoordinates(event);
  drawLine(position);


}

//function invoked when document is fully loaded
function init(){
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  context.strokeStyle = 'rebeccapurple';
  context.lineWidth = 6;
  context.lineCap = 'square';

  //mouseup,down, drag - will be used in functions above
  canvas.addEventListener('mousedown', dragStart, false);
  canvas.addEventListener('mousemove', drag, false);
  canvas.addEventListener('mouseup', dragStop, false);
}

window.addEventListener('load', init, false);
