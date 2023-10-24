import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div>{_values[0]}: {_values[1]}</div>);
function Example(props) {
  let _cache = _$$cache(_useMemo, 11),
    _equals = _$$equals(_cache, 0, props),
    _value = _equals ? _cache[0] : _cache[0] = props,
    _value2 = _equals ? _cache[1] : _cache[1] = _value.b,
    _equals2 = _$$equals(_cache, 2, _value2),
    _value3 = _equals2 ? _cache[2] : _cache[2] = _value2;
  const a = _equals2 ? _cache[3] : _cache[3] = _value3 + 3;
  let _equals3 = _$$equals(_cache, 4, a),
    _value5 = _equals3 ? _cache[4] : _cache[4] = a;
  const b = _equals3 ? _cache[5] : _cache[5] = function () {
    console.log(a);
  };
  let _value7 = _equals ? _cache[6] : _cache[6] = _value.a,
    _equals4 = _$$equals(_cache, 7, _value7),
    _value8 = _equals4 ? _cache[7] : _cache[7] = _value7,
    _value9 = _equals4 && _equals3 ? _cache[8] : _cache[8] = [_value8, _value5],
    _equals6 = _$$equals(_cache, 9, _value9),
    _value10 = _equals6 ? _cache[9] : _cache[9] = _value9;
  return _equals6 ? _cache[10] : _cache[10] = /*@forgetti jsx*/<_Memo v={_value10} />;
}
