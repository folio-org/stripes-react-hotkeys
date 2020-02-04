import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import FocusTrap from "./FocusTrap";
import contains from './contains';
import isEqual from "lodash/isEqual";
import isBool from "lodash/isBoolean";
import isArray from "lodash/isArray";
import { withHotKeys, HotKeysProvider } from "./HotKeysContext";
import Keyboard from "keyboardjs/lib/keyboard";
import usLocale from "keyboardjs/locales/us";

const buildMap = (contextMap = {}, newMap = {}, thisMap = {}) =>
  Object.assign({}, contextMap, newMap, thisMap);

const updateMap = (
  contextMap = {},
  newMap = {},
  thisMap = {},
  currentMap = {}
) => {
  const nextMap = buildMap(contextMap, newMap, thisMap);

  if (!isEqual(nextMap, currentMap)) {
    return nextMap;
  }
  return null;
};

const getSequencesFromMap = (hotKeyMap, hotKeyName) => {
  const sequences = hotKeyMap[hotKeyName];

  // If no sequence is found with this name we assume
  // the user is passing a hard-coded sequence as a key
  if (!sequences) {
    return [hotKeyName];
  }

  if (isArray(sequences)) {
    return sequences;
  }

  return [sequences];
};

const bindKeys = (bindArray, kbjs, wrapper, handlers, keyMap) => {
  Object.keys(handlers).forEach(h => {
    let keyCombo = keyMap[h];

    // if no keyMap entry is present, assume the handler's key *is* 
    // the keyCombo (a hard-coded sequence like "enter" or "ctrl + e".)
    if (!keyCombo) {
      keyCombo = h;
    }

    const wrapped = {
      keyCombo,
      fn: e => {
        wrapper(e, handlers[h], keyCombo);
      }
    };
    kbjs.on(keyCombo, wrapped.fn);
    bindArray.push(wrapped);
  });
};

const unbindKeys = (bindArray, kbjs) => {
  kbjs.stop();
  bindArray = [];
};

class HotKeys extends React.Component {
  static propTypes = {
    HKcontext: PropTypes.object,
    keyMap: PropTypes.object,
    handlers: PropTypes.object
  };

  constructor(props) {
    super(props);

    const { childHandledSequence } = this;

    this.state = {
      timestamp: undefined,
      HKcontext: {
        hotKeyParent: {
          childHandledSequence
        },
        hotKeyMap: buildMap(props.HKcontext.hotKeyMap, props.keyMap)
      }
    };

    this.keyboardjs = null;
    this.isFocused = false;
    this.lastChildSequence = null;
    this.localKeybindings = [];
  }

  static getDerivedStateFromProps(props, state) {
    const nextMap = updateMap(
      props.HKcontext.hotKeyMap,
      props.keyMap,
      state.HKcontext.hotKeyMap
    );

    if (nextMap) {
      return {
        HKcontext: Object.assign({}, state.HKcontext, { hotKeyMap: nextMap })
      };
    }

    return null;
  }

  componentDidMount() {
    this.attachment = this.props.attach || ReactDOM.findDOMNode(this);
    this.keyboardjs = new Keyboard(this.attachment);
    this.keyboardjs.setLocale("us", usLocale);
    this.updateHotKeys(true);
  }

  componentDidUpdate(prevProps) {
    this.updateHotKeys(false, prevProps);
    if (!isEqual(prevProps.keyMap, this.props.keyMap)) {
      this.setState({ timeStamp: new Date().getTime() });
    }
  }

  componentWillUnmount() {
    const {
      HKcontext: { hotKeyParent }
    } = this.props;
    if (hotKeyParent) {
      hotKeyParent.childHandledSequence(null);
    }

    if (this.keyboardjs) {
      this.keyboardjs.stop();
      this.localKeybindings = [];
    }
  }

  handlerWrapper = (e, handler, sequence) => {
    const { focused, attach } = this.props;
    // Check we are actually in focus and that a child hasn't handled the sequence...
    let isFocused = this.isFocused;
    if (isBool(focused)) {
      // if a boolean is used for the focused prop, make sure the e.target is contained.
      // this keeps sibling HotKeys instances from firing handlers for similar key mapping.
      if (contains(this.attachment, e.target)) {
        isFocused = focused;
      }
    } else if (typeof focused === "function") {
      isFocused = focused();
    } else {

    }

    if (isFocused && sequence !== this.lastChildSequence) {
      if (this.props.HKcontext.hotKeyParent) {
        this.props.HKcontext.hotKeyParent.childHandledSequence(sequence);
      }

      handler(e);
    }
  };

  updateHotKeys = (force = false, prevProps = {}) => {
    const { handlers = {}, keyMap } = this.props;
    const {
      HKcontext: { hotKeyMap: combinedKeyMap }
    } = this.state;
    const prevHandlers = prevProps.handlers || {};

    if (
      !force &&
      !updateMap(combinedKeyMap, keyMap) &&
      isEqual(handlers, prevHandlers)
    ) {
      return;
    }

    unbindKeys(this.localKeybindings, this.keyboardjs);
    bindKeys(
      this.localKeybindings,
      this.keyboardjs,
      this.handlerWrapper,
      handlers,
      combinedKeyMap
    );
    this.keyboardjs.watch();
  };

  childHandledSequence = (sequence = null) => {
    const {
      HKcontext: { hotKeyParent }
    } = this.props;
    this.lastChildSequence = sequence;

    // Travers up to any contextual parents, leting them know we handled it...
    if (hotKeyParent) {
      hotKeyParent.childHandledSequence(sequence);
    }
  };

  onFocus = (...args) => {
    this.isFocused = true;

    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  onBlur = (...args) => {
    const {
      HKcontext: { hotKeyParent },
      onBlur
    } = this.props;

    this.isFocused = false;

    if (onBlur) {
      onBlur(...args);
    }
    if (hotKeyParent) {
      hotKeyParent.childHandledSequence(null);
    }
  };

  render() {
    const {
      children,
      keyMap,
      handlers,
      focused,
      attach,
      HKcontext,
      ...props
    } = this.props;

    return (
      <HotKeysProvider value={this.state.HKcontext}>
        <FocusTrap {...props} onFocus={this.onFocus} onBlur={this.onBlur}>
          {children}
        </FocusTrap>
      </HotKeysProvider>
    );
  }
}

export default withHotKeys(HotKeys);
