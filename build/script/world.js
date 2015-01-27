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