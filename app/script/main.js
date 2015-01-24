var Movement = require('./movement.js');
var Player = require('./player.js');
var Interface = require('./interface.js');
var Spaceship;

var game = new window.Phaser.Game(window.innerWidth, window.innerHeight, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    // set spaceship
    Spaceship = require('./spaceship.js')(game);

    // set movements
    Movement.initialize(game, Spaceship);

    // set player
    Player.initialize(100,100,'Evandro');

    // set interface
    Interface.initialize(game);

    // render timer
    Interface.import({
      name: 'timer',
      module: require('./timer.js')
    }).render('timer', '00:00:00');

    // render life
    Interface.import({
      name: 'life',
      module: require('./life.js')
    }).render('life', '100');

    // render power
    Interface.import({
      name: 'power',
      module: require('./power.js')
    }).render('power', '100');
  },

  update: function() {
    Movement.render();
  }
});