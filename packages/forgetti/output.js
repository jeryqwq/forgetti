import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div>{_values[0]}</div>);
function Component({
  a,
  b
}) {
  let _cache = _$$cache(_useMemo, 9);
  const x = 0 in _cache ? _cache[0] : _cache[0] = [];
  let _equals = _$$equals(_cache, 1, x),
    _value2 = _equals ? _cache[1] : _cache[1] = x,
    _equals2 = _$$equals(_cache, 2, a),
    _value3 = _equals2 ? _cache[2] : _cache[2] = a;
  _equals && _equals2 ? _cache[3] : _cache[3] = _value2.push(_value3);
  let _equals4 = _$$equals(_cache, 4, b),
    _value5 = _equals4 ? _cache[4] : _cache[4] = b;
  _equals && _equals4 ? _cache[5] : _cache[5] = _value2.push(_value5);
  let _value7 = _equals ? _cache[6] : _cache[6] = [_value2],
    _equals6 = _$$equals(_cache, 7, _value7),
    _value8 = _equals6 ? _cache[7] : _cache[7] = _value7;
  return _equals6 ? _cache[8] : _cache[8] = /*@forgetti jsx*/<_Memo v={_value8} />;
}
