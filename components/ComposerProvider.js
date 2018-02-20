import React from "react";
import PropTypes from "prop-types";
import createReactContext from "create-react-context";

export const ComposerContext = createReactContext({
  client: {},
  store: {}
});

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
