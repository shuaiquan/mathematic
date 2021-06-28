# Math

这个是一个为前端编写的基础数学库，包含 `Vector`, `Matrix`, `Line`, `Box` 等结构和基本运算

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
文档地址：[Docs](https://shuaiquan.github.io/math-docs/index.html)