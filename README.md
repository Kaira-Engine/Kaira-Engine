# Kaira-Engine
<link href="favicon.ico" rel="icon" type="image/x-icon">
<style>
  canvas {
    border-style: solid;
  }
</style>
<button id="Play">Play</button>
<button id="Stop">Stop</button>
<button id="Restart">Restart</button>
<br>
<canvas id="canvas" width="400" height="300"></canvas>
<script src="src/graphics.js">
      
</script>
<script src="src/engine.js"></script>
<script>
    // Get the canvas element
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    class SphereMesh extends KairaEngine.Component {
        constructor(Projectile = new KairaEngine.Projectile){
            super();
            this.Projectile = Projectile;
            // Set the circle properties
            this.radius = 50;
        }
        update(Projectile){
            //console.log(this.Projectile.transform.position.y);
            // Draw the circle
            ctx.beginPath();
            ctx.fillStyle = 'grey';
            ctx.arc(this.Projectile.transform.position.x, this.Projectile.transform.position.y, this.Projectile.components[1].radius, 0, 2 * Math.PI);
            ctx.fill();
            //ctx.stroke();
        }
    }
    function ColliderGizmos(collider){
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        console.log(collider.radius);
        ctx.arc(collider.Projectile.transform.position.x, collider.Projectile.transform.position.y, collider.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    var Ball = new KairaEngine.Projectile(new KairaEngine.Transform(
        new KairaEngine.Vector2(200,150),
        new KairaEngine.Vector2(.5,.5)
    ));
    Ball.components = [
        new KairaEngine.Rigidbody(
            Projectile = Ball,
            velocity = new KairaEngine.Vector2(0,0),
            accelation = new KairaEngine.Vector2(5,9.8)
        ),
        new KairaEngine.Collider.SphereCollider(
            Projectile = Ball,
            25
        ),
        new SphereMesh(Ball,25)
    ];
    var deltaTime = 0;
    function collideBorders(collider = new KairaEngine.Collider.SphereCollider){
        var currentPos = collider.Projectile.transform.position;
        var r = collider.radius;
        if (currentPos.x - r <= 0 || currentPos.x + r >= canvas.width) {
            collider.Projectile.components[0].velocity.x = collider.Projectile.components[0].velocity.x * -1;
            collider.Projectile.components[0].accelation.x = collider.Projectile.components[0].accelation.x * -1;
        }
        if (currentPos.y - r <= 0 || currentPos.y + r >= canvas.height) {
            collider.Projectile.components[0].velocity.y = collider.Projectile.components[0].velocity.y * -1;
            collider.Projectile.components[0].accelation.y = collider.Projectile.components[0].accelation.y * -1;
        }
    }
    //KairaEngine.deltaTime = 1/25;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    KairaEngine.update = function (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        Ball.update();
        collideBorders(Ball.components[1]);
        ColliderGizmos(Ball.components[1]);
        deltaTime += KairaEngine.deltaTime;
     }
    document.getElementById('Play').addEventListener('click', function() {
        KairaEngine.intervalId = setInterval(KairaEngine.update, KairaEngine.deltaTime);
    });
    document.getElementById('Stop').addEventListener('click', function() {
        clearInterval(KairaEngine.intervalId);
    });
    document.getElementById('Restart').addEventListener('click', function() {
        clearInterval(KairaEngine.intervalId);
        Ball.transform.position = new KairaEngine.Vector2(200,150);
        Ball.components = [
            new KairaEngine.Rigidbody(
                Projectile = Ball,
                velocity = new KairaEngine.Vector2(0,0),
                accelation = new KairaEngine.Vector2(5,9.8)
            ),
            new KairaEngine.Collider.SphereCollider(
                Projectile = Ball,
                25
            ),
            new SphereMesh(Ball,25)
        ];
        KairaEngine.intervalId = setInterval(KairaEngine.update, KairaEngine.deltaTime);
    });
    window.onload = function() {
        KairaEngine.intervalId = setInterval(KairaEngine.update, KairaEngine.deltaTime);
    }
</script>

- [Introduction](#introduction)
- [Documentation](#documentation)
  - [Manuel](Docs/Manuel.md)

## Introduction
[Kaira Engine](#kaira-engine) is a web based physical engine.
## Documentation
- ## [Manuel](Docs/Manuel.md)