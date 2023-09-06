import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div onClick={_values[0]}>{_values[1]} - {_values[2]}</div>);
const App = ({
  a
}) => {
  let _cache = _$$cache(_useMemo, 10);
  const [done, setDone] = useState(false);
  let _equals = _$$equals(_cache, 0, done),
    _value = _equals ? _cache[0] : _cache[0] = done;
  _equals ? _cache[1] : _cache[1] = console.log(_value);
  let _equals2 = _$$equals(_cache, 2, setDone),
    _value3 = _equals2 ? _cache[2] : _cache[2] = setDone,
    _value4 = _equals2 ? _cache[3] : _cache[3] = () => setDone(true),
    _equals3 = _$$equals(_cache, 4, _value4),
    _value5 = _equals3 ? _cache[4] : _cache[4] = _value4,
    _equals4 = _$$equals(_cache, 5, a),
    _value6 = _equals4 ? _cache[5] : _cache[5] = a,
    _value7;
  if (_value) {
    _value7 = 'finish';
  } else {
    _value7 = 'doing';
  }
  let _equals5 = _$$equals(_cache, 6, _value7),
    _value8 = _equals5 ? _cache[6] : _cache[6] = _value7,
    _value9 = _equals3 && _equals4 && _equals5 ? _cache[7] : _cache[7] = [_value5, _value6, _value8],
    _equals7 = _$$equals(_cache, 8, _value9),
    _value10 = _equals7 ? _cache[8] : _cache[8] = _value9;
  return _equals7 ? _cache[9] : _cache[9] = /*@forgetti jsx*/<_Memo v={_value10} />;
};
