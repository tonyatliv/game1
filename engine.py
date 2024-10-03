import js
from pyodide.ffi import create_proxy


game_height = 600
game_width = 1000

# The 'engine' is the code that runs the game
# it is written in javascript
# this file is a python wrapper around the javascript
# it makes it easier to use the javascript from python

class NewObject:
    # makes an empty object
    # useful because it can have properties added to it
    pass

# these are the things that are part of the game 'engine' 
# this is how we interact with the javascript that handles the drawing and input

def load_image_files(filenames):   
    js.load_image_files(filenames)
def load_sound_files(filenames):   
    js.load_sound_files(filenames)

def play_sound(name):
    js.play_sound(name)

def add_sprite(filename, width, height, do_click):
    click_proxy = create_proxy(do_click) 
    return js.add_sprite(filename, width, height, click_proxy)
    
def draw_sprite(sprite, x, y, angle=None, scale=None, alpha=None,  tint=None):
    js.draw_sprite(sprite, x, y, angle, scale, alpha, tint)

def add_background(filename):
    js.add_background(filename)

def get_mouse_position():
    return js.get_mouse_position()

def get_mouse_clicks():
    # returns a list of the mouse buttons that are held
    # you can also respond to clicking on a sprite by setting the do_click function when you add the sprite
    return js.get_mouse_clicks()

def get_keypresses():
    return js.get_keypresses()

def write_score(score):
    js.write_score(score)

def start_game():
    js.setup_window_delayed(game_width,game_height)

# this makes pyscript wait for the page to be ready before starting the game
write_score(0)
start_game()