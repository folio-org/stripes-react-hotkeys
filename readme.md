# HotKeys
 Add keyboard shortcuts to FOLIO modules or even sub-sections of modules.

# Note

This is a fork of [the original `react-hotkeys`](http://github.com/Chrisui/react-hotkeys) @v1.
We've modified it to use a more efficient keyboard handling library (KeyboardJS) replacing the unsupported `mousetrap`.

## Usage
<!--#### Method 1: JSX component-->


```js
import { HotKeys } from '@folio/stripes-components/lib/HotKeys';
//..
const keys = {
  'delete' : ['delete','backspace'],
};

const handlers = {
  'delete': this.doDelete
};

<HotKeys keyMap={keys} handlers={handlers}>
  <Modal dismissible closeOnBackgroundClick open label="example">
    <button onClick={this.handleClose}>Close modal</button>
  </Modal>
</HotKeys>
```

<!--#### Method 2: High-Order Component
Components can be wrapped to give them the necessary props/functionality to respond to keyboard shortcuts.

```js
import { HotKeysHOC } from '@folio/stripes-components/lib/HotKeys';

class MyComponent extends React.Component {
  // typical component internals... constructor(), render(), etc.
}

// wrap component with HOC...
export default HotKeysHOC(MyComponent);
```
You can then use the component as normal, supplying appropriate `keyMap` and `handlers` props.

```js
const keys = {
  'delete' : ['delete','backspace'],
};

const handlers = {
  'delete': this.doDelete
};

<MyComponent keyMap={keys} handlers={handlers} />
```-->


### Props
Name | type | description | default | required
--- | --- | --- | --- | ---
keyMap | object | Object of named hotkey sequences: e.g. { 'deletion': ['delete', 'backspace'], 'leftArrow': 'left' } | |
handlers | object | Object of hotkey sequence names with corresponding handler functions: e.g. { 'delete': this.doDelete }| |
noWrapper | bool | if true, HotKeys will attempt to use its child component's outer container as its basis for focus. If false, it will wrap the component in the element with the tagname provided in the `component` prop. | false |
component | any | Tagname of component that will be potentially used to wrap the child component and keep track of focus. | 'div' |
attach | DOM element/ref | DOM node to attach the handlers to | |

## Development

Clone locally, separate from a workspace and run `yarn`... this will properly build externally exposed package files for commonjs, umd, and es formats as a `prepublish` step.

You can then `yarn link` this into an existing module/workspace.

run `yarn prepublish` to rebuild exposed package files.

Run tests via
```
yarn test-dev
``
