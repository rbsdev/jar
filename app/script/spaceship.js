var Spaceship = {
  initialize: function(game) {
    this.phaser = game.phaser;
    
    // spaceship
    this.element = this.phaser.add.sprite(160, 75, 'spaceship');
    this.phaser.physics.arcade.enable(this.element);
    // this.element.anchor.set(0,0.5);
    // this.element.width = 160;
    // this.element.height = 75;
    this.element.body.immovable = false;
    this.x = 0;

    this.setAnimations();
    this.setSounds();

    this.element.animations.play('normal');

    return this;
  },

  setAnimations: function () {
    this.element.animations.add('normal', [0, 1], 4, true, true);
    this.element.animations.add('boost', [2, 3], 4, true, true);
    this.element.animations.add('hit', [0, 4], 4, false, true);
    this.element.animations.add('low-fuel', [5, 6, 5, 6, 7], 10, true, true);
  },

  setSounds: function () {
    var fx = this.phaser.add.audio('engine');
    fx.allowMultipe = true;
    fx.addMarker('slow', 0, 2, 1, true);

    fx.play('slow');
  },

  render: function() {
    if (this.phaser.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 5;
      this.element.animations.play('boost');
    } else {
      this.element.animations.play('normal');

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