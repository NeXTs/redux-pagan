'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = getLang;

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

function isEmpty(data) {
  return !data || (0, _keys2.default)(data).length === 0;
}

var emptyLocaleDataWarned = {};
var notFoundKeyWarned = {};

function getLangString(locale, data, fullpath) {
  if (fullpath.filter(function (key) {
    return typeof key !== 'string';
  }).length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Invalid langpack path: ', fullpath);
    }
  }

  var str = fullpath.reduce(function (obj, key, idx) {
    if (idx === fullpath.length - 1) {
      if (obj && obj[key] !== undefined) {
        return obj[key].toString();
      } else {
        var keyPath = locale + ':' + fullpath.join('/');
        if (!isEmpty(data) && !notFoundKeyWarned[keyPath]) {
          if (process.env.NODE_ENV !== 'production') {
            console.error('Redux-Pagan: key was not found at path: ' + keyPath);
          }
          notFoundKeyWarned[keyPath] = true;
        }
        return key;
      }
    } else {
      return obj && obj[key] ? obj[key] : null;
    }
  }, data);

  if (str && !(typeof str === 'string')) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('String expected, got: ', str);
    }
  }

  return str;
}

function concatPath(locale, data, path, subpath) {
  if (isEmpty(data) && !emptyLocaleDataWarned[locale] && locale !== null) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Redux-Pagan: got empty data for locale \'' + locale + '\'');
    }
    emptyLocaleDataWarned[locale] = true;
  }

  if (subpath.length === 0) {
    return getLangString(locale, data, path);
  }
  var _path = [].concat((0, _toConsumableArray3.default)(path), (0, _toConsumableArray3.default)(subpath));

  var i18nPartial = function i18nPartial() {
    for (var _len = arguments.length, _subpath = Array(_len), _key = 0; _key < _len; _key++) {
      _subpath[_key] = arguments[_key];
    }

    return concatPath(locale, data, _path, _subpath);
  };

  var memoizedI18nPartial = (0, _lodash2.default)(i18nPartial, function () {
    for (var _len2 = arguments.length, _subpath = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _subpath[_key2] = arguments[_key2];
    }

    return [locale].concat((0, _toConsumableArray3.default)(_path), _subpath).join(',');
  });

  memoizedI18nPartial.toString = function () {
    return getLangString(locale, data, _path);
  };

  Object.defineProperty(memoizedI18nPartial, 's', {
    get: function get() {
      return this.toString();
    }
  });

  // proxy string methods
  (0, _getOwnPropertyNames2.default)(String.prototype).forEach(function (prop) {
    if (typeof String.prototype[prop] === 'function' && ['constructor', 'toString', 'valueOf'].indexOf(prop) === -1) {
      // find more elegant way maybe
      (0, _defineProperty2.default)(memoizedI18nPartial, prop, {
        get: function get() {
          return this.toString()[prop];
        }
      });
    }
  });

  var desc = (0, _getOwnPropertyDescriptor2.default)(memoizedI18nPartial, _iterator2.default);

  if (!desc || desc.configurable) {
    memoizedI18nPartial[_iterator2.default] = _regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return memoizedI18nPartial.toString();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    });
  }

  return memoizedI18nPartial;
}

/* eslint-enable no-console */

var i18nResolver = (0, _lodash2.default)(function i18nResolver(locale, data, version) {
  for (var _len3 = arguments.length, path = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    path[_key3 - 3] = arguments[_key3];
  }

  return concatPath(locale, data, [], path);
}, function (locale, data, version) {
  for (var _len4 = arguments.length, path = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    path[_key4 - 3] = arguments[_key4];
  }

  return [locale, version].concat(path).join(',');
});

function getLang(i18n) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return i18nResolver.apply(undefined, [i18n.locale, i18n.data[i18n.locale], i18n.__version__].concat(args));
}