var Life = {
  total: 3,

  initialize: function() {
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
