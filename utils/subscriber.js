import invariant from "invariant";

function Subscriber(store, client) {
  this.store = store;
  this.client = client;
}

Subscriber.prototype.subscribeToQuery = function(operation, config) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(headers);

    _promise = this.sendQuery(requestHeaders, config, operation);
  } else {
    _promise = this.sendQuery(null, config, operation);
  }
  return _promise;
};

Subscriber.prototype.sendQuery = function(headers, config, operation) {
  let _promise = new Promise((resolve, reject) => {
    let _config = config || {};
    if (headers) this.client.defaults.headers = headers;
    this.client[operation]({
      ..._config
    })
      .then(response => {
        this.sendResponseToCallback(response);
        resolve(response);
      })
      .catch(error => {
        this.sendResponseToCallback(error);
        reject(error);
      });
  });
  return _promise;
};

Subscriber.prototype.subscribeToMutation = function(operation, config) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(headers);

    _promise = this.sendMutation(requestHeaders, config, operation);
  } else {
    _promise = this.sendMutation(null, config, operation);
  }
  return _promise;
};

Subscriber.prototype.sendMutation = function(headers, config, operation) {
  let _promise = new Promise((resolve, reject) => {
    let _config = config || {};
    if (headers) this.client.defaults.headers = headers;
    this.client[operation]({
      ..._config
    })
      .then(response => {
        this.sendResponseToCallback(response);
        resolve(response);
      })
      .catch(error => {
        this.sendResponseToCallback(error);
        reject(error);
      });
  });
  return _promise;
};

Subscriber.prototype.sendResponseToCallback = function(response) {
  let { isUseAfterCallbackSupplied, useAfterCallback } = this.client;
  if (isUseAfterCallbackSupplied) {
    useAfterCallback(response);
  }
};

export default Subscriber;
