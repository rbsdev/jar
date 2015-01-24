var Movement = {
  initialize: function(game, element) {
    this.element = element;
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