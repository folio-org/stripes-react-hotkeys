import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiDOM from 'chai-dom';
import { render, cleanup } from '@testing-library/react';

function cleanTestRoot() {
  let $root = document.getElementById('root');

  // if a root exists, unmount anything inside and remove it
  if ($root) {
    ReactDOM.unmountComponentAtNode($root);
    $root.parentNode.removeChild($root);
  }
}

module.exports = { 
  mount: function(node, container = 'div') {
    cleanTestRoot();
    const elem = document.createElement(container);
    elem.id = 'root';
    context = document.body.appendChild(elem);
    return render(node, { container: document.body.appendChild(elem) });
  },


  setup: function() {
    chai.use(sinonChai);
    chai.use(chaiDOM);
  }
};
