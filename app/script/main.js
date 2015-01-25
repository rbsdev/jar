var Spaceship = require('./spaceship.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var Elements = require('./interface.js');

window.main = function() {
  var game = new window.Phaser.Game(window.innerWidth, window.innerHeight, window.Phaser.AUTO, '', {
    preload: function() {
      game.load.image('layer01', 'image/layer01.png');
      game.load.image('layer02', 'image/layer02.png');
      game.load.image('layer03', 'image/layer03.png');
      game.load.image('spaceship', 'image/spaceship.png');
      game.load.image('meteor', 'image/meteor.png');
    },

    create: function() {
      game.player = Player.initialize(100, 100, 'Evandro');
      game.scenario = Scenario.initialize(game);
      game.spaceship = Spaceship.initialize(game);
      game.elements = Elements.initialize(game);

      game.elements.import({
        name: 'timer',
        module: require('./timer.js')
      });

      game.elements.import({
        name: 'life',
        module: require('./life.js')
      }).render('life', '100');

      game.elements.import({
        name: 'power',
        module: require('./power.js')
      }).render('power', '100');
    },

    update: function() {
      game.scenario.render();
      game.spaceship.render();
      game.elements.render('timer');
    }
  }, false, false);
};
