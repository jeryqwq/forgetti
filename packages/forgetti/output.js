import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { memo as _memo } from "react";
import { $$memo as _$$memo } from "forgetti/runtime";
const _Memo = _$$memo(_memo, _values => <div>{_values[0]}</div>);
import React, { useEffect, useState, memo } from 'react';
export default memo(function (props) {
  let _cache = _$$cache(_useMemo, 11),
    _equals = _$$equals(_cache, 0, props),
    _value2 = _equals ? _cache[0] : _cache[0] = props,
    _value4 = _equals ? _cache[2] : _cache[2] = _value2.a,
    _equals2 = _$$equals(_cache, 3, _value4),
    _value5 = _equals2 ? _cache[3] : _cache[3] = _value4,
    _value;
  if (_equals ? _cache[1] : _cache[1] = _value2.a) {
    _value = 2;
  } else {
    _value = 1;
  }
  let _value6 = _equals2 ? _cache[4] : _cache[4] = {
      a: _value
    },
    _equals3 = _$$equals(_cache, 5, _value6),
    _value7 = _equals3 ? _cache[5] : _cache[5] = _value6,
    _value8 = _equals3 ? _cache[6] : _cache[6] = _value7.a,
    _equals4 = _$$equals(_cache, 7, _value8),
    _value9 = _equals4 ? _cache[7] : _cache[7] = _value8,
    _value10 = _equals4 ? _cache[8] : _cache[8] = [_value9],
    _equals5 = _$$equals(_cache, 9, _value10),
    _value11 = _equals5 ? _cache[9] : _cache[9] = _value10;
  return _equals5 ? _cache[10] : _cache[10] = /*@forgetti jsx*/<_Memo v={_value11} />;
});
