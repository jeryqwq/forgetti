# forgetti 解析

## 编译后Demo
ToDoList：
https://codesandbox.io/s/forgetti-demo-h552p6?file=/src/DemoTodo/forgetIndex.jsx


核心原理： 编译期间使用数组缓存所有表达式，变量，jsx。劫持组件render，生成HOC组件，HOC内部处理缓存操作，缓存函数和jsx时，内部获取所有相关依赖，如果依赖没变化继续使用上一次的函数缓存，减少视图层更新。
### 编译前：
```jsx
const App = ({a}) => {
  const [done, setDone] = useState(false);
  console.log(done)
  return <div>{a} - {done ? 'finish' : 'doing'}</div>
}
```
### 编译后

为每次表达式或者变量定义赋值语句先判定是否能缓存，如果函数依赖没变化，则该函数能走缓存。
每一个申明的表达式或者变量都会多出两行代码，一行判断与上一次缓存是否相等，一行二元表达式初始化或者用原始值。

```jsx
// 注入运行时和依赖api 
import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";

// 生成HOC组件，自动为组件添加memo操作
const _Memo = _$$memo(_memo, _values => <div>{_values[0]} - {_values[1]}</div>);

const App = ({
  a
}) => {
  let _cache = _$$cache(_useMemo, 7); // 初始化缓存数组， 根据索引对下面的表达式｜变量定义｜函数 进行缓存
  const [done, setDone] = useState(false); // set 函数没有被用到，直接忽略
  let _equals = _$$equals(_cache, 0, done),  // 首次执行时必为false
    _value = _equals ? _cache[0] : _cache[0] = done; // 映射done变量， 相等优先使用缓存，否则替换最新的缓存结果
  _equals ? _cache[1] : _cache[1] = console.log(_value); // console这里作为函数处理，哪怕没有变量接收返回值，也做了一次缓存， console 依赖了done ，done是否被缓存来源于_equals，如果为true就不需要更新，直接使用上一次的缓存，所以这对于业务来说是bug，会导致第一次打印，第二次以后都不会执行了，正常应该直接替换依赖缓存不做cache即可，即 console.log(_value);不用走缓存，本就没有返回值
  /**
  * jsx内行内表达式和表达式缓存 
  */
  let _equals2 = _$$equals(_cache, 2, a), // 判断a是否被缓存， 首次都是false
    _value3 = _equals2 ? _cache[2] : _cache[2] = a, // 首次执行赋值， 刷新时优先使用缓存
    _value4; // 二元表达式结果
  if (_value) {
    _value4 = 'finish';
  } else {
    _value4 = 'doing';
  }
  let _equals3 = _$$equals(_cache, 3, _value4),  // 判断二元表达式结果是否相等
    _value5 = _equals3 ? _cache[3] : _cache[3] = _value4, // 二元表达式缓存
    /** jsx编译走的也是函数那一套处理方式， 找出jsx渲染对应的依赖，如果当前返回的节点依赖都没变化，那么就也可以使用缓存， jsx当前依赖了a和done,他们对应的是_equals2和_equals3 */ 
    _value6 = _equals2 && _equals3 ? _cache[4] : _cache[4] = [_value3, _value5],
    _equals5 = _$$equals(_cache, 5, _value6), // 判断jsx能不能使用缓存， 依赖都一致下就可以使用
    _value7 = _equals5 ? _cache[5] : _cache[5] = _value6; // jsx依赖一致的话就可以直接使用缓存，否则降级再走一次memo判断下是否能够缓存，实在不一致时刷新组件渲染
  return _equals5 ? _cache[6] : _cache[6] = /*@forgetti jsx*/<_Memo v={_value7} />;
};

```



## forgettti runtime 

## 缓存props

## 缓存表达式

## 函数依赖｜Jsx依赖解析

获取表达式依赖: forgetti/src/core/optimizer.ts  createDependency
创建缓存依赖(加索引，生成二元表达式):forgetti/src/core/optimizer.ts createMemo
## HOC 解析

## 目前发现的优化点｜Bug

* 关于console的处理不应该缓存，否则第二次更新无法继续执行，即不打印
* 会生成多余的依赖， 即 a.b 仅用到了b， 但也回缓存a，且执行isEqule = equle(a)的判断，浪费性能
* react 原生hooks setXXX 在渲染期间本身就是不可能会变的，也是可以不缓存和对比的
