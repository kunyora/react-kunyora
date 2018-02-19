import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import Connect from "./Connect";
import Subscriber from "../utils/subscriber";

class RouterAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { route, resources, store, client, router, requestPolicy } = props;
    invariant(
      typeof route === "string",
      "Props [route] must be passed to component Router and it must be of type string"
    );
    invariant(
      resources && resources instanceof Array,
      "[resources] property is required in props passed to the Router component \n and it must be of type Array"
    );
    invariant(
      router,
      "Seems like you don't have a router installed or a router wasn't supplied to the ComposerProvider Top Element. \n Please [npm install] a router suitable for your routing engine and add it to the [ComposerProvider] Top level element"
    );
    this.requestPolicy = requestPolicy || "request-all";
    invariant(
      this.validateRequestPolicy(this.requestPolicy),
      "You supplied an invalid requestPolicy prop, this prop can only be of the value \n 1) request-all 2) request-first-n 3) request-last-n \n where 1 <= n <= infinity"
    );
    this.state = {
      [route]: {}
    };
    this.subscriber = new Subscriber(store, context, true);
  }

  static propTypes = {
    route: PropTypes.string.isRequired,
    componentUri: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        operation: PropTypes.string.isRequired,
        config: PropTypes.object
      })
    ).isRequired,
    requestPolicy: PropTypes.string,
    client: PropTypes.any,
    store: PropTypes.any,
    router: PropTypes.any,
    progress: PropTypes.any
  };

  validateRequestPolicy = requestPolicy => {
    let pattern = /^request-all$|^request-first-[1-9]{1,}[0-9]*$|^request-last-[1-9]{1,}[0-9]*$/i;
    return pattern.test(requestPolicy);
  };

  setErrorDataState = error => {
    let { route } = this.props;
    this.setState({
      [route]: {
        ...this.state[route],
        error
      }
    });
  };

  setSuccessDataState = datas => {
    let { resources, store } = this.props;

    resources.forEach(({ operation }, i) => {
      let overallState = store.getState()[types.SET_QUERY_DATA] || {},
        _newState = { ...overallState, [operation]: datas[i] };
      store.dispatch(types.SET_QUERY_DATA, _newState);
    });

    this.completeProgressCount();
    //route the user to the next screen **** for now we console.log to know the states have been set *****
    console.log(store.getState());
  };

  completeProgressCount = () => {
    let { route, store } = this.props;
    store.performAsyncAction(function(_store) {
      return (function(store, route) {
        try {
          let start = window.performance.now(),
            duration = 1000,
            animation = requestAnimationFrame(function animate(time) {
              if (!animation) {
                return;
              }
              let movement = (time - start) / duration,
                overallState =
                  store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
                _movement =
                  movement >= 1 ? 0 : movement < 50 / 100 ? 50 : movement * 100;

              store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, {
                ...overallState,
                [route]: movement * 100
              });
              if (movement >= 1) animation = null;
              else requestAnimationFrame(animate);
            });
        } catch (e) {
          invariant(
            window,
            "React-Composer does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases"
          );
        }
      })(_store, route);
    });
  };

  push = () => {
    let { resources, requestPolicy, route } = this.props;
    if (/^request-all$/i.test(requestPolicy)) {
      this.subscriber
        .subscribeToMultiConcurrentQueies(resources, progress => {
          let { store, route } = this.props,
            overallState =
              store.getState()[types.SET_PAGE_DOWNLOAD_PROGRESS] || {},
            _newState = { ...overallState, [route]: progress / 2 };
          store.dispatch(types.SET_PAGE_DOWNLOAD_PROGRESS, _newState);
        })
        .then(response => this.setSuccessDataState(response))
        .catch(error =>
          this.setErrorDataState(error.response || error.message)
        );
    }
  };

  render() {
    let { route, progress } = this.props;
    return this.props.children(this.state[route], progress[route], this.push);
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
          {(routerState, fetchProgress, push) => {
            children(routerState, fetchProgress, push);
          }}
        </RouterAdvanced>
      );
    }}
  </Connect>
));
