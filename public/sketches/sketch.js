/* eslint-disable no-undef */
window.require = require;
const l = console.log;
const R = require('ramda');
const D  = 500;
const SECTIONS = 4;
let struct;


function range(size = 0) {
    const half = size / 2;
    return R.range(0,size-1);
}

function rangeSigned(size = 4) {
    if (!even(size)) {
        throw new Error('Size is even.');
    }
    const half = size / 2;
    return R.range(-half,half+1);
}
function even(number) {
    return !( number % 2 != 0 );
    
}
const STATE = {
    struct : structDimensions()
};

function structDimensions() {
    const F = rangeSigned(SECTIONS);
    const d1 = [...F];
    const d2 = [...F];
    const d3 = [...F];
    return [d1, d2, d3 ];
}

function populateStruct(struct){
    if (!struct) {
        throw new Error('struct is not defined.'); 
    }
    let populated = [];
    populated = struct.map((d,k) => {
        return d.map((s) => {
            return {
                x: k,
                y: s,
            };
        }); 
    });
    return populated;
}
let BOXSIZE = D / SECTIONS / 2 + 1;

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D,WEBGL);
    background(1);
    struct = populateStruct(STATE.struct);
    console.info('canvas setup', {struct});
}



// eslint-disable-next-line no-unused-vars
function draw() {
    // R, G & B integer values
    // drawCircle();
    struct.map((d,zindex) => {
        // l(zindex, d);
        
      
    });
    box(BOXSIZE);
}

function drawCircle() {
    stroke(255, 204, 0);
    strokeWeight(4);
    circle(D / 2, D / 2, D / 10);
}

