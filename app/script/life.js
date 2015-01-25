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
    return this;
  },

  increase: function() {
    this.total++;
    return this;
  }
};

module.exports = Life;
