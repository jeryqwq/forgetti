import React, { useEffect, useState, memo } from 'react';

export default memo(function Test(props) {
  const b = {
    a: props.a ? 2 : 1,
  }
  return <div>{b.a}</div>
});
