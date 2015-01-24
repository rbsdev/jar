var Player = require('./player.js');
var Phaser = window.Phaser;
// var cursors;
// var player;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
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
