import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { ComposerContext } from "./ComposerProvider";

class ConnectAdvanced extends React.PureComponent {
  state = {};

  static propTypes = {
    mapStateToProps: PropTypes.func,
    store: PropTypes.any,
    router: PropTypes.any,
    client: PropTypes.any
  };

  componentDidMount() {
    this.subscribe();
    this.updateState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateState = () => {
    let { mapStateToProps, store: { getState, listen } } = this.props;

    let shouldSetState = false,
      nextProps = mapStateToProps(getState()),
      nextState = Object.keys(nextProps).reduce((acc, key) => {
        if (!_.isEqual(nextProps[key], this.state[key])) {
          shouldSetState = true;
          acc[key] = nextProps[key];
        } else {
          acc[key] = this.state[key];
        }
      }, {});

    if (shouldSetState) {
      this.setState({
        ...nextState
      });
    }
  };

  subscribe = () => {
    this.unsubscribe = listen(function() {
      this.updateState();
    });
  };

  render() {
    return this.props.children(this.state);
  }
}

export const Connect = ({ children, ...rest }) => (
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
);
