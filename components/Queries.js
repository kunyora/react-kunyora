import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import invariant from "invariant";

class Queries extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options, queries } = props;
    invariant(typeof operation === "string", "Props [operation] must be passed to component Queries and it must be of type [string]");
    invariant(options && options.variables && typeof options.variables === "object" && options.variables instanceof Object, "[variables] property in props [options] and must be of type [object]");
    invariant(operation.slice(0, 3).toUpperCase() === "GET", "It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs")
    let data = queries[operation];
    if (data === undefined)
      this.context.store.dispatch(setQuery(operation, { isInitialDataSet: false, loading: true }))
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    skip: PropTypes.bool,
    options: PropTypes.shapeOf({
      variables: PropTypes.object,
      endpoint: PropTypes.string,
      fetchPolicy: PropTypes.string
    }),
  }

  static contextTypes = {
    client: PropTypes.any,
    store: PropTypes.any,
  }

  componentDidMount() {
    let { options: { fetchPolicy }, queries, operation } = this.props;
    let _fetchPolicy = fetchPolicy || "cache-first";
    switch (_fetchPolicy) {
      case "network-only":
        this.refetchQuery(undefined);
        break;
      case "cache-only":
        this.setInitialStateAfterMount();
        break;
      case "cache-and-network":
        this.setInitialStateAfterMount();
        this.refetchQuery(undefined);
        break;
      default:
        if (queries[operation]) {
          this.setInitialStateAfterMount();
        } else {
          this.refetchQuery(undefined);
        }
        break;
    }
  }

  render() { }
}

const _Queries = connect((state) => ({ queries: state.queries }));

export default _Queries;