var rad = 100;
var t = 0;
var xVer, yVer;

//optimization
var totalRanPoints = 100;
var ranVerX = [];
var ranVerY = [];
var counter = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	background(10);
	stroke(240);
	randomPoints();
}



function draw() {
	//Comenta y descometa para ver la animación que quieras.
	
	//circleCosSin(); // dibuja un circulo, punto por punto con la relación de senos y cosenos
	//rotateRadius(); //dibuja una circulo rotando una linea de radio r
	//cartetian(); // Dibuja un circulo, punto a punto con la relacíon de y^2=r^2-x^2
	//exclusion(); // Dibuja un circulo con puntos aleatorios si el punto esta mas lejos que un radio del centro 
	//inclusion(); // lo contrario a exclusion
	//randomLines(); // Dibuja un circulo con lineas aleatorias que no atraviezan por el circulo
	optimization(); //Empieza con un circulo y lentamente distorciona la relacion entre puntos
	//tangents(); //Dibuja un circulo con lineas tangentes al circulo
	t += .01;
}






function circleCosSin() {
	push();
	translate(width / 2, height / 2);
	xVer = rad * cos(t);
	yVer = rad * sin(t);
	point(xVer, yVer);
	pop();
}

function rotateRadius() {
	xVer = rad;
	yVer = 0;
	push();
	translate(width / 2, height / 2);
	rotate(t);
	//point(100,0);
	line(0, 0, xVer, 0);
	//point(xVer, yVer);
	pop();
}

function cartetian() {
	push();
	xVer = t * 40;
	translate(width / 2, height / 2);
	yVer = sq(rad) - sq(xVer);
	yVer = sqrt(yVer);
	point(xVer, yVer);
	point(xVer, -yVer);
	point(-xVer, yVer);
	point(-xVer, -yVer);
	pop();
}

function exclusion() {
	var ranX = random(0, width);
	var ranY = random(0, height);
	var distToCenter = dist(width / 2, height / 2, ranX, ranY);
	if (distToCenter > rad) {
		strokeWeight(3);
		point(ranX, ranY);
	}
}

function inclusion() {
	var ranX = random(0, width);
	var ranY = random(0, height);
	var distToCenter = dist(width / 2, height / 2, ranX, ranY);
	if (distToCenter < rad) {
		strokeWeight(3);
		point(ranX, ranY);
	}
}

function randomLines() {
	var px1 = random(-width / 2, width / 2);
	var px2 = random(-width / 2, width / 2);
	var py1 = random(-height / 2, height / 2);
	var py2 = random(-height / 2, height / 2);
	var a = (py2 - py1) / (px2 - px1);
	var c = py1 - (a * px1);

	var minDistX = (-a * c) / (sq(a) + 1);
	var minDistY = (-c) / (sq(a) + 1);

	if (dist(minDistX, minDistY, 0, 0) > rad) {
		//if (dist(minDistX, minDistY, 0, 0) < rad) {
		push();
		translate(width / 2, height / 2);
		// for(var i=-width/2;i<width/2;i+=10){
		// 	var tempY=a*i+c;
		// //	strokeWeight(3);
		// //	point(i,tempY);
		// }
		strokeWeight(1);
		line(px1, py1, px2, py2);
		//line(minDistX,minDistY,0,0);
		// strokeWeight(3);
		// point(minDistX, minDistY);
		pop();
	}
}

function tangents() {
	var px = random(-rad, rad);
	var pxr = random(-width / 2, width / 2);
	var sw = random(0, 1);
	if (sw > .5) {
		sw = 1;
	} else {
		sw = -1;
	}
	var py = sqrt(sq(rad) - sq(px)) * sw;

var mrad = py / px;
var m = -1 / mrad;
var pyr = m * (pxr - px) + py;
push();
translate(width / 2, height / 2);
line(px, py, pxr, pyr);
pop();
}