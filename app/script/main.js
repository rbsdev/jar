var Player = require('./player.js');

var width = window.innerWidth;
var height = window.innerHeight;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    Player.initialize();
  },

  update: function() {
    Player.walk();
  }
});
