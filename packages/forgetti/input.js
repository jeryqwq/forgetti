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
  var _a, _b, _c, _d, _e;
  const [baseInfo, setBaseInfo] = useState({});
  const [service] = useAtom(serviceAtom);
  const {
    serviceName
  } = service;
  const {
    startTime,
    endTime
  } = useGlobalTime();
  const [spanErrorVis, setSpanErrorVis] = useState(false);
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
  }, [serviceName, startTime, endTime]);
  const [filters, filtersSet] = useAtom(filterConditionAtom);
  const qps = baseInfo.qps && new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3
  }).format(Number((_a = baseInfo.qps) === null || _a === void 0 ? void 0 : _a.toFixed(2)));
  const errorRatio = baseInfo.errorRatio === 0 ? '100%' : baseInfo.errorRatio && `${Math.floor((1 - baseInfo.errorRatio) * 10000) / 100}%`;
  const memory = baseInfo.memoryUsageRatio && `${Math.floor(baseInfo.memoryUsageRatio * 10000) / 100}%`;
  const cpu = baseInfo.cpuUsageRatio && `${Math.floor(baseInfo.cpuUsageRatio * 10000) / 100}%`;
  return jsx("div", {
    className: styles.previewWrap
  }, jsx("div", {
    className: styles.headerTitle
  }, "\u57FA\u672C\u4FE1\u606F"), jsx("div", {
    className: styles.baseInfo
  }, jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left',
      flex: 0.7
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, "Span \u6B63\u786E\u7387"), jsx(Tooltip, {
    title: getOwlInfoByKey('正确率')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, errorRatio)), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left',
      cursor: (baseInfo.errorNum || 0) > 0 ? 'pointer' : 'initial'
    },
    onClick: () => {
      if ((baseInfo.errorNum || 0) > 0) {
        setSpanErrorVis(true);
        filtersSet({
          service: [service.serviceName],
          status: 1
        });
      }
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, "Span \u5F02\u5E38\u6570"), jsx(Tooltip, {
    title: getOwlInfoByKey('异常数')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value,
    style: {
      color: (baseInfo.errorNum || 0) > 0 ? 'var(--ant-primary-color)' : '#262626'
    }
  }, baseInfo.errorNum)), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left'
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " \u5E73\u5747 QPS"), jsx(Tooltip, {
    title: getOwlInfoByKey('平均QPS')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, qps)), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left'
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " \u5E73\u5747\u8017\u65F6"), jsx(Tooltip, {
    title: getOwlInfoByKey('平均耗时')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, baseInfo.avgTime && new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3
  }).format(Number((_b = baseInfo.avgTime) === null || _b === void 0 ? void 0 : _b.toFixed(2))), jsx("span", {
    className: styles.unit
  }, "ms"))), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left'
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " P90"), jsx(Tooltip, {
    title: getOwlInfoByKey('P90')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, baseInfo.p90 && new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3
  }).format(Number((_c = baseInfo.p90) === null || _c === void 0 ? void 0 : _c.toFixed(2))), jsx("span", {
    className: styles.unit
  }, "ms"))), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left'
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " P95"), jsx(Tooltip, {
    title: getOwlInfoByKey('P95')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, baseInfo.p95 && new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3
  }).format(Number((_d = baseInfo.p95) === null || _d === void 0 ? void 0 : _d.toFixed(2))), jsx("span", {
    className: styles.unit
  }, "ms"))), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left'
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " P99"), jsx(Tooltip, {
    title: getOwlInfoByKey('P99')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, baseInfo.p99 && new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3
  }).format(Number((_e = baseInfo.p99) === null || _e === void 0 ? void 0 : _e.toFixed(2))), jsx("span", {
    className: styles.unit
  }, "ms"))), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left',
      flex: 1.2
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " \u5E73\u5747CPU\u4F7F\u7528\u7387"), jsx(Tooltip, {
    title: getOwlInfoByKey('平均CPU使用率')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, cpu)), jsx("div", {
    className: styles.item,
    style: {
      textAlign: 'left',
      flex: 1.2
    }
  }, jsx("div", {
    className: "flex",
    style: {
      justifyContent: 'space-between'
    }
  }, jsx("span", {
    className: styles.label
  }, " \u5E73\u5747\u5185\u5B58\u4F7F\u7528\u7387"), jsx(Tooltip, {
    title: getOwlInfoByKey('平均内存使用率')
  }, jsx(QuestionCircleOutlined, null))), jsx("div", {
    className: styles.value
  }, memory))), jsx("div", {
    className: styles.headerTitle
  }, "\u91CD\u70B9\u6307\u6807"), jsx(KeyIndicators, {
    startTime: startTime,
    endTime: endTime
  }), jsx("div", {
    className: styles.headerTitle
  }, "\u7AEF\u70B9 TOP10 \u8C03\u7528\u60C5\u51B5\u6982\u89C8"), jsx(EndPoint, {
    startTime: startTime,
    endTime: endTime
  }), spanErrorVis && jsx(Drawer, {
    open: spanErrorVis,
    width: "80vw",
    title: "\u5F02\u5E38Span\u67E5\u770B",
    onClose: () => setSpanErrorVis(false)
  }, jsx(Link, {
    className: "float-right",
    target: "_blank",
    to: `/owl-v2/trace/chain-analysis#search=${encodeURIComponent(JSON.stringify({
      service: [service.serviceName],
      status: 1
    }))}&gobalTime=${encodeURIComponent(JSON.stringify({
      type: GlobalTimeType.范围,
      startTime,
      endTime
    }))}`,
    rel: "noreferrer"
  }, "\u524D\u5F80Trace\u5206\u6790"), jsx(TraceList, {
    showStatus: false,
    tableProps: {
      scroll: {
        x: 2296,
        y: 'calc( 100vh - 160px)'
      }
    }
  })));
});
