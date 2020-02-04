import { fireEvent } from '@testing-library/react';

export default class FocusableElement {
  constructor(wrapper, testId) {
    this.element = wrapper.getByTestId(testId);
  }

  focus() {
    fireEvent.focus(this.element);
  }

  keyDown(keyCode) {
    fireEvent.keyDown(this.element, { keyCode });
  }

  keyPress(keyCode) {
    fireEvent.keyPress(this.element, { keyCode });
  }

  keyUp(keyCode) {
    fireEvent.keyPress(this.element, { keyCode });
  }

  getInstance() {
    return this.element;
  }
};
