/* eslint-disable no-undef */
const D  = 400;

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D);
    background(1);
    console.info('canvas setup', {canvas: {D}});
}

// eslint-disable-next-line no-unused-vars
function draw() {
    circle(D/2, D/2, 40);
}
