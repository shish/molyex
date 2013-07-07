function cg6() {
	canvas.onclick = null;
	active_ideas = [];

	var bg = new Image();
	var loaded=0, toload=1;
	var timer;

	function goWhenReady() {if(++loaded == toload) go();}
	bg.onload = goWhenReady();

	function go() {
		context.drawImage(bg, 0, 0);

		textBox(
			"Well done! You have completed a day in the life",
			"of Peter Molyneux. If you enjoyed that, why not",
			"become a visionary game designer yourself?",
			function() {
				clearInterval(timer);
				title();
			}
		);
	}

	bg.src = "data/cg6-bg.jpg";
}
