var Spaceship = require('./spaceship.js');
var Player = require('./player.js');
var Scenario = require('./scenario.js');
var Interface = require('./interface.js');

var width = window.innerWidth;
var height = window.innerHeight;

window.scaleX = 0;
window.scaleY = 0;

window.main = function() {
  var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
    preload: function() {
      game.load.image('layer01', 'image/layer01.png');
      game.load.image('layer02', 'image/layer02.png');
      game.load.image('layer03', 'image/layer03.png');
      game.load.image('spaceship', 'image/spaceship.png');
    },

    create: function() {
      Scenario.initialize(game, width, height);
      Spaceship.initialize(game);
      Player.initialize(100,100,'Evandro');
      Interface.initialize(game);

      Interface.import({
        name: 'timer',
        module: require('./timer.js')
      }).render('timer', '00:00:00');

      Interface.import({
        name: 'life',
        module: require('./life.js')
      }).render('life', '100');

      Interface.import({
        name: 'power',
        module: require('./power.js')
      }).render('power', '100');
    },

    update: function() {
      Scenario.render();
      Spaceship.render();
    }
  }, false, false);
};
