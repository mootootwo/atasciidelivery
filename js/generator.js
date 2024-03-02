/* 
This holds the procgen systems
that create the features of our map
and lay them out.
*/

export {generateNumbersLeft, generateGrid, generateFrame, glowText};

import {Tile, Coords, Glyph} from './components.js';
//import {display} from './frontend.js';


// standardizing for i=x, j=y

// this function creates a row of numbers along the left edge of the display
// will over-draw past the tile it starts on for multi-digit numbers
function generateNumbersLeft(mapHeight){
    let output = [];

    for (let j=0; j<mapHeight; j++){
        output[j] = new Tile(new Coords(0,j),new Glyph(j,255,255,255,1));                   // enumerate rows with labels at x=0
    }
   
    return output;
}

// this generates a non-map grid
// for use as an EntityList
// for example as a background layer
function generateGrid(char, mapWidth, mapHeight){
    let output = [];

    for (let i=0; i<mapWidth; i++){
        // output[i] = [];          // create 2d array ..not sure if needed
        for (let j=0; j<mapHeight; j++){                                     // draw test grid 
            // array index is columnnumber*columns + row 
            output[(i*mapWidth) + j] = new Tile(new Coords(i,j),new Glyph(char,65,65,65,1));
        }
    }
   
    return output;
}

// outputs an offset from left edge or x=0
// so that a set of tiles of given width
// will be centered in tiles (not necessarily in pixels)
function centerX(xTiles, width){
    let output = Math.floor((xTiles*0.5)-(width*0.5));

    return output;
}

// outputs an offset from top edge or y=0
// so that a set of tiles of given height
// will be centered in tiles (not necessarily in pixels)
function centerY(yTiles, height){
    let output = Math.floor((yTiles*0.5)-(height*0.5));

    return output;
}

// draws a double-border rectangle frame
// of given width and height
// plus some x,y offset
function generateFrame(width,height,xOffset,yOffset){
    // ╔ 2554
    // ═ 2550
    // ╗ 2557
    // ║ 2551
    // ╚ 255a
    // ╝ 255d
    let output = [];
    let n=0;

    // ╔ 2554
    // i = 0+xOffset;
    // j = 0+yOffset;
    //output[n] = new Entity(0+xOffset,0+yOffset,"\u2554",255,255,255,1);
    output[n] = new Tile(new Coords(0+xOffset,0+yOffset),new Glyph("\u2554",255,255,255,1));
    n++;

    // ═ 2550
    for (let j=0; j<height; j=j+height-1){      // draw only top and botgtom rows
        for (let i=1; i<width-1; i++){          // offset by 1 so we dont draw over the corners
            output[n] = new Tile(new Coords(i+xOffset,j+yOffset),new Glyph("\u2550",255,255,255,1));
            n++;
        }
    }

    // ╗ 2557
    // i = width-1+xOffset;
    // j = 0+yOffset;
    output[n] = new Tile(new Coords(width-1+xOffset,0+yOffset),new Glyph("\u2557",255,255,255,1));
    n++;
    
    // ║ 2551
    for (let i=0; i<width; i=i+width-1){         // draw only left and right columns
        for (let j=1; j<height-1; j++){          // offset by 1 so we dont draw over the corners
            output[n] = new Tile(new Coords(i+xOffset,j+yOffset),new Glyph("\u2551",255,255,255,1));
            n++;
        }
    }
    
    // ╚ 255a
    // i = 0+xOffset;
    // j = height-1+yOffset;
    output[n] = new Tile(new Coords(0+xOffset,height-1+yOffset),new Glyph("\u255a",255,255,255,1));
    n++;
    
    // ╝ 255d
    // i = width-1+xOffset;
    // j = height-1+yOffset;
    output[n] = new Tile(new Coords(width-1+xOffset,height-1+yOffset),new Glyph("\u255d",255,255,255,1));
    
    return output;
}

// hardcoded placeholder stuff
// all coords and such need paramaterization
function glowText(text){
    let output = [];

    output.push(new Tile(new Coords(centerX(11,text.length),centerY(10,1)),new Glyph(text,0,255,0,0.3)));

    return output;
}
