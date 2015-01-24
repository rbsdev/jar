// var Player = require('./player.js');
var Phaser = window.Phaser;

var width = window.innerWidth;
var height = window.innerHeight;

var sprite;
var cursors;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
    // game.load.spritesheet('max', 'image/max.png', 32, 48);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
    sprite = game.add.sprite(200, 200, 'max');

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(sprite);

    //  Modify a few body properties
    sprite.body.setZeroDamping();
    sprite.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    // game.physics.startSystem(Phaser.Physics.ARCATE);
    // Player.initialize(game);
  },

  update: function() {
    sprite.body.setZeroVelocity();

    if (cursors.up.isDown) {
      sprite.body.moveUp(400);
    } else if (cursors.down.isDown) {
      sprite.body.moveDown(400);
    }

    // Player.walk();
  }
});
