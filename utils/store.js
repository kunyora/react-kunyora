let Store = null;

export default (Store = {
  state: {},

  callbacks: [],

  listen: function(callback) {
    this.callbacks.push(callback);
    var _this = this;
    return function() {
      _this.callbacks.splice(_this.callbacks.indexOf(callback), 1);
      callback = null;
    };
  },

  dispatch: function(action, args) {
    this.state = {
      ...this.state,
      [action]: args
    };
    this.runCallbacks();
  },

  runCallbacks: function() {
    this.callbacks.forEach(callback => {
      callback();
    });
  },

  getState: function() {
    return this.state;
  }
});
