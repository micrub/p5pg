/* eslint-disable no-undef */
const D  = 300;

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D);
    background(1);
    console.info('canvas setup', {canvas: {D}});
}

// eslint-disable-next-line no-unused-vars
function draw() {
    // R, G & B integer values
    stroke(255, 0, 0);
    strokeWeight(5);
    circle(D/2, D/2, D/10);
}
