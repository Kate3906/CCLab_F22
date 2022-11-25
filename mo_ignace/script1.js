let img;
let img1;
let img2;
let gla;
let boxes = [];

function preload() {
    img = loadImage('image/A.png');
    img1 = loadImage('image/jinshu.jpeg');
    img2 = loadImage('image/pink1.png')
    gla = loadModel('Glasses.obj')
}


function setup() {
    createCanvas(1024, 600, WEBGL);
    background(255, 0, 127)

    for (let i = 0; i < 1700; i++) {
        boxes.push(new Box());
    }
}

function draw() {
    background(255, 0, 127)
    push();
    let angleX = map(mouseY, 0, height, PI / 2, -PI / 2);
    let angleY = map(mouseX, 0, width, -PI / 2, PI / 2);
    rotateX(angleX);
    rotateY(angleY);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].display();
    }
    pop()
    push();
    fill('#8A2BE2')
    noStroke()
        //normalMaterial();
    texture(img1)
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    torus(180, 30, 30, 16);
    rotateX(-frameCount * 0.01);
    rotateY(-frameCount * 0.01);
    torus(180, 30, 30, 16);

    scale(0.1)
    image(img, -2000, -1800)
    pop()
}

class Box {
    constructor() {
        let radDist = random(222, 1600);
        let angle = random(TWO_PI);
        this.x = cos(angle) * radDist;
        this.y = sin(angle) * radDist;
        this.z = random(-5, 5) * radDist;
        //
        this.size = random(30, 100);
        //
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        //
        this.rotVelX = random(0.010, 0.015)
        this.rotVelY = random(0.005, 0.010)
        this.rotVelZ = random(0.005, 0.010)
    }

    display() {
        push();

        translate(this.x, this.y, this.z);
        // translate(0, 0, 0);
        //rotateX(frameCount * this.rotVelX);
        rotateY(-frameCount * 2 * this.rotVelY);
        rotateZ(frameCount * this.rotVelZ);

        texture(img2);
        //normalMaterial()
        noStroke();
        // scale(3)
        // model(gla)
        box(this.size)
        pop();
    }
}