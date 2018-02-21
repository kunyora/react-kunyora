import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import Connect from "./Connect";

const RENDER_STATES = ["NULL", "LOADING/ERROR", "COMPONENT"];

class ConnectorAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { name, delay, loadingComponent, timeout } = this.props;
    invariant(
      typeof name === "string",
      "The [name] prop must be passed to the Connector component and must be of type [string]"
    );
    if (delay) {
      invariant(
        typeof delay === "number",
        "The delay supplied to the Connector component must be of type [number]"
      );
    }
    if (timeout) {
      invariant(
        typeof timeout === "number",
        "The timeout supplied to the Connector component must be of type [number]"
      );
    }
    this.delay = delay || 2000;
    this.timeout = timeout || 100000000;
    this.state = {
      component: null,
      renderState: RENDER_STATES[0]
    };
    setTimeout(() => {
      let { renderState } = this.state;
      if (
        renderState !== RENDER_STATES[2] &&
        renderState !== RENDER_STATES[1]
      ) {
        this.setState({
          component: loadingComponent,
          renderState: RENDER_STATES[1]
        });
      }
    }, this.delay);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    loader: PropTypes.func,
    progress: PropTypes.any,
    loadingComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    errorComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    composableProps: PropTypes.any,
    delay: PropTypes.number,
    timeout: PropTypes.number
  };

  componentWillMount() {
    let { timeout, loader, errorComponent } = this.props;
    if (loader) {
      Promise.race([this.timedOutPromise(), this.loadable()])
        .then(data => {
          this.setState({
            component: data.component,
            renderState: RENDER_STATES[2]
          });
        })
        .catch(error =>
          this.setState({
            component: errorComponent,
            renderState: RENDER_STATES[1]
          })
        );
    }
  }

  timedOutPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(reject, this.timeout, {
        type: "error"
      });
    });
  };

  loadable = () => {
    let { loader } = this.props;
    return loader()
      .then(component =>
        Promise.resolve({
          type: "success",
          component: component.default ? component.default : component
        })
      )
      .catch(error =>
        Promise.reject({
          type: "error"
        })
      );
  };

  render() {
    let { name, progress, children, loader, composableProps } = this.props,
      { component, renderState } = this.state,
      _progress = progress || {},
      _progressCount = _progress[name] || 0;
    if (!loader) {
      return children({ progress: _progressCount }, false, null);
    } else {
      if (renderState !== RENDER_STATES[2]) {
        let _component =
          renderState === RENDER_STATES[0]
            ? null
            : typeof component === "function" ? component() : component;
        return children({}, true, _component, true);
      } else {
        let _props = composableProps
          ? { ...composableProps, progressCount: _progressCount }
          : { progressCount: _progressCount };
        return children(_props, true, component, false);
      }
    }
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
          {(passedProps, isCodeSplitted, Component, useCloneElement) => {
            let _component = !isCodeSplitted ? (
              children(passedProps)
            ) : !useCloneElement ? (
              <Component {...passedProps} />
            ) : Component !== null ? (
              React.cloneElement(Component, passedProps)
            ) : null;
            return _component;
          }}
        </ConnectorAdvanced>
      );
    }}
  </Connect>
));
