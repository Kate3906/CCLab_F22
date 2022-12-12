let cam;
let canvasE;

function setup() {
    let canvasE = createCanvas(400, 400);
    canvasE.parent("canvasContainer2");
    cam = createCapture(VIDEO);
    cam.hide();

    setupFaceAPI(cam);  // ***
}

function draw() {
    updateFaceAPI(); // ***

    background(220);

    image(cam, 0, 0);

    // expression
    push();
    textSize(20);
    noStroke();
    fill(0, 255, 0);
    text(expression, 100, 100);
    pop();

    // landmarks
    noFill();
    stroke(0, 255, 0);
    strokeWeight(3);
    displayLandmarks();
}
