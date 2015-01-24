//var preload = require('./preload.js');
//var create = require('./create.js');
var update = require('./update.js');

var game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, '', {
  preload: function() {
    game.load.image('max', 'image/max.png');
  },

  create: function() {
    game.add.sprite(0, 0, 'max');
  },
  update: update
});
