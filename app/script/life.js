var Life = {
  total: 3,

  initialize: function(game) {
    return this;
  },

  render: function(value) {
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
