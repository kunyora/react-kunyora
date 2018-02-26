import React from "react";
import PropTypes from "prop-types";
import createReactContext from "create-react-context";

/**
 * Here we use the polyfill context API provided by the react community
 * We also export the ComposerContext variable so it would be called from other components
 */
export const ComposerContext = createReactContext({
  client: {},
  store: {}
});

/**
 * The ComposerProvider class is an higher order class that wraps the whole ReactJs application
 * It is used to accept the composer client instance and store as props and exposes them using the new context API to other lower level components
 */
export default class ComposerProvider extends React.PureComponent {
  static propTypes = {
    client: PropTypes.any,
    store: PropTypes.any
  };

  render() {
    let { store, children, client } = this.props,
      value = { store, client };
    return (
      <ComposerContext.Provider value={value}>
        {children}
      </ComposerContext.Provider>
    );
  }
}
