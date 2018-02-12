let Store = null;

export default (Store = {
  state: {},

  callbacks: [],

  listen: function(callback) {
    this.callbacks.push(callback);
    return function() {
      this.callbacks.splice(this.callbacks.indexOf(callback), 1);
      callback = null;
    };
  },

  dispatch: function(action, args) {
    this.state = {
      ...this.state,
      action: args
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
