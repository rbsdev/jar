var Spaceship = {
  get: function(game) {
    if (this.element) { return this.element; }
    this.element = game.add.sprite(200, 200, 'max');
    return this.element;
  }
};

module.exports = Spaceship;