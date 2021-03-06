(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Elements = {
  initialize: function(game) {
    this.game = game;
    this.elements = {};
    return this;
  },

  import: function(element) {
    this.elements[element.name] = element.module.initialize(this.game);
    return this;
  },

  render: function(element, value) {
    this.elements[element].render(value);
    return this;
  },

  update: function(element, value) {
    this.elements[element].update(value);
    return this;
  },

  delete: function(element, value) {
    this.elements[element].delete(value);
    return this;
  }
};

module.exports = Elements;

},{}],2:[function(require,module,exports){
var Spaceship = require('./spaceship.js');
var Scenario = require('./scenario.js');
var Player = require('./player.js');
var Elements = require('./elements.js');
var World = require('./world.js');
var Life = require('./life.js');
var Power = require('./power.js');

var Game = window.Game = {
  initialize: function(Phaser, user) {
    this.user = user;
    this.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
      preload: this.preload,
      create: this.create,
      update: this.update
    }, false, false);
  },

  preload: function() {
    Game.phaser.load.spritesheet('spaceship', 'image/spaceship-spr.png', 160, 75, 8);
    Game.phaser.load.audio('engine', ['sound/boost.ogg', 'sound/boost.mp3']);
    Game.phaser.load.audio('boost', ['sound/boost.ogg', 'sound/boost.mp3']);
    Game.phaser.load.image('layer01', 'image/layer01.png');
    Game.phaser.load.image('layer02', 'image/layer02.png');
    Game.phaser.load.image('layer03', 'image/layer03.png');
    Game.phaser.load.image('meteor', 'image/meteor.png');
  },

  create: function() {
    Game.player = Player.initialize(Game, this.user);
    Game.scenario = Scenario.initialize(Game);
    Game.elements = Elements.initialize(Game);
    Game.world = World.initialize(Game);
    Game.spaceship = Spaceship.initialize(Game);

    Game.elements.import({
      name: 'timer',
      module: require('./timer.js')
    });

    Game.elements.import({
      name: 'life',
      module: Life,
    }).render('life', '100');

    Game.elements.import({
      name: 'power',
      module: Power,
    }).render('power', '100');
  },

  update: function() {
    Game.scenario.render();
    Game.spaceship.render();
    Game.elements.render('timer');
    Game.world.render();
    Game.phaser.physics.arcade.collide(Game.spaceship.element, Game.world.elements, Game.hit, null, this);

    Power.decrease(0.005);
  },

  hit: function (spaceship, element) {
    spaceship.animations.play('hit');

    if (element.key === 'meteor') {
      return Life.decrease(0.5);
    }
  }
};

},{"./elements.js":1,"./life.js":3,"./player.js":4,"./power.js":5,"./scenario.js":6,"./spaceship.js":7,"./timer.js":8,"./world.js":9}],3:[function(require,module,exports){
var Life,
    Player = require('./player.js');

Life = {
  amount: 100,

  initialize: function(game) {
    this.phaser = game.phaser;

    this.layer = this.phaser.add.group();
    this.size = this.phaser.world.height / 30 >> 0;

    this.layer.x = this.size;
    this.layer.y = this.size;

    this.text = {
      amount: new window.Phaser.Text(this.phaser, 0, 0, '100%', {
        fill: 'rgb(245, 242, 214)', // rgb(50, 47, 53)
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      }),

      title: new window.Phaser.Text(this.phaser, 0, 0, 'LIFE', {
        fill: 'rgb(245, 242, 214)',
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      })
    };

    this.text.amount.x = this.text.title.width + 15;

    this.layer.add(this.text.amount);
    this.layer.add(this.text.title);

    return this;
  },

  decrease: function(amount) {
    this.amount = Math.max(0, this.amount - amount);
    this.render();

    if (this.amount === 0) {
      Player.dead();
    }

    return this;
  },

  render: function() {
    this.text.amount.text = (this.amount >> 0) + '%';

    return this;
  },

  reset: function() {
    this.amount = 100;
    this.render();

    return this;
  },
};

module.exports = Life;

},{"./player.js":4}],4:[function(require,module,exports){
// var Timer = require('./timer.js');

var Player = {
  initialize: function(game, name) {
    this.setAttr('attrs', {
      name: name
    }).resetPlayer();

    this.game = game;

    return this;
  },

  name: function() {
    return this.name;
  },

  life: function() {
    return this.life;
  },

  time: function() {
    return this.time;
  },

  power: function() {
    return this.life;
  },

  increase: function(attr, value) {
    this[attr] = (this[attr] + value);
    return this[attr];
  },

  dead: function() {
    // var tween = this.game.phaser.add.tween(Timer.text);

    this.game.phaser.paused = true;

    // tween.to({
    //   x: this.phaser.world.width >> 1,
    //   y: this.phaser.world.height >> 1
    // }, 1000);

    // tween.start();
  },

  decrease: function(attr, value) {
    this[attr] = (this[attr] - value);
    return this[attr];
  },

  setAttr: function(attr, value) {
    this[attr] = value;
    return this;
  },

  resetPlayer: function() {
    this.setAttr('name', this.attrs.name);
    this.setAttr('life', this.attrs.life);
    this.setAttr('power', this.attrs.power);
    this.setAttr('time', this.attrs.time);
    return this;
  }
};

module.exports = Player;

},{}],5:[function(require,module,exports){
var Life = require('./life.js'),
    Power;

Power = {
  amount: 100,

  initialize: function(game) {
    this.phaser = game.phaser;

    this.layer = this.phaser.add.group();
    this.size = this.phaser.world.height / 30 >> 0;

    this.layer.x = Life.layer.width + (this.size * 3);
    this.layer.y = this.size;

    this.text = {
      amount: new window.Phaser.Text(this.phaser, 0, 0, '100%', {
        fill: 'rgb(245, 242, 214)', // rgb(50, 47, 53)
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      }),

      title: new window.Phaser.Text(this.phaser, 0, 0, 'FUEL', {
        fill: 'rgb(245, 242, 214)',
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      })
    };

    this.text.amount.x = this.text.title.width + 15;

    this.layer.add(this.text.amount);
    this.layer.add(this.text.title);

    return this;
  },

  decrease: function(amount) {
    this.amount = Math.max(0, this.amount - amount);
    this.render();

    if (this.amount === 0) {
      Life.decrease(100);
    }

    return this;
  },

  render: function() {
    this.text.amount.text = (this.amount >> 0) + '%';

    return this;
  },

  reset: function() {
    this.amount = 100;
    this.render();

    return this;
  },
};

module.exports = Power;

},{"./life.js":3}],6:[function(require,module,exports){
var Scenario = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.layer3 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer03');
    this.layer2 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer02');
    this.layer1 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer01');

    this.layer3.anchor.set(0, 0);
    this.layer2.anchor.set(0, 0);
    this.layer1.anchor.set(0, 0);

    this.scaleX = this.phaser.stage.width / 2560;
    this.scaleY = this.phaser.stage.height / 1440;

    this.layer3.tileScale.x = this.scaleX;
    this.layer2.tileScale.x = this.scaleX;
    this.layer1.tileScale.x = this.scaleX;

    this.layer3.tileScale.y = this.scaleY;
    this.layer2.tileScale.y = this.scaleY;
    this.layer1.tileScale.y = this.scaleY;

    return this;
  },

  render: function() {
    this.layer3.tilePosition.x -= 0.5;
    this.layer2.tilePosition.x -= 1;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;
},{}],7:[function(require,module,exports){
var Power = require('./power.js');

var Spaceship = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.fx = {};
    this.boosting = false;
    
    // spaceship
    this.element = this.phaser.add.sprite(160, 75, 'spaceship');
    this.phaser.physics.arcade.enable(this.element);
    this.element.body.immovable = false;
    this.x = 0;

    this.maxTop = Math.round(this.phaser.stage.height * 0.25) - (this.element.height);
    this.maxBottom = Math.round(this.phaser.stage.height * 0.75);

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

    this.boosting = false;
    this.animate('normal');

    if (this.phaser.input.keyboard.isDown(window.Phaser.Keyboard.SPACEBAR)) {
      this.x += 5;

      this.boosting = true;
      this.animate('boost');

      Power.decrease(0.05);
    } else {
      if (this.x <= 10) {
        this.x = 10;
      } else {
        this.x -= 10;
      }
    }

    if (this.phaser.input.activePointer.y < this.maxTop) {
      this.phaser.input.activePointer.y = this.maxTop;
    }

    if (this.phaser.input.activePointer.y > this.maxBottom) {
      this.phaser.input.activePointer.y = this.maxBottom;
    }
    
    this.playAudio();
    this.phaser.input.activePointer.x = this.x;
    this.phaser.physics.arcade.moveToPointer(this.element, 1, this.phaser.input.activePointer, 250);

    return this;
  }
};

