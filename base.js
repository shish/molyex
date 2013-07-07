var canvas = document.getElementById("c");
var context = canvas.getContext("2d");
var highscores = [
	["Test", 100],
	["Test", 0]
];
var score = 0;
var lv_score = 0;

var keys = {};
window.onkeydown = function(evt) {keys[String.fromCharCode((evt||window.event).keyCode)] = true;}
window.onkeyup = function(evt) {keys[String.fromCharCode((evt||window.event).keyCode)] = false;}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

var _nextevent = null;
function textBox(l1, l2, l3, next) {
	context.beginPath()
	context.rect(200, 100, 400, 100);
	context.fillStyle = "#AAA";
	context.fill();
	context.strokeWidth = 8;
	context.strokeStyle = "black";
	context.stroke();

	context.fillStyle = "#444";
	context.font = "10pt sans";
	context.fillText(l1, 210, 120);
	context.fillText(l2, 210, 140);
	context.fillText(l3, 210, 160);
	context.fillText("(Click to continue)", 450, 180);

	if(next != _nextevent) {
		canvas.onclick = null;
		_nextevent = next;
		setTimeout(function() {
			canvas.onclick = function(evt) {
				var xy = canvas.relMouseCoords(evt);
				if(xy.x > 200 && xy.x < 600 && xy.y > 100 && xy.y < 200) {
					next();
				}
			};
		}, 500);
	}
}

var active_ideas = [];
function have_idea() {
	var idea = idea_list[Math.floor(Math.random() * idea_list.length)]
	active_ideas.push(
		[idea]
	);
}
function collect_idea(evt) {
	active_ideas.pop();
	lv_score++;
}
function draw_ideas() {
	for(var i=0; i<active_ideas.length; i++) {
		textBox(active_ideas[i][0], "", "");
	}
}
