import invariant from "invariant";
import * as types from "../types";
import _ from "lodash";

/**
 * This module is useful in subscribing for API push or runnable methods
 * In a layman's term, it helps component perform Api requests by exposing some methods which the components would then use to achieve this purpose
 *
 * All components in the application that currently send API request uses the module to perfiom their tasks
 *
 * [store] is an instance of a copied version of the store
 * [client] is an instance of composer client
 * [shouldInitHandshake] is a boolean value that tells the subscriber that a request is about to be made from a view to another
 * [loader] is a function that contains the dynamic import to the view to be pre-loaded or downloaded
 *
 * [N:B] - Requests are handled by axios and an higher level instance must have been created and passed to the ComposerProvider higher level component as a props
 * Since this instance would be exposed as a context throughout the lifdecycle of the application
 *
 *
 *
 * @param {any} store
 * @param {any} client
 * @param {boolean} shouldInitHandshake
 * @param {Function} loader
 */
function Subscriber(store, client, shouldInitHandshake, loader) {
  this.store = store;
  this.client = client;
  this.loader = loader;

  if (shouldInitHandshake) this.progressCount = 0;
}

/**
 * This function helps in subscribing to a query and returning a promise
 * to the caller function
 *
 * @return {Promise}
 * @param {String} operation
 * @param {Object} config
 */
Subscriber.prototype.subscribeToQuery = function(operation, config) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(_.cloneDeep(headers));

    _promise = this.sendQuery(requestHeaders, config, operation);
  } else {
    _promise = this.sendQuery(null, config, operation);
  }
  return _promise;
};

/**
 * This function sends the actual query to the API endpoints and returns a promise
 * which would the be handled by the subscribeToQuery function
 *
 * @return {Promise}
 * @param {Object} headers
 * @param {Object} config
 * @param {String} operation
 */
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

/**
 * This function helps in subscribing to a mutation and returning
 * a promise to the caller function
 *
 * @return {Promise}
 * @param {String} operation
 * @param {Object} config
 */
Subscriber.prototype.subscribeToMutation = function(operation, config) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(_.cloneDeep(headers));

    _promise = this.sendMutation(requestHeaders, config, operation);
  } else {
    _promise = this.sendMutation(null, config, operation);
  }
  return _promise;
};

/**
 * This function helps in sending mutations to the API endpoint and returns a promise
 * to the subscribeToMutation method
 *
 * @return {Promise}
 * @param {Object} headers
 * @param {Object} config
 * @param {String} operation
 */
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

/**
 * This function subscribes to multiple concurrent queries which it runs at once and then returns
 * a promise to the caller function
 *
 * @return {Promise}
 * @param {Array} arrayOfQueryConfig
 * @param {Function} progressCallback
 */
Subscriber.prototype.subscribeToMultiConcurrentQueries = function(
  arrayOfQueryConfig,
  progressCallback
) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(_.cloneDeep(headers));

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

/**
 * This function sends multiple concurrent queries or request and
 * returns a promise to the caller function or method
 *
 * @return {Promise}
 * @param {Object} headers
 * @param {Array} arrayOfQueryConfig
 * @param {Function} progressCallback
 */
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
        resolve(this.loader ? response.splice(1) : response);
      })
      .catch(error => {
        this.sendResponseToCallback(error);
        reject(error);
      });
  });
  return _promise;
};

/**
 * This function builds an handshake promise request which is typically made up of
 * simultaneous requests alongside the request view, this allows the subscriber send multiple request at the same time and
 * download the next view simultaneously while carrying out this operation
 *
 * @return {Promise}
 * @param {Array} arrayOfQueryConfig
 * @param {Function} progressCallback
 */
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

/**
 * This function composes and returns an array containing all the instances of
 * queries to be made by the API
 *
 * It could either get the instance by returning a promise if the query is found in the store or by
 * performing an actual API request . This however depends on the type of fetchPolicy requested by each query operation
 *
 * @return {Array}
 * @param {Array} arrayOfQueryConfig
 * @param {Function} progressCallback
 */
Subscriber.prototype.composeAxiosInstance = function(
  arrayOfQueryConfig,
  progressCallback
) {
  this.lengthOfArrayOfQueryConfig = arrayOfQueryConfig.length;
  let reducedAxiosReduced = arrayOfQueryConfig.reduce(
    (acc, { operation, config, fetchPolicy }) => {
      let _config = config || {},
        _instance = null,
        _fetchPolicy = fetchPolicy || "network-only";
      if (_fetchPolicy === "cache-first") {
        _instance = this.getQueryFromStore(
          operation,
          _config,
          progressCallback
        );
      } else {
        _instance = this.getQueryAxiosInstance(
          operation,
          _config,
          progressCallback
        );
      }
      acc.push(_instance);
      return acc;
    },
    []
  );
  return reducedAxiosReduced;
};

/**
 * This function returns a promise which resolves with the data of the query gotten from the store
 * else it returns a promise which results from tne result gotten from calling the getQueryAxiosInstance method
 *
 * @return {Promise}
 * @param {String} operation
 * @param {Object} config
 * @param {Function} progressCallback
 */
Subscriber.prototype.getQueryFromStore = function(
  operation,
  config,
  progressCallback
) {
  let overall = this.store.getState()[types.SET_QUERY_DATA] || {},
    queryState = overall[operation];

  if (queryState) {
    this.progressCount += 100;
    progressCallback(this.progressCount / this.lengthOfArrayOfQueryConfig);
    return new Promise((resolve, reject) => resolve({ data: queryState }));
  } else {
    return this.getQueryAxiosInstance(operation, config, progressCallback);
  }
};

/**
 *
 * This function returns a promise after triggering an API request for that particular query
 * This could be used to form the instance for that query sent to the API
 *
 * @return {Promise}
 * @param {String} operation
 * @param {Object} config
 * @param {Function} progressCallback
 */
Subscriber.prototype.getQueryAxiosInstance = function(
  operation,
  config,
  progressCallback
) {
  return this.client[operation]({
    ...config,
    onDownloadProgress: e => {
      let requestProgress = e.loaded / e.total * 100;
      this.progressCount += requestProgress;
      let _percentCount = this.progressCount / this.lengthOfArrayOfQueryConfig;
      progressCallback(_percentCount || 0);
    }
  });
};

/**
 * This function sends a response callback if the isUseAfterCallbackSupplied method is supplied to the middleware
 * So it helps in sending responses back to a callback so that the user could handle the response explicitly
 *
 * @param {any} response
 */
Subscriber.prototype.sendResponseToCallback = function(response) {
  let { isUseAfterCallbackSupplied, useAfterCallback } = this.client;
  if (isUseAfterCallbackSupplied) {
    useAfterCallback(response);
  }
};

export default Subscriber;
