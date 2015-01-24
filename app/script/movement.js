var Movement = {
  initialize: function(game) {
    game.physics.startSystem(window.Phaser.Physics.ARCADE);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.movement = game.add.sprite(200, 200, 'max');

    game.physics.enable(this.movement, window.Phaser.Physics.ARCADE);

    this.movement.body.velocity.setTo(0, 0);
    this.movement.body.collideWorldBounds = true;
    this.movement.body.bounce.setTo(0, 0);

    return this;
  },

  walk: function() {
    if (this.cursors.up.isDown) {
      this.movement.body.acceleration.y = -600;
      return;
    } 

    if (this.cursors.down.isDown) {
      this.movement.body.acceleration.y = 600;
      return;
    }

    this.movement.frame = 4;
    this.movement.body.acceleration.setTo(0,0);

    return this;
  }
};

module.exports = Movement;