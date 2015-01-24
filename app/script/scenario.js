var Scenario = {
  initialize: function(game, width, height) {
    this.scaleY = window.innerHeight / window.innerWidth;
    this.layer12 = game.add.tileSprite(0, 0, width, height, 'layer12');
    this.layer11 = game.add.tileSprite(0, 0, width, height, 'layer11');
    this.layer10 = game.add.tileSprite(0, 0, width, height, 'layer10');
    this.layer9 = game.add.tileSprite(0, 0, width, height, 'layer09');
    this.layer8 = game.add.tileSprite(0, 0, width, height, 'layer08');
    this.layer7 = game.add.tileSprite(0, 0, width, height, 'layer07');
    this.layer6 = game.add.tileSprite(0, 0, width, height, 'layer06');
    this.layer5 = game.add.tileSprite(0, 0, width, height, 'layer05');
    this.layer4 = game.add.tileSprite(0, 0, width, height, 'layer04');
    this.layer3 = game.add.tileSprite(0, 0, width, height, 'layer03');
    this.layer2 = game.add.tileSprite(0, 0, width, height, 'layer02');
    this.layer1 = game.add.tileSprite(0, 0, width, height, 'layer01');

    this.layer12.tileScale.y = this.scaleY;
    this.layer11.tileScale.y = this.scaleY;
    this.layer10.tileScale.y = this.scaleY;
    this.layer9.tileScale.y = this.scaleY;
    this.layer8.tileScale.y = this.scaleY;
    this.layer7.tileScale.y = this.scaleY;
    this.layer6.tileScale.y = this.scaleY;
    this.layer5.tileScale.y = this.scaleY;
    this.layer4.tileScale.y = this.scaleY;
    this.layer3.tileScale.y = this.scaleY;
    this.layer2.tileScale.y = this.scaleY;
    this.layer1.tileScale.y = this.scaleY;
  },

  render: function() {
    this.layer12.tilePosition.x -= 0.5;
    this.layer11.tilePosition.x -= 0.25;
    this.layer10.tilePosition.x -= 0.50;
    this.layer9.tilePosition.x -= 0.75;
    this.layer8.tilePosition.x -= 1;
    this.layer7.tilePosition.x -= 1.25;
    this.layer6.tilePosition.x -= 1.5;
    this.layer5.tilePosition.x -= 2;
    this.layer4.tilePosition.x -= 3;
    this.layer3.tilePosition.x -= 4;
    this.layer2.tilePosition.x -= 5;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;