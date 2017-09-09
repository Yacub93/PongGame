//create new game, pass resolution of canvas: X,Y axis
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});



function preload() {
	game.load.image('paddle', 'assets/paddle.png');
}

var paddle1;
var paddle2;


function create() {
		

	 paddle1 = createPaddle(0, game.world.centerY);
	 paddle2 = createPaddle(game.world.width - 16, game.world.centerY);

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

function controlPaddle(paddle, y) {
	paddle.y = y;

	if (paddle.y < paddle.height / 2) {
		paddle.y = paddle.height / 2;
	} else if (paddle.y > game.world.height - paddle.height / 2) {
		paddle.y = game.world.height - paddle.height / 2;
	}
}