/* 
these are the components used to compose all game objects
anything that can be represented on the map 
might be assembled from these

draw() draws a specific thing to the canvas
e.g. an element or tile
render() calls a set of multiple draw() functions to draw a group of things to the canvas
e.g. a layer or scene
*/

//import {drawChar} from './screen.js';
import {display} from './frontend.js';
export {Tile, Coords, Glyph, Counter, Actor};

class Coords{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Glyph{
    constructor(char, r,g,b,a){
        this.char = char;
        this.colour = this.concatRGBA(r,g,b,a);
    }

    concatRGBA(r,g,b,a,){
        return "rgba("+r+","+g+","+b+","+a+")";
    }
}

// not implemented yet
class GlyphAnimated{
    constructor(glyphs, frameInterval){                 // pass an array of glyphs, one for each frame
        this.glyphs = glyphs;                           // array of glyphs
        this.frameInterval = frameInterval;             // in ms
                                                        // may need to be cautious about timer spam
                                                        // consider reusing a single timer on the scene for all animation updates
        this.updateable = new Updateable;               // not sure this belongs here..
                                                        // still working on what pattern to use for this
    }

    animate(){

    }
}


// call with
// new Tile(new Coords(x,y),new Glyph(char,r,g,b,a); 
class Tile{
    constructor(coords, glyph){
        // this.coords = coords;
        // this.glyph = glyph;
        this.x = coords.x;
        this.y = coords.y;
        this.char = glyph.char;
        this.colour = glyph.colour;
    }

    // not sure if this draw() belongs with the tile, 
    // or on a "drawable" class/mixin, 
    // or with some super-class
    draw(){
        display.drawChar(this.x,this.y, this.char, this.colour);
        // or this way
        //display.drawChar(this.coords.x,this.coords.y, this.glyph.char, this.glyph.colour);
    }
}

class Counter{
    constructor(){
        this.count = 0;
    }
}

// testing to see if this exists should pass a boolean test..
// should not need a value?
// is it stupid to have this as a class?  better ways?
class Updateable{}


// lots of redundancy with Tile..
// surely this is a bad practice
class Actor {
    constructor(coords, glyph){
        this.x = coords.x;
        this.y = coords.y;
        this.char = glyph.char;
        this.colour = glyph.colour;
    }
    
        
    // this is a legacy function from another project.. fix
    move(dx,dy){
        
        if( gameMap.inBounds(this.x+dx, this.y+dy) && gameMap.tiles[this.x+dx][this.y+dy].passable===true) {
            
            //test for blocking entity
            let blocker = gameMap.getBlockingEntity(this.x+dx,this.y+dy);
            if (blocker){
                console.log("booped "+blocker.name)
            }else{
                this.x += dx;
                this.y += dy;
            }
        };
    }
    
    // redundant with Tile
    // not sure if this draw() belongs with the tile, 
    // or on a "drawable" class/mixin, 
    // or with some super-class
    draw(){
        display.drawChar(this.x,this.y, this.char, this.colour);
    }
}



// an entity composed of multiple tiles
// push each title to the object created from this class
// will need to be carefull about entity IDs
// probably won't want to create IDs for each tile that are pushed in here
// just one for each multitile object
//
// this is basically an entity set, except it will have a single ID.. 
// maybe the ideas can be collapsed into one
class MultiTile{
    constructor(){
        this.tiles = [];
    }

    draw(){
        for (i=0;i<this.tiles.length;i++){
            this.tiles[i].draw;
        }
    }

    // movement is a component for regular actors
    // but multi-tile movement is special
    // should there be a stand-alone component for multitile moves?
    // or just build it in here?
    move(){}

}

class move{
    constructor(dx,dy){
        this.dx = dx;
        this.dy = dy;
    }
    
    function (){

        if(d==="w") {
            moveAction(0, -1);
        };
        if(d==="s") {
            moveAction(0, 1);
        };
        if(d==="a") {
            moveAction(-1, 0);
        };
        if(d==="d") {
            moveAction(1, 0);
        };

    }
}

class moveClockwise{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.previous = "";
    }
    
    function (){
        if(this.previous==="w") {
            moveAction(1, 0);
            this.previous = "d";
        };
        if(this.previous==="d") {
            moveAction(0, 1);
            this.previous = "s";
        };
        if(this.previous==="s") {
            moveAction(-1, 0);
            this.previous = "a";
        };
        if(this.previous==="a") {
            moveAction(0, -1);
            this.previous = "w";
        };

    }
}