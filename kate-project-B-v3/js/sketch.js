let category = localStorage.getItem("choice");
console.log(category);
let loves = ["Keep trying.", "Love does not happen so easily.", "It's better to give up.", "Just do well.", "Everything is an uncertainty.", "You got this!", "Life is always unpredictable.", "You get what you give.", "Don’t push yourself too hard.", "All things come to those who wait.", "Love is still out of reach.", "There is still a long way to go.", "Everything is up to you.", "Believe in yourself.", "It is worth to take risk!", "Your time has not yet come.", "Yes!", "Everything will be alright.", "Don’t wait for opportunities. Create it.", "Stop chasing love and let love chase you.", "Love yourself more first.", "You never know.", "Are you ready for love?", "Nothing is impossible.", "Learn to take care of yourself first.", "With your looks, there's no need to worry.", "Santa might send someone to you this Christmas.", "Be yourself and you will attract the right people.", "Yes!", "Why don't you think so?", "You will get supports from those around you."]
let study = ["Do your best with what you have.", "Hard work does not guarantee success, but not doing anything guarantees failure.", "You are doing better than you think.", "It’s never too late to do anything.", "Why not try a different path?", "Don’t use your past experiences to predict your future.", "Life is a roller coaster.", "Think carefully before you make a decision.", "Grab every opportunity.", "Don’t wait for opportunity. Create it.", "Keep trying.", "You get what you put in.", "Don’t give up.", "Obstacles are unavoidable.", "Your perception isn’t based on reality. Your reality is based on your perception.", "Yes!", "Why not?", "It’s okay to fail sometimes.", "Don’t worry, everything will alright.", "Good results are not guaranteed.", "You got this!", "It may seem difficult at first, but you will eventually succeed.", "Perseverance is the key.", "Everything is possible.", "Yes!", "Keep doing what you have always been doing, and you will get what you want.", "Work at your own pace, there is no need to rush.", "Sometimes input does not equal output, and that is okay."]
let interactN = ["Cheer up!", "It's alright, this is life.", "Well, not everything will go the way you expect.", "Still, you are already awesome!", "Smile!", "It’s not the end of the world.", "Fortunately, tough times don’t last!", "Don’t give up!", "Just kidding, you will be fine.", "Oops, did I offend you?", "I hope you don’t take it personally.", "I hope you don’t get emotional,", "Cheer up!", "Stay positive!….but it’s also good to be real.", "It’s alright, this is life."]
let interactP = ["Just kidding", "But good things don't last forever.", "It's good to see you happy.", "Look like you are enjoying this!", "Keep up the good work!"]

let bgR = 255;
let bgG = 255;
let bgB = 255;
let colorR = 255;
let colorG = 255;
let colorB = 255;

let cam;
let canvas;
let answer;
let answerVisible = false;

let NUM_OF_PARTICLES = 100;
let particles = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(bgR, bgG, bgB);
  angleMode(DEGREES);

  textFont("'Sail',cursive");
  textAlign(CENTER, CENTER);

  cam = createCapture(VIDEO);
  cam.hide();

  // let randomIndex1 = floor(random(interactN.length));
  // answerA = interactN[randomIndex1];
  // let randomIndex2 = floor(random(interactP.length));
  // answerB = interactP[randomIndex2];

  setupFaceAPI(cam);  // ***

  if (category == "love") {
    let randomIndex = floor(random(loves.length));
    answer = loves[randomIndex];
    bgR = 247;
    bgG = 221;
    bgB = 221;
    colorR = 255;
    colorG = 77;
    colorB = 136;

  } else {
    let randomIndex = floor(random(study.length));
    answer = study[randomIndex];
    bgR = 214;
    bgG = 231;
    bgB = 247;
    colorR = 128;
    colorG = 179;
    colorB = 255;

  }

}

function draw() {
  updateFaceAPI(); // ***

  background(bgR, bgG, bgB, 255);

  ///// ANSWER /////
  if (answerVisible) {
    drawAnswer();

    // landmarks
    push();
    translate(width / 2, height / 2);
    scale(2.0);

    noFill();
    stroke(0);
    strokeWeight(1);
    displayLandmarks();
    pop();

    if (expression == "angry" || expression == "sad" || expression == "disgusted" || expression == "fearful") {
      let randomIndex = floor(random(interactN.length));
      answerA = interactN[randomIndex];
      push();
      fill(0);
      text(answerA, width / 2, height / 2 + 100);
      pop();
    }
    if (expression == "happy") {
      let randomIndex = floor(random(interactP.length));
      answerB = interactP[randomIndex];
      push();
      text(answerB, width / 2, height / 2 + 100);
      fill(0);
      pop();
    }
  }
}

///// PARTICLES /////
for (let i = 0; i < particles.length; i++) {
  let p = particles[i];
  //p.attractedTo(width / 2, height / 2);
  p.move();
  //p.slowDown();
  p.display();
}

///// FACE API /////
//image(cam, 0, 0);

// expression

push();
textSize(20);
noStroke();
fill(0, 255, 0);
text(expression, 100, 100);
pop();


function drawAnswer() {
  push();
  translate(width / 2, height / 2);

  let scl = map(sin(frameCount * 1.5), -1, 1, 0.75, 1.02);
  scale(scl);

  let sinValue = sin(frameCount * 1.5);
  let r = map(sinValue, -1, 1, 0, 184);
  let g = map(sinValue, -1, 1, 0, 134);
  let b = map(sinValue, -1, 1, 0, 11);
  fill(r, g, b);
  textSize(40);
  text(answer, -300, -150, 600, 300);
  pop();


}

function buttonClicked() {
  if (category == "love") {
    let randomIndex = floor(random(loves.length));
    answer = loves[randomIndex];

  } else {
    let randomIndex = floor(random(study.length));
    answer = study[randomIndex];
  }

  answerVisible = !answerVisible; // flip the value
  console.log(answerVisible);

  if (answerVisible) {
    // detect the face and expressions
    setTimeout(function () {
      console.log("Detecting...");
      faceapi.detect(gotResults);
    }, 3000);

    // generate particles
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      let x = random(width);
      let y = random(height);
      // particles.push(new Particle(x, y, colorR, colorG, colorB));
      particles.push(new Particle(width / 2, height / 2, colorR, colorG, colorB));
    }

  } else {
    particles = []; // empty the particles!
  }

}

class Particle {
  constructor(x, y, r, g, b) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(-15, 15);
    this.ySpd = random(-15, 15);
    this.dia = 10;

    this.r = r;
    this.g = g;
    this.b = b;

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
    fill(this.r, this.g, this.b);
    circle(0, 0, this.dia);
    pop();
  }
  explode() {
    this.xSpd = random(-7, 7);
    this.ySpd = random(-7, 7);
  }
}

///// BUTTONS /////
const btn = document.getElementById('startbutton');
btn.addEventListener('click', function handleClick() {
  const initialText = 'Start!';

  if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    btn.textContent = 'Again';
  } else {
    btn.textContent = initialText;
  }
});

///// EVENT LISTENER(S) /////
window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
  canvas.resize(windowWidth, windowHeight);
}