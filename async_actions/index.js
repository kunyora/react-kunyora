import * as types from "../types";
import invariant from "invariant";

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
        let movement = (time - start) / duration,
          overallState =
            store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
          _movement = 0;

        if (movement >= 1) {
          _movement = 0;
        } else if (movement <= 0.5) _movement = 50;
        else _movement = movement * 100;
        store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, {
          ...overallState,
          [name]: _movement
        });

        if (movement >= 1) animation = null;
        else requestAnimationFrame(animate);
      });
  } catch (error) {
    invariant(
      window,
      "React-Composer does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases"
    );
  }
};
