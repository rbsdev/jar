var Elements = {
  initialize: function(game) {
    this.game = game;
    this.elements = {};
    return this;
  },

  import: function(element) {
    this.elements[element.name] = element.module.initialize(this.game);
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

module.exports = Elements;
