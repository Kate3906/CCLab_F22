let channel;
let wave = [];

let img;
let cam;

let grid;
let cols;
let rows;
let w = 20;
let totalBees = 25;
let font
let para = {
    rate: 1.5,
    size: 10,
    noisy: 0.5
}

function preload() {
    font = loadFont('PressStart2P-Regular.ttf')
}

function setup() {
    createCanvas(1024, 600);
    background(255, 0, 127);

    cam = createCapture(VIDEO);
    cam.hide();
    img = createImage(640, 480);

    cols = floor(280 / 20);
    rows = floor(280 / 20);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    let options = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (let n = 0; n < totalBees; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        grid[i][j].bee = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }

}

function draw() {

    //console.log(txt);
    background(255, 0, 127);

    let txt = document.getElementById("text-box").value;
    for (let i = 0; i < 50; i++) {
        push();
        textFont(font)
        noStroke();
        fill(94, 31, 153);
        frameRate(5)
        translate(random(width), random(0, 260));
        rotate(random(TWO_PI));
        textSize(random(10, 30));
        text(txt, 0, 0);
        pop();
    }



    push()
    stroke(random(0, 200), 0, random(0, 200))

    strokeWeight(1);
    line(512, 342, -25, 541)
    line(512, 342, -29, 478)
    line(512, 342, -33, 431)
    line(512, 342, -32, 390)

    line(512, 342, -27, 580)
    line(512, 342, 31, 620)
    line(512, 342, 123, 618)
    line(512, 342, 235, 617)
    line(512, 342, 353, 615)
    line(512, 342, 465, 615)
    line(512, 342, 561, 621)
    line(512, 342, 668, 620)
    line(512, 342, 764, 620)
    line(512, 342, 872, 621)
    line(512, 342, 977, 619)
    line(512, 342, 1052, 618)

    line(512, 342, 1050, 541)
    line(512, 342, 1050, 478)
    line(512, 342, 1050, 431)
    line(512, 342, 1050, 390)
    line(512, 342, 1047, 371)


    for (let i = 0; i < 350; i += 30) {
        let a = i;
        let alpha = map(i, 0, 350, 50, 255);
        let thickness = map(i, 0, 350, 1, 6);
        stroke(random(255), 0, random(255), alpha);
        strokeWeight(thickness);
        line(0, 350 + a, 1024, 350 + a)
    }
    pop()
    if (channel != null) {
        channel.update();
        channel.display();
    }

    for (let i = 0; i < wave.length; i++) {
        let a = wave[i];
        a.update();
        a.display();
        for (let j = 0; j < a.rims.length; j++) {}
    }
    for (let i = wave.length - 1; i >= 0; i--) {
        let a = wave[i];
        if (a.lifespan <= 0.05) {
            wave.splice(i, 1);
        }
    }
    fill('#C1C0C0');
    rect(100, 100, 280, 280);
    fill(221, 160, 221);
    rect(580, 270, 375, 280);
    fill('#C1C0C0');
    rect(580, 100, 380, 120);
    rect(100, 400, 281.5, 128)
        // push();
        // fill(255, 0, 127);
        // textFont(font);
        // textSize(10);
        // //textAlign(CENTER);
        // text('Press Any Key to Travel.', 125, 450);
        // text('And Try to Type', 165, 477);
        // text('on The Underline.', 155, 505);
        // pop();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    cam.loadPixels();
    img.loadPixels();
    let a = map(0, 0, width, 10, 100);

    for (let y = 0; y < img.height; y += a) {
        for (let x = 0; x < img.width; x += a) {
            let index = (x + y * img.width) * 4;

            let r = cam.pixels[index + 0];
            let g = cam.pixels[index + 1];
            let b = cam.pixels[index + 2];

            fill(120, g, 193);
            noStroke();
            rect(x / 1.7 + 578, y / 1.7 + 270, a, a / 1.7, 15);
        }

    }
    img.updatePixels();
    image(img, 0, 0);
}

function keyPressed() {
    wave.push(new Wave(width / 2, height / 2, random(360)));
}