module.exports = Spaceship;
},{"./power.js":5}],8:[function(require,module,exports){
var Timer = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.size = this.phaser.world.height / 30 >> 0;

    this.text = this.phaser.add.text(this.phaser.world.width - this.size, this.size, '00:00', {
      fill: 'rgb(50, 47, 53)',
      font: 'italic ' + this.size + 'px "Source Sans Pro"'
    });

    this.text.anchor.set(1, 0);

    return this;
  },

  pad: function(number) {
    var string = number.toString();

    if (string.length >= 2) {
      return string;
    }

    return '0' + string;
  },

  render: function() {
    var time = this.phaser.time.totalElapsedSeconds(),
        minutes = this.pad(time / 60 >> 0),
        seconds = this.pad(time % 60 >> 0);

    this.text.text = this.pad(minutes) + ':' + this.pad(seconds);

    return this;
  }
};

module.exports = Timer;

},{}],9:[function(require,module,exports){
var World = {
  initialize: function(game) {
    this.level = 6000;
    this.phaser = game.phaser;
    this.elements = this.phaser.add.group();
    this.elements.enableBody = true;

    // current colliders
    this.currentColliders = [];

    // set colliders routes
    this.collidersRoutes = [
        Math.round(this.phaser.stage.height * 0.25),
        Math.round(this.phaser.stage.height * 0.5),
        Math.round(this.phaser.stage.height * 0.75),
    ];

    // set colliders patterns
    this.collidersPatterns = [
      [{
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[0], 221, 213, 0.5, 0.5, 0, 0, false, 100, 100],
        delay: 0,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[1], 221, 213, 0.5, 0.5, 0, 0, false, 100, 100],
        delay: 1000,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[2], 221, 213, 0.25, 0.25, 0, 0, false, 100, 100],
        delay: 2000
      }],
      [{
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[0], 221, 213, 0.5, 0.5, 0, 0, false, 100, 100],
        delay: 2000,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[1], 221, 213, 0.5, 0.5, 0, 0, false, 100, 100],
        delay: 0,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[2], 221, 213, 0.5, 0.5, 0, 0, false, 100, 100],
        delay: 1000
      }],
      [{
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[0], 221, 213, 0.85, 0.85, 0, 0, false, 100, 100],
        delay: 2000,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[1], 221, 213, 0.85, 0.85, 0, 0, false, 100, 100],
        delay: 1000,
      },
      {
        element: ['meteor', this.phaser.stage.width, this.collidersRoutes[2], 221, 213, 1, 1, 0, 0, false, 100, 100],
        delay: 0
      }],
    ];

    this.generateColliders();

    return this;
  },

  generateColliders: function() {
    if (this.level > 3000) {
      this.level = this.level - (this.phaser.time.totalElapsedSeconds() * 10);
    }

    var colliders = this.collidersPatterns[Math.round(this.collidersPatterns.length * Math.random()) % this.collidersPatterns.length];
    for (var i = 0; i < colliders.length; i++) {
      this.insertCollider(this, colliders[i], this.currentColliders);
    }
    window.setTimeout(this.generateColliders.bind(this), this.level);
  },

  insertCollider: function(wolrd, collider, currentColliders) {
    window.setTimeout(function() {
      currentColliders.push(wolrd.createCollider.apply(wolrd, collider.element));
    }, collider.delay);
  },

  render: function() {
    for (var i = 0; i < this.currentColliders.length; i++) {
      var collider = this.currentColliders[i];

      if ((collider.x + collider.width) < 0) {
        this.elements.remove(collider);
      }
    }
  },

  createCollider: function(name, x, y, width, height, scaleX, scaleY, anchorX, anchorY, immovable, velocity, gravity) {
    var collider = this.elements.create(x, y, name);
    collider.width = width;
    collider.height = height;
    collider.scale.x = scaleX;
    collider.scale.y = scaleY;
    collider.anchor.setTo(anchorX, anchorY);
    collider.body.immovable = immovable;
    collider.body.bounce.x = 0;
    collider.body.bounce.y = 0;
    collider.body.velocity.x = velocity * -1;
    collider.body.gravity.x = gravity * -1;
    
    return collider;
  }
};

module.exports = World;
},{}]},{},[2]);
