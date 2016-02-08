Exercise 1: Basic OOD & Solution Design

###Go to http://sean-drawingapp.bitballoon.com/ to visit the app
----------------------------------------------------

#Simple Web Application which simulates a vector-based drawing package.
The application should be developed using Javascript/html/css


Your application should support the following 5 drawing primitives
(we'll call them widgets):


1. rectangle

2. square

3. ellipse

4. circle

5. textbox or label


The application should allow a user to add a new widget to the
drawing board, stating the location and size/shape of the widget.

The drawing should be done using mouse by pressing mouse down and dragging
and releasing the mouse will lock the position and size.

The size/shape depends on the widget, as follows:

- rectangle – width and height

- square – width

- ellipse –horizontal and vertical diameter or radius

- circle – diameter or radius

- textbox – width and height or auto size

The size of the object should be "locked" after user releases the mouse
which means the object has been drawn on the drawing board. During the drag
you should update the size constantly.


##NOTE:

- if you implement rotation according the mouse position it will be
considered as a plus.

- for the textbox you only need to configure the text to display
(which will be rendered horizontally within the bounding rectangle). Don’t worry about font face /size / alignment, etc.

- try to write as object oriented code as possible

- implement a callback that will be called after each new element
has been created.

You should be able to select the current drawing tool from some buttons or
checkboxes. So user should be able to select the "mode" of the next element to be drawn.
