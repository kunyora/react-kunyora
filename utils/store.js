export default (Store = {
  state: {},

  callbacks: [],

  listen: function(callback) {
    this.callbacks.push(callback);
    return this.nullify;
  },

  nullify: function() {
    this.listen = null;
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
