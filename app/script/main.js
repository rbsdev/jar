var Player = require('./player.js');
var Phaser = window.Phaser;

var width = window.innerWidth;
var height = window.innerHeight;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.spritesheet('max', 'image/dude.png', 32, 48);
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCATE);
    Player.initialize(game);
  },

  update: function() {
    Player.walk();
  }
});
