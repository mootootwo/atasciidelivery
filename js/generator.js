/* 
This holds the procgen systems
that create the features of our map
and lay them out.
*/

export {generateNumbersLeft, generateGrid, generateFrame, glowText, generateSkyline, generateShip};

import {Tile, Coords, Glyph, MultiTile} from './components.js';
import {randomRange} from './util.js';
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
            output[(i*mapWidth) + j] = new Tile(new Coords(i,j),new Glyph(char,30,30,30,1));
        }
    }
   
    return output;
}

// outputs an offset from left edge or x=0
// so that a set of tiles of given width
// will be centered in tiles (not necessarily in pixels)
// xTiles: number of tiles to center across
// width: of the thing being centered
function centerX(xTiles, width){
    let output = Math.floor((xTiles*0.5)-(width*0.5));

    return output;
}

// outputs an offset from top edge or y=0
// so that a set of tiles of given height
// will be centered in tiles (not necessarily in pixels)
// yTiles: number of tiles to center across
// height: of the thing being centered
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

    // ┌ 250c
    // ─ 2500
    // ┐ 2510
    // │ 2502
    // └ 2514
    // ┘ 2518
    let output = [];
    let n=0;

    // ╔ 2554
    // ┌ 250c
    // i = 0+xOffset;
    // j = 0+yOffset;
    //output[n] = new Entity(0+xOffset,0+yOffset,"\u2554",255,255,255,1);
    output[n] = new Tile(new Coords(0+xOffset,0+yOffset),new Glyph("\u250c",255,255,255,1));
    n++;

    // ═ 2550
    // ─ 2500
    for (let j=0; j<height; j=j+height-1){      // draw only top and botgtom rows
        for (let i=1; i<width-1; i++){          // offset by 1 so we dont draw over the corners
            output[n] = new Tile(new Coords(i+xOffset,j+yOffset),new Glyph("\u2500",255,255,255,1));
            n++;
        }
    }

    // ╗ 2557
    // ┐ 2510
    // i = width-1+xOffset;
    // j = 0+yOffset;
    output[n] = new Tile(new Coords(width-1+xOffset,0+yOffset),new Glyph("\u2510",255,255,255,1));
    n++;
    
    // ║ 2551
    // │ 2502
    for (let i=0; i<width; i=i+width-1){         // draw only left and right columns
        for (let j=1; j<height-1; j++){          // offset by 1 so we dont draw over the corners
            output[n] = new Tile(new Coords(i+xOffset,j+yOffset),new Glyph("\u2502",255,255,255,1));
            n++;
        }
    }
    
    // ╚ 255a
    // └ 2514
    // i = 0+xOffset;
    // j = height-1+yOffset;
    output[n] = new Tile(new Coords(0+xOffset,height-1+yOffset),new Glyph("\u2514",255,255,255,1));
    n++;
    
    // ╝ 255d
    // ┘ 2518
    // i = width-1+xOffset;
    // j = height-1+yOffset;
    output[n] = new Tile(new Coords(width-1+xOffset,height-1+yOffset),new Glyph("\u2518",255,255,255,1));
    
    return output;
}

// hardcoded placeholder stuff
// all coords and such need paramaterization
function glowText(text){
    let output = [];

    output.push(new Tile(new Coords(centerX(20,text.length),centerY(20,1)),new Glyph(text,0,255,0,0.3)));

    return output;
}

// generates a row of buildings
// includes landing pad and fuel depot
// this merges the skyline onto the map as it runs
// should probably treat the map as RO and return the skyline elements
// TODO: improve
function generateSkyline(map){
    let output = [];

    let buildingMinWidth = 3;
    let buildingMaxWidth = 3;
    let buildingMinHeight = 3;
    let buildingMaxHeight = 6;
    let buildingMinR = 100;
    let buildingMaxR = 150;
    let buildingMinG = 30;
    let buildingMaxG = 60;
    let buildingMinB = 30;
    let buildingMaxB = 60;


    // █ 2588
    function generateBuilding(offset,width,height,r,g,b)

        {
        for (let i=0; i<width; i++){
            for (let j=0; j<height; j++){
                let x = i+offset;
                let y = map.yTiles-1-j;

                map.tiles[x][y] = new Tile(new Coords(x,y),new Glyph("\u2588",r,g,b,1)); 

            }
        }

        // start at left edge
        // random width, height, colour
        // measure desired width
        // if 0 width available, shift right 1 and retry until right edge
        // place building, up to available space
        // shift right by building width, repeat
    }

    // ● 25CF
    // ╲ 2572
    // ╱ 2571
    //
    function generateFueldepot(){
        // get random open spot
        // check for available space
        // place depot tiles
    }

    // _ 005F
    function generateLandingpad(){
        // get random open spot
        // check for available space
        // place landingpad
    }

    generateFueldepot();
    generateLandingpad();
    for (let i=0; i<map.xTiles-3; i+=3){    // -3 from xTiles as placeholder
                                            // TODO: check for available space
                                            // TODO: allow dynamic building width
        let buildingOffset=i;

        generateBuilding(
            buildingOffset, 
            randomRange(buildingMinWidth, buildingMaxWidth), 
            randomRange(buildingMinHeight, buildingMaxHeight),
            randomRange(buildingMinR, buildingMaxR),
            randomRange(buildingMinG, buildingMaxG),
            randomRange(buildingMinB, buildingMaxB)
            );
    
    
    }

    return output;  // or maybe dont return.. just modify the entity list as we go
}

