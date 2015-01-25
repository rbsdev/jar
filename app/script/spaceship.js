var Spaceship = {
  initialize: function(phaser) {
    this.phaser = phaser;
    this.element = phaser.add.sprite(170, 48, 'spaceship');
    this.element.anchor.setTo(0, 0.65);
    this.x = 10;
    phaser.physics.startSystem(window.Phaser.Physics.ARCADE);
    phaser.physics.enable(this.element, window.Phaser.Physics.ARCADE);

    return this;
  },

  render: function() {
    if (this.phaser.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 2;
    } else {
      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 5;
      }
    }
    
    this.phaser.input.activePointer.x = this.x;
    this.phaser.physics.arcade.moveToPointer(this.element, 1, this.phaser.input.activePointer, 300);

    return this;
  }
};

module.exports = Spaceship;