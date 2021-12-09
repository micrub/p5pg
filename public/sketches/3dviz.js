/* eslint-disable no-undef */
const D = 500;
const HD = D / 2;
const SIZE = 10;

const [X, Y, Z] = ['x', 'y', 'z'];

let d;
let dn;
let step;
let dim;

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D + 150, D + 150, WEBGL);
    setAttributes('antialias', true);
    d = range(SIZE);
    dn = range(SIZE, true);
    step = HD / SIZE;
    background(125);
    dim = dn.concat(0).concat(d);

    // define initial state
    var state = {
        distance: D * 10
        // rotation : Dw.Rotation.create({angles_xyz:[0, 0, 0]}),
    };

    console.log(Dw.EasyCam.INFO);

    easycam = new Dw.EasyCam(this._renderer, state);

    // slower transitions look nicer in the ortho mode
    easycam.setDefaultInterpolationTime(2000); //slower transition
    // start with an animated rotation with 2.5 second transition time
    easycam.setRotation(
        Dw.Rotation.create({ angles_xyz: [PI / 2, PI / 2, PI / 2] }),
        2500
    );
    easycam.setDistance(D * 2, 2500);
}

function range(size = 1, negative = false) {
    let baseRange = Array.from(Array(size).keys()).map((v) => v + 1);
    if (negative) {
        baseRange = baseRange.map((v) => (v *= -1)).reverse();
    }
    return baseRange;
}

function drawPoint(x = 0, y = 0, z = 0) {
    stroke('purple'); // Change the color
    strokeWeight(10); // Make the points 10 pixels
    point(x, y, z);
}

function drawD(rng, step, axis = X) {
    for (let index = 0; index < rng.length; index++) {
        const degree = rng[index];
        const offset = degree * step;
        switch (axis) {
        case X:
            drawPoint(offset, Y, Z);
            break;
        case Y:
            drawPoint(X, offset, Z);
            break;
        case Z:
            drawPoint(X, Y, offset);
            break;
        default:
            drawPoint(offset, Y, Z);
            break;
        }
    }
}
function drawDY(dimen, step) {
    const X = 0,
        Z = 0;
    for (let index = 0; index < dimen.length; index++) {
        const degree = dim[index];
        drawPoint(X, degree * step, Z);
    }
}
function drawDZ(dimen, step) {
    const X = 0, Y = 0;
    for (let index = 0; index < dimen.length; index++) {
        const degree = dim[index];
        drawPoint(X, Y, degree * step);
    }
}

// eslint-disable-next-line no-unused-vars
function draw() {
    // projection
    var cam_dist = easycam.getDistance();
    var oscale = cam_dist * 0.001;
    var ox = width / 2 * oscale;
    var oy = height / 2 * oscale;
    ortho(-ox, +ox, -oy, +oy, -10000, 10000);
    easycam.setPanScale(0.004 / sqrt(cam_dist));

    background(125);
    drawDX(dim, step);
    drawDY(dim, step);
    drawDZ(dim, step);
}


























































