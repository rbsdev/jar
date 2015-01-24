var Player = require('./player.js');
var Phaser = window.Phaser;

var width = window.innerWidth;
var height = window.innerHeight;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
    // game.load.spritesheet('max', 'image/max.png', 48, 48);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCATE);
    Player.initialize(game);
  },

  update: function() {
    Player.walk();
  }
});
