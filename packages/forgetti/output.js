1
import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div>{_values[0]}: {_values[1]}</div>);
function Example(props) {
  let _cache = _$$cache(_useMemo, 10),
    _equals = _$$equals(_cache, 0, props),
    _value = _equals ? _cache[0] : _cache[0] = props,
    _value2 = _equals ? _cache[1] : _cache[1] = _value.a,
    _equals2 = _$$equals(_cache, 2, _value2),
    _value3 = _equals2 ? _cache[2] : _cache[2] = _value2,
    _value4 = _equals ? _cache[3] : _cache[3] = _value.b,
    _equals3 = _$$equals(_cache, 4, _value4),
    _value5 = _equals3 ? _cache[4] : _cache[4] = _value4,
    _value6 = _equals3 ? _cache[5] : _cache[5] = _value5 / 3,
    _equals4 = _$$equals(_cache, 6, _value6),
    _value7 = _equals4 ? _cache[6] : _cache[6] = _value6,
    _value8 = _equals2 && _equals4 ? _cache[7] : _cache[7] = [_value3, _value7],
    _equals6 = _$$equals(_cache, 8, _value8),
    _value9 = _equals6 ? _cache[8] : _cache[8] = _value8;
  return _equals6 ? _cache[9] : _cache[9] = /*@forgetti jsx*/<_Memo v={_value9} />;
}
