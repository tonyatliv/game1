 
//some variables that are used by the game
var game_width = 1000
var game_height = 580
var app
var sprite_container
var mouse_position = { x: 0, y: 0 }
var mouse_clicks = new Set()

var textures = {}
var sounds = {}

//the rest are functions that are used by the game
var use_image_files =[]
function load_image_files(files) {
    
    use_image_files =[]
    for (var file of files) 
    {
        use_image_files.push(file)
    }
    
}
// do sound files in the same way 
var use_sound_files =[]
function load_sound_files(files) {
    
 
    for (var file of files) 
    {
        use_sound_files.push(file)
    }
    
}

async function play_sound(sound) {
    
    var audio = sounds[sound]
    if (!audio.paused) 
	{
        // If the audio is still playing, let it finish and make a new one
        let duplicateAudio = new Audio(audio.src) 
        duplicateAudio.play()
        sounds[sound] = duplicateAudio
    } 
	else 
	{
        audio.play()
	}
   
}

function update_mouse_button(event) {
    for (i=0; i < 8; i++)
        {
            if (event.buttons & (1 << i))
            {
                mouse_clicks.add(i)
            }
            else
            {
                mouse_clicks.delete(i)
            }
        }
    }

async function setup_window(w, h) {

    game_width = w
    game_height = h
    load_game_files()

    // This creates the game window (using the Pixi library)
    app = new PIXI.Application({
        width: game_width,
        height: game_height,

    })

    await load_textures(use_image_files)
    await load_sounds(use_sound_files)

    // This starts the game
    start_game()
    
    // This updates the game (60 times a second)
    const ticker = PIXI.Ticker.shared
    ticker.maxFPS = 70 
    ticker.autoStart = true
    ticker.add(update_game)
    
    // This adds the game window to the html file so that it appears
    const main = document.getElementById('main_section')
    main.appendChild(app.view)

    //This is for the mouse input
    app.view.addEventListener('pointermove', (event) => {
        mouse_position.x = event.offsetX
        mouse_position.y = event.offsetY
        update_mouse_button(event)
    })
    //listen for mouse clicks
    
    app.view.addEventListener('pointerdown', (event) => {
       
        update_mouse_button(event)
  

    })
    app.view.addEventListener('pointerup', (event) => {
        update_mouse_button(event)
        
    })
    //This is for the keyboard input
    document.addEventListener('keydown', (event) => {
        keys_pressed.add(event.code)
        if (event.code == "ArrowDown" || event.code == "ArrowUp" ||
        event.code == "ArrowLeft" || event.code == "ArrowRight")
        event.preventDefault()
    })
    
     document.addEventListener('keyup', (event) => {
        keys_pressed.delete(event.code)

  
    })
}

var keys_pressed = new Set()
function get_keypresses() {
    var key_list = keys_pressed
    //keys_pressed = []
    return key_list
}




function draw_sprite(sprite, x, y, angle, scale, alpha, tint) {


    if (scale)
    {
        if (scale.x)
        {
            sprite.scale.x = sprite.original_scale.x * scale.x
            sprite.scale.y = sprite.original_scale.y * scale.y
        }
        else
        {
            sprite.scale.x = sprite.original_scale.x * scale
            sprite.scale.y = sprite.original_scale.y * scale
        }
    }


    if (angle)
        sprite.angle = angle
    if (tint)
        sprite.tint = tint
    if (alpha)
        sprite.alpha = alpha
    else
        sprite.alpha = 1
    sprite.x = x
    sprite.y = y


}

 
function add_sprite(texture, w, h, do_click) {

    
    if (textures[texture] == undefined)
        throw "Error: " + texture + " not loaded"

    const sprite = new PIXI.Sprite(textures[texture])
    if (w)
        sprite.width = w
    if (h)
        sprite.height = h;
    
 
    if (do_click)
    {
        sprite.eventMode = "static"
        sprite.buttonMode = true;
        sprite.on('pointerdown', do_click)
    }

    sprite.anchor.set(0.5)
    sprite.alpha = 0
    app.stage.addChild(sprite)

    sprite.original_scale = {"x":sprite.scale.x, "y":sprite.scale.y}
    
    return sprite

}

function add_background(texture) {

    const background = new PIXI.Sprite(textures[texture]);
    background.width = game_width;
    background.height = game_height;
    background.x = 0;
    background.y = 0;
    app.stage.addChild(background);

}

async function load_textures(image_files) {

    for (var image of image_files) {
        textures[image] = await PIXI.Assets.load('files/' + image)
    }

}
// do sound files in the same way - but using pixi sounds

async function load_sounds(sound_files) {

    for (var sound of sound_files) {
        sounds[sound]= new Audio('files/' + sound);
    
    }

}


function write_score(score) {
    const score_section = document.getElementById('score_section')
    score_section.innerText = score
}


function get_mouse_position() {
    return mouse_position
}


function get_mouse_clicks() {
    var current_clicks = []
    for (var click of mouse_clicks)
        current_clicks.push(click)

    return current_clicks
}

function print(...text) {
    console.log(...text)
}

//This function is called automatically when the page opens
//It sets up the game window and then calls the setup_game function

//setup_window()


