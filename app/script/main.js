var Movement = require('./movement.js');
var Player = require('./player.js');
var Interface = require('./interface/index.js');

var game = new window.Phaser.Game(window.innerWidth, window.innerHeight, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    // set movements
    Movement.initialize(game);

    // set player
    Player.initialize(100,100,'Evandro');

    // render timer
    Interface.initialize(game).import({
      name: 'timer',
      module: require('./interface/timer.js')
    }).render('timer', '00:00:00');

    // render life
    Interface.import({
      name: 'life',
      module: require('./interface/life.js')
    }).render('life', '100');

    // render power
    Interface.import({
      name: 'power',
      module: require('./interface/power.js')
    }).render('power', '100');
  },

  update: function() {
    Movement.walk();
  }
});