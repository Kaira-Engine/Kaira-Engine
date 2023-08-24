# Manuel

| Name | Type |
| ---- | --------
| [KairaEngine](#kairaengine) | Namespace
| [KairaEditor](#kairaeditor) | Namespace

## KairaEngine

| Name | Type
| ---- | --------
| [Vector2](#vector2) | Class | 
| [Transform](#transform) | Class
| [Projectile](#projectile) | Class
| [Component](#component) | Class
| [Rigidbody](#rigidbody) | Class ([Component](#component))
| [Collider](#collider) | Namespace

```js
KairaEngine
```

---

### Vector2

| Name | Type 
| ---- | --------
| [x](#x) | Property (float)
| [y](#y) | Property (float)
| [add](#add) | Function
| [substract](#substract) | Function
| [multiple](#multiple) | Function 

Usage:
```js
vector2Variable = new KairaEngine.Vector2(float x,float y);
```

#### x
Usage:
```js 
vector2Variable.x
```
#### y
Usage:
```js 
vector2Variable.y
```
#### add
Usage ([Vector2](#vector2)):
```js
vector2Variable = vector2Variable.add(Vector2 vector2Another);
```
#### subtract
Usage ([Vector2](#vector2)):
```js
vector2Variable = vector2Variable.subtract(Vector2 vector2Another);
```
#### multiple
Usage (float):
```js
vector2Variable = vector2Variable.multiple(float variable);
```

Usage ([Vector2](#vector2)):
```js
vector2Variable = vector2Variable.multiple(Vector2 vector2Another);
```
#### divide
Usage (float):
```js
vector2Variable = vector2Variable.divide(float variable);
```

Usage ([Vector2](#vector2)):
```js
vector2Variable = vector2Variable.divide(Vector2 vector2Another);
```

---

### Transform

| Name | Type 
| ---- | --------
| [position](#position) | Property ([Vector2](#vector2))
| [scale](#scale) | Property([Vector2](#vector2))

#### position
Usage:
```js
transformVariable.position

Usage:
```
#### scale
```js
transformVariable.scale
```
---

### Projectile

---

### Component

---

### Rigidbody

---

### Collider

| Name | Type
| ---- | --------
| [SphereCollider](#spherecollider) | Component Class

#### SphereCollider

---

## KairaEditor
