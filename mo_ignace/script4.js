let font;
let red;
let blue;
function setup() {
	createCanvas(1024, 600, WEBGL);
	background(3,1,190);
    if(frameCount = 1000){
    displayAlert()
    }
}
function preload(){
font= loadFont('PressStart2P-Regular.ttf');

}

function draw() {
	background(3,1,190);
	textSize(37)
	textFont(font)
	fill(239,243,151)
let s = second();
text('23 : 59 : ' + s, -230, -235);
	textSize(40)
	text('DEC 31 1999',-228, -160)
    push()
	textSize(30)
	text('PICK YOUR PILL',-190, 250)
	pop()
	//fill(246,42,16)
noFill()
	stroke(246,42,16)
	strokeWeight(5)
	//noStroke()
	push()
	
	translate(0, -30)
 rotateY(-frameCount * 2 * 0.01);
	box(540, 100)

	fill(255)
	textSize(37)
	text('MILLENNIUM BUG',-255, 20)
	pop()
	//push()
	//scale(0.2)
	//image(red, -850, 400)
	//image(blue, 0, 0)
	//pop()
	
}

function displayAlert() {
    alert('Congrats! You did fresh the time...or did you really?')
}