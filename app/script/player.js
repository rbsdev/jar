var Player = {
  initialize: function(game) {
    this.player = game.add.sprite(32, game.world.height - 150, 'max');
    game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();
  },

  walk: function() {
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');

      return;
    }

    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');

      return;
    }

    this.player.animations.stop();
    this.player.frame = 4;
  }
};

module.exports = Player;
