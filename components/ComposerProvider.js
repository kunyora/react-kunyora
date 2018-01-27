import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";


export default class ComposerProvider extends React.PureComponent {
  static childContextTypes = {
    client: PropTypes.any,
    store: PropTypes.any,
    router: PropTypes.any
  }

  getChildContext() {
    return {
      client: this.props.client,
      store: this.props.store,
      router: this.props.router
    }
  }

  render() {
    let { store, children } = this.props;
    return (
      <Provider store={store}>{children}</Provider>
    )
  }
}