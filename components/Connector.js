import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import Connect from "./Connect";

class ConnectorAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { name } = this.props;
    invariant(
      typeof name === "string",
      "The [name] prop must be passed to the Connector component and must be of type [string]"
    );
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    componentUri: PropTypes.string,
    progress: PropTypes.any
  };

  render() {
    let { name, progress, children } = this.props,
      _progress = progress || {},
      _progressCount = _progress[name] || 0;
    return children(_progressCount);
  }
}

function mapStateToProps(state) {
  return {
    progress: state[types.SET_PAGE_DOWNLOAD_PROGRESS]
  };
}

let Connector = null;

export default (Connector = ({ children, ...rest }) => (
  <Connect mapStateToProps={mapStateToProps}>
    {(props, context) => {
      let composedProps = { ...context, ...rest, ...props };
      return (
        <ConnectorAdvanced {...composedProps}>
          {progress => children(progress)}
        </ConnectorAdvanced>
      );
    }}
  </Connect>
));
