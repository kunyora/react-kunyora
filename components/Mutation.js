import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import Subscriber from "../utils/subscriber";
import { ComposerContext } from "./ComposerProvider";
import * as types from "../types";

class MutationAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { operation, options, store, client } = props;
    invariant(
      typeof operation === "string",
      "Props [operation] must be passed to component Queries and it must be of type [string]"
    );
    if (options && options.config) {
      invariant(
        options &&
          options.config &&
          typeof options.config === "object" &&
          options.config instanceof Object,
        "[config] property is required in props [options] and must be of type [object] for your Mutation component"
      );
    }
    invariant(
      operation.slice(0, 6).toUpperCase() === "CREATE" ||
        operation.slice(0, 6).toUpperCase() === "UPDATE" ||
        operation.slice(0, 10).toUpperCase() === "PARTUPDATE" ||
        operation.slice(0, 6).toUpperCase() === "DELETE",
      "It doesn't feel like you want the component to perform a mutation. Mutations could only be of the form createUser, deleteTicket etc with the ***create, update, partUpdate and delete*** methods as a prefix. please check the docs"
    );
    this.state = {
      [operation]: { loading: false }
    };
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

  setLoadingDataState = () => {
    let { operation } = this.props;
    this.setState({
      [operation]: {
        loading: !this.state[operation].loading
      }
    });
  };

  refetchQueries = refetchConfig => {
    let { store } = this.props;

    refetchConfig.forEach(({ operation, config }) => {
      this.subscriber
        .subscribeToQuery(operation, config || {})
        .then(response => {
          let overallState = store.getState()[types.SET_QUERY_DATA] || {},
            _newState = { ...overallState, [operation]: response.data };

          store.dispatch(types.SET_QUERY_DATA, _newState);
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          }
        });
    });
  };

  mutate = passedConfig => {
    let { operation, options: { refetchQueries, config } } = this.props,
      _config = passedConfig || config || {};
    this.setLoadingDataState();
    return this.subscriber
      .subscribeToMutation(operation, _config)
      .then(response => {
        this.setLoadingDataState();
        if (refetchQueries) this.refetchQueries(refetchQueries);
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

export default (Mutation = ({ children, ...rest }) => (
  <ComposerContext.Consumer>
    {context => {
      let composedProps = { ...context, ...rest };
      return (
        <MutationAdvanced {...composedProps}>
          {(mutationState, mutate) => children(mutationState, mutate)}
        </MutationAdvanced>
      );
    }}
  </ComposerContext.Consumer>
));
