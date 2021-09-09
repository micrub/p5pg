/* eslint-disable no-undef */
const D  = 300;

//TODO should be required on demand

let sState = {
    angle : 2.0,
    offset : D/2,
    scalar : 0.1,
    speed : 0.5,
    col : {
        r: 255,
        g: 0,
        b: 0
    }
};

// /**
//  * Returns a radius of spiral function
//  * @date 2021-09-10
//  * @param {Integer} a Changing the parameter a moves the centerpoint of the 
//  * spiral outward from the origin (positive a toward θ = 0 
//  * and negative a toward θ = π) essentially through a rotation of the spiral.
//  * @param {Integer} b controls the distance between loops.
//  * @param {Integer} angle=10
//  * @returns {Float}
//  */
// function spiralRadius(a ,b , angle = 10) {
//     return a + b * angle; 
// }

function animateSpiral(state) {
    state.col.r = random(0, 200);
    state.col.g = random(0, 250);
    state.col.b = random(100, 250);
    var x = state.offset + cos(state.angle) * state.scalar;
    var y = state.offset + sin(state.angle) * state.scalar;
    fill(state.col.r, state.col.g, state.col.b);
    // noStroke();
    point(x, y, 1, 1);
    state.angle += state.speed;
    state.scalar += state.speed;
}

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D);
    background(1);
    console.info('canvas setup', {canvas: {D}});
}



// eslint-disable-next-line no-unused-vars
function draw() {
    // R, G & B integer values
    stroke(255, 204, 0);
    strokeWeight(4);
    // circle(D/2, D/2, D/10);
    animateSpiral(sState);
}
