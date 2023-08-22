//import { Graphics } from "./graphics";

var KairaEngine = {};

KairaEngine.deltaTime = 1/30;
KairaEngine.update = function(){

}

KairaEngine.Component = class {
    update(Projectile = KairaEngine.Projectile){

    }
}

KairaEngine.Vector2 = class {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    add(a = Vector2){
        return new KairaEngine.Vector2(this.x + a.x, this.y + a.y);
    }
    subtract(a = Vector2){
        return new KairaEngine.Vector2(this.x - a.x, this.y - a.y);
    }
    
    multiple(a = Vector2){
        return new KairaEngine.Vector2(this.x * a.x, this.y * a.y);
    }
    multiple(a = 0){
        return new KairaEngine.Vector2(this.x * a, this.y * a);
    }

    divade(a = Vector2){
        return new KairaEngine.Vector2(this.x / a.x, this.y / a.y);
    }
    divade(a = 0){
        return new KairaEngine.Vector2(this.x / a, this.y / a);
    }
    distance(a = Vector2){
        var dis = Math.sqrt(Math.abs(this.x - a.x) + Math.abs(this.y - a.y));
        return dis;
    }
}

KairaEngine.Transform = class extends KairaEngine.Component {
    constructor(position = KairaEngine.Vector2, scale = KairaEngine.Vector2){
        super();
        this.position = position;
        this.scale = scale;
    }
}

//#region glgraphics
//KairaEngine.Graphics = new Graphics();
//#endregion

