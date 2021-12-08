/* eslint-disable no-undef */
window.require = require;
const R = require('ramda');
const D  = 200;
const SECTIONS = 10;

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
                d1: k,
                d2: s,
            };
        }); 
    });
    return populated;
}
// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D);
    background(1);
    const struct = populateStruct(STATE.struct);
    console.info('canvas setup', {struct});
}



// eslint-disable-next-line no-unused-vars
function draw() {
    // R, G & B integer values
    stroke(255, 204, 0);
    strokeWeight(4);
    circle(D/2, D/2, D/10);
}
