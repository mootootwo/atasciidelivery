/* 
Loads fonts
sets up canvas
exports display object that holds the canvas rendering context
TODO: input listener should be moved to the canvas?
*/

export {display};  // this is the created display object, not the Display class

// not defining the various properties under the Display class scope
// because I don't want to export them with the display.. 
// want these property objects to be discarded when they are done with
let fontProperties = [ ]; 
let canvasProperties = { };
let ctxProperties = { };

function setFontProperties(){
    fontProperties.push({
        name : "atascii",
        url  : "fonts/atascii.woff"
        // this is an 8x8 font
    });
}

function setCanvasProperties(){
    canvasProperties.outline = "1px solid #ffffff"; // could further paramaterize this to make the components configurable
    canvasProperties.backgroundColor = "#000000";
    // center canvas on the page
    canvasProperties.position = "absolute"; 
    canvasProperties.left = "50%"; 
    canvasProperties.top = "50%"; 
    canvasProperties.transform = "translate(-50%, -50%)"; // could further paramaterize for non-centered options

    // 640 is 40 tiles at 16x16 or 80 tiles at 8x8
    // keep this as multiple of 8 for clean scaleing
    // assuming tiles sized at multiples of 8 or powers of 2
    canvasProperties.width = 640;
    canvasProperties.height = 640;
}

// one ctx per canvas is allowed
// layer dependent properties such as font and tile size
// must be defined per layer and applied to the ctx before drawing
function setCtxProperties(){
    ctxProperties.textBaseline = "top";
    ctxProperties.imageSmoothingEnabled = false;
}


class Display {
    constructor(){
        this.scale = window.devicePixelRatio;
        this.tileSize = 0;                                  // not necessary, just initializing and will be set by layer when drawing
        this.canvas = document.createElement("canvas");     // dynamically create a canvas
        this.ctx = this.canvas.getContext("2d");            // create the rendering context for the canvas
        this.fonts = [];    
    }

    async loadFonts(){
        for (let i=0; i<fontProperties.length; i++){
            const font = new FontFace(fontProperties[i].name, "url("+fontProperties[i].url+")");
            document.fonts.add(font);
            this.fonts.push(fontProperties[i].name);
            await font.load();              // we "await" this entire function when calling it, but does not work correctly unless we also await here
        };
    }

    setupCanvas(){
        //apply all canvas properties
        this.canvas.width = Math.floor((canvasProperties.width)*this.scale);
        this.canvas.height = Math.floor((canvasProperties.height)*this.scale);
        this.canvas.style.width = this.canvas.width+"px";
        this.canvas.style.height = this.canvas.height+"px";
        this.canvas.style.outline = canvasProperties.outline;
        this.canvas.style.backgroundColor = canvasProperties.backgroundColor;

        // center canvas on the page
        this.canvas.style.position = canvasProperties.position; 
        this.canvas.style.left = canvasProperties.left; 
        this.canvas.style.top = canvasProperties.top; 
        this.canvas.style.transform = canvasProperties.transform;

        document.body.appendChild(this.canvas); // add dynamically created canvas to the html document
    }

    setupCtx(){
        this.ctx.textBaseline = ctxProperties.textBaseline;
        this.ctx.imageSmoothingEnabled = ctxProperties.imageSmoothingEnabled;
        
        // move this to the ctxProperties object if is is going to be kept..
        this.ctx.textRendering = "optimiseSpeed";  // this seems to do the best at reducing antialiasing in chrome
        
        this.ctx.scale(this.scale, this.scale); // Normalize coordinate system to use CSS pixels. WTF ever that means.
        //this.ctx.translate(0.5,0.5); // improve anti-aliasing blur by shifting rendering by half pixel
    
    }

    async setupDisplay(){
    
        await this.loadFonts();      // further commands wait on this to be returned.. function exits call-stack
        this.setupCanvas();
        this.setupCtx();
    }

    // Build-me stuff above here
    //
    // use-me stuff below here
    

    drawChar(x,y,char,textColor){
        this.ctx.fillStyle = textColor; //hex code for text color
        this.ctx.fillText(
            char, 
            x*this.tileSize,
            y*this.tileSize
        );
    }

}

// move these to async XHR functions
// should read properties from external data
// instead of being defined at the top of this file
setFontProperties();
setCanvasProperties();
setCtxProperties();

let display = new Display();




