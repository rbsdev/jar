var Scenario ={
  initialize: function(game, width, height) {
    this.scenario = game.add.tileSprite(0, 0, width, height, 'sky');
  },

  walk: function() {
    this.scenario.tilePosition.x -= 0.2;
  }
};

module.exports = Scenario;