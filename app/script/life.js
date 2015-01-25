var Player = require('./player.js');

var Life = {
  initialize: function(game) {
    this.game = game;
    this.total = 3;
    return this;
  },

  render: function() {
    return this;
  },

  decrease: function() {
    this.total--;
    if (this.total === 0) { Player.dead(); }

    return this;
  },

  increase: function() {
    this.total++;
    return this;
  }
};

module.exports = Life;
