var Spaceship = function(game) {
  this.game = game;
  this.element = this.game.add.sprite(200, 200, 'max');
  return this.element;
};

module.exports = Spaceship;
