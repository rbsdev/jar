var Controller = require('./controller.js');
var Scenario = require('./scenario.js');

var width = window.innerWidth;
var height = window.innerHeight;

// console.log('evandro');
var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('sky', 'image/sky.png');
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    Scenario.initialize(game, width, height);
    Controller.initialize(game);
  },

  update: function() {
    Scenario.walk();
    Controller.walk();
  }
});