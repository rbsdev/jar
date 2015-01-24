var Spaceship = function(game) {
  this.element = game.add.sprite(200, 200, 'max');
  this.element.anchor.setTo(0, 0.5);

  return this.element;
};

module.exports = Spaceship;
