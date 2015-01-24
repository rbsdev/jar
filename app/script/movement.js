var spaceship = function(game) {
  this.game = game;
  this.element = this.game.add.sprite(200, 200, 'max');

  return this.element;
};

var Movement = {
  initialize: function(game) {
    this.element = spaceship(game);
    this.game = game;

    this.game.physics.startSystem(window.Phaser.Physics.ARCADE);
    this.game.physics.enable(this.element, window.Phaser.Physics.ARCADE);
    return this;
  },

  render: function() {
    this.game.input.activePointer.x = false;
    this.game.physics.arcade.moveToPointer(this.element, 50, this.game.input.activePointer, 400);
    return this;
  }
};

module.exports = Movement;