/* eslint-disable no-undef */
const D  = 500;

const l = console.log;
// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D,WEBGL);
    background(1);
    console.info('canvas setup', {canvas: {D}});
}

// eslint-disable-next-line no-unused-vars
function draw() {
    const left = [0 , D/11, D/11*2 , D/11*3];
    const right = [0 , -D/11, -D/11*2 , -D/11*3];
    for (let index = 0; index < left.length; index++) {
        const factor = left[index];
        translate(factor, 0, 0);
        // R, G & B integer values
        stroke(255, 100, 0);
        strokeWeight(4);
        box(D/11, D/11, D/11);
        push();
    }
    translate(0,0,0);
    for (let index = 0; index < right.length; index++) {
        const factor = right[index];
        translate(factor, 0, 0);
        l(factor);
        // R, G & B integer values
        stroke(255, 100, 0);
        strokeWeight(4);
        box(D/11, D/11, D/11);
        push();
    }
}
