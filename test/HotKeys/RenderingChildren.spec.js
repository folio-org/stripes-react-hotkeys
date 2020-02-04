import React from 'react';
import {mount, setup} from '../setup';
import {expect} from 'chai';
import sinon from 'sinon';

import HotKeys from '../../lib/HotKeys';
import contains from '../../lib/contains';

describe('Rendering children', () => {
  setup();
  before(function () {
    this.keyMap = {
      'ENTER': 'enter',
      'TAB': 'tab',
    };
  });

  context('when the component prop is not defined', () => {

    beforeEach(function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = mount(
        <HotKeys keyMap={this.keyMap} handlers={handlers}>
          <input data-testid="childElement" />
        </HotKeys>
      );

    });

    it('then renders its children wrapped in a div', function() {
      let div = this.wrapper.container.firstChild;
      let input = this.wrapper.getByTestId('childElement');
      expect(contains(div, input)).to.be.true;
    });

    it('then sets a tabIndex of -1', function() {
      let div = this.wrapper.container.firstChild;
      expect(div).to.have.attr('tabindex', '-1');
    });

  });

  context('when the component prop is a string', () => {

    beforeEach(function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = mount(
        <HotKeys keyMap={this.keyMap} handlers={handlers} component={'span'}>
          <input data-testid="childElement" />
        </HotKeys>
      );

    });

    it('then renders its children wrapped in a component matching the string', function() {
      let div = this.wrapper.container.firstChild;
      let input = this.wrapper.getByTestId('childElement');
      expect(contains(div, input)).to.be.true;
    });

    it('then sets a tabIndex of -1', function() {
      let div = this.wrapper.container.firstChild;
      expect(div).to.have.attr('tabindex', '-1');
    });

  });

  context('when the noWrapper prop is true', () => {

    beforeEach(function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = mount(
        <HotKeys noWrapper keyMap={this.keyMap} handlers={handlers} component={'span'}>
          <input data-testid="childElement" />
        </HotKeys>
      );

    });

    it('then renders children without a wrapping element', function() {
      let html = this.wrapper.container.innerHTML;
      expect(html).to.equal('<input data-testid="childElement" tabindex="-1">');
    });
  });
});
