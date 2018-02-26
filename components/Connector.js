import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import Connect from "../auxillary_components/Connect";

/**
 * This are the render states of the component based on a 3 staged process
 * - NULL : Indicates that the component has not began loading and is an undetermined state
 * - LOADING/ERROR : Indicates that the component has began loading or is in an error state
 * - COMPONENT: Indicates that the requested component has been successfully downloaded and is ready for use
 *
 *
 *
 *
 * This stages helps determine the state of the code splitted component
 */
const RENDER_STATES = ["NULL", "LOADING/ERROR", "COMPONENT"];

/**
 * ConnectorAdvanced is a wrapper around each view of ReactJs application
 * This component helps connect the view to store updates from the progress count
 * By itself, This component cannot send an API request to get data in a pre-requested manner , instead it just acts as a connector listening to progressCount updates
 * which may have been triggered by the Router component
 *
 *
 *
 * The ConnectorAdvanced component offers the following functionality for now:
 * - It listens to store updates for the progress count which may have been triggered by the Router component
 * - It also code splits the current view
 *
 * The ConnectorAdvanced component is also an Higher Order Component that enables users supply a delay and a timeout props
 * The delay props would be used to delay the loading component from being mounted based on its supplied value
 * The timeout props would be used to mount the error component after the time passed in milliseconds has elapsed
 *
 * The ConnectorAdvanced component also allows the Connector component to be used as a render props or just a regular component
 *
 * In future release, we plan to add functionalities that would allow the Connector component send Restful API request in a pre-requested manner
 * so both the HTML data and the query data could all the composed on first initial update of the view
 */
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

    // Delay is set to 2000 milliseconds by default
    // Timeout is set to 100000000 milliseconds by default
    this.delay = delay || 2000;
    this.timeout = timeout || 100000000;
    this.state = {
      component: null,
      renderState: RENDER_STATES[0]
    };

    /**
     * Here we try to check if the render state of the component has changed to either COMPONENT OR LOADING/ERROR
     * from NULL . If true , we do not perform any update after the delay else we update the state
     */
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
    //If a loader props is supplied, then we load the component and update the state
    //We use Promise.race to run 2 promises, a promise to load the component and another promise to set a timeout
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
      //if loader doesn't exist
      return children({ progress: _progressCount }, false, null);
    } else {
      //if the loader exists
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

/**
 * @param {Object} [{children: any, rest: Object}]
 * The Connector Component exposes the ConnectorAdvanced component to store changes or updates
 * This component can also be used as a render props or a regular component depending on if the loader props was supplied
 *
 * The component also makes a copy of the Loading component or error component and renders the component which has been requested on demand based on the 3 render states
 * Generally, this component hardly does anything by itself and relies heavily on the ConnectorAdvanced component to carry all its heavy duties
 */
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

Connector.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
  loader: PropTypes.func,
  loadingComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  errorComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  composableProps: PropTypes.any,
  delay: PropTypes.number,
  timeout: PropTypes.number
};
