function lv1() {
	canvas.onclick = null;
	active_ideas = [];

	var bg = new Image();
	var fail = new Image();
	var mol = new Image();
	var pancake = new Image();
	var loaded=0, toload=4;

	var timer;
	var x = 500;
	var px = 500;
	var pdx = 0;
	var frameNum = 0;

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();
	fail.onload = goWhenReady();
	mol.onload = goWhenReady();
	pancake.onload = goWhenReady();

	function pancakeY(n) {
		var rest = 385;
		n = n % 200;
		if(n < 100) return rest - n;
		else return (rest - 100) + (n - 100);
	}

	function draw_main() {
		context.drawImage(bg, 0, 0);
		context.drawImage(mol, x, 300);
		context.drawImage(pancake, px+130, pancakeY(frameNum));
		px = px + pdx;
		if(px < 0) {
			px = 0;
			pdx = Math.abs(pdx);
		}
		if(px > 600) {
			px = 600;
			pdx = -Math.abs(pdx);
		}
	}

	function isHit() {
		return ((x - 20) < px && px < (x + 20));
	}

	function gameOver() {
		clearInterval(timer);
		context.drawImage(fail, 0, 0);
		if(frameNum <= 400) {
			textBox(
				"You dropped the pancake.",
				"An African child could have lived for a week with that.",
				"You feel too bad to continue with your day.",
				title
			);
		}
		else {
			textBox(
				"Looks like you can't handle being a genius and being a man",
				"at the same time. Shame.",
				"So much shame.",
				title
			);
		}
	}

	function go() {
		draw_main();
		textBox(
			"First job of the day, breakfast.",
			"Let's flip some pancakes!",
			"(A/D to move left/right)",
			function() {
				canvas.onclick = null;
				timer = setInterval(frame, 50);
			}
		);

		function frame() {
			draw_main();
			draw_ideas();

			if(keys["A"]) x = x - 5;
			if(keys["D"]) x = x + 5;

			if(frameNum == 0) {
				pdx = -(Math.random() + 1);
			}
			if(frameNum == 200) {
				if(isHit()) {
					pdx = Math.random() * Math.abs(pdx);
				}
				else {
					gameOver();
				}
			}
			if(frameNum == 400) {
				if(isHit()) {
					pdx = -(Math.random() * 1 + 0.5);
					canvas.onclick = collect_idea;
				}
				else {
					gameOver();
				}
			}
			if(frameNum >= 200 && frameNum < 600 && frameNum % 10 == 0) {
				have_idea();
			}
			if(frameNum == 600) {
				canvas.onclick = null;
				if(isHit()) {
					clearInterval(timer);
					draw_main();
					textBox(
						"You made it!",
						"Not just an amazing pancake.",
						"You also wrote down " + lv_score + " awesome ideas!"
					);
					score = score + lv_score;
					setTimeout(function() {
						canvas.onclick = cg2;
					}, 500);
				}
				else {
					gameOver();
				}
			}

			frameNum++;
		}
	}
	
	bg.src = "data/lv1-bg.jpg";
	fail.src = "data/lv1-fail.jpg";
	mol.src = "data/lv1-mol.png";
	pancake.src = "data/lv1-pancake.png";
}
