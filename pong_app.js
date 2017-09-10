//create new game, pass resolution of canvas: X,Y axis
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});



function preload() {
	game.load.image('paddle', 'assets/paddle.png');
	// game.load.image('paddle', 'assets/paddle2');
	game.load.image('ball', 'assets/ball.png');
}

var paddle1;
var paddle2;
var paddle3;
var ball;
var ball_launched = false;
var ball_velocity = 400;

function create() {
		
	 paddle1 = createPaddle(0, game.world.centerY);
	 paddle2 = createPaddle(game.world.width - 16, game.world.centerY);
	 ball    = create_ball(game.world.centerX, game.world.centerY);

	 game.input.onDown.add(launch_ball, this);

}

function update() {
	controlPaddle(paddle1, game.input.y);
}

function createPaddle(x,y) {
	var paddle = game.add.sprite(x,y,'paddle');
	paddle.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;

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


