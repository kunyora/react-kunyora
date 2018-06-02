"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeProgressCount = exports.startProgressCount = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _types = require("../types");

var types = _interopRequireWildcard(_types);

var _warnings = require("../utils/warnings");

var _warnings2 = _interopRequireDefault(_warnings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var progress = 0;
var shouldStopStartAnimation = false;

var draw = function (timeFraction) {
  return Math.pow(timeFraction, 2);
};

var startProgressCount = exports.startProgressCount = function (name) {
  return function (store) {
    try {
      shouldStopStartAnimation = false;

      var start = window.performance.now(),
          duration = 1000,
          animation = requestAnimationFrame(function animate(time) {
        if (!animation && shouldStopStartAnimation) {
          return;
        }

        var overallState = store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {};
        progress = (time - start) / duration;

        if (progress <= 0.8) {
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, _extends({}, overallState, {
            [name]: draw(progress) * 100
          }));
          requestAnimationFrame(animate);
        } else {
          animation = null;
        }
      });
    } catch (error) {
      (0, _warnings2.default)(window, "React-Kunyora does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases");
    }
  };
};

/**
 * This function completes the progress count during a page transition
 * using the requestAnimationFrame provided by the browser. However this functionality is just available for the browser environment for now
 * support for mobile [React-Native] environment should be provided soon
 *
 * @param {String} name
 */
var completeProgressCount = exports.completeProgressCount = function (name) {
  return function (store) {
    try {
      var start = window.performance.now(),
          duration = 1000,
          animation = requestAnimationFrame(function animate(time) {
        if (!animation) {
          return;
        }
        var overallState = store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
            movement = (time - start) / duration;

        if (movement >= progress && movement < 1) {
          progress = movement;
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, _extends({}, overallState, {
            [name]: draw(progress) * 100
          }));
          requestAnimationFrame(animate);
        } else if (movement >= 1) {
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, _extends({}, overallState, {
            [name]: 0
          }));
          progress = 0;
          animation = null;
        } else {
          requestAnimationFrame(animate);
        }
      });
    } catch (error) {
      (0, _warnings2.default)(window, "React-Kunyora does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases");
    }
  };
};