var Controller = {
  initialize: function(game) {
    game.physics.startSystem(window.Phaser.Physics.ARCADE);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.controller = game.add.sprite(200, 200, 'max');

    game.physics.enable(this.controller, window.Phaser.Physics.ARCADE);

    this.controller.body.velocity.setTo(0, 0);
    this.controller.body.collideWorldBounds = true;
    this.controller.body.bounce.setTo(0, 0);
  },

  walk: function() {
    if (this.cursors.up.isDown) {
      this.controller.body.acceleration.y = -600;
      return;
    } 

    if (this.cursors.down.isDown) {
      this.controller.body.acceleration.y = 600;
      return;
    }

    this.controller.frame = 4;
    this.controller.body.acceleration.setTo(0,0);
  }
};

module.exports = Controller;