class Wave {
    constructor(x, y, hue) {
        this.pos = createVector(x, y);
        this.hue = hue;
        this.rims = [];
        this.newRims = new Array(10).fill(0).map(n => new Array(10).fill(0));
        this.springs = [];
        this.phase = random(1000);
        this.lifespan = 1;
        for (let i = 0; i < 10; i++) {
            let mag = para.size * (1 - para.noisy) + para.size * para.noisy * noise(i + this.phase);
            let angle = radians(36 * i);
            this.rims.push(new Dots(angle, mag));
        }
        for (let i = 0; i < this.rims.length; i++) {
            if (i == 0) {
                this.springs.push(new Spring(this.rims[0], this.rims[this.rims.length - 1]));
            } else {
                this.springs.push(new Spring(this.rims[i], this.rims[i - 1]));
            }
        }
    }
    update() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < this.springs.length; i++) {
            this.springs[i].spring();
        }
        for (let i = 0; i < this.rims.length; i++) {
            this.rims[i].update();
        }
        pop();
        this.lifespan -= 0.013; // ***
    }
    display() {
        push();
        translate(this.pos.x, this.pos.y);

        for (let r = 0; r < 10; r++) {
            for (let i = 0; i < this.rims.length; i++) {
                let p = this.rims[i]
                let pdist = dist(p.pos.x, p.pos.y, 0, 0)
                let c = map(r, 0, 10, 1, 3)
                this.newRims[r][i] = createVector(p.pos.x - (p.pos.x / pdist) * r * c, p.pos.y - (p.pos.y / pdist) * r * c)
            }
        }

        stroke(72, 61, 139);
        strokeWeight(2)
        noFill();

        beginShape();
        curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
        for (let i = 0; i < this.rims.length; i++) {
            curveVertex(this.rims[i].pos.x, this.rims[i].pos.y);
        }
        curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
        curveVertex(this.rims[0].pos.x, this.rims[0].pos.y);
        endShape();

        for (let r = 0; r < 10; r++) {
            stroke(255, map(r, 0, 10, 200, 0))
            strokeWeight(map(r, 0, 10, 2, 10))
            beginShape();
            curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
            for (let i = 0; i < this.newRims[r].length; i++) {
                curveVertex(this.newRims[r][i].x, this.newRims[r][i].y);
            }
            curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
            curveVertex(this.newRims[r][0].x, this.newRims[r][0].y);
            endShape();
        }
        pop();
    }
}

class Dots {
    constructor(angle, mag) {
        this.pos = p5.Vector.fromAngle(angle, mag);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }
    applyForce(f) {
        let force = f.copy();
        this.acc.add(force);
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    display() {
        push();
        translate(this.pos.x + width / 2, this.pos.y + height / 2);
        fill(72, 61, 139)
        ellipse(0, 0, 10, 10)
        pop();
    }
}

class Spring {
    constructor(dot1, dot2) {
        this.dot1 = dot1;
        this.dot2 = dot2;
        this.pos1 = dot1.pos;
        this.pos2 = dot2.pos;
        this.len = 1;
    }
    spring() {
        let centerVec = createVector(0, 0)
        let vector = p5.Vector.sub(this.pos1, centerVec);
        let distance = vector.mag();
        let heading = vector.copy().normalize();

        let stretch = map(distance, 0, 1000, 10, 0.5);
        let force = heading.copy();

        force.mult(-1 * para.rate * random(0.001, 0.002) * stretch * 120);
        this.dot1.applyForce(force);
        force.mult(-1);
        this.dot2.applyForce(force);
    }
}

class Channel {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 0;
    }
    update() {
        this.r += 1;
    }
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        for (let i = 0; i < 200; i += 5) {
            stroke(i)
            noFill();
            ellipse(0, 0, this.r + i / 5, this.r + i / 5)
        }
        pop();
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].bee) {
                    gameOver();
                }
            }
        }
    }
}


function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w + 100;
    this.y = j * w + 100;
    this.w = w;
    this.neighborCount = 0;

    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            fill(255, 0, 127);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(94, 31, 153);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(255, 0, 127);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighborCount = -1;
        return;
    }
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        let i = this.i + xoff;
        if (i < 0 || i >= cols) continue;

        for (let yoff = -1; yoff <= 1; yoff++) {
            let j = this.j + yoff;
            if (j < 0 || j >= rows) continue;

            let neighbor = grid[i][j];
            if (neighbor.bee) {
                total++;
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
        this.floodFill();
    }
}

Cell.prototype.floodFill = function() {
    for (let xoff = -1; xoff <= 1; xoff++) {
        let i = this.i + xoff;
        if (i < 0 || i >= cols) continue;

        for (let yoff = -1; yoff <= 1; yoff++) {
            let j = this.j + yoff;
            if (j < 0 || j >= rows) continue;

            let neighbor = grid[i][j];
            if (!neighbor.revealed) {
                neighbor.reveal();
            }
        }
    }
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}