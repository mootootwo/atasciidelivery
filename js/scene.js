/* 
Composes a Scene of multiple objects
layers
maps
actors / items
UI elements

draw() draws a specific thing to the canvas
e.g. an element or tile
render() calls a set of multiple draw() functions to draw a group of things to the canvas
e.g. a layer or scene.. maybe should reduce this to "draw" everywhere?
*/

import {display} from './frontend.js';                  // dont like having this here.. reconsider

import {Tile, Coords} from './components.js';               // TODO:  This dependency should not be here..
                                                        // FIX:  get anything depending on this moved to generator.js


export {Scene, Layer, FxLayer, Map, EntitySet};

function setSceneProperties(){
    sceneProperties.push({
        name : "testScene",
        layers : [ ],
        exit : [ ]

    });
    sceneProperties.push({
        name : "test2Scene",
        layers : [ ],
        exit : [ ]
    });
}

// For now we draw an entire layer in one font and pt size
// setting canvas ctx properties for every tile/glyph is possible but seems heavy
// so done per layer instead
// when moving to sprites or non-text elements, this will be depricated
class Layer {
    constructor(font, tileSize){
        this.elements = [];             // 2d array for map, 3d array for entity list
        this.font = font
        this.tileSize = tileSize
        this.xTiles = Math.floor(display.canvas.width / this.tileSize);  // this requires importing "display" maybe find a way not to do that
        this.yTiles = Math.floor(display.canvas.height / this.tileSize);
	}


render(){
    display.ctx.font = this.tileSize +"px "+this.font;          // setting the context font requires importing display to this module
    display.tileSize = this.tileSize;
    for(let i=0;i<this.elements.length;i++){
        this.elements[i].draw();                                // draws each entity in the layer
    }
}

}

// add this to Layer to allow per-character font and size
// does not save or restore ctx properties
// may polute pre-set fonts or layer grid dimensions
// unused for now, undecided how to compose this...
class FxLayer {

    // drawing is normally called on the entity
    // don't have a way to call it from here instead
    // will depend on where font and size get added
    drawChar(x,y,char,textColor,font,pxSize){
        display.ctx.font = pxSize +"px "+font;
        display.ctx.fillStyle = textColor; //hex code for text color
        display.ctx.fillText(
            char, 
            x*this.tileSize,
            y*this.tileSize
        );
    }

}

// 2d array of tiles
// used for game play space
// move to Generator? 
class Map{
    constructor(xTiles, yTiles, defaultGlyph){                       // TODO: verify that can pass null to defaultGlyph for an empty map
        this.xTiles = xTiles;
        this.yTiles = yTiles;
        this.defaultGlyph = defaultGlyph;
        this.tiles = this.generate(this.xTiles, this.yTiles);
    }

    generate(){
        // change this to `let tiles = []` for function scope??
        this.tiles = [];
        
        for(let i=0;i<this.xTiles;i++){
            this.tiles[i] = [];
            for(let j=0;j<this.yTiles;j++){         
                //this.tiles[i][j] = new Space(i,j);  // fill map with space tiles
                this.tiles[i][j] = new Tile(new Coords(i,j),this.defaultGlyph);        // TODO: this will need to be changed when more properties are added to tiles
            }
        }
        return this.tiles;
    }

    draw(){                                         //draws the map
        for(let i=0;i<this.xTiles;i++){
            for(let j=0;j<this.yTiles;j++){
                this.tiles[i][j].draw();            // draws the tile
            }
        }
    }

    
}

// list of entities
// to be drawn together as part of a layer
class EntitySet{
    constructor(array){
        this.entities = array;
    }

    draw(){                                                 // draws the entities in the array
        for(let i=0;i<this.entities.length;i++){
            this.entities[i].draw();                        // draws the entity
        }
    }
}


class Scene{
	constructor(){
        this.layers = [];
        this.entities = [];                     // lol just stuffin shit in here without a plan
        this.updateList = [];                   // subset of entitities that are updatable
        this.exit = [];                         // scene to exit to for various exit conditions
	}

    setupUpdateList(){
        for (let i=0; i<this.entities.length; i++){
            if (this.entities[i].updateable){                   // TODO: this "updateable" does not exist yet.. placeholder

                this.updateList.push(this.entities[i]);        
            }
        }
   }

    setupScene(){  // or just "setup": from the dept of redundancy dept
        this.setupUpdateList();
    }

    renderLayers(){
        display.ctx.clearRect(0,0,display.canvas.width,display.canvas.height); // clear screen each frame
        for (let i=0; i<this.layers.length; i++){
            this.layers[i].render();
        }
        //console.log("frame");       // DEBUG 
    }
    
    animate(){

    }

    inputEvents(){

    }


    // tell actors and any updatable ents that they have a chance to act or update
    // counters and event timers should be ents
    // trigger scene changes
    update(){
        for (let i=0; i<this.updateList.length; i++){
            this.updateList[i].update();
        }
    }
}
