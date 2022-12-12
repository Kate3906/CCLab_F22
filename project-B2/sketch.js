let category = localStorage.getItem("choice");
console.log(category);
let loves = ["Keep trying.", "Love does not happen so easily.", "It's better to give up.", "Just do well.", "Everything is an uncertainty.", "You got this!", "Life is always unpredictable.", "You get what you give.", "Don’t push yourself too hard.", "All things come to those who wait.", "Love is still out of reach.", "There is still a long way to go.", "Everything is up to you.", "Believe in yourself.", "It is worth to take risk!", "Your time has not yet come.", "Yes!", "Everything will be alright.", "Don’t wait for opportunities. Create it.", "Stop chasing love and let love chase you.", "Love yourself more first.", "You never know.", "Are you ready for love?", "Nothing is impossible.", "Learn to take care of yourself first.", "With your looks, there's no need to worry.", "Santa might send someone to you this Christmas.", "Be yourself and you will attract the right people.", "Yes!", "Why don't you think so?", "You will get supports from those around you."]
let study = ["Do your best with what you have.", "Hard work does not guarantee success, but not doing anything guarantees failure.", "You are doing better than you think.", "It’s never too late to do anything.", "Why not try a different path?", "Don’t use your past experiences to predict your future.", "Life is a roller coaster.", "Think carefully before you make a decision.", "Grab every opportunity.", "Don’t wait for opportunity. Create it.", "Keep trying.", "You get what you put in.", "Don’t give up.", "Obstacles are unavoidable.", "Your perception isn’t based on reality. Your reality is based on your perception.", "Yes!", "Why not?", "It’s okay to fail sometimes.", "Don’t worry, everything will alright.", "Good results are not guaranteed.", "You got this!", "It may seem difficult at first, but you will eventually succeed.", "Perseverance is the key.", "Everything is possible.", "Yes!", "Keep doing what you have always been doing, and you will get what you want.", "Work at your own pace, there is no need to rush.", "Sometimes input does not equal output, and that is okay."]


let canvas;
let answer;
let switchText = false;
let count = 0;

let NUM_OF_PARTICLES = 100;
let particles = [];
let count1 = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(247, 221, 221);
  angleMode(DEGREES);

  if (category == "love") {
    let randomIndex = floor(random(loves.length));
    answer = loves[randomIndex];
  } else {
    let randomIndex = floor(random(study.length));
    answer = study[randomIndex];
  }

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
}

function draw() {
  if (category == "love") {
    background(247, 221, 221, 50);
    //fill(255, 153, 187);
    fill(255, 77, 136);
  } else {
    background(214, 231, 247, 50);
    fill(128, 179, 255);

  }

  if (switchText == true) {
    if (count % 2 == 0) {
      console.log("canvas empty")
      //the button is already on when we clicked it (in the buttonClick function)
      //count refers to the number of click. If the number of click is 0, it means you haven't clicked. When you click "start" the first time, the number of click is 1, and 1 divided by 2 is not divisible because the remainder is 1.Since you set that canvas will be empty (by not coding anything underdeath) when the number of count divided by 2 has a remainder, the text will not show up.
    } else if (count % 2 == 1) {
      console.log("canvas with text")

      push();
      textAlign(CENTER, CENTER);
      textSize(40);
      textFont("'Sail',cursive");
      // play with the color
      let bri = map(sin(frameCount * 0.05), -1, 1, 0, 255);
      fill(bri);
      translate(width / 2, height / 2);
      let scl = map(sin(frameCount * 0.01), -1, 1, 0.9, 1.10); // ***
      scale(scl);
      text(answer, -300, -150, 600, 300);
      pop();
      //text shows whenever the number of count is even
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        // p.attractedTo(random((width * 2.1) / 2), random((height * 2.1) / 2));

        p.move();
        p.slowDown();

        p.display();
      }

    }

  }

  //text(randomIndex,20,40);
}

function buttonClicked() {
  // console.log("Button Clicked!");

  if (category == "love") {
    let randomIndex = floor(random(loves.length));
    answer = loves[randomIndex];

  } else {
    let randomIndex = floor(random(study.length));
    answer = study[randomIndex];

  }

  switchText = true;//here, the switch is on when the button is clicked.
  count = count + 1;//since count starts by equalling to 0, the first click will be 0+1=1 which is an odd number
  console.log(count)

  // console.log("canvas empty")
  // console.log("canvas with text")
  // if (count % 2 == 0) {
  //   console.log("canvas empty")
  // } else if (count % 2 == 1) {
  //   console.log("canvas with text")
  // }
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (count1 % 2 == 0) {
      p.attract = false;
      p.move();
    } else {
      //p.attract = true;
    }
  }
  count1 += 1;
}

window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
  canvas.resize(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(-15, 15);
    this.ySpd = random(-15, 15);
    this.dia = 10;
    this.attract = true;
  }
  // methods
  attractedTo(targetX, targetY) {
    if (this.attract) {
      let xAcc = (targetX - this.x) * 0.005;
      let yAcc = (targetY - this.y) * 0.005;
      this.xSpd += xAcc;
      this.ySpd += yAcc;
    }

  }
  slowDown() {
    if (this.attract) {
      this.xSpd = this.xSpd * 0.9;
      this.ySpd = this.ySpd * 0.9; // 
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    rotate(45);
    noStroke();
    circle(0, 0, this.dia);

    pop();
  }
  explode() {
    this.xSpd = random(-7, 7);
    this.ySpd = random(-7, 7);
  }
}

