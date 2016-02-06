var canvas,
    context;
//getBoundingClientRect
//The returned value is a DOMRect object, which contains read-only left, top, right and
//bottom properties describing the border-box in pixels. top and left are relative to the top-left of the viewport.

// rect is a DOMRect object with six properties: left, top, right, bottom, width, height
//var rect = obj.getBoundingClientRect();

//define mouse coordinates
function getCanvasCoordinates(event){
  var x = event.clientX - canvas.getBoundingClientRect().left;
  var y = event.clientY - canvas.getBoundingClientRect().top;

  return {x: x, y:y};
}

//define dragstart, drag and dragStop
function dragStart(event) {
  console.log("Drag Start");
  console.log(getCanvasCoordinates(event));
}
function drag(event) {
  console.log('mouse move is working');
  console.log(getCanvasCoordinates(event));
}
function dragStop(event) {
  console.log('dragStop');
  console.log(getCanvasCoordinates(event));
}

//function invoked when document is fully loaded
function init(){
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  context.strokeStyle = 'rebeccapurple';
  context.lineWidth = 6;
  context.lineCap = 'square';
  //mouseup,down, drag
  canvas.addEventListener('mousedown', dragStart, false);
  canvas.addEventListener('mousemove', drag, false);
  canvas.addEventListener('mouseup', dragStop, false);
}

window.addEventListener('load', init, false);
