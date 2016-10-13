'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = i18n;

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STATE = {
  __version__: 0,
  locale: null,
  data: {}
};

var mergeLang = function mergeLang(state, _ref) {
  var locale = _ref.locale;
  var lang = _ref.lang;
  return (0, _extends4.default)({}, state, {
    data: (0, _extends4.default)({}, state.data, (0, _defineProperty3.default)({}, locale, lang)),
    locale: locale,
    __version__: state.__version__ + 1
  });
};

function i18n() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  return ((0, _defineProperty3.default)({}, _actionTypes.LOAD_LANG_SUCCESS, mergeLang)[action.type] || function (s) {
    return s;
  })(state, action);
}