'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exportUI = require('./exportUI');

var _exportUI2 = _interopRequireDefault(_exportUI);

exports['default'] = function (componentName) {
  return function (Component) {
    return _exportUI2['default'](Component, componentName);
  };
};

module.exports = exports['default'];