var Movement = require('./movement.js');
var Player = require('./player.js');
var Scenario = require('./scenario.js');
var Interface = require('./interface.js');

var width = window.innerWidth;
var height = window.innerHeight;

var meteor;
var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('sky', 'image/sky.png');
    game.load.image('max', 'image/max.png');
    game.load.image('meteor', 'image/giba.png');
  },

  create: function() {
    Scenario.initialize(game, width, height);
    Movement.initialize(game);
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

    // var meteors = game.add.group();
    // meteors.enableBody = true;
    // meteors.physicsBodyType = Phaser.Physics.ARCADE;

    meteor = game.add.sprite(200, 200, 'meteor');
    this.game.physics.enable(element, window.Phaser.Physics.ARCADE);
  },

  update: function() {
    Scenario.walk();
    Movement.render();
  }
});