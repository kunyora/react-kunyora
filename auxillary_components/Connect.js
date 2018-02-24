import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { ComposerContext } from "../components/ComposerProvider";

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
    this.unsubscribe();
  }

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
