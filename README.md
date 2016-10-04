# Canvas Vector Based Drawing Package

Simple Web Application which simulates a vector-based drawing package.
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


## NOTE:

- if you implement rotation according the mouse position it will be
considered as a plus.

- for the textbox you only need to configure the text to display
(which will be rendered horizontally within the bounding rectangle). Don’t worry about font face /size / alignment, etc.

- try to write as object oriented code as possible

- implement a callback that will be called after each new element
has been created.

You should be able to select the current drawing tool from some buttons or
checkboxes. So user should be able to select the "mode" of the next element to be drawn.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

Internet Browser
Open index.html

```
open index.html
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* Javascript (ECMAScript 5)
* CSS3
* html5
* Atom

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Sean Esteva** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Edvard Karvinen
* Kiosked
