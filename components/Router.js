import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import Connect from "./Connect";
import Subscriber from "../utils/subscriber";
import * as asyncActions from "../async_actions";

class RouterAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { name, resources, store, client, onRequestRoute, loader } = props;
    invariant(
      typeof name === "string",
      "Props [name] must be passed to component Router and it must be of type string"
    );
    invariant(
      typeof onRequestRoute === "function",
      "Props [onRequestRoute] must be passed to the component Router and it must be of type [function]"
    );
    invariant(
      resources && resources instanceof Array,
      "[resources] property is required in props passed to the Router component \n and it must be of type Array"
    );
    if (loader) {
      invariant(
        typeof loader === "function",
        "The [loader] props supplied to Router component must be of type [function]"
      );
    }
    //@we use this as a default because we felt it might be possible to specify later on in the feature the kind of requestPolicy that you want i.e request-first-1
    this.requestPolicy = "request-all";
    this.state = {
      [name]: {}
    };
    this.subscriber = new Subscriber(store, client, true, loader);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    loader: PropTypes.func,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        operation: PropTypes.string.isRequired,
        config: PropTypes.object,
        fetchPolicy: PropTypes.oneOf(["cache-first", "network-only"])
      })
    ).isRequired,
    onRequestRoute: PropTypes.func.isRequired,
    client: PropTypes.any,
    store: PropTypes.any,
    progress: PropTypes.any
  };

  setErrorDataState = error => {
    let { name } = this.props;
    this.setState({
      [name]: {
        ...this.state[name],
        error
      }
    });
  };

  setSuccessDataState = datas => {
    let { resources, store, onRequestRoute } = this.props;

    resources.forEach(({ operation }, i) => {
      let overallState = store.getState()[types.SET_QUERY_DATA] || {},
        _newState = { ...overallState, [operation]: datas[i].data };
      store.dispatch(types.SET_QUERY_DATA, _newState);
    });

    this.completeProgressCount();
    //name the user to the next screen
    onRequestRoute();
  };

  completeProgressCount = () => {
    let { name, store } = this.props;
    store.performAsyncAction(asyncActions.completeProgressCount(name));
  };

  push = () => {
    let { resources, name } = this.props;
    this.subscriber
      .subscribeToMultiConcurrentQueries(resources, progress => {
        let { store, name } = this.props,
          overallState =
            store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
          _newState = { ...overallState, [name]: progress / 2 };
        store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, _newState);
      })
      .then(response => this.setSuccessDataState(response))
      .catch(error => this.setErrorDataState(error.response || error.message));
  };

  render() {
    let { name, progress } = this.props,
      _progress = progress || {};
    return this.props.children(this.state[name], _progress[name], this.push);
  }
}

function mapStateToProps(state) {
  return {
    progress: state[types.SET_PAGE_DOWNLOAD_PROGRESS]
  };
}

let Router = null;

export default (Router = ({ children, ...rest }) => (
  <Connect mapStateToProps={mapStateToProps}>
    {(props, context) => {
      let composedProps = { ...context, ...rest, ...props };
      return (
        <RouterAdvanced {...composedProps}>
          {(routerState, fetchProgress, push) =>
            children(routerState, fetchProgress, push)
          }
        </RouterAdvanced>
      );
    }}
  </Connect>
));
