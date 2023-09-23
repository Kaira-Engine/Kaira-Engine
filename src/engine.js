/**
 * KairaEngine: A basic 2D game engine.
 */

var KairaEngine = {
    deltaTime: 1 / 30
};

/**
 * Main update loop for KairaEngine.
 */
KairaEngine.update = function() {
    // Update logic for the engine goes here
};

/**
 * A 2D vector class with basic arithmetic operations.
 */
KairaEngine.Vector2 = class {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(a) {
        return new KairaEngine.Vector2(this.x + a.x, this.y + a.y);
    }

    subtract(a) {
        return new KairaEngine.Vector2(this.x - a.x, this.y - a.y);
    }

    multipleByVector(a) {
        return new KairaEngine.Vector2(this.x * a.x, this.y * a.y);
    }

    multipleByScalar(a = 1) {
        return new KairaEngine.Vector2(this.x * a, this.y * a);
    }

    divideByVector(a) {
        return new KairaEngine.Vector2(this.x / a.x, this.y / a.y);
    }

    divideByScalar(a = 1) {
        return new KairaEngine.Vector2(this.x / a, this.y / a);
    }

    distance(a) {
        return Math.sqrt((this.x - a.x) ** 2 + (this.y - a.y) ** 2);
    }
};

/**
 * Base component class for game objects.
 */
KairaEngine.Component = class {
    update(Projectile = KairaEngine.Projectile) {
        // Default update method for components
    }
};

/**
 * Transform component that holds position and scale of game objects.
 */
KairaEngine.Transform = class extends KairaEngine.Component {
    constructor(position = new KairaEngine.Vector2(), scale = new KairaEngine.Vector2()) {
        super();
        this.position = position;
        this.scale = scale;
    }
};

/**
 * Main game object or entity class.
 */
KairaEngine.Projectile = class {
    constructor(transform = new KairaEngine.Transform(), components = []) {
        this.transform = transform;
        this.components = components;
    }

    addComponent(component) {
        this.components.push(component);
        return this.components[this.components.length - 1];
    }

    getComponent(componentType) {
        return this.components.find(component => component instanceof componentType);
    }

    update() {
        this.components.forEach(component => {
            component.update(this);
        });
        // Additional update logic for the Projectile class goes here
    }
};

/**
 * Rigidbody component for physics simulation.
 */
KairaEngine.Rigidbody = class extends KairaEngine.Component {
    constructor(Projectile = new KairaEngine.Projectile(), mass = 1, velocity = new KairaEngine.Vector2(), acceleration = new KairaEngine.Vector2()) {
        super();
        this.mass = mass;
        this.Projectile = Projectile;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    update(Projectile) {
        this.Projectile = Projectile;
        this.Projectile.transform.position = this.Projectile.transform.position.add(this.velocity.multipleByScalar(KairaEngine.deltaTime));
        this.velocity = this.velocity.add(this.acceleration.multipleByScalar(KairaEngine.deltaTime));
    }
};

/**
 * Sphere collider component for basic collision detection.
 */
KairaEngine.Collider = {};
KairaEngine.Collider.SphereCollider = class extends KairaEngine.Component {
    constructor(Projectile = new KairaEngine.Projectile(), radius = 1) {
        super();
        this.Projectile = Projectile;
        this.radius = radius;
    }

    onCollisionEnter(collider) {
        return this.Projectile.transform.position.distance(collider.Projectile.transform.position) <= (this.radius / 2) + (collider.radius / 2);
    }
};

/**
 * Main game loop using requestAnimationFrame for smooth updates.
 */
KairaEngine.run = function() {
    KairaEngine.update();
    requestAnimationFrame(KairaEngine.run);
};

// Starting the game loop
KairaEngine.run();
