import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
function Example(props) {
  let _cache = _$$cache(_useMemo, 2),
    _equals = _$$equals(_cache, 0, props),
    _value = _equals ? _cache[0] : _cache[0] = props;
  return _equals ? _cache[1] : _cache[1] = _value.a();
}
