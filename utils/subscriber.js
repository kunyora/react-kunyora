import * as actions from "../actions";
import invariant from "invariant";

function Subscriber(store, context) {
  this.store = store;
  this.client = client;
  this.requestId = this.store.getState().requestHeader.id;
}

Subscriber.prototype.sendQuery = function(operation, downloadProgressCallback) {
  let _promise = new Promise((resolve, reject) => {
    let unsubscribe = this.store.subscribe(() => {
      let { getState } = this.store,
        { requestHeader: { options, id } } = getState();
      if (id !== this.requestId) {
        this.requestId = id;
        unsubscribe();
        //send query to axios backend here
        let _downloadProgressCallback = downloadProgressCallback || undefined;
        this.client[operation]({
          onDownloadProgress: _downloadProgressCallback
        })
          .then(response => response)
          .catch(error => reject(error));
      }
    });
  });

  if (this.client.isUseBeforeCallbackSupplied) {
    let { defaults: { headers: { common } } } = this.client;
    this.store.dispatch(actions.sendRequestHeaderCommand(common));
    return _promise;
  }
  // else send request to get information from axios backend with the default common header
};

Subscriber.prototype.sendMutation = function(
  operation,
  uploadProgressMutation
) {};