KairaEngine.Projectile = class{
    constructor(transform = KairaEngine.Transform, components = []){
        this.transform = transform;
        this.components = components;
    }
    addComponent(component){
        this.components.push(component);
        return this.components.component;
    }
    getComponent(component){
        this.components.forEach(element => {
            if (typeof(component) == typeof(element)){
                return element;
            }
        });
    }
    update(){
        this.components.forEach(element => {
            element.Projectile = this;
            element.update(this);
        });
        //#region glgraphics
        /*
        KairaEngine.Graphics.setShaders();
        KairaEngine.Graphics.setBuffers({
            position: {
                numberOfComponents: 3, // X and Y ordered pair coordinates
                data: new Float32Array([
                    (0.0 * this.transform.scale.x) + this.transform.position.x, (0.5 * this.transform.scale.y) + this.transform.position.y, 0,
                    (-0.5 * this.transform.scale.x) + this.transform.position.x, (-0.5 * this.transform.scale.y) + this.transform.position.y, 0,
                    (0.5 * this.transform.scale.x) + this.transform.position.x, (-0.5 * this.transform.scale.y) + this.transform.position.y, 0,
                ])
            },
            color: { 
                numberOfComponents: 3, // RGB triple
                data: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
            }
        });
        KairaEngine.Graphics.use();
        */
        //#endregion
    }
}
KairaEngine.Rigidbody = class extends KairaEngine.Component {
    constructor(Projectile = KairaEngine.Projectile,mass = 1,velocity = new KairaEngine.Vector2, accelation = new KairaEngine.Vector2){
        super();
        this.mass = mass;
        this.Projectile = Projectile;
        this.velocity = velocity;
        this.accelation = accelation;
        this.Collider = {};

        this.Collider.min = new KairaEngine.Vector2;
        this.Collider.max = new KairaEngine.Vector2;
        
        this.Collider.area = function(min = new KairaEngine.Vector2, max = new KairaEngine.Vector2){
            //#region glgraphics
            /*
            KairaEngine.Graphics.setShaders();
            //#region bottom
            KairaEngine.Graphics.setBuffers({
                position: {
                    numberOfComponents: 2, // X and Y ordered pair coordinates
                    data: new Float32Array([
                        min.x,min.y,
                        max.x,min.y
                    ])
                },
                color: { 
                    numberOfComponents: 3, // RGB triple
                    data: new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0])
                }
            });
            KairaEngine.Graphics.use(KairaEngine.Graphics.gl.LINES);
            //#endregion
            //#region right
            KairaEngine.Graphics.setBuffers({
                position: {
                    numberOfComponents: 2, // X and Y ordered pair coordinates
                    data: new Float32Array([
                        max.x,min.y,
                        max.x,max.y
                    ])
                },
                color: { 
                    numberOfComponents: 3, // RGB triple
                    data: new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0])
                }
            });
            KairaEngine.Graphics.use(KairaEngine.Graphics.gl.LINES);
            //#endregion
            //#region top
            KairaEngine.Graphics.setBuffers({
                position: {
                    numberOfComponents: 2, // X and Y ordered pair coordinates
                    data: new Float32Array([
                        max.x,max.y,
                        min.x,max.y
                        
                    ])
                },
                color: { 
                    numberOfComponents: 3, // RGB triple
                    data: new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0])
                }
            });
            KairaEngine.Graphics.use(KairaEngine.Graphics.gl.LINES);
            //#endregion
            //#region left
            KairaEngine.Graphics.setBuffers({
                position: {
                    numberOfComponents: 2, // X and Y ordered pair coordinates
                    data: new Float32Array([
                        min.x,max.y,
                        min.x,min.y
                        
                    ])
                },
                color: { 
                    numberOfComponents: 3, // RGB triple
                    data: new Float32Array([1, 0, 0, 1, 0, 0, 1, 0, 0])
                }
            });
            KairaEngine.Graphics.use(KairaEngine.Graphics.gl.LINES);
            //#endregion
            */
           //#endregion
        }
        
    }
    update(Projectile = KairaEngine.Projectile){
        
        this.Projectile = Projectile;
        
        //console.log(this.Projectile.transform.position);

        this.Collider.min = new KairaEngine.Vector2(
            this.Projectile.transform.position.x - (this.Projectile.transform.scale.x/2),
            this.Projectile.transform.position.y - (this.Projectile.transform.scale.y/2)
        );
        this.Collider.max = new KairaEngine.Vector2(
            this.Projectile.transform.position.x + (this.Projectile.transform.scale.x/2),
            this.Projectile.transform.position.y + (this.Projectile.transform.scale.y/2)
        );
        
        this.Projectile.transform.position = this.Projectile.transform.position.add(this.velocity.multiple(KairaEngine.deltaTime));
        this.velocity = this.velocity.add(this.accelation.multiple(KairaEngine.deltaTime));
        
        
        
    }
    onCollisionEnter(collision = new KairaEngine.Rigidbody){
        console.log("collider");
        
        this.Collider.area(this.Collider.min,this.Collider.max);
        this.Collider.area(collision.Collider.min,collision.Collider.max);

        //console.log(this.Collider.min.distance(collision.Collider.max));
        //console.log(this.Collider.max.distance(collision.Collider.min));

        if (this.Collider.min.distance(collision.Collider.max) > 0.1) return false;
        if (this.Collider.max.distance(collision.Collider.min) > 0.1) return false;
        else return true;
       
    }
}

KairaEngine.Collider = {};
KairaEngine.Collider.SphereCollider = class extends KairaEngine.Component {
    constructor(Projectile = new KairaEngine.Projectile,radius = 1){
        super();
        this.Projectile = Projectile;
        this.radius = radius;
    }
    update(Projectile){
        this.Projectile = Projectile;
    }
    onCollisionEnter(collider = KairaEngine.Collider.SphereCollider){
        //console.log((this.radius/2)+(collider.radius/2));
        //console.log(this.Projectile.transform.position.distance(collider.Projectile.transform.position));
        console.log(collider);
        if (this.Projectile.transform.position.distance(collider.Projectile.transform.position) <= (this.radius/2)+(collider.radius/2)){
            return true;
        }
        else return false;
    }
}

var KairaEditor = {};

window.onload = function() {
    setInterval(KairaEngine.update, KairaEngine.deltaTime);
}