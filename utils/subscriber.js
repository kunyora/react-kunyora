import invariant from "invariant";

function Subscriber(store, client) {
  this.store = store;
  this.client = client;
}

Subscriber.prototype.subscribeToQuery = function (
  operation,
  downloadProgressCallback
) {
  let _promise = null;
  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers } } = this.client,
      requestHeaders = this.client.useBeforeCallback(headers);

    _promise = this.sendQuery(
      requestHeaders,
      downloadProgressCallback,
      operation
    );
  } else {
    _promise = this.sendQuery(null, downloadProgressCallback, operation);
  }
  return _promise;
};

Subscriber.prototype.sendQuery = function (
  headers,
  downloadProgressCallback,
  operation
) {
  let _promise = new Promise((resolve, reject) => {
    let _downloadProgressCallback = downloadProgressCallback || undefined;
    if (headers) this.client.defaults.headers = headers;
    this.client[operation]({
      onDownloadProgress: _downloadProgressCallback
    })
      .then(response => {
        this.sendResponseToCallback(response);
        return response;
      })
      .catch(error => {
        this.sendResponseToCallback(error);
        reject(error);
      });
  });
  return _promise;
};

Subscriber.prototype.sendResponseToCallback = function (response) {
  let { isUseAfterCallbackSupplied, useAfterCallback } = this.client;
  if (isUseAfterCallbackSupplied) {
    useAfterCallback(response);
  }
};

export default Subscriber;
