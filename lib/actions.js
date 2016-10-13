'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.loadLang = loadLang;

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadLang(locale, data) {
  var _this = this;

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch) {
      var loader, lang;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: _actionTypes.LOAD_LANG,
                locale: locale
              });

              loader = typeof data === 'function' ? data(locale) : data;
              lang = void 0;

              if (!(typeof loader === 'function')) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return loader();

            case 6:
              lang = _context.sent;
              _context.next = 10;
              break;

            case 9:
              lang = loader;

            case 10:

              dispatch({
                type: _actionTypes.LOAD_LANG_SUCCESS,
                locale: locale,
                lang: lang
              });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}