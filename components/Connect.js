import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Connect extends React.PureComponent {
  state = {};

  static propTypes = {
    mapStateToProps: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    let { store: { getState, listen } } = this.context,
      { mapStateToProps } = this.props;

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
    let { store: { getState, listen } } = this.context,
      { mapStateToProps } = this.props;

    let unsubscribe = listen(function() {
      this.updateState();
    });

    unsubscribe();
  };

  render() {
    return this.props.children(this.state);
  }
}
