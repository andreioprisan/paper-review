/**
 * This module should be used with enzyme, when you have to
 * emulate browser like behaviour.
 *
 * Import it when one of these two imports is used:
 * import { mount } from 'enzyme';
 * import { render } from 'enzyme';
 */

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const documentRef = document;

module.exports = documentRef;
