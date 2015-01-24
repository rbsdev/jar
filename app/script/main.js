//var preload = require('./preload.js');
//var create = require('./create.js');

var Phaser = window.Phaser;
var cursors;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: function() {
    game.load.spritesheet('max', 'image/dude.png', 32, 48);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCATE);

    var player = game.add.sprite(32, game.world.height - 150, 'max');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

   cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //if (cursors.left.isDown) {
      //player.body.velocity.x
    //}
  }
});
