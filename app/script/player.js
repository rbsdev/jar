var Player = {
  initialize: function(game) {
    game.physics.startSystem(window.Phaser.Physics.ARCADE);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.player = game.add.sprite(200, 200, 'max');

    game.physics.enable(this.player, window.Phaser.Physics.ARCADE);

    this.player.body.velocity.setTo(0, 0);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.setTo(0, 0);
  },

  walk: function() {
    if (this.cursors.up.isDown) {
      this.player.body.acceleration.y = -600;
      return;
    } 

    if (this.cursors.down.isDown) {
      this.player.body.acceleration.y = 600;
      return;
    }

    this.player.frame = 4;
    this.player.body.acceleration.setTo(0,0);
  }
};

module.exports = Player;
