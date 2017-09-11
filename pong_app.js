//create new game, pass resolution of canvas: X,Y axis
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});



function preload() {
	game.load.image('paddle', 'assets/paddle.png');
	// game.load.image('paddle', 'assets/paddle2');
	game.load.image('ball', 'assets/ball.png');

	game.load.audio('hit_1',['assets/pongblip1.ogg','assets/pongblip1.wav']);
	game.load.audio('hit_2',['assets/pongblip2.ogg','assets/pongblip2.wav']);
}

var paddle1;
var paddle2;
// var paddle3;
var ball;
var ball_launched = false;
var ball_velocity = 400;

var score1;
var score2;
var score1_text;
var score2_text;

function create() {
		
	 paddle1 = createPaddle(0, game.world.centerY);
	 paddle2 = createPaddle(game.world.width - 8, game.world.centerY);
	 ball    = create_ball(game.world.centerX, game.world.centerY);

	 game.input.onTap.add(launch_ball, this);

	 score1_text = game.add.text(128,128,'0',{
	 	font: "64px Gabriela", 
	 	fill: "#ffffff",
	 	align: "center"
	 });

	score2_text = game.add.text(game.world.width -128,128, '0',{
	 	font: "64px Gabriela", 
	 	fill: "#ffffff",
	 	align: "center"
	 });

score1 = 0;
score2 = 0;

}

function update() {
	score1_text.text = score1;
	score2_text.text = score2;

	controlPaddle(paddle1, game.input.y);

	game.physics.arcade.collide(paddle1,ball,function() {
		game.sound.play('hit_1');
	});
	game.physics.arcade.collide(paddle2,ball,function() {
		game.sound.play('hit_2');
	});

	if (ball.body.blocked.left) {
		console.log("Player 2 Scores!");
		score2 += 1;

	}
	else if (ball.body.blocked.right) {
		console.log("Player 1 Scores!");
		score1 += 1;
	}

	paddle2.body.velocity.setTo(ball.body.velocity.y);
	paddle2.body.velocity.x = 0;
	paddle2.body.maxVelocity.y = 250;
}

function createPaddle(x,y) {
	var paddle = game.add.sprite(x,y,'paddle');
	paddle.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;
	paddle.body.immovable = true;
	paddle.scale.setTo(0.5,0.5);

	return paddle;
}

function create_ball(x,y) {
	ball = game.add.sprite(x,y,'ball');
	ball.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1,1); //bounce property

	return ball;
}

function launch_ball() {
	if (ball_launched) {
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
	} else {
		ball.body.velocity.x = ball_velocity;
		ball.body.velocity.y = ball_velocity;
		ball_launched = true;
	}
}


function controlPaddle(paddle, y) {
	paddle.y = y;

	if (paddle.y < paddle.height / 2) {
		paddle.y = paddle.height / 2;
	} else if (paddle.y > game.world.height - paddle.height / 2) {
		paddle.y = game.world.height - paddle.height / 2;
	}
}


