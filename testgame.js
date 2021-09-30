var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1850;
canvas.height = 700;
canvas.style = "position: centre; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border: 15px solid #ffffff";
document.body.appendChild(canvas);

var bgReady = true;
var bgImage = new Image();
bgImage.src = "images/background.png";

var heroReady = true;
var heroImage = new Image();
heroImage.src = "images/hero.png";

var eyeReady = true;
var eyeImage = new Image();
eyeImage.src = "images/eye.png";

//Speed
var hero = {
	speed: 386 
};
var eye = {
	speed: 0
};
var eyeCaught = 0;

//Kontrolki
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Centra i reset
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	
	eye.x = 96 + (Math.random() * (canvas.width - 500));
	eye.y = 96 + (Math.random() * (canvas.height - 500));
};

// Update game objects
var update = function (modifier) 	{
	//Gora
	if (38 in keysDown) { 
		hero.y -= hero.speed * modifier;
	}
	//Gora
    if (87 in keysDown) { 
		hero.y -= hero.speed * modifier;
	}
	//Dol
	if (40 in keysDown) { 
		hero.y += hero.speed * modifier;
    }
	//Dol
    if ( 83 in keysDown) { 
    hero.y += hero.speed * modifier;
    }
	//Lewo
	if (37 in keysDown) { 
		hero.x -= hero.speed * modifier;
	}
	//Lewo
    if (65 in keysDown) { 
		hero.x -= hero.speed * modifier;
	}
	//Prawo
	if (39 in keysDown) { 
		hero.x += hero.speed * modifier;
	}
	//Prawo
    if (68 in keysDown) { 
		hero.x += hero.speed * modifier;
	}

	//Touch scan
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

//Draw
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

	//Wynik
	ctx.fillStyle = "rgb(42, 30, 215)";
	ctx.font = "55px Lora";
	ctx.textAlign = "start";
	ctx.textBaseline = "top";
	ctx.fillText("Eyeball collection: " + eyeCaught, 32, 32);

	if (eyeCaught == 5)
	document.writeln("YOU WIN");

};

//
var loop = function () {
	var teraz = Date.now();
	var x = teraz - later;

	update(x / 1000);
	render();

	later = teraz;

	requestAnimationFrame(loop);
};

var later = Date.now();
reset();
loop();