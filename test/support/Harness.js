/**
 * HotKeyHarness - used for testing conditions for rendering within a stateful component.
 */

import React, { useState } from 'react';
import { HotKeys } from '../../lib';

const HotKeysHarness = ({ 
  outerHandlers,
  outerKeyMap,
  innerHandlers,
  innerKeyMap,
  innerTestId,
  outerTestId,
  changeKeyTestId,
  changeHandlerTestId,
  alternativeOuterHandler,
  alternativeOuterKey,
}) => {
  const [value, setValue] = useState('fill');
  const [outerH, setOuterH] = useState(outerHandlers);
  const [outerK, setOuterK] = useState(outerKeyMap);

  const changeKey = () => {
    setOuterK(current => {
      return Object.assign({}, current, alternativeOuterKey);
    });
  }

  const changeHandler = () => {
    setOuterH(current => {
      return Object.assign({}, current, alternativeOuterHandler);
    });
  }

  return (
    <div>
      <button data-testid={changeKeyTestId} type="button" onClick={changeKey}>Change Key</button>
      <button data-testid={changeHandlerTestId} type="button" onClick={changeHandler}>Change Handler</button>
      <HotKeys keyMap={outerK} handlers={outerH} id="outer">
        <input data-testid={outerTestId} value={value} onChange={(e) => { setValue(e.target.value); }} />
        <HotKeys keyMap={innerKeyMap} handlers={innerHandlers} id="inner">
          <input data-testid={innerTestId} />
        </HotKeys>
      </HotKeys>
    </div>
  );
};

export default HotKeysHarness;
