'use strict';

exports.__esModule = true;
exports.exportComponent = exportComponent;
exports.exportField = exportField;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ComponentUI = require('./ComponentUI');

var _ComponentUI2 = _interopRequireDefault(_ComponentUI);

var _FieldUI = require('./FieldUI');

var _FieldUI2 = _interopRequireDefault(_FieldUI);

function exportComponent(Component, componentName) {
  return new _ComponentUI2['default'](Component, componentName);
}

function exportField(Component, componentName) {
  var field = new _FieldUI2['default'](Component, componentName);
  return exportComponent(field, componentName);
}