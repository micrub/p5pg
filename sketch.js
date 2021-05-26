const D  = 400;
const CS = 20;
const C  = [D/2,D/2,CS];

function setup() {
  createCanvas(D,D);
}

function draw() {
  background(0);
  drawStar();
}

function drawStar() {
  stroke(255)
  strokeWeight(C[2]);
  point(C[0], C[1]);
}

