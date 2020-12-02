import React from 'react';
import { mount } from '../setup';
import { fireEvent, wait } from '@testing-library/react';
import sinon from 'sinon';

import HotKeys from '../../lib/HotKeys';
import KeyCode from '../support/KeyCode';
import FocusableElement from '../support/FocusableElement';

describe('Activating hotkeys by focusing in the DOM:', () => {
  before(function () {
    this.keyMap = {
      'ENTER': 'enter',
      'TAB': 'tab',
    };
  });

  context('when a keyMap and a handler are provided to the same component', () => {
    beforeEach(function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = mount(
        <div >
          <HotKeys keyMap={this.keyMap} handlers={handlers}>
            <input data-testid="childElement" />
          </HotKeys>

          <input data-testid="siblingElement" />
        </div>
        );

    });

    context('and a child element is focused', () => {
      beforeEach(function () {
        this.handler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'childElement');
        this.input.focus();
      });

      it('then calls the correct handler when a key is pressed that matches the keyMap', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.handler.called).to.be.true;
      });

      it('then does NOT call the handler when a key is pressed that does NOT matches the keyMap', function() {
        this.input.keyDown(KeyCode.TAB);

        expect(this.handler.called).to.be.false;
      });
    });

    context('and a sibling element is focused', () => {
      beforeEach(function () {
        this.handler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'siblingElement');
        this.input.focus();
      });

      it('then does NOT calls the handler when a key is pressed that matches the keyMap', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.handler.called).to.be.false;
      });
    });
  });

  context('when a contained element is auto-focused', () => {
    beforeEach(async function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = await mount(
        <div >
          <HotKeys keyMap={this.keyMap} handlers={handlers}>
            <input autoFocus data-testid="childElement" />
          </HotKeys>
        </div>
        );

        this.input = new FocusableElement(this.wrapper, 'childElement');
    });

    it('then calls the correct handler when a key is pressed that matches the keyMap', function() {
      this.input.keyDown(KeyCode.ENTER);
      expect(this.handler.called).to.be.true;
    });
  });

  context('when a keyMap is provided to a parent component and a handler to a child component', () => {

    beforeEach(function () {
      this.handler = sinon.spy();

      const handlers = {
        'ENTER': this.handler,
      };

      this.wrapper = mount(
        <div >
          <HotKeys keyMap={this.keyMap}>
            <div >
              <HotKeys handlers={handlers}>
                <input data-testid={'handlerChildElement'}/>
              </HotKeys>
            </div>
            <input data-testid={'keyMapChildElement'}/>
          </HotKeys>

          <input data-testid={'siblingElement'}/>
        </div>
        );
    });

    context('and a child element of the component defining the handlers is focused', () => {
      beforeEach(function () {
        this.handler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'handlerChildElement');
        this.input.focus();
      });

      it('then calls the correct handler when a key is pressed that matches the keyMap', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.handler.called).to.be.true;
      });

      it('then does NOT call the handler when a key is pressed that does NOT matches the keyMap', function() {
        this.input.keyDown(KeyCode.TAB);

        expect(this.handler.called).to.be.false;
      });
    });
    context('and a child element of the component defining the keyMap is focused', () => {
      beforeEach(function () {
        this.handler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'keyMapChildElement');
        this.input.focus();
      });

      it('then does NOT call the handler when a key is pressed that matches the keyMap', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.handler.called).to.be.false;
      });
    });

    context('and a sibling element is focused', () => {
      beforeEach(function () {
        this.handler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'siblingElement');
        this.input.focus();
      });

      it('then does NOT calls the handler when a key is pressed that matches the keyMap', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.handler.called).to.be.false;
      });
    });
  });

  context('when HotKey components defining handlers are nested inside each other', () => {

    beforeEach(function () {
      this.outerEnterHandler = sinon.spy();
      this.outerTabHandler = sinon.spy();
      this.innerEnterHandler = sinon.spy();

      this.outerHandlers = {
        'ENTER': this.outerEnterHandler,
        'TAB': this.outerTabHandler,
      };

      this.innerHandlers = {
        'ENTER': this.innerEnterHandler,
      };

      this.wrapper = mount(
        <HotKeys keyMap={this.keyMap}>
          <div >
            <HotKeys handlers={this.outerHandlers}>
              <input data-testid={'outerElement'}/>

              <HotKeys handlers={this.innerHandlers}>
                <input data-testid={'innerElement'}/>
              </HotKeys>
            </HotKeys>
          </div>
        </HotKeys>
      );
    });

    context('and a child element of the inner component is in focus', () => {
      beforeEach(function () {
        this.innerEnterHandler.resetHistory();
        this.outerEnterHandler.resetHistory();
        this.outerTabHandler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'innerElement');
        this.input.focus();
      });

      it('then only calls the handler defined in the inner component when a key is pressed for which handlers are defined in both components', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.innerEnterHandler.called).to.be.true;
        expect(this.outerEnterHandler.called).to.be.false;
      });

      it('then calls the handler defined in the outer component when a key is pressed that only the outer component has a handler for', function() {
        this.input.keyDown(KeyCode.TAB);

        expect(this.outerTabHandler.called).to.be.true;
      });

      it('then does not call any handlers when a key that doesn\'t match any handlers is pressed', function() {
        this.input.keyDown(KeyCode.ALT);

        expect(this.innerEnterHandler.called).to.be.false;
        expect(this.outerTabHandler.called).to.be.false
        expect(this.outerEnterHandler.called).to.be.false;
      });

    });

    context('and a child element of the outer component is in focus', () => {
      beforeEach(function () {
        this.innerEnterHandler.resetHistory();
        this.outerEnterHandler.resetHistory();
        this.outerTabHandler.resetHistory();
        this.input = new FocusableElement(this.wrapper, 'outerElement');
        this.input.focus();
      });

      it('then only calls the handler defined in the outer component when a key is pressed for which handlers are defined in both components', function() {
        this.input.keyDown(KeyCode.ENTER);

        expect(this.innerEnterHandler.called).to.be.false;
        expect(this.outerEnterHandler.called).to.be.true;
      });

      it('then calls the handler defined in the outer component when a key is pressed that only the outer component has a handler for', function() {
        this.input.keyDown(KeyCode.TAB);

        expect(this.outerTabHandler.called).to.be.true;
      });

      it('then does not call any handlers when a key that doesn\'t match any handlers is pressed', function() {
        this.input.keyDown(KeyCode.ALT);

        expect(this.innerEnterHandler.called).to.be.false;
        expect(this.outerTabHandler.called).to.be.false;
        expect(this.outerEnterHandler.called).to.be.false;
      });

    });
  });
});
