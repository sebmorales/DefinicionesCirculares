function randomPoints() {
	var j = 1000;
	for (var i = 0; i < totalRanPoints; i++) {
		// ranVerX[i] = random(-width / 10, width / 10);
		// ranVerY[i] = random(-height / 10, height / 10);
		var xN = (noise(i / totalRanPoints * 10)) * 100;
		var yN = (noise(j / totalRanPoints * 10)) * 100;
		//	println(xN+" "+yN);
		ranVerX[i] = (rad * cos(i * 2 * PI / totalRanPoints)); //+xN;//+ random(-5, 5);
		ranVerY[i] = (rad * sin(i * 2 * PI / totalRanPoints)); //+yN;// random(-5, 5);
		j += 1;
	}
}

function checkArea() {
	loadPixels();
	var area = 0;
	for (var i = 0; i < width * 4; i += 4) {
		for (var j = 0; j < height; j++) {
			if (pixels[i + j * width * 4] > 220) {
				area++;
			}
		}
	}
	return (area);
}

function optimization() {
	fill(240);
	var perimeter = 0;
	var area;
	background(10);
	noStroke();
	push();
	beginShape();
	translate(width / 2, height / 2);
	var j = 10;
	for (var i = 0; i < totalRanPoints; i++) {
		if (i == 0) {
			perimeter = dist(ranVerX[totalRanPoints - 1], ranVerY[totalRanPoints - 1], ranVerX[i], ranVerY[i]);
		}
		if (i > 0) {
			perimeter += dist(ranVerX[i - 1], ranVerY[i - 1], ranVerX[i], ranVerY[i]);
		}
		if (counter > 100) {
			ranVerX[i] += (noise(t * 20 + i) - .5) * 1;
			ranVerY[i] += (noise(t * 20 + j) - .5) * 1;
		}
		if (counter > 300) {
			ranVerX[i] += (noise(t * 10 + i) - .5) * 1;
			ranVerY[i] += (noise(t * 10 + j) - .5) * 1;
		}
		if (counter > 400) {
			ranVerX[i] += (noise(t * 1 + i) - .5) * 1;
			ranVerY[i] += (noise(t * 1 + j) - .5) * 1;
		}

		if (counter > 500) {
			ranVerX[i] += (noise(t * .1 + i) - .5) * 1;
			ranVerY[i] += (noise(t * .1 + j) - .5) * 1;
		}

		j++;
		vertex(ranVerX[i], ranVerY[i]);
	}
	counter++;

	endShape(CLOSE);
	pop();
	area = checkArea();
	var idealRad = perimeter / 2 / PI;
	var idealArea = sq(idealRad) * PI;
	var opt = idealArea / perimeter;
	var actual = (area / perimeter);
//	println(counter);
	fill(210);
	text("Perimeter: " + int(perimeter), 20, height - 45);
	text("Area: " + int(area), 20, height - 30);
	text("Optimization: " + actual / opt, 20, height - 15);
	//	println("perimeter: "+perimeter);
}