// There are the functions that the game engine calls
// (The game engine also works in javascript, which is why this is separate)

function load_game_files()
{
    var py_load_game_files = pyscript.interpreter.globals.get("load_game_files")
    py_load_game_files()
}

 

function start_game()
{
    var py_start_game = pyscript.interpreter.globals.get("start_game")
    py_start_game()
}

function update_game()
{

    var py_update_game = pyscript.interpreter.globals.get("update_game")
    py_update_game()
}
 
function setup_window_delayed(w,h)
{
    setTimeout(function() {setup_window(w,h)}, 100);
}