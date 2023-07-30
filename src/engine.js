class Graphics {
    constructor(canvasName){
		this.canvasName = canvasName;
        this.shaders = {
            vs: `#version 300 es
                in vec2 vertPosition;
                in vec3 vertColor;
                out vec3 fragColor;
              
                void main() {
                    fragColor = vertColor;
                    gl_Position = vec4(vertPosition, 0, 1);
                }`,
          
            fs: `#version 300 es
                precision mediump float;
                in vec3 fragColor;
                out vec4 outColor;
              
                void main() {
                    outColor = vec4(fragColor, 1);
                }`
        };
        this.vertexAttributes = {
            position: {
                numberOfComponents: 2, // X and Y ordered pair coordinates
                data: new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
            },
            color: { 
                numberOfComponents: 3, // RGB triple
                data: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
            }
        };
	}
	getGL(){
		this.cavas = document.getElementById(this.canvasName);
		this.gl = this.cavas.getContext('webgl2');
		if (!this.gl) alert("Your browser does not support WebGL");
	}
	clearColor(R=0,G=0,B=0,A=1){
		this.gl.clearColor(R,G,B,A);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
    setShaders(shaders=this.shaders){
        this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        
        this.gl.shaderSource(this.vertexShader, shaders.vs);
        this.gl.shaderSource(this.fragmentShader,shaders.fs);

        this.gl.compileShader(this.vertexShader);
        this.gl.compileShader(this.fragmentShader);

        this.program = this.gl.createProgram();
        
        this.gl.attachShader(this.program, this.vertexShader);
        this.gl.attachShader(this.program, this.fragmentShader);

        this.gl.linkProgram(this.program);
    }
    setBuffers(vertexAttributes=this.vertexAttributes){
        this.vertexBufferObjectPosition = this.gl.createBuffer();
        this.vertexBufferObjectColor = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferObjectPosition);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexAttributes.position.data,this.gl.STATIC_DRAW);

        this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'vertPosition');

        this.gl.vertexAttribPointer(
            this.positionAttribLocation,
            vertexAttributes.position.numberOfComponents,
            this.gl.FLOAT,
            this.gl.FALSE,
            0,
            0
        );
        this.gl.enableVertexAttribArray(this.positionAttribLocation);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertexBufferObjectColor);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,vertexAttributes.color.data,this.gl.STATIC_DRAW);

        this.colorAttribLocation = this.gl.getAttribLocation(this.program,'vertColor');

        this.gl.vertexAttribPointer(
            this.colorAttribLocation,
            vertexAttributes.color.numberOfComponents,
            this.gl.FLOAT,
            this.gl.FALSE,
            0,
            0
        );
        this.gl.enableVertexAttribArray(this.colorAttribLocation);
    }
    use(){
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
}

var KairaEngine = {};

KairaEngine.deltaTime = 1/30;
KairaEngine.update = function(){

}

KairaEngine.Component = class {
    update(){

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
}

KairaEngine.Transform = class extends KairaEngine.Component {
    constructor(Projectile = KairaEngine.Projectile){
        this.Projectile = Projectile;
    }
}

KairaEngine.Graphics = new Graphics();

KairaEngine.Projectile = class{
    constructor(position = KairaEngine.Vector2, components = []){
        this.position = position;
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
            element.update();
        });
        KairaEngine.Graphics.setBuffers({
            position: {
                numberOfComponents: 3, // X and Y ordered pair coordinates
                data: new Float32Array([
                    0.0 + this.position.x, 0.5 + this.position.y, 0,
                    -0.5 + this.position.x, -0.5 + this.position.y, 0,
                    0.5 + this.position.x, -0.5 + this.position.y, 0,
                ])
            },
            color: { 
                numberOfComponents: 3, // RGB triple
                data: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
            }
        });
        KairaEngine.Graphics.use();
    }
}
KairaEngine.Rigidbody = class extends KairaEngine.Component {
    constructor(Projectile = KairaEngine.Projectile,velocity = new KairaEngine.Vector2, accelation = new KairaEngine.Vector2){
        super();
        this.Projectile = Projectile;
        this.velocity = velocity;
        this.accelation = accelation;
    }
    update(){
        console.log(this.velocity);
        
        this.Projectile.position = this.Projectile.position.add(this.velocity.multiple(KairaEngine.deltaTime));
        this.velocity = this.velocity.add(this.accelation.multiple(KairaEngine.deltaTime));
        
    }
}


var KairaEditor = {};

window.onload = function() {            
    function test() {
        alert("test");
    }
    setInterval(KairaEngine.update, 100);
}