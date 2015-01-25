var Life = {
  total: 3,

  initialize: function(game) {
    return this;
  },

  render: function(value) {
    return this;
  },

  lose: function() {
    this.total--;
    return this;
  },

  earn: function() {
    this.total++;
    return this;
  }
};

module.exports = Life;
