var Spaceship = require('./spaceship.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var Interface = require('./interface.js');
var Spaceship = require('./spaceship.js');
var MeteorGroup = require('./meteor-group.js');

var width = window.innerWidth;
var height = window.innerHeight > 1440 ? 1440 : window.innerHeight;

window.main = function() {
  var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
    preload: function() {
      game.load.image('layer01', 'image/layer01.png');
      game.load.image('layer02', 'image/layer02.png');
      game.load.image('layer03', 'image/layer03.png');
      game.load.image('layer04', 'image/layer04.png');
      game.load.image('layer05', 'image/layer05.png');
      game.load.image('layer06', 'image/layer06.png');
      game.load.image('layer07', 'image/layer07.png');
      game.load.image('layer08', 'image/layer08.png');
      game.load.image('layer09', 'image/layer09.png');
      game.load.image('layer10', 'image/layer10.png');
      game.load.image('layer11', 'image/layer11.png');
      game.load.image('layer12', 'image/layer12.png');
      game.load.image('spaceship', 'image/spaceship.png');

      var userAvatarUrl = user && user.avatar_url ? user.avatar_url : 'image/max.png';

      game.load.crossOrigin = 'anonymous';
      game.load.image('sky', 'image/sky.png');
      game.load.image('max', userAvatarUrl);
      game.load.image('meteor', 'image/giba.png');
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

      var meteorGroup = new MeteorGroup(game, 10);
      meteorGroup.create();
    },

    update: function() {
      Scenario.render();
      Spaceship.render();
    }
  });
};
