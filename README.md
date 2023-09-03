# forgetti 解析

## 编译后Demo
ToDoList：
https://codesandbox.io/s/forgetti-demo-h552p6?file=/src/DemoTodo/forgetIndex.jsx


核心原理： 编译期间使用数组缓存所有表达式和变量，劫持组件render，生成HOC组件，HOC内部处理缓存操作，缓存函数时，内部获取函数依赖，如果依赖没变化继续使用上一次的函数缓存，减少视图层更新。
## forgettti runtime 

## HOC 解析

## 函数依赖解析

## 目前发现的优化点｜Bug

* 关于console的处理不应该缓存，否则第二次更新无法继续执行，即不打印
* 会生成多余的依赖， 即 a.b 仅用到了b， 但也回缓存a，且执行isEqule = equle(a)的判断，浪费性能

