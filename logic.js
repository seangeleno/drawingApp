var canvas,
    context;


//define dragstart, drag and dragStop
function dragStart() {

}
function drag() {

}
function dragStop() {

}

//function invoked when document is fully loaded
function init(){
  cavas = docElementById('canvas');
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
