import React from "react";
import PropTypes from "prop-types";
import warnings from "../utils/warnings"; 

import * as types from "../types";
import Connect from "../auxillary_components/Connect";
import Subscriber from "../utils/subscriber";
import * as asyncActions from "../async_actions";
import { createSignatureHash } from "../utils/auxillaries";

/**
 * RouterAdvanced component is an advanced component that provides Router functionality to the application
 * This component carries all the heavy logic of sending simultaneous API request and also simultaneously loading the pre-loading the next view
 *
 * It does this by providing some sets of declarative API's to update the progress count state of the store and
 * it also provides some little set of imperative API's that helps in routing teh current view to the next view based on the routing engine currently being used
 *
 * Currently, This component provides the functionality of sending all the API request a once to the server together with making the request for the component
 * but in future versions , we intend to provide functionalities that would allow our users make custom demands to load a specified number of API request before route
 *
 * Please see the [TODO] section of the application for functionalities we wish to build into our application that you could help add
 */
class RouterAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { name, resources, store, client, onRequestRoute, loader } = props;
    warning(
      typeof name === "string",
      "Props [name] must be passed to component Router and it must be of type string"
    );
    warning(
      typeof onRequestRoute === "function",
      "Props [onRequestRoute] must be passed to the component Router and it must be of type [function]"
    );
    warning(
      resources && resources instanceof Array,
      "[resources] property is required in props passed to the Router component \n and it must be of type Array"
    );
    if (loader) {
      warning(
        typeof loader === "function",
        "The [loader] props supplied to Router component must be of type [function]"
      );
    }
    //@we use this as a default because we felt it might be possible to specify later on in the feature the kind of requestPolicy that you want i.e request-first-1
    this.requestPolicy = "request-all";
    this.state = {
      [name]: {}
    };
    this.isComponentMounted = true;
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

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  /**
   * This function sets the state after a rejection must have been thrown by the application
   *
   * @param {any} error
   */
  setErrorDataState = error => {
    let { name } = this.props;
    if (this.isComponentMounted) {
      this.setState({
        [name]: {
          ...this.state[name],
          error
        }
      });
    }
  };

  /**
   * This function sets the state of the application after a resolve has been achieved
   * This is only called if the queries from the endpoint and the component have all been pre downloaded
   *
   * @param {Array} datas
   */
  setSuccessDataState = datas => {
    let { resources, store, onRequestRoute } = this.props;

    resources.forEach(({ operation, config }, i) => {
      config = config || {};
      ((operation, config) => {
        let overallState = store.getState()[types.SET_QUERY_DATA] || {},
          _newState = {
            ...overallState,
            [createSignatureHash(operation, config)]: datas[i].data
          };
        store.dispatch(types.SET_QUERY_DATA, _newState);
      })(operation, config);
    });

    this.completeProgressCount();
    //name the user to the next screen
    onRequestRoute();
  };

  //This function sends an async call to complete the progress count of the application
  completeProgressCount = () => {
    let { name, store } = this.props;
    store.performAsyncAction(asyncActions.completeProgressCount(name));
  };

  //This function triggers a download of all the necessary resources needed to send the application
  //to the next view and imperatively sends the application to the next view after the data has been gotten
  push = () => {
    let { resources, name, store } = this.props;
    store.performAsyncAction(asyncActions.startProgressCount(name));
    this.subscriber
      .subscribeToMultiConcurrentQueries(resources)
      .then(response => this.setSuccessDataState(response))
      .catch(error => this.setErrorDataState(error.response || error.message));
  };

  render() {
    let { name, progress } = this.props;
    return this.props.children(this.state[name], progress, this.push);
  }
}

function mapStateToProps(state, name) {
  let _overallState = state[types.SET_PAGE_DOWNLOAD_PROGRESS] || {};
  return {
    progress: _overallState[name]
  };
}

let Router = null;

/**
 * Router is a simple component that has with routing , not by itself, but instead uses the RouterAdvanced component to achieve this functionality
 *
 * @param {Object} [{children: any, rest: Object}]
 */
export default (Router = ({ children, ...rest }) => (
  <Connect mapStateToProps={state => mapStateToProps(state, rest.name)}>
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

Router.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  loader: PropTypes.func,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      operation: PropTypes.string.isRequired,
      config: PropTypes.object,
      fetchPolicy: PropTypes.oneOf(["cache-first", "network-only"])
    })
  ).isRequired,
  onRequestRoute: PropTypes.func.isRequired
};
