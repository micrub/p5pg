/* eslint-disable no-undef */
const MultiDimensional = window.require('multidimensional');
const D  = 800;
const Sections = 10;
const sectionFactor = Array.from(Array(Sections).keys());
// create a 3x3x4 array
const ClusterArray = new MultiDimensional(sectionFactor);
let sState = {
    cluster: ClusterArray,

};

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D,D);
    background(1);
    console.info('canvas setup', {canvas: {state}});
}



// eslint-disable-next-line no-unused-vars
function draw() {
    // R, G & B integer values
    stroke(255, 204, 0);
    strokeWeight(4);
    circle(D/2, D/2, D/10);
}
