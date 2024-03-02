/* 
holds the main game loop
calls everything else
not a clean hub/spoke tho, sorry
some webs of module dependencies in all the other files :(
*/

export {game};

// importing this runs all the commands in frontend.js
// creates and setup the canvas and rendering context
// display is created from Display class when file is read
import {display} from './frontend.js';

import {Scene, Layer, Map, EntitySet} from './scene.js';
import {generateNumbersLeft, generateGrid, generateFrame, glowText} from './generator.js';
import {ListenInput} from './input.js';
import {Glyph, Counter, Actor, Coords} from './components.js';



class Game{
    constructor(){
        this.listener = new ListenInput;        // should attach this to the canvas in frontend.js
                                                // see notes below where it is called
        this.activeScene = { };                 // can this be made local to mainLoop() ?
        this.previousScene = { };               // can this be made local to mainLoop() ?
        this.tickIntervalID = null;                // can this be made local to mainLoop() ?
        this.renderIntervalID = null;              // can this be made local to mainLoop() ?

        this.testScene = new Scene();
        this.test2Scene = new Scene();
    }

    // TODO: put this stuff into external properties data
    // use this function to apply the properties
    async setupScenes(){
        let bgLayer = new Layer(display.fonts[0],8);
        let fgLayer = new Layer(display.fonts[0],16);
        let fxLayer = new Layer(display.fonts[0],64);

        let bg2Layer = new Layer(display.fonts[0],8);
        let fx2Layer = new Layer(display.fonts[0],64);

        // these need to not use hard-coded tile counts
        // need to derive from tile size and canvas dimensions
        bgLayer.elements.push(new EntitySet(generateGrid("\u253c",80,80)));
        fgLayer.elements.push(new EntitySet(generateNumbersLeft(40)));
        fgLayer.elements.push(new EntitySet(generateFrame(36,38,3,1)));  // leave two off the width and shift right to account for the number column
        fxLayer.elements.push(new EntitySet(glowText("..*.@.*..")));

        bg2Layer.elements.push(new Map(80,80, new Glyph("\u25a0",65,65,65,1)));
        fx2Layer.elements.push(new EntitySet(glowText("-=2=-")));

        // this stuff should probably be rolled into some sort of Scene.setup() method
        this.testScene.layers.push(bgLayer, fgLayer, fxLayer);
        this.testScene.entities.push(new Counter);
        this.testScene.exit.push(this.test2Scene);

        this.test2Scene.layers.push(bg2Layer, fx2Layer);
        this.test2Scene.entities.push(new Actor(new Coords(10,10), new Glyph("&",200,50,50,1)));
        this.test2Scene.exit.push(this.testScene);

        // setting up input handling
        this.testScene.inputEvents = function(e){
            if (e === "up" || e === "down" || e === "left" || e === "right" || e === "space"){
                console.info(e+" event");
                game.testScene.entities[0].count ++;
                console.info("counter "+game.testScene.entities[0].count);
                if (game.testScene.entities[0].count === 3){
                    game.testScene.entities[0].count = 0;
                    game.activeScene = game.activeScene.exit[0]; 
                }
            return;
            };
            if (e === "escape"){
                console.info("no "+e+" event mapped");
            return;
            };
        }
        this.test2Scene.inputEvents = function(e){
            if (e === "up" || e === "down" || e === "left" || e === "right"){
                console.info(e+" event");
                return;
            };
            if (e === "space"){
                console.info(e+" event");
                game.activeScene.update()
                return;
            };
            if (e === "escape"){
                console.info(e+" event");
                game.activeScene = game.activeScene.exit[0]; 
                return;
            };
        }
    }


        tick(){
            // check to see if game.activeScene has been updated
            // and reset intervals if so
            if (this.previousScene !== this.activeScene){
                clearInterval(this.tickIntervalID);
                this.tickIntervalID = null;
                clearInterval(this.renderIntervalID);
                this.renderIntervalID = null;
                this.renderScene(this.activeScene);
            }
            //console.log("tick");        // was here for DEBUG
        }

        renderScene(scene){
            this.previousScene = scene;     // TODO: un kludge this BS
            
            // processing ticks should probably be defined at the scene
            // but running it here for now just to get a test up and working
            // TODO: move tick definition to the scene?
            // TODO: separate out animation and input handling ticks
            // currently "tick" is checking for scene changes
            // using ".bind(scene" because setInterval() will otherwise set context to "window"
            this.tickIntervalID = setInterval(this.tick.bind(this),128);                               // "tick" at about 8 FPS
            this.renderIntervalID = setInterval(scene.renderLayers.bind(scene),16);         // render scene every 16ms or 62.5 FPS
            
        }


    async mainLoop(){
        await display.setupDisplay();                   // this is only here because we need to wait for font loading
        await this.setupScenes();                       // this relies on fonts from display.. TODO: decouple these

        this.activeScene = this.testScene;
    
        this.renderScene(this.activeScene);
    }  
}


let game = new Game;
game.mainLoop();
game.listener.listen();                     // this gets called ahead of most of mainLoop()
                                            // because of the async awaits
                                            // since renderLoop() is async 
                                            // and renderLoop() goes to the job queue instead of to the call stack
                                            // listener should probably be attached to the canvas
                                            // redblob games has good advice on why the listener should be on the canvas
                                            // re: protecting other parts of the browser tab from hearing game input
                                            // and the converse
                                            // handler maybe should be in the scene so it can be changed by scene?


