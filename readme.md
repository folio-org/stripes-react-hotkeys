# HotKeys
 Add keyboard shortcuts to FOLIO modules or even sub-sections of modules.

# Developer Note
It's best to work on this module via an alias to a directory *outside* of a stripes/yarn workspace. [See stripes-cli documentation on how to do this](https://github.com/folio-org/stripes-cli/blob/master/doc/user-guide.md#configuration) This module publishes its transpiled code that's generated through an npm `prepublish` script. Yarn workspaces, despite installing devDependencies, do not recognize the `prepublish` hook, so the appropriate `main` will not be built there and you may run into errors stating that webpack cannot find the module.

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
focused | bool or func | indicates to the component whether or not the handler should execute and pass 'childHandledEvent' to its context parent. A function will be called at runtime to query the status. | | 
attach | DOMnode | node to attach the actual mousetrap handler to. By default, it uses the outer container of the component's children | |
