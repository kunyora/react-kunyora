import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import invariant from "invariant";

class Queries extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options } = props;
    invariant(typeof operation === "string", "Props [operation] must be passed to component Queries and it must be of type [string]");
    invariant(options && options.variables && typeof options.variables === "object" && options.variables instanceof Object, "[variables] property in props [options] and must be of type [object]");
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

  render() { }
}

const _Queries = connect((state) => ({ queries: state.queries }));

export default _Queries;