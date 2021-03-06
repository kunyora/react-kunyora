import React from "react";
import PropTypes from "prop-types";
import warning from "../utils/warnings";

import Subscriber from "../utils/subscriber";
import { KunyoraContext } from "./KunyoraProvider";
import * as types from "../types";
import { createSignatureHash } from "../utils/auxillaries";

/**
 * MutationAdvanced wraps the Mutation component and provides it with sets of methods
 * that will allow it to perform mutations to an online data store
 */
class MutationAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options, store, client } = props;
    warning(
      typeof operation === "string",
      "Props [operation] must be passed to component Mutation and it must be of type [string]"
    );
    if (options && options.config) {
      warning(
        options &&
          options.config &&
          typeof options.config === "object" &&
          options.config instanceof Object,
        "[config] property is required in props [options] and must be of type [object] for your Mutation component"
      );
    }
    //operations must be of type CREATE | UPDATE | PARTUPDATE | DELETE
    warning(
      operation.slice(0, 6).toUpperCase() === "CREATE" ||
        operation.slice(0, 6).toUpperCase() === "UPDATE" ||
        operation.slice(0, 10).toUpperCase() === "PARTUPDATE" ||
        operation.slice(0, 6).toUpperCase() === "DELETE",
      "It doesn't feel like you want the component to perform a mutation. Mutations could only be of the form createUser, deleteTicket etc with the ***create, update, partUpdate and delete*** methods as a prefix. please check the docs"
    );
    let _obj = {};
    _obj[operation] = { loading: false };

    this.state = {
      ..._obj
    };
    this.isComponentMounted = true;
    this.subscriber = new Subscriber(store, client);
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    options: PropTypes.shape({
      refetchQueries: PropTypes.arrayOf(
        PropTypes.shape({
          operation: PropTypes.string.isRequired,
          config: PropTypes.object
        })
      ),
      config: PropTypes.object
    }),
    client: PropTypes.any,
    store: PropTypes.any
  };

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  setLoadingDataState = () => {
    let { operation } = this.props;
    if (this.isComponentMounted) {
      let _obj = {};
      _obj[operation] = { loading: !this.state[operation].loading };

      this.setState({
        ..._obj
      });
    }
  };

  /**
   * This function refetches some sets of API request after a mutation has been made and
   * automatically updates the store with the changes
   *
   * @param {Array} refetchConfig
   */
  refetchQueries = refetchConfig => {
    let { store } = this.props;

    refetchConfig.forEach(arg => {
      let { operation, config } = arg;
      config = config || {};
      ((operation, config) => {
        this.subscriber
          .subscribeToQuery(operation, config || {})
          .then(response => {
            let overallState = store.getState()[types.SET_QUERY_DATA] || {},
              _obj = {};

            _obj[createSignatureHash(operation, config)] = response.data;

            let _newState = {
              ...overallState,
              ..._obj
            };

            store.dispatch(types.SET_QUERY_DATA, _newState);
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
          });
      })(operation, config);
    });
  };

  /**
   * This function runs an mutation request and performs some refetch of queries if supplied
   *
   * @param {Object} passedConfig
   */
  mutate = passedConfig => {
    let { operation, options } = this.props,
      _options = options || {},
      _refetchQueries = _options.refetchQueries,
      _initConfig = _options.config || {},
      _config = null;

    if (passedConfig) _config = { ..._initConfig, ...passedConfig };
    else if (_initConfig) _config = _initConfig;
    else _config = {};

    this.setLoadingDataState();
    return this.subscriber
      .subscribeToMutation(operation, _config)
      .then(response => {
        this.setLoadingDataState();
        if (_refetchQueries) this.refetchQueries(_refetchQueries);
        return Promise.resolve(response.data);
      })
      .catch(error => {
        this.setLoadingDataState();
        return Promise.reject(error);
      });
  };

  render() {
    let { operation } = this.props;
    return this.props.children(this.state[operation], this.mutate);
  }
}

let Mutation = null;

/**
 * This function exposes MutationAdvanced to the context api which provides it with the client instance and the store
 *
 * @param {Object} [{children: any, rest: Object}]
 */
export default (Mutation = ({ children, ...rest }) => (
  <KunyoraContext.Consumer>
    {context => {
      let composedProps = { ...context, ...rest };
      return (
        <MutationAdvanced {...composedProps}>
          {(mutationState, mutate) => children(mutationState, mutate)}
        </MutationAdvanced>
      );
    }}
  </KunyoraContext.Consumer>
));

Mutation.propTypes = {
  children: PropTypes.any,
  operation: PropTypes.string.isRequired,
  options: PropTypes.shape({
    refetchQueries: PropTypes.arrayOf(
      PropTypes.shape({
        operation: PropTypes.string.isRequired,
        config: PropTypes.object
      })
    ),
    config: PropTypes.object
  })
};
