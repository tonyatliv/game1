from ball import Ball

import engine

# This is the object that holds all the variables that are used in the game
game = engine.NewObject()
 
#This is run once when the program starts, before the files have loaded
def load_game_files():

    # These are the image files that are loaded at the start - if you want to use a new image 
    # then you also have to add it to this list
    engine.load_image_files(["night.png", "ball.png" ])
    engine.load_sound_files(["click.mp3"])

def play_sound(name):
    engine.play_sound(name)

    
#This is run once at the start of the game, after the files have loaded
def start_game():
    engine.add_background("night.png")
    game.score = 0
# creates a new Ball object - see Ball.py for what it does
    game.ball1 = Ball()
    

#This is run every frame of the game (about 60 times per second)
#It is used to update the game logic and draw the screen

def update_game():
    update_logic()
    update_draw()

def update_logic():
    read_input()
    game.ball1.move()

    if (game.ball1.check_bounce()):
        game.score = game.score + 1
        play_sound("click.mp3")
 
        
 
def update_draw():
   
    game.ball1.draw()
    engine.write_score(game.score)


    
#call this to see what the user is doing with the mouse and keyboard
def read_input():
    mouse = engine.get_mouse_position()
    x = mouse.x
    y = mouse.y

    clicks = engine.get_mouse_clicks()

    keypresses = engine.get_keypresses()
    for key in keypresses:
        if key == "ArrowUp":
            position = game.ball1.get_position()
            position.y = position.y - 3
            game.ball1.set_position(position.x ,position.y)
 
        