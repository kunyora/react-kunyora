import React from "react";
import PropTypes from "prop-types";
import createReactContext from "create-react-context";

export const ComposerContext = createReactContext({
  client: {},
  store: {},
  router: {}
});

export default class ComposerProvider extends React.PureComponent {
  static propTypes = {
    client: PropTypes.any,
    store: PropTypes.any,
    router: PropTypes.any
  };

  render() {
    let { store, children, client, router } = this.props,
      value = { store, client, router };
    return (
      <ComposerContext.Provider value={value}>
        {children}
      </ComposerContext.Provider>
    );
  }
}
