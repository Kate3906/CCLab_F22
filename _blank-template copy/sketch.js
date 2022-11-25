function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  ellipse(100, 100, 100, 100);
}

function buttonClicked() {
  console.log("Button Clicked!");
  background(random(255));
}
