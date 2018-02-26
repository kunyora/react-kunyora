import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { ComposerContext } from "../components/ComposerProvider";

/**
 * ConnectAdvanced wraps all Queries, Router and Connector component of the application
 * And provide them access to the store and automatically re-renders them when changes based on what they are listening for occurs
 */
class ConnectAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.subscribe();
    let { nextState } = this.updateState();
    this.state = { ...nextState };
  }

  static propTypes = {
    mapStateToProps: PropTypes.func,
    store: PropTypes.any,
    client: PropTypes.any
  };

  componentWillUnmount() {
    //cleans up the listener method to the store
    this.unsubscribe();
  }

  /**
   * @return {Object} [{shouldSetState: boolean, nextState: Object}]
   * This function checks the [state] status to see if it should be updated
   * This is successfully done by carrying out a lodash deep comparism between the incoming store changes and the store changes
   * to see if there infact any changes to the store
   */
  updateState = () => {
    let { mapStateToProps, store: { getState, listen } } = this.props;

    let componentState = this.state || {};

    let shouldSetState = false,
      nextProps = mapStateToProps(getState()),
      nextState = Object.keys(nextProps).reduce((acc, key) => {
        if (!_.isEqual(nextProps[key], componentState[key])) {
          shouldSetState = true;
          acc[key] = nextProps[key];
        } else {
          if (!(key in componentState)) shouldSetState = true;
          acc[key] = componentState[key];
        }
        return acc;
      }, {});

    return { shouldSetState, nextState };
  };

  subscribe = () => {
    let { store: { listen } } = this.props;
    this.unsubscribe = listen(() => {
      let { shouldSetState, nextState } = this.updateState();
      if (shouldSetState) {
        this.setState({
          ...nextState
        });
      }
    });
  };

  render() {
    return this.props.children(this.state);
  }
}

let Connect = null;

/**
 * @param {Object} [{children: any, rest: Object}]
 * Connect is a stateless function which exposes the ConnectAdvanced component to the store and client instance
 * using the new context api
 */
export default (Connect = ({ children, ...rest }) => (
  <ComposerContext.Consumer>
    {context => {
      let composedProps = { ...context, ...rest };
      return (
        <ConnectAdvanced {...composedProps}>
          {props => children(props, context)}
        </ConnectAdvanced>
      );
    }}
  </ComposerContext.Consumer>
));

Connect.propTypes = {
  children: PropTypes.any
};
