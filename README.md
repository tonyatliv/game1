# game1
 A simple browser-based python game framework 

To run - copy to a web server and open index.html

To test locally, you can run a simple web server via python
Open a command prompt in the source folder and run
python -m http.server

Then open a browser and go to http://localhost:3000

When adding additional python files, they must be included in the <py-config> section of index.html
engine.py contains function that you can call - to draw 'sprites' (2d graphics), play sounds, or read from the keyboard

game.py contains the game structure
It needs to create an engine object to handle the connection to the browser
This has functions to load files etc.

The main functions you need are:
start_game - called once to do setup

update_game - called every frame (1/60s) to handle the game update_game
this would normally separate the logic and drawing

Objects, such as a 'ball', should have a 'draw' function which can update the position of the object on the screen

