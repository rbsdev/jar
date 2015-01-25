var Scenario = {
  initialize: function(game) {
    var scaleX = game.stage.width / 2560;
    var scaleY = game.stage.height / 1440;

    this.layer3 = game.add.tileSprite(0, 0, game.stage.width, game.stage.height, 'layer03');
    this.layer2 = game.add.tileSprite(0, 0, game.stage.width, game.stage.height, 'layer02');
    this.layer1 = game.add.tileSprite(0, 0, game.stage.width, game.stage.height, 'layer01');

    this.layer3.anchor.set(0, 0);
    this.layer2.anchor.set(0, 0);
    this.layer1.anchor.set(0, 0);

    this.layer3.tileScale.x = scaleX;
    this.layer2.tileScale.x = scaleX;
    this.layer1.tileScale.x = scaleX;

    this.layer3.tileScale.y = scaleY;
    this.layer2.tileScale.y = scaleY;
    this.layer1.tileScale.y = scaleY;

    return this;
  },

  render: function() {
    this.layer3.tilePosition.x -= 0.5;
    this.layer2.tilePosition.x -= 1;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;