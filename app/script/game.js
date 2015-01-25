var Spaceship = require('./spaceship.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var Elements = require('./elements.js');
var World = require('./world.js');

var Game = window.Game = {
  initialize: function(Phaser) {
    this.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
      preload: this.preload,
      create: this.create,
      update: this.update
    }, false, false);
  },

  preload: function() {
    Game.phaser.load.spritesheet('spaceship', 'image/spaceship.png', 200, 168, 9);
    Game.phaser.load.image('layer01', 'image/layer01.png');
    Game.phaser.load.image('layer02', 'image/layer02.png');
    Game.phaser.load.image('layer03', 'image/layer03.png');
    Game.phaser.load.image('meteor', 'image/meteor.png');
  },

  create: function() {
    Game.player = Player.initialize(100, 100, 'Evandro');
    Game.scenario = Scenario.initialize(Game);
    Game.elements = Elements.initialize(Game);
    Game.world = World.initialize(Game);
    Game.spaceship = Spaceship.initialize(Game);

    Game.elements.import({
      name: 'timer',
      module: require('./timer.js')
    });

    Game.elements.import({
      name: 'life',
      module: require('./life.js')
    }).render('life', '100');

    Game.elements.import({
      name: 'power',
      module: require('./power.js')
    }).render('power', '100');
  },

  update: function() {
    Game.scenario.render();
    Game.spaceship.render();
    Game.elements.render('timer');
    Game.phaser.physics.arcade.collide(Game.spaceship.element, Game.world.elements, this.hit, null, this);
  },

  hit: function (spaceship, world) {
    console.log('wip - damage/kill/kill/elements', spaceship, world);
  }
};
