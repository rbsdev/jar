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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    sprite = game.add.sprite(200, 200, 'max');

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    sprite.body.velocity.setTo(0, 0);
    
    //  This makes the game world bounce-able
    sprite.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    sprite.body.bounce.setTo(0, 0);
  },

  update: function() {
    if (cursors.up.isDown)
    {
        sprite.body.acceleration.y = -600;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.acceleration.y = 600;
    }
    // else if (cursors.left.isDown)
    // {
    //     sprite.body.acceleration.x = -500;
    // }
    // else if (cursors.right.isDown)
    // {
    //     sprite.body.acceleration.x = 500;
    // }
    else
    {
        sprite.frame = 4;
        sprite.body.acceleration.setTo(0,0);
    }
  }
});
