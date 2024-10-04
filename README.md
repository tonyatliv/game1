# game1
## A simple browser-based python game framework 

(Demo at https://tonyatliv.github.io/game1/)

To test locally, you can run a simple web server via python
Open a command prompt in the source folder and run
python -m http.server

Then open a browser and go to http://localhost:3000

To deploy - copy the folder to a web server then access from a browser

engine.py contains functions that you can call - to draw 'sprites' (2d graphics), play sounds, or read from the keyboard

### To start coding

game.py contains the game structure
It creates an engine object to handle the connection to the browser.
This has functions to load files etc.

The main functions you need to edit are:
start_game - called once to do setup

update_game - called every frame (1/60s) to handle the game update_game
this would normally separate the logic and drawing

Objects, such as a 'ball', should have a 'draw' function which can update the position of the object on the screen

To create new types of object, add a .py file and import if from game.py. They must be included in the <py-config> section of index.html

