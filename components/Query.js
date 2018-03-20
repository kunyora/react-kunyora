import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import _ from "lodash";

import Connect from "../auxillary_components/Connect";
import * as types from "../types";
import Subscriber from "../utils/subscriber";
import { createSignatureHash } from "../utils/auxillaries";

/**
 * QueryAdvanced wraps the Query component and provides it with sets of methods
 * that will allow a particular query perform a particuar query task
 */
class QueryAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options, queries, store, client } = props;
    invariant(
      typeof operation === "string",
      "Props [operation] must be passed to component Queries and it must be of type [string]"
    );
    if (options && options.config) {
      invariant(
        options &&
          options.config &&
          typeof options.config === "object" &&
          options.config instanceof Object,
        "[config] property in props [options] and must be of type [object] for your Query components"
      );
    }
    invariant(
      operation.slice(0, 3).toUpperCase() === "GET",
      "It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"
    );
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

  setInitialStateBeforeMount = (operation, arg) => {
    this.state = {
      [operation]: { ...arg }
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
      _config = _options.config || {},
      _fetchPolicy = _options.fetchPolicy || "cache-first",
      _queries = queries || {},
      _state = {};
    switch (_fetchPolicy) {
      case "network-only":
        _state = { ..._state, loading: true, isInitialDataSet: false };
        this.setInitialStateBeforeMount(operation, _state);
        this._state = null;
        this.refetchQuery(undefined);
        break;
      case "cache-only":
        invariant(
          _queries[createSignatureHash(operation, _config)] && !skip,
          "It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"
        );
        _state = {
          ..._state,
          ...this.getInitialStateFromStore()
        };
        this.setInitialStateBeforeMount(operation, _state);
        break;
      case "cache-and-network":
        invariant(
          _queries[createSignatureHash(operation, _config)] && !skip,
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
        if (_queries[createSignatureHash(operation, _config)]) {
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

  componentWillReceiveProps(nextProps) {
    let { queries, skip } = nextProps,
      { operation, options } = this.props,
      { [operation]: { data } } = this.state,
      _options = options || {},
      _config = _options.config || {};

    let _data = queries[createSignatureHash(operation, _config)];
    if (!skip) {
      if (!_.isEqual(_data, data) && _data) {
        this.setState({
          [operation]: {
            ...this.state[operation],
            data: queries[createSignatureHash(operation, _config)]
          }
        });
      }
    }
  }

  /**
   * getInitialStateFromStore gets the initial state of the component
   * from the cache or the store
   */
  getInitialStateFromStore = () => {
    let { operation, queries, options, skip } = this.props,
      _options = options || {},
      _config = _options.config || {},
      data = skip
        ? undefined
        : queries[createSignatureHash(operation, _config)];
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

    if (this._state) {
      this.setState({
        [operation]: {
          ..._previousState,
          loading: true
        }
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
      _newState = {
        ...overallState,
        [createSignatureHash(operation, config)]: data
      };

    store.dispatch(types.SET_QUERY_DATA, _newState);
    this.setState({
      [operation]: {
        ...this.state[operation],
        error: undefined,
        ...initialDataSettings,
        loading: false,
        data
      }
    });
  };

  /**
   * This function sets the state of the Query component after the API method has rejected with an error from fetching the data
   *
   * @param {any} error
   */
  setErrorDataState = error => {
    let { operation } = this.props;
    this.setState({
      [operation]: {
        ...this.state[operation],
        loading: false,
        error
      }
    });
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
    let { skip, operation, options, store } = this.props,
      _options = options || {},
      { updateQuery } = fetchMoreOptions;
    if (!skip) {
      invariant(
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
          invariant(
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
    let {
      operation,
      operation: { loading, error },
      renderLoading,
      renderError
    } = this.props;
    if (loading && renderLoading) {
      return renderLoading;
    } else if (error && renderError) {
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
 */
function mapStateToProps(state) {
  return {
    queries: state[types.SET_QUERY_DATA]
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
  <Connect mapStateToProps={mapStateToProps}>
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
