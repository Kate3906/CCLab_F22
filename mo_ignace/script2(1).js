let SPHERE_RESOLUTION = 12;

let img1
let particles = [];

function preload() {

    img1 = loadImage('image/jinshu.jpeg');

}

function setup() {
    createCanvas(1024, 600, WEBGL);
    background(255, 0, 127);
}
//  function mousePressed() {
// 	let txt = round(mouseX) + ", " + round(mouseY)
// 	console.log(txt)
// }
function draw() {
    background(255, 0, 127);
    noStroke()
    texture(img1);
    let angleX = map(0, 0, height, PI / 2, -PI / 2);
    let angleY = map(0, 0, width, -PI / 2, PI / 2);
    rotateX(angleX);
    rotateY(angleY);

    particles.push(new Particle());


    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.rotate();
        p.move();
        p.display();
    }

    while (particles.length > 300) {
        particles.splice(0, 1);
    }


}

class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        //
        this.xSpd = random(-1, 1);
        this.ySpd = random(-1, 1);
        this.zSpd = random(-1, 1);
        //
        this.dia = random(5, 15);
        //
        this.rotX = random(TWO_PI);
        this.rotY = random(TWO_PI);
        this.rotZ = random(TWO_PI);
    }
    move() {
        this.x += this.xSpd;
        this.y += this.ySpd;
        this.z += this.zSpd;
    }
    rotate() {
        this.rotX += 0.01;
        this.rotY += 0.01;
        this.rotZ += 0.01;
    }
    display() {
        push();
        translate(this.x, this.y, this.z);
        rotateX(this.rotX);
        rotateY(this.rotY);
        rotateZ(this.rotZ);
        drawSphere(0, 0, 0, this.dia);
        pop();
    }
}


function drawSphere(x, y, z, dia) {
    push();
    translate(x, y, z);
    sphere(dia, SPHERE_RESOLUTION, SPHERE_RESOLUTION);

    pop();

}