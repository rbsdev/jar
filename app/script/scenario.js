var Scenario ={
  initialize: function() {
    this.scenario = game.add.sprite(0, -400, 'sky');
    this.scenario.scale.set(2);

    game.physics.enable(this.controller, window.Phaser.Physics.ARCADE);

    this.scenario.body.velocity.setTo(0, 0);
    this.scenario.body.collideWorldBounds = true;
    this.scenario.body.bounce.setTo(0, 0);
  },

  walk: function() {
    this.scenario.body.acceleration.y = -50;
    if (this.scenario.x >= 300) {
      this.scenario.x += 0.01;
      this.scenario.y += 0.01;
    }
  }
};

module.exports = Scenario;