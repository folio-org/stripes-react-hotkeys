import * as React from 'react';

export type KeyboardKeySequence = string | Array<string>;

export type KeyEventName = 'keyup' | 'keydown' | 'keypress';

export type KeySequence = KeyboardKeySequence | KeyMapOptions | Array<KeyboardKeySequence>;

export type KeyMap = { [key: string]: KeySequence };

export interface KeyMapOptions {
  sequence: KeyboardKeySequence;
  action: KeyEventName;
}

export interface FocusTrapProps {
  /**
   * The React component that should be used in the DOM to wrap the FocusTrap's
   * children and have the internal key listeners bound to
   */
  component?: React.Component | string;
}

export interface HotKeysProps extends React.HTMLAttributes<HotKeys>, FocusTrapProps {
  /**
   * A mapping of action names to key combinations
   */
  keyMap?: KeyMap;

  /**
   * A mapping of action names to handler functions
   */
  handlers?: { [key: string]: (keyEvent?: KeyboardEvent) => void };

  /**
   * Whether the component should behave as if it current has browser focus
   * event when it doesn't
   */
  focused?: boolean;

  /**
   * The object that the internal key listeners should be bound to
   */
  attach?: React.Component | Element | Window;

  /**
   * Function to call when this component gains focus in the browser
   */
  onFocus?: () => void;

  /**
   * Function to call when this component loses focus in the browser
   */
  onBlur?: () => void;
}

/**
 * Component that renders its children within a "focus trap" component that
 * binds to key event listeners and calls specified event handler functions
 * based on which key (or key combination) is activated.
 */
export class HotKeys extends React.Component<HotKeysProps, {}> { }

export function withHotKeys(keyMap: { [key: string]: KeySequence }): HotKeys;

/**
 * Component that renders a "focus trap" with a tabIndex property allowing
 * it to be programmatically focused, but skip the user focusing it in the
 * browser
 */
export class FocusTrap extends React.Component<FocusTrapProps, {}> { }

