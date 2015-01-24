var Interface = function(game) {
  this.game     = game;
  this.elements = {};
};

Interface.prototype = {
  import: function(element) {
    this.elements[element.name] = new element.module(this.game);
    return this;
  },

  render: function(element, value) {
    this.elements[element].render(value);
    return this;
  },

  update: function(element, value) {
    this.elements[element].update(value);
    return this;
  },

  delete: function(element, value) {
    this.elements[element].delete(value);
    return this;
  }
};

module.exports = Interface;
