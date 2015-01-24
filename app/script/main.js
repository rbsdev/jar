var Controller = require('./controller.js');

var width = window.innerWidth;
var height = window.innerHeight;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    Controller.initialize(game);
  },

  update: function() {
    Controller.walk();
  }
});