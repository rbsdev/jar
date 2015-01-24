var Movement = require('./movement.js');
var Player = require('./player.js');
var Interface = require('./interface/index.js');
var Controller = require('./controller.js');
var Scenario = require('./scenario.js');

var width = window.innerWidth;
var height = window.innerHeight;

var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('sky', 'image/sky.png');
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    Scenario.initialize(game, width, height);
    Controller.initialize(game);
    Movement.initialize(game);
    Player.initialize(100,100,'Evandro');
    Interface.initialize(game);

    Interface.import({
      name: 'timer',
      module: require('./interface/timer.js')
    }).render('timer', '00:00:00');

    Interface.import({
      name: 'life',
      module: require('./interface/life.js')
    }).render('life', '100');

    Interface.import({
      name: 'power',
      module: require('./interface/power.js')
    }).render('power', '100');
  },

  update: function() {
    Movement.walk();
    Scenario.walk();
    Controller.walk();
  }
});