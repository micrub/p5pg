const D = 400;
const C = [D/2,D/2];

function setup() {
  createCanvas(D,D);
}

function draw() {
  background(0);
  drawStar();
}

function drawStar() {
  stroke(255)
  strokeWeight(10);
  point(C[0], C[1]);
}

