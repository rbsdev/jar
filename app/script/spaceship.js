var spaceship = function(game) {
  if (this.element) { return this.element; }

  this.game = game;
  this.element = this.game.add.sprite(200, 200, 'max');

  return this.element;
};

module.exports = spaceship;