require('core-js/stable');
require('regenerator-runtime/runtime');

const requireTest = require.context('./HotKeys', false, /\.js$/);

requireTest.keys().forEach(requireTest);
