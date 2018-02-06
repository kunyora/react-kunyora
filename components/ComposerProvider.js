import React from "react";
import PropTypes from "prop-types";

export default class ComposerProvider extends React.PureComponent {
  static childContextTypes = {
    client: PropTypes.any,
    store: PropTypes.any,
    router: PropTypes.any
  };

  getChildContext() {
    return {
      client: this.props.client,
      store: this.props.store,
      router: this.props.router
    };
  }

  render() {
    let { store, children } = this.props;
    return this.props.children;
  }
}
