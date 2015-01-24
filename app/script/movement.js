var Movement = {
  initialize: function(game, element) {
    this.element = element;
    this.game = game;
    this.x = 10;

    this.game.physics.startSystem(window.Phaser.Physics.ARCADE);
    this.game.physics.enable(this.element, window.Phaser.Physics.ARCADE);
    return this;
  },

  render: function() {
    
    if (this.game.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 2;
    } else {
      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 2;
      }
    }
    
    this.game.input.activePointer.x = this.x;
    this.game.physics.arcade.moveToPointer(this.element, 1, this.game.input.activePointer, 400);
    return this;
  }
};

module.exports = Movement;