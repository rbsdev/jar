var Spaceship = {
  initialize: function(game) {
    this.phaser = game.phaser;
    
    // spaceship
    this.element = this.phaser.add.sprite(40, (this.phaser.stage.height / 2) - 40, 'test');
    this.phaser.physics.arcade.enable(this.element);
    this.element.anchor.set(0,0.5);
    this.element.width = 80;
    this.element.height = 80;
    this.element.body.immovable = false;
    this.x = 0;

    return this;
  },

  render: function() {
    if (this.phaser.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 5;
    } else {
      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 10;
      }
    }
    
    this.phaser.input.activePointer.x = this.x;
    this.phaser.physics.arcade.moveToPointer(this.element, 1, this.phaser.input.activePointer, 250);

    return this;
  }
};

module.exports = Spaceship;