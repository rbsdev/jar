var Player = require('./player.js');
var Phaser = window.Phaser;

var game = new window.Phaser.Game(window.innerWidth, window.innerHeight, window.Phaser.AUTO, '', {
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
