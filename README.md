# forgetti 解析

## 编译后Demo
https://codesandbox.io/s/forgetti-demo-h552p6?file=/src/App.js

原理： 编译期间使用数组缓存所有表达式和变量，劫持组件render，生成HOC组件，HOC内部处理缓存操作，缓存函数时，内部获取函数依赖，如果依赖没变化继续使用上一次的函数缓存，减少视图层更新。



