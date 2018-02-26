import _ from "lodash";

let Store = null;

export default (Store = {
  state: {},

  callbacks: [],

  listen: function(callback) {
    Store.callbacks.push(callback);
    var _this = Store;
    return function() {
      _this.callbacks.splice(_this.callbacks.indexOf(callback), 1);
      callback = null;
    };
  },

  performAsyncAction: function(func) {
    function runAsync() {
      setTimeout(() => func(Store), 0);
    }
    runAsync();
  },

  dispatch: function(action, args) {
    Store.state = {
      ...Store.state,
      [action]: args
    };
    Store.runCallbacks();
  },

  runCallbacks: function() {
    Store.callbacks.forEach(callback => {
      callback();
    });
  },

  getState: function() {
    return _.cloneDeep(Store.state);
  }
});
