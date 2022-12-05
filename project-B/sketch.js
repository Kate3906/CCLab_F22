let loves = ["Keep trying.", "Love does not happen so easily.", "It's better to give up.", "Just do well.", "Everything is an uncertainty.", "Life is always unpredictable.", "You get what you give.", "Don’t push yourself too hard.", "All things come to those who wait.", "Love is still out of reach.", "There is still a long way to go.", "Everything is up to you.", "Believe in yourself.", "It is worth to take risk!", "Your time has not yet come.", "Yes!", "Everything will be alright.", "Don’t wait for opportunities. Create it.", "Stop chasing love and let love chase you.", "Love yourself more first."]

let students = ["Do your best with what you have.", "Hard work does not guarantee success, but not doing anything guarantees failure.", "You are doing better than you think.", "It’s never too late to do anything.", "Why not try a different path?", "Don’t use your past experiences to predict your future.", "Life is a roller coaster.", "Think carefully before you make a decision.", "Grab every opportunity.", "Don’t wait for opportunity. Create it.", "Keep trying.", "You get what you give.", "Don’t give up.", "Obstacles are unavoidable.", "Your perception isn’t based on reality. Your reality is based on your perception.", "Yes!", "Why not?", "It’s okay to fail sometimes.", "Don’t worry, everything will alright.", "Good results are not guaranteed."]
let Answer;
function setup() {
  let canvas = createCanvas(600, 280);
  canvas.parent("canvasContainer");
  background(246, 230, 230);

  randomIndex = floor(random(loves.length));
  Answer = loves[randomIndex];
}

function draw() {
  push();
  textAlign(CENTER)
  textSize(35);
  textFont("Sail");
  fill(0);
  text(Answer, width / 2, height / 2);
  pop();
  //text(randomIndex,20,40);
}

/*function buttonClicked() {
  console.log("Button Clicked!");
  background(random(255));
}*/
