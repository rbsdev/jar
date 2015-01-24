var Scenario = require('./scenario.js');
var Movement = require('./movement.js');
var Player = require('./player.js');
var Interface = require('./interface.js');
var Spaceship = require('./spaceship.js');

var width = window.innerWidth;
var height = window.innerHeight;

// var meteors;

// var descend = function() {
//   meteors.y += 10;
// };

window.main = function(user) {
  var game = new window.Phaser.Game(width, height, window.Phaser.AUTO, '', {
    preload: function() {
      var userAvatarUrl = user && user.avatar_url ? user.avatar_url : 'image/max.png';

      game.load.crossOrigin = 'anonymous';
      game.load.image('sky', 'image/sky.png');
      game.load.image('max', userAvatarUrl);
      game.load.image('meteor', 'image/giba.png');
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
      // meteors = game.add.group();
      // meteors.enableBody = true;
      // meteors.physicsBodyType = window.Phaser.Physics.ARCADE;

      // var meteor1 = meteors.create(3*48, 3*50, 'meteor');
      // meteor1.body.moves = true;

      // var meteor2 = meteors.create(2*48, 2*50, 'meteor');
      // meteor2.body.moves = true;
      // meteor1.anchor.setTo(1, 1);
      // meteor1.animations.add('fly', [0, 1, 2, 3], 20, true);
      // meteor1.play('fly');

      // meteors.x = 100;
      // meteors.y = 50;

      // var tween = game.add.tween(meteors).to( { x: 200 }, 2000, window.Phaser.Easing.Linear.None, true, 0, 1000, true);
      // tween.onLoop.add(descend, this);
    },

    update: function() {
      Scenario.walk();
      Movement.render();
    }
  });
};
