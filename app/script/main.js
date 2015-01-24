var Scenario = require('./scenario.js');
var Movement = require('./movement.js');
var Player = require('./player.js');
var Interface = require('./interface.js');
var Spaceship = require('./spaceship.js');

var width = window.innerWidth;
var height = window.innerHeight;

window.main = function(user) {
  var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
    preload: function() {
      var userAvatarUrl = user && user.avatar_url ? user.avatar_url : 'image/max.png';

      game.load.crossOrigin = 'anonymous';
      game.load.image('sky', 'image/sky.png');
      game.load.image('max', userAvatarUrl);
    },

    create: function() {
      var userName = user && user.name ? user.name : 'Max';
      Scenario.initialize(game, width, height);
      var spaceship = Spaceship.get(game);
      Movement.initialize(game, spaceship);
      
      Player.initialize(100, 100, userName);

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
      Scenario.walk();
      Movement.render();
    }
  });
};
