import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import { Connect } from "./Connect";
import * as types from "../types";

class QueriesAdvanced extends React.PureComponent {
  constructor(props) {
    super(props);
    let { operation, options, queries } = props;
    invariant(
      typeof operation === "string",
      "Props [operation] must be passed to component Queries and it must be of type [string]"
    );
    invariant(
      options &&
        options.variables &&
        typeof options.variables === "object" &&
        options.variables instanceof Object,
      "[variables] property in props [options] and must be of type [object]"
    );
    invariant(
      operation.slice(0, 3).toUpperCase() === "GET",
      "It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"
    );
    this.state = {
      [operation]: { isInitialDataSet: false, loading: true }
    };
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    skip: PropTypes.bool,
    options: PropTypes.shapeOf({
      variables: PropTypes.object,
      endpoint: PropTypes.string,
      fetchPolicy: PropTypes.string
    }),
    client: PropTypes.any,
    store: PropTypes.any
  };

  componentDidMount() {
    let { options: { fetchPolicy }, queries, operation } = this.props;
    let _fetchPolicy = fetchPolicy || "cache-first";
    switch (_fetchPolicy) {
      case "network-only":
        this.refetchQuery(undefined);
        break;
      case "cache-only":
        this.setInitialStateFromStoreAfterMount();
        break;
      case "cache-and-network":
        this.setInitialStateFromStoreAfterMount();
        this.refetchQuery(undefined);
        break;
      default:
        if (queries[operation]) {
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

  setSuccessDataState = (data, CB) => {
    let initialDataSettings = { isInitialDataSet: true },
      { operation, store } = this.props;
    //send to store here
    // this.context.store.dispatch(operation, data);
    this.setState(
      {
        [operation]: {
          ...this.state[operation],
          error: undefined,
          ...initialDataSettings,
          loading: false,
          data
        }
      },
      () => CB && CB()
    );
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

  refetchQuery = config => {
    let { skip } = this.props;
    if (!skip) {
      this.setLoadingDataState();
    }
  };

  render() {}
}

function mapStateToProps(state) {
  return {
    queries: state[types.SET_QUERY_DATA]
  };
}

export const Queries = ({ children, ...rest }) => (
  <Connect mapStateToProps={mapStateToProps}>
    {(props, context) => {
      let composedProps = { ...context, ...rest };
      return (
        <QueriesAdvanced {...composedProps}>
          {props => children(props)}
        </QueriesAdvanced>
      );
    }}
  </Connect>
);
