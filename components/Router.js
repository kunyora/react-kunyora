import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import { ComposerContext } from "./ComposerProvider";
import Subscriber from "../utils/subscriber";

class RouterAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { route, resources, store, client, router } = props;
    invariant(
      typeof route === "string",
      "Props [route] must be passed to component Router and it must be of type string"
    );
    invariant(
      resources && resources instanceof Array,
      "[resources] property is required in props passed to the Router component \n and it must be of type Array"
    );
    invariant(
      router,
      "Seems like you don't have a router installed or a router wasn't supplied to the ComposerProvider Top Element. \n Please [npm install] a router suitable for your routing engine and add it to the [ComposerProvider] Top level element"
    );
    this.state = {
      [route]: { loading: false }
    };
    this.subscriber = new Subscriber(store, context);
  }

  static propTypes = {
    route: PropTypes.string.isRequired,
    componentUri: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        operation: PropTypes.string.isRequired,
        config: PropTypes.object
      })
    ).isRequired,
    requestPolicy: PropTypes.string,
    client: PropTypes.any,
    store: PropTypes.any,
    router: PropTypes.any
  };
}

let Router = null;

export default (Router = ({ children, ...rest }) => (
  <ComposerContext.Consumer>
    {context => {
      let composedProps = { ...context, ...rest };
      return <RouterAdvanced {...composedProps} />;
    }}
  </ComposerContext.Consumer>
));
