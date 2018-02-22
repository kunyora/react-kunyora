import invariant from "invariant";

function Subscriber(store, client, shouldInitHandshake, loader) {
  this.store = store;
  this.client = client;
  this.loader = loader;
  if (shouldInitHandshake) this.progressCount = 0;
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

Subscriber.prototype.subscribeToMultiConcurrentQueries = function(
  arrayOfQueryConfig,
  progressCallback
) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(headers);

    _promise = this.sendMultipleConcurrentQueries(
      requestHeaders,
      arrayOfQueryConfig,
      progressCallback
    );
  } else {
    _promise = this.sendMultipleConcurrentQueries(
      null,
      arrayOfQueryConfig,
      progressCallback
    );
  }
  return _promise;
};

Subscriber.prototype.sendMultipleConcurrentQueries = function(
  headers,
  arrayOfQueryConfig,
  progressCallback
) {
  let _promise = new Promise((resolve, reject) => {
    if (headers) this.client.defaults.headers = headers;

    this.buildRequestHandshakePromise(arrayOfQueryConfig, progressCallback)
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

Subscriber.prototype.buildRequestHandshakePromise = function(
  arrayOfQueryConfig,
  progressCallback
) {
  let _promise = null;
  if (!this.loader) {
    _promise = Promise.all([
      ...this.composeAxiosInstance(arrayOfQueryConfig, progressCallback)
    ]);
  } else {
    _promise = Promise.all([
      this.loader(),
      ...this.composeAxiosInstance(arrayOfQueryConfig, progressCallback)
    ]);
  }
  return _promise;
};

Subscriber.prototype.composeAxiosInstance = function(
  arrayOfQueryConfig,
  progressCallback
) {
  let reducedAxiosReduced = arrayOfQueryConfig.reduce(
    (acc, { operation, config }) => {
      let _config = config || {};
      acc.push(
        this.client[operation]({
          ..._config,
          onDownloadProgress: e => {
            let requestProgress = e.loaded / e.total * 100;
            this.progressCount += requestProgress;
            let _percentCount = this.progressCount / arrayOfQueryConfig.length;
            progressCallback(_percentCount || 0);
          }
        })
      );
      return acc;
    },
    []
  );
  return reducedAxiosReduced;
};

Subscriber.prototype.sendResponseToCallback = function(response) {
  let { isUseAfterCallbackSupplied, useAfterCallback } = this.client;
  if (isUseAfterCallbackSupplied) {
    useAfterCallback(response);
  }
};

export default Subscriber;
