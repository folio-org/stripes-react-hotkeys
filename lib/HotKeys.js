import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "./FocusTrap";
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
    return { hotkeyMap: nextMap };
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
    const keyCombo = keyMap[h];
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
    context: PropTypes.object,
    keyMap: PropTypes.object,
    handlers: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      timestamp: undefined,
      context: {
        hotKeyParent: this,
        hotKeyMap: buildMap(props.context.hotKeyMap, props.keyMap)
      }
    };

    this.keyboardjs = null;
    this.isFocused = false;
    this.lastChildSequence = null;
    this.localKeybindings = [];
  }

  static getDerivedStateFromProps(props, state) {
    const nextMap = updateMap(
      props.context.hotKeyMap,
      props.keyMap,
      state.context.keyMap
    );

    if (nextMap) {
      return {
        context: Object.assign({}, state.context, { hotKeyMap: nextMap })
      };
    }

    return null;
  }

  componentDidMount() {
    this.keyboardjs = new Keyboard(
      this.props.attach || ReactDOM.findDOMNode(this)
    );
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
      context: { hotKeyParent }
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
    const { focused } = this.props;
    // Check we are actually in focus and that a child hasn't handled the sequence...
    let isFocused = this.isFocused;
    if (isBool(focused)) {
      isFocused = focused;
    } else if (typeof focused === "function") {
      isFocused = focused();
    }

    if (isFocused && sequence !== this.lastChildSequence) {
      if (this.props.context.hotKeyParent) {
        this.props.context.hotKeyParent.childHandledSequence(sequence);
      }

      handler(e);
    }
  };

  updateHotKeys = (force = false, prevProps = {}) => {
    const { handlers = {}, keyMap } = this.props;
    const prevHandlers = prevProps.handlers || {};

    if (
      !force &&
      !updateMap(this.context.hotKeyMap, keyMap) &&
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
      keyMap
    );
    this.keyboardjs.watch();
  };

  childHandledSequence = (sequence = null) => {
    const {
      context: { hotKeyParent }
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
      context: { hotKeyParent },
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
      ...props
    } = this.props;

    return (
      <HotKeysProvider value={this.state.context}>
        <FocusTrap {...props} onFocus={this.onFocus} onBlur={this.onBlur}>
          {children}
        </FocusTrap>
      </HotKeysProvider>
    );
  }
}

export default withHotKeys(HotKeys);
