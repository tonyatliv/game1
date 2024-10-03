import engine

class Ball:
  
    # this is the code that gets run when you create a new Ball
    # it sets up the variables that are used by the Ball
    # into their initial state



    def __init__(self):

        self.size = 32
    # when you add a 'sprite' to the game, you can also pass a function
    # that gets called when the sprite is clicked
        self.sprite = engine.add_sprite("ball.png", self.size, self.size, self.do_click)
        self.xpos = 500
        self.ypos = 200
        self.xspeed = 0
        self.yspeed = 0
        self.g = 1


# this gets called when someone clicks on the sprite. see add_sprite above...
    def do_click(self, event):
        self.xspeed = -self.xspeed
        self.yspeed = -self.yspeed

# moves the ball
    def move(self):
        self.yspeed = self.yspeed + self.g  
        self.xpos = self.xpos + self.xspeed
        self.ypos = self.ypos + self.yspeed  



    def check_bounce(self):
        bounce = False

        if (self.xspeed > 0):
            if (self.xpos > engine.game_width - self.size/2):
                bounce = True
                self.xspeed = -self.xspeed
        
        if (self.xspeed < 0):
            if (self.xpos < self.size/2):
                bounce = True
                self.xspeed = -self.xspeed
        
        if (self.yspeed > 0):
            maxy =  engine.game_height - self.size/2
            if (self.ypos > maxy):
                bounce = True
                
                gap = self.ypos-  maxy
                time = gap / self.yspeed
               
                self.yspeed = -self.yspeed 
                self.yspeed = self.yspeed - self.g * time
                self.ypos = maxy
         

        if (self.yspeed < 0):
            if (self.ypos < self.size/2):
                bounce = True
                self.yspeed = -self.yspeed 

        # just tells the caller if we bounced or not
        # the caller can then do something about it
        # like increase the score and play a sound
        return bounce
    

    def draw(self):
        # we need to pass which sprite to draw, and where
        # other parameters we can change are angle, scale, shape, alpha, and tint        
        # scale can be a single number, or an object with x and y properties
        engine.draw_sprite(self.sprite, self.xpos, self.ypos, None, None, None, None)
        pass
    
    def get_position(self):
# this is just an empty Object, so we can add properties to it
        val = engine.NewObject()
        val.x = self.xpos
        val.y = self.ypos
        return val

    def set_position(self, x, y):
        self.xpos = x
        self.ypos = y
