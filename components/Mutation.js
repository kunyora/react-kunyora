import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import Subscriber from "../utils/subscriber";
import { ComposerContext } from "./ComposerProvider";

class MutationAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    let { operation, options, store, client } = props;
    invariant(
      typeof operation === "string",
      "Props [operation] must be passed to component Queries and it must be of type [string]"
    );
    invariant(
      options &&
      options.variables &&
      typeof options.variables === "object" &&
      options.variables instanceof Object,
      "[variables] property in props [options] and must be of type [object]"
    );
    invariant(
      operation.slice(0, 3).toUpperCase() === "GET",
      "It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"
    );
    this.state = {
      [operation]: { loading: true }
    };
    this.subscriber = new Subscriber(store, client);
  }

  static propTypes = {
    operation: PropTypes.string.isRequired,
    options: PropTypes.shapeOf({
      refetchQueries: PropTypes.arrayOf(PropTypes.shapeOf({
        operation: PropTypes.string.isRequired,
        variables: PropTypes.object,
        endpoint: PropTypes.string
      }))
    }),
    client: PropTypes.any,
    store: PropTypes.any
  }
}

export const Mutation = ({ children, ...rest }) => (
  <ComposerContext.Consumer>
    {context => {
      let composedProps = { ...context, ...rest }
      return (
        <Mutation {...composedProps}>

        </Mutation>
      )
    }}
  </ComposerContext.Consumer>
)