import { useMemo as _useMemo } from "react";
import { $$cache as _$$cache } from "forgetti/runtime";
import { $$branch as _$$branch } from "forgetti/runtime";
import { $$equals as _$$equals } from "forgetti/runtime";
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState, memo } from 'react';
import { useAtom } from 'jotai';
import { Drawer, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import KeyIndicators from '@/containers/Owl/agent/ServiceDetail/TotailView/KeyIndicators';
import EndPoint from '@/containers/Owl/agent/ServiceDetail/TotailView/EndPoint';
import { serviceAtom } from '@/containers/Owl/agent/state';
import { getServiceBaseInfo } from '@/containers/Owl/agent/ServiceDetail/TotailView/service';
import { GlobalTimeType, useGlobalTime } from '@/containers/Owl/components/GlobalTimeSelector';
import { getOwlInfoByKey } from '@/containers/Owl/agent/constants';
import TraceList from '@/containers/Owl/trace/ChainAnalysis/components/TraceList';
import { filterConditionAtom } from '@/containers/Owl/trace/ChainAnalysis/state';
import styles from './index.module.less';
export default memo(() => {
  let _cache = _$$cache(_useMemo, 161);
  var _a;
  var _b;
  var _c;
  var _d;
  var _e;
  const [baseInfo, setBaseInfo] = useState(0 in _cache ? _cache[0] : _cache[0] = {});
  const [service] = useAtom(1 in _cache ? _cache[1] : _cache[1] = serviceAtom);
  let _equals = _$$equals(_cache, 2, service);
  const {
    serviceName
  } = _equals ? _cache[2] : _cache[2] = service;
  const {
    startTime,
    endTime
  } = useGlobalTime();
  const [spanErrorVis, setSpanErrorVis] = useState(false);
  let _equals2 = _$$equals(_cache, 3, serviceName),
    _value4 = _equals2 ? _cache[3] : _cache[3] = serviceName,
    _equals3 = _$$equals(_cache, 4, startTime),
    _value5 = _equals3 ? _cache[4] : _cache[4] = startTime,
    _equals4 = _$$equals(_cache, 5, endTime),
    _value6 = _equals4 ? _cache[5] : _cache[5] = endTime;
  useEffect(() => {
    if (!serviceName) return;
    (async () => {
      const info = await getServiceBaseInfo({
        serviceName,
        startTime,
        endTime
      });
      setBaseInfo(info);
    })();
  }, [_equals2 && _equals3 && _equals4 ? _cache[6] : _cache[6] = [_value4, _value5, _value6]]);
  const [filters, filtersSet] = useAtom(7 in _cache ? _cache[7] : _cache[7] = filterConditionAtom);
  let _value9 = 8 in _cache ? _cache[8] : _cache[8] = jsx,
    _value10 = 9 in _cache ? _cache[9] : _cache[9] = {
      className: styles.previewWrap
    },
    _value11 = 10 in _cache ? _cache[10] : _cache[10] = jsx("div", {
      className: styles.headerTitle
    }, "\u57FA\u672C\u4FE1\u606F"),
    _value12 = 11 in _cache ? _cache[11] : _cache[11] = jsx,
    _value13 = 12 in _cache ? _cache[12] : _cache[12] = {
      className: styles.baseInfo
    },
    _value14 = 13 in _cache ? _cache[13] : _cache[13] = jsx,
    _value15 = 14 in _cache ? _cache[14] : _cache[14] = {
      className: styles.item,
      style: {
        textAlign: 'left',
        flex: 0.7
      }
    },
    _value16 = 15 in _cache ? _cache[15] : _cache[15] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, "Span \u6B63\u786E\u7387"), jsx(Tooltip, {
      title: getOwlInfoByKey('正确率')
    }, jsx(QuestionCircleOutlined, null))),
    _value17 = 16 in _cache ? _cache[16] : _cache[16] = jsx,
    _value18 = 17 in _cache ? _cache[17] : _cache[17] = {
      className: styles.value
    },
    _equals6 = _$$equals(_cache, 18, baseInfo),
    _value20 = _equals6 ? _cache[18] : _cache[18] = baseInfo,
    _value21 = _equals6 ? _cache[19] : _cache[19] = _value20.errorRatio,
    _equals7 = _$$equals(_cache, 20, _value21),
    _value22 = _equals7 ? _cache[20] : _cache[20] = _value21,
    _value19;
  if (_equals7 ? _cache[21] : _cache[21] = _value22 === 0) {
    _value19 = '100%';
  } else {
    let _cache2 = _$$branch(_cache, 22, 3),
      _equals8 = _$$equals(_cache2, 0, baseInfo),
      _value24 = _equals8 ? _cache2[0] : _cache2[0] = baseInfo,
      _condition = _equals8 ? _cache2[1] : _cache2[1] = _value24.errorRatio;
    if (_condition) {
      let _cache3 = _$$branch(_cache2, 2, 12),
        _equals9 = _$$equals(_cache3, 0, baseInfo),
        _value26 = _equals9 ? _cache3[0] : _cache3[0] = baseInfo,
        _value27 = _equals9 ? _cache3[1] : _cache3[1] = _value26.errorRatio,
        _equals10 = _$$equals(_cache3, 2, _value27),
        _value28 = _equals10 ? _cache3[2] : _cache3[2] = _value27,
        _value29 = _equals10 ? _cache3[3] : _cache3[3] = 1 - _value28,
        _equals11 = _$$equals(_cache3, 4, _value29),
        _value30 = _equals11 ? _cache3[4] : _cache3[4] = _value29,
        _value31 = _equals11 ? _cache3[5] : _cache3[5] = _value30 * 10000,
        _equals12 = _$$equals(_cache3, 6, _value31),
        _value32 = _equals12 ? _cache3[6] : _cache3[6] = _value31,
        _value33 = _equals12 ? _cache3[7] : _cache3[7] = Math.floor(_value32),
        _equals13 = _$$equals(_cache3, 8, _value33),
        _value34 = _equals13 ? _cache3[8] : _cache3[8] = _value33,
        _value35 = _equals13 ? _cache3[9] : _cache3[9] = _value34 / 100,
        _equals14 = _$$equals(_cache3, 10, _value35),
        _value36 = _equals14 ? _cache3[10] : _cache3[10] = _value35;
      _condition = _equals14 ? _cache3[11] : _cache3[11] = `${_value36}%`;
    }
    _value19 = _condition;
  }
  let _equals15 = _$$equals(_cache, 23, _value19),
    _value38 = _equals15 ? _cache[23] : _cache[23] = _value19,
    _value39 = _equals15 ? _cache[24] : _cache[24] = _value17("div", _value18, _value38),
    _equals16 = _$$equals(_cache, 25, _value39),
    _value40 = _equals16 ? _cache[25] : _cache[25] = _value39,
    _value41 = _equals16 ? _cache[26] : _cache[26] = _value14("div", _value15, _value16, _value40),
    _equals17 = _$$equals(_cache, 27, _value41),
    _value42 = _equals17 ? _cache[27] : _cache[27] = _value41,
    _value43 = 28 in _cache ? _cache[28] : _cache[28] = jsx,
    _value44 = 29 in _cache ? _cache[29] : _cache[29] = styles.item,
    _condition2 = _equals6 ? _cache[30] : _cache[30] = _value20.errorNum;
  if (!_condition2) {
    _condition2 = 0;
  }
  let _equals18 = _$$equals(_cache, 31, _condition2),
    _value47 = _equals18 ? _cache[31] : _cache[31] = _condition2,
    _value45;
  if (_equals18 ? _cache[32] : _cache[32] = _value47 > 0) {
    _value45 = 'pointer';
  } else {
    _value45 = 'initial';
  }
  let _value49 = 33 in _cache ? _cache[33] : _cache[33] = {
      textAlign: 'left',
      cursor: _value45
    },
    _equals19 = _$$equals(_cache, 34, setSpanErrorVis),
    _value50 = _equals19 ? _cache[34] : _cache[34] = setSpanErrorVis,
    _equals20 = _$$equals(_cache, 35, filtersSet),
    _value51 = _equals20 ? _cache[35] : _cache[35] = filtersSet,
    _equals21 = _equals6 && _equals19 && _equals20 && _equals,
    _value52 = _equals21 ? _cache[36] : _cache[36] = () => {
      if ((baseInfo.errorNum || 0) > 0) {
        setSpanErrorVis(true);
        filtersSet({
          service: [service.serviceName],
          status: 1
        });
      }
    },
    _value53 = _equals21 ? _cache[37] : _cache[37] = {
      className: _value44,
      style: _value49,
      onClick: _value52
    },
    _equals22 = _$$equals(_cache, 38, _value53),
    _value54 = _equals22 ? _cache[38] : _cache[38] = _value53,
    _value55 = 39 in _cache ? _cache[39] : _cache[39] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, "Span \u5F02\u5E38\u6570"), jsx(Tooltip, {
      title: getOwlInfoByKey('异常数')
    }, jsx(QuestionCircleOutlined, null))),
    _value56 = 40 in _cache ? _cache[40] : _cache[40] = jsx,
    _value57 = 41 in _cache ? _cache[41] : _cache[41] = styles.value,
    _condition3 = _equals6 ? _cache[42] : _cache[42] = _value20.errorNum;
  if (!_condition3) {
    _condition3 = 0;
  }
  let _equals23 = _$$equals(_cache, 43, _condition3),
    _value60 = _equals23 ? _cache[43] : _cache[43] = _condition3,
    _value58;
  if (_equals23 ? _cache[44] : _cache[44] = _value60 > 0) {
    _value58 = 'var(--ant-primary-color)';
  } else {
    _value58 = '#262626';
  }
  let _value62 = 45 in _cache ? _cache[45] : _cache[45] = {
      color: _value58
    },
    _value63 = 46 in _cache ? _cache[46] : _cache[46] = {
      className: _value57,
      style: _value62
    },
    _value64 = _equals6 ? _cache[47] : _cache[47] = _value20.errorNum,
    _equals24 = _$$equals(_cache, 48, _value64),
    _value65 = _equals24 ? _cache[48] : _cache[48] = _value64,
    _value66 = _equals24 ? _cache[49] : _cache[49] = _value56("div", _value63, _value65),
    _equals25 = _$$equals(_cache, 50, _value66),
    _value67 = _equals25 ? _cache[50] : _cache[50] = _value66,
    _value68 = _equals22 && _equals25 ? _cache[51] : _cache[51] = _value43("div", _value54, _value55, _value67),
    _equals27 = _$$equals(_cache, 52, _value68),
    _value69 = _equals27 ? _cache[52] : _cache[52] = _value68,
    _value70 = 53 in _cache ? _cache[53] : _cache[53] = jsx,
    _value71 = 54 in _cache ? _cache[54] : _cache[54] = {
      className: styles.item,
      style: {
        textAlign: 'left'
      }
    },
    _value72 = 55 in _cache ? _cache[55] : _cache[55] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " \u5E73\u5747 QPS"), jsx(Tooltip, {
      title: getOwlInfoByKey('平均QPS')
    }, jsx(QuestionCircleOutlined, null))),
    _value73 = 56 in _cache ? _cache[56] : _cache[56] = jsx,
    _value74 = 57 in _cache ? _cache[57] : _cache[57] = {
      className: styles.value
    },
    _condition4 = _equals6 ? _cache[58] : _cache[58] = _value20.qps;
  if (_condition4) {
    let _cache4 = _$$branch(_cache, 59, 13),
      _value76 = 0 in _cache4 ? _cache4[0] : _cache4[0] = Number,
      _equals28 = _$$equals(_cache4, 1, baseInfo),
      _value78 = _equals28 ? _cache4[1] : _cache4[1] = baseInfo,
      _value79 = _equals28 ? _cache4[2] : _cache4[2] = _value78.qps,
      _equals30 = _$$equals(_cache4, 4, _a = _$$equals(_cache4, 3, _value79) ? _cache4[3] : _cache4[3] = _value79),
      _value81 = _equals30 ? _cache4[4] : _cache4[4] = _a = _$$equals(_cache4, 3, _value79) ? _cache4[3] : _cache4[3] = _value79,
      _condition5 = _equals30 ? _cache4[5] : _cache4[5] = _value81 === null;
    if (!_condition5) {
      let _cache5 = _$$branch(_cache4, 6, 3),
        _equals31 = _$$equals(_cache5, 0, _a),
        _value83 = _equals31 ? _cache5[0] : _cache5[0] = _a,
        _value84 = 1 in _cache5 ? _cache5[1] : _cache5[1] = undefined;
      _condition5 = _equals31 ? _cache5[2] : _cache5[2] = _value83 === _value84;
    }
    let _value77;
    if (_condition5) {
      let _cache6 = _$$branch(_cache4, 7, 1);
      _value77 = 0 in _cache6 ? _cache6[0] : _cache6[0] = undefined;
    } else {
      let _cache7 = _$$branch(_cache4, 8, 2),
        _equals32 = _$$equals(_cache7, 0, _a),
        _value87 = _equals32 ? _cache7[0] : _cache7[0] = _a;
      _value77 = _equals32 ? _cache7[1] : _cache7[1] = _value87.toFixed(2);
    }
    let _equals33 = _$$equals(_cache4, 9, _value77),
      _value89 = _equals33 ? _cache4[9] : _cache4[9] = _value77,
      _value90 = _equals33 ? _cache4[10] : _cache4[10] = _value76(_value89),
      _equals34 = _$$equals(_cache4, 11, _value90),
      _value91 = _equals34 ? _cache4[11] : _cache4[11] = _value90;
    _condition4 = _equals34 ? _cache4[12] : _cache4[12] = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3
    }).format(_value91);
  }
  let _equals35 = _$$equals(_cache, 60, _condition4),
    _value93 = _equals35 ? _cache[60] : _cache[60] = _condition4,
    _value94 = _equals35 ? _cache[61] : _cache[61] = _value73("div", _value74, _value93),
    _equals36 = _$$equals(_cache, 62, _value94),
    _value95 = _equals36 ? _cache[62] : _cache[62] = _value94,
    _value96 = _equals36 ? _cache[63] : _cache[63] = _value70("div", _value71, _value72, _value95),
    _equals37 = _$$equals(_cache, 64, _value96),
    _value97 = _equals37 ? _cache[64] : _cache[64] = _value96,
    _value98 = 65 in _cache ? _cache[65] : _cache[65] = jsx,
    _value99 = 66 in _cache ? _cache[66] : _cache[66] = {
      className: styles.item,
      style: {
        textAlign: 'left'
      }
    },
    _value100 = 67 in _cache ? _cache[67] : _cache[67] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " \u5E73\u5747\u8017\u65F6"), jsx(Tooltip, {
      title: getOwlInfoByKey('平均耗时')
    }, jsx(QuestionCircleOutlined, null))),
    _value101 = 68 in _cache ? _cache[68] : _cache[68] = jsx,
    _value102 = 69 in _cache ? _cache[69] : _cache[69] = {
      className: styles.value
    },
    _condition6 = _equals6 ? _cache[70] : _cache[70] = _value20.avgTime;
  if (_condition6) {
    let _cache8 = _$$branch(_cache, 71, 13),
      _value104 = 0 in _cache8 ? _cache8[0] : _cache8[0] = Number,
      _equals38 = _$$equals(_cache8, 1, baseInfo),
      _value106 = _equals38 ? _cache8[1] : _cache8[1] = baseInfo,
      _value107 = _equals38 ? _cache8[2] : _cache8[2] = _value106.avgTime,
      _equals40 = _$$equals(_cache8, 4, _b = _$$equals(_cache8, 3, _value107) ? _cache8[3] : _cache8[3] = _value107),
      _value109 = _equals40 ? _cache8[4] : _cache8[4] = _b = _$$equals(_cache8, 3, _value107) ? _cache8[3] : _cache8[3] = _value107,
      _condition7 = _equals40 ? _cache8[5] : _cache8[5] = _value109 === null;
    if (!_condition7) {
      let _cache9 = _$$branch(_cache8, 6, 3),
        _equals41 = _$$equals(_cache9, 0, _b),
        _value111 = _equals41 ? _cache9[0] : _cache9[0] = _b,
        _value112 = 1 in _cache9 ? _cache9[1] : _cache9[1] = undefined;
      _condition7 = _equals41 ? _cache9[2] : _cache9[2] = _value111 === _value112;
    }
    let _value105;
    if (_condition7) {
      let _cache10 = _$$branch(_cache8, 7, 1);
      _value105 = 0 in _cache10 ? _cache10[0] : _cache10[0] = undefined;
    } else {
      let _cache11 = _$$branch(_cache8, 8, 2),
        _equals42 = _$$equals(_cache11, 0, _b),
        _value115 = _equals42 ? _cache11[0] : _cache11[0] = _b;
      _value105 = _equals42 ? _cache11[1] : _cache11[1] = _value115.toFixed(2);
    }
    let _equals43 = _$$equals(_cache8, 9, _value105),
      _value117 = _equals43 ? _cache8[9] : _cache8[9] = _value105,
      _value118 = _equals43 ? _cache8[10] : _cache8[10] = _value104(_value117),
      _equals44 = _$$equals(_cache8, 11, _value118),
      _value119 = _equals44 ? _cache8[11] : _cache8[11] = _value118;
    _condition6 = _equals44 ? _cache8[12] : _cache8[12] = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3
    }).format(_value119);
  }
  let _equals45 = _$$equals(_cache, 72, _condition6),
    _value121 = _equals45 ? _cache[72] : _cache[72] = _condition6,
    _value122 = 73 in _cache ? _cache[73] : _cache[73] = jsx("span", {
      className: styles.unit
    }, "ms"),
    _value123 = _equals45 ? _cache[74] : _cache[74] = _value101("div", _value102, _value121, _value122),
    _equals46 = _$$equals(_cache, 75, _value123),
    _value124 = _equals46 ? _cache[75] : _cache[75] = _value123,
    _value125 = _equals46 ? _cache[76] : _cache[76] = _value98("div", _value99, _value100, _value124),
    _equals47 = _$$equals(_cache, 77, _value125),
    _value126 = _equals47 ? _cache[77] : _cache[77] = _value125,
    _value127 = 78 in _cache ? _cache[78] : _cache[78] = jsx,
    _value128 = 79 in _cache ? _cache[79] : _cache[79] = {
      className: styles.item,
      style: {
        textAlign: 'left'
      }
    },
    _value129 = 80 in _cache ? _cache[80] : _cache[80] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " P90"), jsx(Tooltip, {
      title: getOwlInfoByKey('P90')
    }, jsx(QuestionCircleOutlined, null))),
    _value130 = 81 in _cache ? _cache[81] : _cache[81] = jsx,
    _value131 = 82 in _cache ? _cache[82] : _cache[82] = {
      className: styles.value
    },
    _condition8 = _equals6 ? _cache[83] : _cache[83] = _value20.p90;
  if (_condition8) {
    let _cache12 = _$$branch(_cache, 84, 13),
      _value133 = 0 in _cache12 ? _cache12[0] : _cache12[0] = Number,
      _equals48 = _$$equals(_cache12, 1, baseInfo),
      _value135 = _equals48 ? _cache12[1] : _cache12[1] = baseInfo,
      _value136 = _equals48 ? _cache12[2] : _cache12[2] = _value135.p90,
      _equals50 = _$$equals(_cache12, 4, _c = _$$equals(_cache12, 3, _value136) ? _cache12[3] : _cache12[3] = _value136),
      _value138 = _equals50 ? _cache12[4] : _cache12[4] = _c = _$$equals(_cache12, 3, _value136) ? _cache12[3] : _cache12[3] = _value136,
      _condition9 = _equals50 ? _cache12[5] : _cache12[5] = _value138 === null;
    if (!_condition9) {
      let _cache13 = _$$branch(_cache12, 6, 3),
        _equals51 = _$$equals(_cache13, 0, _c),
        _value140 = _equals51 ? _cache13[0] : _cache13[0] = _c,
        _value141 = 1 in _cache13 ? _cache13[1] : _cache13[1] = undefined;
      _condition9 = _equals51 ? _cache13[2] : _cache13[2] = _value140 === _value141;
    }
    let _value134;
    if (_condition9) {
      let _cache14 = _$$branch(_cache12, 7, 1);
      _value134 = 0 in _cache14 ? _cache14[0] : _cache14[0] = undefined;
    } else {
      let _cache15 = _$$branch(_cache12, 8, 2),
        _equals52 = _$$equals(_cache15, 0, _c),
        _value144 = _equals52 ? _cache15[0] : _cache15[0] = _c;
      _value134 = _equals52 ? _cache15[1] : _cache15[1] = _value144.toFixed(2);
    }
    let _equals53 = _$$equals(_cache12, 9, _value134),
      _value146 = _equals53 ? _cache12[9] : _cache12[9] = _value134,
      _value147 = _equals53 ? _cache12[10] : _cache12[10] = _value133(_value146),
      _equals54 = _$$equals(_cache12, 11, _value147),
      _value148 = _equals54 ? _cache12[11] : _cache12[11] = _value147;
    _condition8 = _equals54 ? _cache12[12] : _cache12[12] = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3
    }).format(_value148);
  }
  let _equals55 = _$$equals(_cache, 85, _condition8),
    _value150 = _equals55 ? _cache[85] : _cache[85] = _condition8,
    _value151 = 86 in _cache ? _cache[86] : _cache[86] = jsx("span", {
      className: styles.unit
    }, "ms"),
    _value152 = _equals55 ? _cache[87] : _cache[87] = _value130("div", _value131, _value150, _value151),
    _equals56 = _$$equals(_cache, 88, _value152),
    _value153 = _equals56 ? _cache[88] : _cache[88] = _value152,
    _value154 = _equals56 ? _cache[89] : _cache[89] = _value127("div", _value128, _value129, _value153),
    _equals57 = _$$equals(_cache, 90, _value154),
    _value155 = _equals57 ? _cache[90] : _cache[90] = _value154,
    _value156 = 91 in _cache ? _cache[91] : _cache[91] = jsx,
    _value157 = 92 in _cache ? _cache[92] : _cache[92] = {
      className: styles.item,
      style: {
        textAlign: 'left'
      }
    },
    _value158 = 93 in _cache ? _cache[93] : _cache[93] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " P95"), jsx(Tooltip, {
      title: getOwlInfoByKey('P95')
    }, jsx(QuestionCircleOutlined, null))),
    _value159 = 94 in _cache ? _cache[94] : _cache[94] = jsx,
    _value160 = 95 in _cache ? _cache[95] : _cache[95] = {
      className: styles.value
    },
    _condition10 = _equals6 ? _cache[96] : _cache[96] = _value20.p95;
  if (_condition10) {
    let _cache16 = _$$branch(_cache, 97, 13),
      _value162 = 0 in _cache16 ? _cache16[0] : _cache16[0] = Number,
      _equals58 = _$$equals(_cache16, 1, baseInfo),
      _value164 = _equals58 ? _cache16[1] : _cache16[1] = baseInfo,
      _value165 = _equals58 ? _cache16[2] : _cache16[2] = _value164.p95,
      _equals60 = _$$equals(_cache16, 4, _d = _$$equals(_cache16, 3, _value165) ? _cache16[3] : _cache16[3] = _value165),
      _value167 = _equals60 ? _cache16[4] : _cache16[4] = _d = _$$equals(_cache16, 3, _value165) ? _cache16[3] : _cache16[3] = _value165,
      _condition11 = _equals60 ? _cache16[5] : _cache16[5] = _value167 === null;
    if (!_condition11) {
      let _cache17 = _$$branch(_cache16, 6, 3),
        _equals61 = _$$equals(_cache17, 0, _d),
        _value169 = _equals61 ? _cache17[0] : _cache17[0] = _d,
        _value170 = 1 in _cache17 ? _cache17[1] : _cache17[1] = undefined;
      _condition11 = _equals61 ? _cache17[2] : _cache17[2] = _value169 === _value170;
    }
    let _value163;
    if (_condition11) {
      let _cache18 = _$$branch(_cache16, 7, 1);
      _value163 = 0 in _cache18 ? _cache18[0] : _cache18[0] = undefined;
    } else {
      let _cache19 = _$$branch(_cache16, 8, 2),
        _equals62 = _$$equals(_cache19, 0, _d),
        _value173 = _equals62 ? _cache19[0] : _cache19[0] = _d;
      _value163 = _equals62 ? _cache19[1] : _cache19[1] = _value173.toFixed(2);
    }
    let _equals63 = _$$equals(_cache16, 9, _value163),
      _value175 = _equals63 ? _cache16[9] : _cache16[9] = _value163,
      _value176 = _equals63 ? _cache16[10] : _cache16[10] = _value162(_value175),
      _equals64 = _$$equals(_cache16, 11, _value176),
      _value177 = _equals64 ? _cache16[11] : _cache16[11] = _value176;
    _condition10 = _equals64 ? _cache16[12] : _cache16[12] = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3
    }).format(_value177);
  }
  let _equals65 = _$$equals(_cache, 98, _condition10),
    _value179 = _equals65 ? _cache[98] : _cache[98] = _condition10,
    _value180 = 99 in _cache ? _cache[99] : _cache[99] = jsx("span", {
      className: styles.unit
    }, "ms"),
    _value181 = _equals65 ? _cache[100] : _cache[100] = _value159("div", _value160, _value179, _value180),
    _equals66 = _$$equals(_cache, 101, _value181),
    _value182 = _equals66 ? _cache[101] : _cache[101] = _value181,
    _value183 = _equals66 ? _cache[102] : _cache[102] = _value156("div", _value157, _value158, _value182),
    _equals67 = _$$equals(_cache, 103, _value183),
    _value184 = _equals67 ? _cache[103] : _cache[103] = _value183,
    _value185 = 104 in _cache ? _cache[104] : _cache[104] = jsx,
    _value186 = 105 in _cache ? _cache[105] : _cache[105] = {
      className: styles.item,
      style: {
        textAlign: 'left'
      }
    },
    _value187 = 106 in _cache ? _cache[106] : _cache[106] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " P99"), jsx(Tooltip, {
      title: getOwlInfoByKey('P99')
    }, jsx(QuestionCircleOutlined, null))),
    _value188 = 107 in _cache ? _cache[107] : _cache[107] = jsx,
    _value189 = 108 in _cache ? _cache[108] : _cache[108] = {
      className: styles.value
    },
    _condition12 = _equals6 ? _cache[109] : _cache[109] = _value20.p99;
  if (_condition12) {
    let _cache20 = _$$branch(_cache, 110, 13),
      _value191 = 0 in _cache20 ? _cache20[0] : _cache20[0] = Number,
      _equals68 = _$$equals(_cache20, 1, baseInfo),
      _value193 = _equals68 ? _cache20[1] : _cache20[1] = baseInfo,
      _value194 = _equals68 ? _cache20[2] : _cache20[2] = _value193.p99,
      _equals70 = _$$equals(_cache20, 4, _e = _$$equals(_cache20, 3, _value194) ? _cache20[3] : _cache20[3] = _value194),
      _value196 = _equals70 ? _cache20[4] : _cache20[4] = _e = _$$equals(_cache20, 3, _value194) ? _cache20[3] : _cache20[3] = _value194,
      _condition13 = _equals70 ? _cache20[5] : _cache20[5] = _value196 === null;
    if (!_condition13) {
      let _cache21 = _$$branch(_cache20, 6, 3),
        _equals71 = _$$equals(_cache21, 0, _e),
        _value198 = _equals71 ? _cache21[0] : _cache21[0] = _e,
        _value199 = 1 in _cache21 ? _cache21[1] : _cache21[1] = undefined;
      _condition13 = _equals71 ? _cache21[2] : _cache21[2] = _value198 === _value199;
    }
    let _value192;
    if (_condition13) {
      let _cache22 = _$$branch(_cache20, 7, 1);
      _value192 = 0 in _cache22 ? _cache22[0] : _cache22[0] = undefined;
    } else {
      let _cache23 = _$$branch(_cache20, 8, 2),
        _equals72 = _$$equals(_cache23, 0, _e),
        _value202 = _equals72 ? _cache23[0] : _cache23[0] = _e;
      _value192 = _equals72 ? _cache23[1] : _cache23[1] = _value202.toFixed(2);
    }
    let _equals73 = _$$equals(_cache20, 9, _value192),
      _value204 = _equals73 ? _cache20[9] : _cache20[9] = _value192,
      _value205 = _equals73 ? _cache20[10] : _cache20[10] = _value191(_value204),
      _equals74 = _$$equals(_cache20, 11, _value205),
      _value206 = _equals74 ? _cache20[11] : _cache20[11] = _value205;
    _condition12 = _equals74 ? _cache20[12] : _cache20[12] = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3
    }).format(_value206);
  }
  let _equals75 = _$$equals(_cache, 111, _condition12),
    _value208 = _equals75 ? _cache[111] : _cache[111] = _condition12,
    _value209 = 112 in _cache ? _cache[112] : _cache[112] = jsx("span", {
      className: styles.unit
    }, "ms"),
    _value210 = _equals75 ? _cache[113] : _cache[113] = _value188("div", _value189, _value208, _value209),
    _equals76 = _$$equals(_cache, 114, _value210),
    _value211 = _equals76 ? _cache[114] : _cache[114] = _value210,
    _value212 = _equals76 ? _cache[115] : _cache[115] = _value185("div", _value186, _value187, _value211),
    _equals77 = _$$equals(_cache, 116, _value212),
    _value213 = _equals77 ? _cache[116] : _cache[116] = _value212,
    _value214 = 117 in _cache ? _cache[117] : _cache[117] = jsx,
    _value215 = 118 in _cache ? _cache[118] : _cache[118] = {
      className: styles.item,
      style: {
        textAlign: 'left',
        flex: 1.2
      }
    },
    _value216 = 119 in _cache ? _cache[119] : _cache[119] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " \u5E73\u5747CPU\u4F7F\u7528\u7387"), jsx(Tooltip, {
      title: getOwlInfoByKey('平均CPU使用率')
    }, jsx(QuestionCircleOutlined, null))),
    _value217 = 120 in _cache ? _cache[120] : _cache[120] = jsx,
    _value218 = 121 in _cache ? _cache[121] : _cache[121] = {
      className: styles.value
    },
    _condition14 = _equals6 ? _cache[122] : _cache[122] = _value20.cpuUsageRatio;
  if (_condition14) {
    let _cache24 = _$$branch(_cache, 123, 10),
      _equals78 = _$$equals(_cache24, 0, baseInfo),
      _value220 = _equals78 ? _cache24[0] : _cache24[0] = baseInfo,
      _value221 = _equals78 ? _cache24[1] : _cache24[1] = _value220.cpuUsageRatio,
      _equals79 = _$$equals(_cache24, 2, _value221),
      _value222 = _equals79 ? _cache24[2] : _cache24[2] = _value221,
      _value223 = _equals79 ? _cache24[3] : _cache24[3] = _value222 * 10000,
      _equals80 = _$$equals(_cache24, 4, _value223),
      _value224 = _equals80 ? _cache24[4] : _cache24[4] = _value223,
      _value225 = _equals80 ? _cache24[5] : _cache24[5] = Math.floor(_value224),
      _equals81 = _$$equals(_cache24, 6, _value225),
      _value226 = _equals81 ? _cache24[6] : _cache24[6] = _value225,
      _value227 = _equals81 ? _cache24[7] : _cache24[7] = _value226 / 100,
      _equals82 = _$$equals(_cache24, 8, _value227),
      _value228 = _equals82 ? _cache24[8] : _cache24[8] = _value227;
    _condition14 = _equals82 ? _cache24[9] : _cache24[9] = `${_value228}%`;
  }
  let _equals83 = _$$equals(_cache, 124, _condition14),
    _value230 = _equals83 ? _cache[124] : _cache[124] = _condition14,
    _value231 = _equals83 ? _cache[125] : _cache[125] = _value217("div", _value218, _value230),
    _equals84 = _$$equals(_cache, 126, _value231),
    _value232 = _equals84 ? _cache[126] : _cache[126] = _value231,
    _value233 = _equals84 ? _cache[127] : _cache[127] = _value214("div", _value215, _value216, _value232),
    _equals85 = _$$equals(_cache, 128, _value233),
    _value234 = _equals85 ? _cache[128] : _cache[128] = _value233,
    _value235 = 129 in _cache ? _cache[129] : _cache[129] = jsx,
    _value236 = 130 in _cache ? _cache[130] : _cache[130] = {
      className: styles.item,
      style: {
        textAlign: 'left',
        flex: 1.2
      }
    },
    _value237 = 131 in _cache ? _cache[131] : _cache[131] = jsx("div", {
      className: "flex",
      style: {
        justifyContent: 'space-between'
      }
    }, jsx("span", {
      className: styles.label
    }, " \u5E73\u5747\u5185\u5B58\u4F7F\u7528\u7387"), jsx(Tooltip, {
      title: getOwlInfoByKey('平均内存使用率')
    }, jsx(QuestionCircleOutlined, null))),
    _value238 = 132 in _cache ? _cache[132] : _cache[132] = jsx,
    _value239 = 133 in _cache ? _cache[133] : _cache[133] = {
      className: styles.value
    },
    _condition15 = _equals6 ? _cache[134] : _cache[134] = _value20.memoryUsageRatio;
  if (_condition15) {
    let _cache25 = _$$branch(_cache, 135, 10),
      _equals86 = _$$equals(_cache25, 0, baseInfo),
      _value241 = _equals86 ? _cache25[0] : _cache25[0] = baseInfo,
      _value242 = _equals86 ? _cache25[1] : _cache25[1] = _value241.memoryUsageRatio,
      _equals87 = _$$equals(_cache25, 2, _value242),
      _value243 = _equals87 ? _cache25[2] : _cache25[2] = _value242,
      _value244 = _equals87 ? _cache25[3] : _cache25[3] = _value243 * 10000,
      _equals88 = _$$equals(_cache25, 4, _value244),
      _value245 = _equals88 ? _cache25[4] : _cache25[4] = _value244,
      _value246 = _equals88 ? _cache25[5] : _cache25[5] = Math.floor(_value245),
      _equals89 = _$$equals(_cache25, 6, _value246),
      _value247 = _equals89 ? _cache25[6] : _cache25[6] = _value246,
      _value248 = _equals89 ? _cache25[7] : _cache25[7] = _value247 / 100,
      _equals90 = _$$equals(_cache25, 8, _value248),
      _value249 = _equals90 ? _cache25[8] : _cache25[8] = _value248;
    _condition15 = _equals90 ? _cache25[9] : _cache25[9] = `${_value249}%`;
  }
  let _equals91 = _$$equals(_cache, 136, _condition15),
    _value251 = _equals91 ? _cache[136] : _cache[136] = _condition15,
    _value252 = _equals91 ? _cache[137] : _cache[137] = _value238("div", _value239, _value251),
    _equals92 = _$$equals(_cache, 138, _value252),
    _value253 = _equals92 ? _cache[138] : _cache[138] = _value252,
    _value254 = _equals92 ? _cache[139] : _cache[139] = _value235("div", _value236, _value237, _value253),
    _equals93 = _$$equals(_cache, 140, _value254),
    _value255 = _equals93 ? _cache[140] : _cache[140] = _value254,
    _value256 = _equals17 && _equals27 && _equals37 && _equals47 && _equals57 && _equals67 && _equals77 && _equals85 && _equals93 ? _cache[141] : _cache[141] = _value12("div", _value13, _value42, _value69, _value97, _value126, _value155, _value184, _value213, _value234, _value255),
    _equals95 = _$$equals(_cache, 142, _value256),
    _value257 = _equals95 ? _cache[142] : _cache[142] = _value256,
    _value258 = 143 in _cache ? _cache[143] : _cache[143] = jsx("div", {
      className: styles.headerTitle
    }, "\u91CD\u70B9\u6307\u6807"),
    _value259 = 144 in _cache ? _cache[144] : _cache[144] = jsx,
    _value260 = 145 in _cache ? _cache[145] : _cache[145] = KeyIndicators,
    _value261 = _equals3 && _equals4 ? _cache[146] : _cache[146] = {
      startTime: _value5,
      endTime: _value6
    },
    _equals97 = _$$equals(_cache, 147, _value261),
    _value262 = _equals97 ? _cache[147] : _cache[147] = _value261,
    _value263 = _equals97 ? _cache[148] : _cache[148] = _value259(_value260, _value262),
    _equals98 = _$$equals(_cache, 149, _value263),
    _value264 = _equals98 ? _cache[149] : _cache[149] = _value263,
    _value265 = 150 in _cache ? _cache[150] : _cache[150] = jsx("div", {
      className: styles.headerTitle
    }, "\u7AEF\u70B9 TOP10 \u8C03\u7528\u60C5\u51B5\u6982\u89C8"),
    _value266 = 151 in _cache ? _cache[151] : _cache[151] = jsx,
    _value267 = 152 in _cache ? _cache[152] : _cache[152] = EndPoint,
    _value268 = _equals3 && _equals4 ? _cache[153] : _cache[153] = {
      startTime: _value5,
      endTime: _value6
    },
    _equals100 = _$$equals(_cache, 154, _value268),
    _value269 = _equals100 ? _cache[154] : _cache[154] = _value268,
    _value270 = _equals100 ? _cache[155] : _cache[155] = _value266(_value267, _value269),
    _equals101 = _$$equals(_cache, 156, _value270),
    _value271 = _equals101 ? _cache[156] : _cache[156] = _value270,
    _condition16 = _$$equals(_cache, 157, spanErrorVis) ? _cache[157] : _cache[157] = spanErrorVis;
  if (_condition16) {
    let _cache26 = _$$branch(_cache, 158, 37),
      _value273 = 0 in _cache26 ? _cache26[0] : _cache26[0] = jsx,
      _value274 = 1 in _cache26 ? _cache26[1] : _cache26[1] = Drawer,
      _equals103 = _$$equals(_cache26, 2, spanErrorVis),
      _value275 = _equals103 ? _cache26[2] : _cache26[2] = spanErrorVis,
      _equals104 = _$$equals(_cache26, 3, setSpanErrorVis),
      _value276 = _equals104 ? _cache26[3] : _cache26[3] = setSpanErrorVis,
      _value277 = _equals104 ? _cache26[4] : _cache26[4] = () => setSpanErrorVis(false),
      _value278 = _equals103 && _equals104 ? _cache26[5] : _cache26[5] = {
        open: _value275,
        width: "80vw",
        title: "\u5F02\u5E38Span\u67E5\u770B",
        onClose: _value277
      },
      _equals106 = _$$equals(_cache26, 6, _value278),
      _value279 = _equals106 ? _cache26[6] : _cache26[6] = _value278,
      _value280 = 7 in _cache26 ? _cache26[7] : _cache26[7] = jsx,
      _value281 = 8 in _cache26 ? _cache26[8] : _cache26[8] = Link,
      _value282 = 9 in _cache26 ? _cache26[9] : _cache26[9] = encodeURIComponent,
      _equals107 = _$$equals(_cache26, 10, service),
      _value283 = _equals107 ? _cache26[10] : _cache26[10] = service,
      _value284 = _equals107 ? _cache26[11] : _cache26[11] = _value283.serviceName,
      _equals108 = _$$equals(_cache26, 12, _value284),
      _value285 = _equals108 ? _cache26[12] : _cache26[12] = _value284,
      _value286 = _equals108 ? _cache26[13] : _cache26[13] = [_value285],
      _value287 = _equals108 ? _cache26[14] : _cache26[14] = {
        service: _value286,
        status: 1
      },
      _equals109 = _$$equals(_cache26, 15, _value287),
      _value288 = _equals109 ? _cache26[15] : _cache26[15] = _value287,
      _value289 = _equals109 ? _cache26[16] : _cache26[16] = JSON.stringify(_value288),
      _equals110 = _$$equals(_cache26, 17, _value289),
      _value290 = _equals110 ? _cache26[17] : _cache26[17] = _value289,
      _value291 = _equals110 ? _cache26[18] : _cache26[18] = _value282(_value290),
      _equals111 = _$$equals(_cache26, 19, _value291),
      _value292 = _equals111 ? _cache26[19] : _cache26[19] = _value291,
      _value293 = 20 in _cache26 ? _cache26[20] : _cache26[20] = encodeURIComponent,
      _value294 = 21 in _cache26 ? _cache26[21] : _cache26[21] = GlobalTimeType.范围,
      _equals112 = _$$equals(_cache26, 22, startTime),
      _value295 = _equals112 ? _cache26[22] : _cache26[22] = startTime,
      _equals113 = _$$equals(_cache26, 23, endTime),
      _value296 = _equals113 ? _cache26[23] : _cache26[23] = endTime,
      _value297 = _equals112 && _equals113 ? _cache26[24] : _cache26[24] = {
        type: _value294,
        startTime: _value295,
        endTime: _value296
      },
      _equals115 = _$$equals(_cache26, 25, _value297),
      _value298 = _equals115 ? _cache26[25] : _cache26[25] = _value297,
      _value299 = _equals115 ? _cache26[26] : _cache26[26] = JSON.stringify(_value298),
      _equals116 = _$$equals(_cache26, 27, _value299),
      _value300 = _equals116 ? _cache26[27] : _cache26[27] = _value299,
      _value301 = _equals116 ? _cache26[28] : _cache26[28] = _value293(_value300),
      _equals117 = _$$equals(_cache26, 29, _value301),
      _value302 = _equals117 ? _cache26[29] : _cache26[29] = _value301,
      _equals118 = _equals111 && _equals117,
      _value303 = _equals118 ? _cache26[30] : _cache26[30] = `/owl-v2/trace/chain-analysis#search=${_value292}&gobalTime=${_value302}`,
      _value304 = _equals118 ? _cache26[31] : _cache26[31] = {
        className: "float-right",
        target: "_blank",
        to: _value303,
        rel: "noreferrer"
      },
      _equals119 = _$$equals(_cache26, 32, _value304),
      _value305 = _equals119 ? _cache26[32] : _cache26[32] = _value304,
      _value306 = _equals119 ? _cache26[33] : _cache26[33] = _value280(_value281, _value305, "\u524D\u5F80Trace\u5206\u6790"),
      _equals120 = _$$equals(_cache26, 34, _value306),
      _value307 = _equals120 ? _cache26[34] : _cache26[34] = _value306,
      _value308 = 35 in _cache26 ? _cache26[35] : _cache26[35] = jsx(TraceList, {
        showStatus: false,
        tableProps: {
          scroll: {
            x: 2296,
            y: 'calc( 100vh - 160px)'
          }
        }
      });
    _condition16 = _equals106 && _equals120 ? _cache26[36] : _cache26[36] = _value273(_value274, _value279, _value307, _value308);
  }
  let _equals122 = _$$equals(_cache, 159, _condition16),
    _value310 = _equals122 ? _cache[159] : _cache[159] = _condition16;
  return _equals95 && _equals98 && _equals101 && _equals122 ? _cache[160] : _cache[160] = _value9("div", _value10, _value11, _value257, _value258, _value264, _value265, _value271, _value310);
});
