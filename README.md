# Math

在当下前端(Web)图形化，可视化应用在不断涌现的背景下，开发者在这样的项目中不可避免的需要使用很多基本的几何运算，例如向量运算，矩阵运算等。甚至如果开发者可以抽象数学模型，那么无论是什么样的场景，相信 `@s7n/math` 都可以帮助到你。

[![npm version](https://img.shields.io/npm/v/@s7n/math.svg?style=flat)](https://www.npmjs.com/package/@s7n/math)
[![npm downloads](https://img.shields.io/npm/dm/@s7n/math.svg?style=flat)](https://www.npmjs.com/package/@s7n/math)
[![install size](https://img.shields.io/bundlephobia/minzip/@s7n/math?style=flat)](https://www.npmjs.com/package/@s7n/math)


这是一个使用 TS 编写的基础数学库，其内容大致包含：

| Class | 说明 |
| ----| ---- |
| Vector2 | 表示二维的一个向量 |
| Vector3 | 表示三维的一个向量 |
| Matrix3 | 表示一个 3 x 3 的矩阵 |
| Matrix4 | 表示一个 4 x 4 的矩阵 |
| Line2 | 表示二维世界的一条线 |
| Line3 | 表示三维世界的一条线 |
| Box2 | 表示一个二维世界中的 AABB 盒子 |
| Box3 | 表示一个三维世界中的 AABB 盒子 |
| Circle | 表示二维世界中的一个圆 |
| Arc | 表示二维世界中的圆弧 |

详细用法请参考：[API文档](https://shuaiquan.github.io/mathematic/index.html)

## 使用
```
npm i @s7n/math -S
```

### 案例
```
import { Vector2 } from '@s7n/math';

const v1 = Vector2(10, 5);
const v2 = Vector2(2, 2);

// 向量相乘
const v3 = v1.multiply(v2);

// 求两个向量的点积
const dotProduct = v1.dot(v2);
```
已提供接口可参考API文档

## API 文档
文档地址：[Docs](https://shuaiquan.github.io/mathematic/index.html)

## 设计理念
本项目在接口的设计上对 `three/math` 有诸多的参考，但是有一点很不一样，需要格外提醒大家：

`所有运算接口得到的都是一个的引用，原有对象的值不会被修改`。

### 举个例子
```js
// 有一个向量 v1 , 其坐标为 (5, 10)
const v1 = new Vector2(5, 10);

// 将 v1 的坐标变为原来的两倍
const v2 = v1.multiply(2);

// 此时，v2 为（10, 20）, v1 为 (5, 10) 且 v1 !== v2
// 这里的 multiply 运算不会更改对象 v1 本身的值

// 但是例如使用 set 来更新值，则会改变原有的值
const v3 = new Vector2(5, 10);
v3.set(1, 2);

// 此时 v3 已经变为 (1, 2)
```

总结来讲， `set...`, `from...` 等接口都会改变原有对象的值，而例如 `multiply`, `add`, `apply...` 等接口都会返回新值，而不改变原有对象的值

## 写在最后
也许你也正在尝试做一些图形化的前端应用，也许在你起步的时候也像我曾经遇到这些 `Math` 的麻烦，那么我希望 `@s7n/math` 可以在这个时候帮到你，可以帮你走到下个阶段，