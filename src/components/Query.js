import React from "react";
import PropTypes from "prop-types";

import Connect from "../auxillary_components/Connect";
import * as types from "../types";
import Subscriber from "../utils/subscriber";
import { createSignatureHash } from "../utils/auxillaries";
import warning from "../utils/warnings";
import isEqual from "../utils/isEqual";

/**
 * QueryAdvanced wraps the Query component and provides it with sets of methods
 * that will allow a particular query perform a particuar query task
 */
class QueryAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options, store, client } = props;
    warning(
      typeof operation === "string",
      "Props [operation] must be passed to component Queries and it must be of type [string]"
    );
    if (options && options.config) {
      warning(
        options &&
          options.config &&
          typeof options.config === "object" &&
          options.config instanceof Object,
        "[config] property in props [options] and must be of type [object] for your Query components"
      );
    }
    warning(
      operation.slice(0, 3).toUpperCase() === "GET",
      "It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"
    );
    this.isComponentMounted = true;
    this.subscriber = new Subscriber(store, client);
    this.beforeFirstRenderCall();
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    skip: PropTypes.bool,
    options: PropTypes.shape({
      config: PropTypes.object,
      fetchPolicy: PropTypes.oneOf([
        "cache-first",
        "network-only",
        "cache-only",
        "cache-and-network"
      ])
    }),
    renderError: PropTypes.element,
    renderLoading: PropTypes.element,
    client: PropTypes.any,
    store: PropTypes.any
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.queries) {
      let { queries, skip } = nextProps,
        { operation } = this.props,
        {
          [operation]: { data }
        } = this.state;

      if (!skip) {
        if (!isEqual(queries, data) && queries && this.isComponentMounted) {
          let _obj = {};
          _obj[operation] = { ...this.state[operation], data: queries };
          this.setState({
            ..._obj
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  setInitialStateBeforeMount = (operation, arg) => {
    let _obj = {};
    _obj[operation] = { ...arg };
    this.state = {
      ..._obj
    };
  };

  /**
   * beforeFirstRenderCall executes before render method is called
   * This function helps to perform som eoperations based on the fetchPolicy passed to the Query component
   *
   *
   * The instance method this._state is set to null here so that we
   * could prevent the component from setting the state of this component
   * which has not been mounted yet
   */
  beforeFirstRenderCall = () => {
    let { options, queries, operation, skip } = this.props,
      _options = options || {},
      _fetchPolicy = _options.fetchPolicy || "cache-first",
      _state = {};
    switch (_fetchPolicy) {
      case "network-only":
        _state = { ..._state, loading: true, isInitialDataSet: false };
        this.setInitialStateBeforeMount(operation, _state);
        this._state = null;
        this.refetchQuery(undefined);
        break;
      case "cache-only":
        warning(
          queries && !skip,
          "It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"
        );
        _state = {
          ..._state,
          ...this.getInitialStateFromStore()
        };
        this.setInitialStateBeforeMount(operation, _state);
        break;
      case "cache-and-network":
        warning(
          queries && !skip,
          "It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"
        );
        _state = {
          ..._state,
          ...this.getInitialStateFromStore()
        };
        this.setInitialStateBeforeMount(operation, _state);
        this._state = null;
        this.refetchQuery(undefined);
        break;
      default:
        if (queries) {
          _state = { ..._state, ...this.getInitialStateFromStore() };
          this.setInitialStateBeforeMount(operation, _state);
        } else {
          _state = { ..._state, loading: true, isInitialDataSet: false };
          this.setInitialStateBeforeMount(operation, _state);
          this._state = null;
          this.refetchQuery(undefined);
        }
        break;
    }
    return _state;
  };

  /**
   * getInitialStateFromStore gets the initial state of the component
   * from the cache or the store
   */
  getInitialStateFromStore = () => {
    let { queries, skip } = this.props,
      data = skip ? undefined : queries;
    return {
      loading: false,
      isInitialDataSet: data ? true : false,
      data
    };
  };

  /**
   * setLoadingState sets the loading state of the component
   * While doing this, it needs to make sure that the state of the component is not set
   * if the component has not been mounted yet
   *
   * this._state = 1 , so that the component's state could always be set on subsequent
   * setLoadingDataState calls
   */
  setLoadingDataState = () => {
    let { operation } = this.props,
      _previousState = (this.state && this.state[operation]) || this._state;

    if (this._state && this.isComponentMounted) {
      let _obj = {};
      _obj[operation] = { ..._previousState, loading: true };
      this.setState({
        ..._obj
      });
    } else {
      this._state = 1;
    }
  };

  /**
   * This function sets the state of the Query component after the thenable method has been called
   * or the API function has resolved
   *
   * @param {any} data
   */
  setSuccessDataState = (data, config) => {
    let initialDataSettings = { isInitialDataSet: true },
      { operation, store } = this.props,
      overallState = store.getState()[types.SET_QUERY_DATA] || {},
      _obj = {};

    _obj[createSignatureHash(operation, config)] = data;

    let _newState = {
        ...overallState,
        ..._obj
      },
      _operation = {};

    _operation[operation] = {
      ...this.state[operation],
      error: undefined,
      ...initialDataSettings,
      loading: false,
      data
    };

    store.dispatch(types.SET_QUERY_DATA, _newState);
    if (this.isComponentMounted) {
      this.setState({
        ..._operation
      });
    }
  };

  /**
   * This function sets the state of the Query component after the API method has rejected with an error from fetching the data
   *
   * @param {any} error
   */
  setErrorDataState = error => {
    let { operation } = this.props;
    if (this.isComponentMounted) {
      let _obj = {};
      _obj[operation] = { ...this.state[operation], loading: false, error };
      this.setState({
        ..._obj
      });
    }
  };

  /**
   * The refetchQuery function is called to refetch a particular query from the Restful API
   *
   * @param {Object} passedConfig
   */
  refetchQuery = passedConfig => {
    let { skip, operation, options } = this.props,
      _options = options || {},
      _initConfig = _options.config || {},
      _config = null;

    if (passedConfig) _config = { ..._initConfig, ...passedConfig };
    else if (_initConfig) _config = _initConfig;
    else _config = {};

    if (!skip) {
      this.setLoadingDataState();
      this.subscriber
        .subscribeToQuery(operation, _config)
        .then(response => {
          this.setSuccessDataState(response.data, _config);
        })
        .catch(error =>
          this.setErrorDataState(error.response || error.message)
        );
    }
  };

  /**
   * This function accepts a single Object parameter [fetchMoreOptions] which it uses to update the store
   * when more of the requested data has been loaded
   * This method is useful for paginating your queries
   *
   * @param {Object} fetchMoreOptions
   */
  fetchMore = fetchMoreOptions => {
    let { skip, operation, options } = this.props,
      _options = options || {},
      { updateQuery } = fetchMoreOptions;
    if (!skip) {
      warning(
        updateQuery,
        "[updateQuery] is needed as a config parameter in [options.fetchMore]"
      );
      this.setLoadingDataState();
      let _config = fetchMoreOptions.config || _options.config || {};

      this.subscriber
        .subscribeToQuery(operation, _config)
        .then(response => {
          let _result = updateQuery(this.state[operation].data, {
            fetchMoreResult: response.data
          });
          warning(
            _result,
            "A result of any type must be returned to form the new state from the updateQuery config option"
          );
          this.setSuccessDataState(_result, _config);
        })
        .catch(error =>
          this.setErrorDataState(error.response || error.message)
        );
    }
  };

  render() {
    let { operation, renderLoading, renderError } = this.props,
      {
        [operation]: { loading, error }
      } = this.state;
    if (loading && (renderLoading === null || renderLoading !== undefined)) {
      return renderLoading;
    } else if (error && (renderError === null || renderError !== undefined)) {
      return renderError;
    } else {
      return this.props.children(
        this.state[operation],
        this.fetchMore,
        this.refetchQuery
      );
    }
  }
}

/**
 * @return {Object}
 * @param {Object} state
 * @param {string} operation
 * @param {object} options
 */
function mapStateToProps(state, operation, options) {
  let _options = options || {},
    _config = _options.config || {},
    _overallState = state[types.SET_QUERY_DATA] || {};

  return {
    queries: _overallState[createSignatureHash(operation, _config)]
  };
}

let Query = null;

/**
 * @param {Object} [{children: any, rest: Object}]
 * This function exposes the QueryAdvanced component to store changes or updates
 * The [mapStateToProps] function acts as a binding between the Connect API and the Query component
 * It tells Connect what tree of the state object should be sent down to Connect as props
 */
export default (Query = ({ children, ...rest }) => (
  <Connect
    mapStateToProps={state =>
      mapStateToProps(state, rest.operation, rest.options)
    }
  >
    {(props, context) => {
      let composedProps = { ...context, ...rest, ...props };
      return (
        <QueryAdvanced {...composedProps}>
          {(queryState, fetchMore, refetchQuery) =>
            children(queryState, fetchMore, refetchQuery)
          }
        </QueryAdvanced>
      );
    }}
  </Connect>
));

Query.propTypes = {
  children: PropTypes.any,
  operation: PropTypes.string.isRequired,
  skip: PropTypes.bool,
  options: PropTypes.shape({
    config: PropTypes.object,
    fetchPolicy: PropTypes.oneOf([
      "cache-first",
      "network-only",
      "cache-only",
      "cache-and-network"
    ])
  })
};