// generates a flying saucer
// 
function generateShip(){
    const minHeight = 2;
    const maxHeight = 5;
    const height = randomRange(minHeight, maxHeight);
    const minWidth = height*3;
    const maxWidth = height*5
    const width = randomRange(minWidth, maxWidth);
    let output = new MultiTile;

    // ◢ 25E2
    // ◣ 25E3
    // ◤ 25E4
    // ◥ 25E5

    // █ 2588

    /*min and max width examples
     ◢███████████◣█████████◣
    ◢█████████████◣█████████◣
    ███████████████
    ◥█████████████◤
     ◥███████████◤

     ◢█████████◣███████◣
    ◢███████████◣███████◣
    ◥███████████◤
     ◥█████████◤

    ◢███████◣█████◣
    █████████
    ◥███████◤

    ◢████◣███◣
    ◥████◤
    */
    /* RNG working correctly
    for (let n = 0; n<100; n++){
        console.log(randomRange(minHeight, maxHeight));
    };
    */
    // TODO: replace text characters with codepoints
    // TODO: add offsets to coords
    // TODO: coords needs to start offscreen.. then draw() needs to check for inbounds
    // TODO: dynamic colour and shading
    console.log("height: "+height+", width: "+width);
    /*
    height 2 offset down 1
    height 3 OK
    height 4 tip offset down 1, next col missing last row
    height 5 missing last row

    */

    let i=0;
    let j=0;
        
    // rightmost column of tiles
    // sloped edges
    // may have flat nose if height is odd number
    i = width-1;
    j = Math.floor(height/2)-1;
    if ((height/2) % 1 === 0){           // using % for modulus to check for whole number
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◣",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◤",255,255,255,1)));
    } else { // else j === height/2 and is whole
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◣",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◤",255,255,255,1)));
    };

    // second column from right
    // may have sloped edges if ship is 4 or 5 tiles in height
    // otherwise solid
    i = width-2;
    if (height > 3){
        j = 0;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◣",255,255,255,1)));
        for (let j = 1; j < height-1; j++){
            output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        };
        j = height-1;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◤",255,255,255,1)));
    } else {    // else if height <= 3
        for (let j = 0; j < height; j++){      
            output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        }
    };
            
    // middle columns
    // all solid blocks
    for (let i=width-3; i>1; i--){
        for (let j=0; j<height; j++){
            output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        };
    };

    // second column from left
    // may have sloped edges if ship is 4 or 5 tiles in height
    // otherwise solid
    i = 1;
    if (height > 3){
        j = 0;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◢",255,255,255,1)));
        for (let j = 1; j < height-1; j++){
            output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        };
        j = height-1;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◥",255,255,255,1)));
    } else {    // else if height <= 3
        for (let j = 0; j < height; j++){      
            output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        }
    };

    // leftmost column of tiles
    // sloped edges
    // may have flat tail if height is odd number
    i = 0;
    j = Math.floor(height/2)-1;
    if ((height/2) % 1 === 0){           // using % for modulus to check for whole number
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◢",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◥",255,255,255,1)));
    } else { // else j === height/2 and is whole
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◢",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("█",255,255,255,1)));
        j ++;
        output.tiles.push( new Tile(new Coords(i,j),new Glyph("◥",255,255,255,1)));
    };

    output.updateable = true;                                                           // TODO PLACEHOLDER
    output.drawable = true;                                                             // TODO PLACEHOLDER
    return output;
}