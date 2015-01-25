var Spaceship = {
  initialize: function(game) {
    this.game = game;
    this.element = this.game.add.sprite(170, 48, 'spaceship');
    this.element.anchor.setTo(0, 0.65);
    // this.element.collideWorldBounds = true;
    this.x = 10;
    this.game.physics.startSystem(window.Phaser.Physics.ARCADE);
    this.game.physics.enable(this.element, window.Phaser.Physics.ARCADE);

    this.setSounds();

    return this.element;
  },

  setSounds: function () {
    var fx = this.game.add.audio('engine');
    fx.allowMultipe = true;
    fx.addMarker('slow', 0, 2, 0.2, true);

    fx.play('slow');
  },

  render: function() {
    if (this.game.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 2;
    } else {
      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 5;
      }
    }
    
    this.game.input.activePointer.x = this.x;
    this.game.physics.arcade.moveToPointer(this.element, 1, this.game.input.activePointer, 300);

    return this;
  }
};

module.exports = Spaceship;