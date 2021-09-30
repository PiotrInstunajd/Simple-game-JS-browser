// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1900;
canvas.height = 700;
canvas.style = "position: centre; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:5px";
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;0
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Eye image
var eyeReady = false;
var eyeImage = new Image();
eyeImage.onload = function () {
	eyeReady = true;
};
eyeImage.src = "images/eye.png";

// Game objects
var hero = {
	speed: 386 // movement in pixels per second
};
var eye = {
	speed: 128
};
var eyeCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a eye
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the eye somewhere on the screen randomly
	eye.x = 96 + (Math.random() * (canvas.width - 500));
	eye.y = 96 + (Math.random() * (canvas.height - 500));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
    if (87 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
    }
    
    if ( 83 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
    }

	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}

    if (65 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
    
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

    if (68 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (eye.x + 64)
		&& eye.x <= (hero.x + 64)
		&& hero.y <= (eye.y + 64)
		&& eye.y <= (hero.y + 64)
	) {
		++eyeCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (eyeReady) {
		ctx.drawImage(eyeImage, eye.x, eye.y);
	}

	// Score
	ctx.fillStyle = "rgb(42, 30, 215)";
	ctx.font = "46px Helvetica";
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
	ctx.fillText("Eyeball collection: " + eyeCaught, 32, 32);

	if (eyeCaught == 10)
	document.writeln("Winner");
	

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
var then = Date.now();
reset();
main();

