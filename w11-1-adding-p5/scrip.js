function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasContainer");
    background(255, 0, 0);
}
function draw() {
    //circle(50,50,50);
}
function buttonClicked() {
    // alert("Clicked");
    background(random(255), random(255), random(255));
}