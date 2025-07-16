# px 转 vw/vh 方案对比：手写函数 vs PostCSS 插件

## 概述

在响应式开发中，将 px 单位转换为 vw/vh 单位是常见的适配方案。本文档对比两种实现方式：手写 Sass 函数和 PostCSS 插件，特别针对大屏项目的实际应用场景。

## 两种方案对比

### 1. 手写 Sass 函数方式

#### 实现代码

```scss
@use 'sass:math';

// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

#### 使用方式

```scss
.screen-container {
  width: 100vw;
  height: 100vh;
  font-size: vh(16);

  .screen-content {
    height: vh(988);
  }

  .screen-left {
    width: vw(443);
    height: vh(326);
  }
}
```

### 2. PostCSS 插件方式

#### 配置示例

```javascript
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      unitToConvert: 'px',
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
    },
  },
};
```

#### 使用方式

```css
.screen-container {
  width: 100vw;
  height: 100vh;
  font-size: 16px; /* 自动转换为 vw */
}

.screen-content {
  height: 988px; /* 通常保持px，不转换 */
}

.screen-left {
  width: 443px; /* 自动转换为 vw */
  height: 326px; /* 通常保持px，不转换 */
}
```

## 核心差异分析

### 1. 转换时机

| 方案         | 转换时机       | 处理阶段     |
| ------------ | -------------- | ------------ |
| 手写函数     | SCSS 编译时    | 构建过程早期 |
| PostCSS 插件 | PostCSS 处理时 | 构建过程后期 |

### 2. 使用方式

| 方案         | 代码简洁度   | 控制精度 | 学习成本 |
| ------------ | ------------ | -------- | -------- |
| 手写函数     | 需要手动调用 | 精确控制 | 中等     |
| PostCSS 插件 | 自动转换     | 全局规则 | 低       |

### 3. 灵活性

| 方案         | 宽高控制     | 自定义逻辑 | 排除规则 |
| ------------ | ------------ | ---------- | -------- |
| 手写函数     | 可分别控制   | 完全自定义 | 手动控制 |
| PostCSS 插件 | 通常只转宽度 | 配置限制   | 配置排除 |

## 大屏项目适配问题

### 问题描述

在非 16:9 屏幕比例下，PostCSS 插件方式容易出现以下问题：

- 内容显示不全
- 底部出现空白
- 需要滚动条

### 问题根源

#### 1. 设计稿比例与屏幕比例不匹配

- 设计稿：1920×1080（16:9）
- 实际屏幕可能是：1920×1200（16:10）、1366×768 等

#### 2. 高度处理差异

```scss
// 手写函数：完美适配
.screen-content {
  height: vh(988); // 988/1080 = 91.48% 的屏幕高度
}

// PostCSS插件：可能有问题
.screen-content {
  height: 988px; // 固定988px，在不同屏幕上比例不同
}
```

### 实际效果对比

#### 场景 1：16:10 屏幕（1920×1200）

| 方案         | 宽度           | 高度           | 效果             |
| ------------ | -------------- | -------------- | ---------------- |
| 手写函数     | 100vw (1920px) | 100vh (1200px) | 完美适配，无空白 |
| PostCSS 插件 | 100vw (1920px) | 988px (固定)   | 底部 212px 空白  |

#### 场景 2：较小屏幕（1366×768）

| 方案         | 宽度           | 高度          | 效果               |
| ------------ | -------------- | ------------- | ------------------ |
| 手写函数     | 100vw (1366px) | 100vh (768px) | 按比例缩放         |
| PostCSS 插件 | 100vw (1366px) | 988px (固定)  | 高度超出，需要滚动 |

## 解决方案对比

### 1. 手写函数方式（推荐）

```scss
.screen-container {
  width: 100vw;
  height: 100vh;
  background: url('bg.png') no-repeat center center;
  background-size: 100% 100%; // 背景图自适应
}

.screen-left {
  width: vw(443); // 宽度按比例缩放
  height: vh(326); // 高度按比例缩放
}
```

**优势：**

- 完美适配任何屏幕比例
- 背景图自适应
- 内容始终在可视区域内
- 避免滚动条和空白

### 2. PostCSS 插件优化

```javascript
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080, // 添加高度配置
      unitToConvert: 'px',
      propList: ['*'],
      viewportUnit: 'vw',
      landscape: false,
    },
  },
};
```

**限制：**

- 配置复杂
- 可能产生意外转换
- 调试困难

## 性能考虑

### 1. 构建性能

| 方案         | 编译时间 | 构建复杂度 | 调试便利性 |
| ------------ | -------- | ---------- | ---------- |
| 手写函数     | 快       | 简单       | 好         |
| PostCSS 插件 | 中等     | 复杂       | 中等       |

### 2. 运行时性能

| 方案         | CSS 体积 | 计算开销 | 兼容性 |
| ------------ | -------- | -------- | ------ |
| 手写函数     | 较小     | 无       | 好     |
| PostCSS 插件 | 较小     | 无       | 好     |

## 适用场景

### 手写函数方式适合：

✅ 大屏项目

✅ 可视化项目

✅ 需要精确控制的项目

✅ 团队熟悉 Sass 的项目

✅ 需要自定义转换逻辑的项目

### PostCSS 插件适合：

- ✅ 通用 Web 项目
- ✅ 希望减少手动工作的项目
- ✅ 团队更倾向于自动化工具的项目
- ✅ 标准响应式布局项目

## 最佳实践建议

### 1. 大屏项目推荐

```scss
// 使用手写函数，确保完美适配
@function vw($px) {
  @return math.div($px, 1920) * 100vw;
}

@function vh($px) {
  @return math.div($px, 1080) * 100vh;
}

.screen-container {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  overflow: hidden;
}
```

### 2. 通用项目推荐

```javascript
// 使用PostCSS插件，简化开发
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 移动端设计稿宽度
      unitToConvert: 'px',
      propList: ['*'],
      viewportUnit: 'vw',
    },
  },
};
```

## 总结

对于大屏项目，手写 Sass 函数方式在以下方面优于 PostCSS 插件：

1. **完美适配**：支持任何屏幕比例，无空白和滚动条
2. **精确控制**：可以分别控制宽度和高度的转换
3. **背景适配**：配合`background-size: 100% 100%`完美适配
4. **维护性**：逻辑清晰，易于理解和调试
5. **性能**：编译时计算，运行时无额外开销

因此，大屏项目推荐使用手写函数方式，而通用 Web 项目可以考虑 PostCSS 插件方式。
