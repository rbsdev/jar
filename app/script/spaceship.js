var Spaceship = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.fx = {};
    this.boosting = false;
    
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
    this.element.animations.add('boost', [2, 3], 15, true, true);
    this.element.animations.add('hit', [0, 4, 0, 4], 4, false, true);
    this.element.animations.add('low-fuel', [5, 6, 5, 6, 7], 10, true, true);
  },

  setSounds: function () {
    var fx = this.phaser.add.audio('engine');
    fx.addMarker('slow', 0, 2, 1, true);

    var boostFx = this.phaser.add.audio('boost');
    boostFx.addMarker('boosting', 5, 2, 1, true);

    this.fx.engine = fx;
    this.fx.boost = boostFx;

    this.fx.engine.play('slow');
  },

  animate: function (animation) {
    if (!this.element.animations._anims.hit.isPlaying) {
      this.element.animations.play(animation);
    }
  },

  playAudio: function () {
    if (this.boosting && this.fx.engine.isPlaying) {
      this.fx.engine.stop();
      this.fx.boost.play('boosting');
    }

    if (this.boosting && !this.fx.boost.isPlaying) {
      this.fx.boost.play('boosting');
    }

    if (!this.boosting && this.fx.boost.isPlaying) {
      this.fx.boost.stop();
    }

    if (!this.boosting && !this.fx.engine.isPlaying) {
      this.fx.engine.play('slow');
    }
  },

  render: function() {
    if (this.phaser.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 5;

      this.boosting = true;
      this.animate('boost');
    } else {
      this.boosting = false;
      this.animate('normal');

      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 10;
      }
    }
    
    this.playAudio();
    this.phaser.input.activePointer.x = this.x;
    this.phaser.physics.arcade.moveToPointer(this.element, 1, this.phaser.input.activePointer, 250);

    return this;
  }
};

module.exports = Spaceship;