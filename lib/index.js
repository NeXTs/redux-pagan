'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOAD_LANG_SUCCESS = exports.LOAD_LANG = exports.getLang = exports.i18n = exports.loadLang = undefined;

var _actions = require('./actions');

Object.defineProperty(exports, 'loadLang', {
  enumerable: true,
  get: function get() {
    return _actions.loadLang;
  }
});
Object.defineProperty(exports, 'LOAD_LANG', {
  enumerable: true,
  get: function get() {
    return _actions.LOAD_LANG;
  }
});
Object.defineProperty(exports, 'LOAD_LANG_SUCCESS', {
  enumerable: true,
  get: function get() {
    return _actions.LOAD_LANG_SUCCESS;
  }
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _getLang2 = require('./getLang');

var _getLang3 = _interopRequireDefault(_getLang2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.i18n = _store2.default;
exports.getLang = _getLang3.default;