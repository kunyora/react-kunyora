/**
 * @author Anifowoshe Gbenga David
 * This simple module models an Inmemory store for all Javascript based applications
 * using a reactive pattern of programming where an action is dispatched and a callback
 * is fired based on that action that has been dispatched
 * Series of callback could be added or listened to when a particular action is dispatched
 */
export default (Store = {
  actions: {},

  state: {},

  /**
   * @function gets the state of th store on the application
   */
  getState() {
    return this.state;
  },

  /**
   * @param {string} action
   * @param {function} callback
   * @function listens and adds callbacks to a particular action so that they can be called when their registered action is called
   */
  on(action, callback) {
    this.actions[action] = this.actions[action] || [];
    this.actions[action].push(callback);
  },

  /**
   * @param {string} action
   * @param {any} args
   * @function is called to dispatch or fire a specific action and then call the callbacks registered on the action at a later time
   */
  dispatch(action, ...args) {
    if (!(action in this.actions)) return false;

    const previousActionState = this.state.action || {};

    this.state = {
      ...this.state,
      action: { ...previousActionState, ...args }
    };

    this.actions[action].forEach(cb => cb(...args));
  }
});
