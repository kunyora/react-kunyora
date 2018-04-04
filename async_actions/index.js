import * as types from "../types";
import invariant from "invariant";

let progress = 0;
let shouldStopStartAnimation = false;

const draw = timeFraction => Math.pow(timeFraction, 2);

export const startProgressCount = name => store => {
  try {
    shouldStopStartAnimation = false;

    let start = window.performance.now(),
      duration = 1000,
      animation = requestAnimationFrame(function animate(time) {
        if (!animation && shouldStopStartAnimation) {
          return;
        }

        let overallState =
          store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {};
        progress = (time - start) / duration;

        if (progress <= 0.8) {
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, {
            ...overallState,
            [name]: draw(progress) * 100
          });
          requestAnimationFrame(animate);
        } else {
          animation = null;
        }
      });
  } catch (error) {
    invariant(
      window,
      "React-Composer does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases"
    );
  }
};

/**
 * This function completes the progress count during a page transition
 * using the requestAnimationFrame provided by the browser. However this functionality is just available for the browser environment for now
 * support for mobile [React-Native] environment should be provided soon
 *
 * @param {String} name
 */
export const completeProgressCount = name => store => {
  try {
    let start = window.performance.now(),
      duration = 1000,
      animation = requestAnimationFrame(function animate(time) {
        if (!animation) {
          return;
        }
        let overallState =
            store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
          movement = (time - start) / duration;

        if (movement >= progress && movement < 1) {
          progress = movement;
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, {
            ...overallState,
            [name]: draw(progress) * 100
          });
          requestAnimationFrame(animate);
        } else if (movement >= 1) {
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, {
            ...overallState,
            [name]: 0
          });
          progress = 0;
          animation = null;
        } else {
          requestAnimationFrame(animate);
        }
      });
  } catch (error) {
    invariant(
      window,
      "React-Composer does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases"
    );
  }
};
