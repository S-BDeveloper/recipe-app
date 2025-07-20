// jest.setup.js

// Polyfill for TextEncoder/TextDecoder in Node.js < 18
/* eslint-env node */
/* global global, require */

if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
