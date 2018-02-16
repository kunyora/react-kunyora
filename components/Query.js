import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import Connect from "./Connect";
import * as types from "../types";
import Subscriber from "../utils/subscriber";

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
    this.state = {
      [operation]: { isInitialDataSet: false, loading: false }
    };
    this.subscriber = new Subscriber(store, client);
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    skip: PropTypes.bool,
    options: PropTypes.shape({
      config: PropTypes.object,
      fetchPolicy: PropTypes.string
    }),
    client: PropTypes.any,
    store: PropTypes.any
  };

  componentDidMount() {
    let { options, queries, operation } = this.props,
      _options = options || {},
      _fetchPolicy = _options.fetchPolicy || "cache-first",
      _queries = queries || {};
    switch (_fetchPolicy) {
      case "network-only":
        this.refetchQuery(undefined);
        break;
      case "cache-only":
        invariant(
          _queries[operation],
          "It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first network policy"
        );
        this.setInitialStateFromStoreAfterMount();
        break;
      case "cache-and-network":
        invariant(
          _queries[operation],
          "It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first network policy"
        );
        this.setInitialStateFromStoreAfterMount();
        this.refetchQuery(undefined);
        break;
      default:
        if (_queries[operation]) {
          this.setInitialStateFromStoreAfterMount();
        } else {
          this.refetchQuery(undefined);
        }
        break;
    }
  }

  setInitialStateFromStoreAfterMount = () => {
    let { operation, queries } = this.props;
    this.setState({
      [operation]: {
        ...this.state[operation],
        loading: false,
        isInitialDataSet: queries[operation] ? true : false,
        data: queries[operation]
      }
    });
  };

  setLoadingDataState = () => {
    let { operation } = this.props;
    this.setState({
      [operation]: {
        ...this.state[operation],
        loading: true
      }
    });
  };

  setSuccessDataState = data => {
    let initialDataSettings = { isInitialDataSet: true },
      { operation, store } = this.props,
      overallState = store.getState()[types.SET_QUERY_DATA] || {},
      _newState = { ...overallState, [operation]: data };

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

  refetchQuery = passedConfig => {
    let { skip, operation, options } = this.props,
      _options = options || {},
      _config = passedConfig || _options.config || {};
    if (!skip) {
      this.setLoadingDataState();
      this.subscriber
        .subscribeToQuery(operation, _config)
        .then(response => {
          this.setSuccessDataState(response.data);
        })
        .catch(error =>
          this.setErrorDataState(error.response || error.message)
        );
    }
  };

  fetchMore = fetchMoreOptions => {
    let { skip, operation, options, store } = this.props,
      _options = options || {},
      { updateQuery } = fetchMoreOptions;
    if (!skip) {
      invariant(updateQuery, "[updateQuery] is needed in [options.fetchMore]");
      this.setLoadingDataState();
      let _config = fetchMoreOptions.config || _options.config || {};

      this.subscriber
        .subscribeToQuery(operation, _config)
        .then(response => {
          let _result = updateQuery(this.state[operation].data, {
            fetchMoreResult: response.data
          });
          this.setSuccessDataState(_result);
        })
        .catch(error =>
          this.setErrorDataState(error.response || error.message)
        );
    }
  };

  render() {
    let { operation } = this.props;
    return this.props.children(
      this.state[operation],
      this.fetchMore,
      this.refetchQuery
    );
  }
}

function mapStateToProps(state) {
  return {
    queries: state[types.SET_QUERY_DATA]
  };
}

let Query = null;

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
