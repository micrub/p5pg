/* eslint-disable no-undef */
const D = 500;
const HD = D / 2;
const SIZE = 10;
const l =console.log;

const [X, Y, Z] = [Symbol('X'),Symbol('Y'),Symbol('Z')];

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
        let cords;

        switch (axis) {
        case X:
            cords = [offset, 0, 0];
            break;
        case Y:
            cords = [0, offset, 0];
            break;
        case Z:
            cords = [0, 0, offset];
            break;
        default:
            cords = [offset, 0, 0];
            break;
        }
        let [x,y,z] = cords;    
        drawPoint(x, y,z);
    }
}

function drawDPartial(rng, step) {
    return (axis) => {
        drawD(rng,step,axis);
    };
    
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

    const drawAxis = drawDPartial(dim,step);

    background(125);
    drawAxis(X);
    drawAxis(Y);
    drawAxis(Z);
}
