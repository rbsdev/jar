var Scenario = {
  initialize: function(game, width, height) {
    this.layer3 = game.add.tileSprite(0, 0, width, height, 'layer03');
    this.layer2 = game.add.tileSprite(0, 0, width, height, 'layer02');
    this.layer1 = game.add.tileSprite(0, 0, width, height, 'layer01');

    this.layer3.anchor.set(0, 0);
    this.layer2.anchor.set(0, 0);
    this.layer1.anchor.set(0, 0);
    this.layer3.tileScale.y = 0.525;
    this.layer2.tileScale.y = 0.525;
    this.layer1.tileScale.y = 0.525;
  },

  render: function() {
    this.layer3.tilePosition.x -= 0.5;
    this.layer2.tilePosition.x -= 1;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;