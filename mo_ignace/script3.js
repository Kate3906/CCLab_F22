let matrix = [];
let notes = [];
let t = [];
let myFont;

function preload() {
    t[0] = loadImage('image/img1.png');
    t[1] = loadImage('image/img2.png');
    t[2] = loadImage('image/img3.png');
    t[3] = loadImage('image/img4.png');
    t[4] = loadImage('image/img5.png');
    t[5] = loadImage('image/img6.png');
    t[6] = loadImage('image/img7.png');
    t[7] = loadImage('image/img8.png');
    t[8] = loadImage('image/img9.png');
    t[9] = loadImage('image/img10.png');
    t[10] = loadImage('image/img11.png');
    t[11] = loadImage('image/img12.png');
    t[12] = loadImage('image/img13.png');
    t[13] = loadImage('image/img14.png');
    t[14] = loadImage('image/img15.png');
    myFont = loadFont('Consolas.ttf');
}
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 25;

function setup() {
    createCanvas(1024, 600);
    background(0);

    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize
    }

    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });
    for (let i = 0; i < notes.length; i++) {
        notes[i].display();
    }
}

function mouseClicked() {
    notes.push(new Note(mouseX, mouseY));
}

function theSymbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    // this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.switchInterval = round(random(2, 25));

    this.setToRandomSymbol = function() {
        var charType = round(random(0, 5));
        if (frameCount * 0.5 % this.switchInterval == 0) {
            if (charType > 1) {
                // set it to Katakana
                this.value = String.fromCharCode(
                    0x30A0 + round(random(0, 96))
                );
            } else {
                // set it to numeric
                this.value = round(random(0, 9));
            }
        }
    }

    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 35));
    this.speed = random(5, 10);

    this.generateSymbols = function(x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new theSymbol(
                x,
                y,
                this.speed,
                first,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(140, 255, 170, symbol.opacity);
            } else {
                fill(0, 255, 70, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
// function setup() {
//     createCanvas(1024, 600);
//     background(0);

//     for (let i = 0; i < 200; i++) {
//         matrix.push(
//             new Number(random(-200, 0), random(height), random(30, 50))
//         );
//     }
// }

// function draw() {
//     background(0);
//     for (let i = 0; i < matrix.length; i++) {
//         let m = matrix[i];
//         m.move();
//         m.reappear();
//         m.display();
//     }
//     for (let i = 0; i < notes.length; i++) {
//         notes[i].display();
//     }
// }

// function mouseClicked() {
//     notes.push(new Note(mouseX, mouseY));
// }

// class Number {
//     constructor(x, y, dia) {
//         this.x = x;
//         this.y = y;
//         this.dia = dia;
//         this.xSpd = random(1, 3);
//         this.ySpd = 0;
//     }
//     move() {
//         this.x += this.xSpd;
//         this.y += this.ySpd;
//     }

//     explode() {
//         this.xSpd = random(-10, 10);
//         this.ySpd = random(-10, 10);
//     }
//     reappear() {
//         if (this.x > width) {
//             this.x = 0;
//         }
//     }
//     display() {
//         push();
//         noStroke();
//         fill('#00FF41');
//         text('01010011101', this.x, this.y)
//         text('101011100', this.x * 2, this.y);
//         fill(0, 255, 51)
//         rect(this.x + this.dia, this.y + this.dia, this.dia, 1)
//         pop();
//     }
// }

class Note {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 150;
        this.scale = random(0.5, 0.7);
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.t = int(random(0, 15));
        //console.log(this.t)
    }

    display() {
        push();
        translate(this.x, this.y);
        scale(this.scale);
        noStroke();
        fill(this.r, this.g, this.b, 200);
        rect(0, 0, this.size, this.size);
        fill(0);
        image(t[this.t], 0, 0);
        pop();
    }
}