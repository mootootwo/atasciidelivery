/* 
This is the input listener
handler routes events to the active scene
*/


export {ListenInput};

import {game} from './game.js';      // can this be designed to avoid importing game here?

let inputProperties = { };

// input mappings should be global for the entire game
function setInputProperties(){
    inputProperties.up = ["w", "ArrowUp"];
    inputProperties.down = ["s", "ArrowDown"];
    inputProperties.left = ["a", "ArrowLeft"];
    inputProperties.right = ["d", "ArrowRight"];
    inputProperties.space = [" "];
    inputProperties.escape = ["Escape"];
}

// TODO: is this needed here or can it be moved entirely to the scene?
function handleInput(key){
    // these get defined every time the function is called
    // which means every time the input listener registers keydown
    // this is dumb.
    // TODO: make this only happen once.  
    // Maybe change this to a class and use a setProperties...
    let up = inputProperties.up;
    let down = inputProperties.down;
    let left = inputProperties.left;
    let right =  inputProperties.right;
    let space = inputProperties.space;
    let escape =  inputProperties.escape;

    if (up.includes(key)){
        console.info(key+" Pressed");
        game.activeScene.inputEvents("up");           // this is bodged.. move entire function to scene?
        return;
    };
    if (down.includes(key)){
        console.info(key+" Pressed");
        game.activeScene.inputEvents("down");           // probably change these to numeric IDs?
        return;
    };
    if (left.includes(key)){
        console.info(key+" Pressed");
        game.activeScene.inputEvents("left");           // or get rid of this redundant middleware function
        return;
    };
    if (right.includes(key)){
        console.info(key+" Pressed");
        game.activeScene.inputEvents("right");
        return;
    };
    if (space.includes(key)){
        console.info("Space Pressed");
        game.activeScene.inputEvents("space");
        return;
    };
    if (escape.includes(key)){
        console.info(key+" Pressed");
        game.activeScene.inputEvents("escape");
        return;
    };

}

// this does not really need to be a class, the way it is being used
class ListenInput{

// can i define the inputs I want at the scene level
// and also the called functions that they will invoke
// and then construct a listener for the scene??

    listen(){
        document.querySelector("html").onkeydown = function(e){
            handleInput(e.key);
            //game.activeScene.inputEvents(e.key);
        }
    }


}

// move these to async XHR functions
// should read properties from external data
// instead of being defined at the top of this file
setInputProperties();

