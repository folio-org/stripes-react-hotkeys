import ReactDOM from 'react-dom';
import simulant from 'simulant';

export default class FocusableElement {
  constructor(wrapper, selector) {
    this.element = wrapper.find(selector);
  }

  focus() {
    this.element.simulate('focus');
  }

  keyDown(keyCode) {
    simulant.fire(this.getInstance(), 'keydown', {keyCode});
  }

  keyPress(keyCode) {
    const instance = this.getInstance();
    simulant.fire(instance, 'keypress', {keyCode});
  }

  keyUp(keyCode) {
    simulant.fire(this.getInstance(), 'keyup', {keyCode});
  }

  getInstance() {
    if (!this.instance) {
      this.instance = ReactDOM.findDOMNode(this.element.instance());
    }

    return this.instance;
  }
};
