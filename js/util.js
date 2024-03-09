/*
utilities

these would be part of a mature library if I was using one
for now, just whatever rubbish I've cooked up
functions found here should be used by multiple modules
or intended to be used in various places across the project
*/

export {distance, randomRange};

// returns distance between two points.. rounded
function distance(x1,y1,x2,y2){ 
    return Math.round(Math.sqrt(((x2-x1)**2)+((y2-y1)**2))) // distance formula
}


// generates a random interger between a given min and max
// TODO: replace Math.random() with a seeded PRNG function
function randomRange(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}