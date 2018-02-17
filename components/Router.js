import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

import * as types from "../types";
import { ComposerContext } from "./ComposerProvider";
import Subscriber from "../utils/subscriber";

class RouterAdvanced extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    let { route, resources, store, client } = props;
  }

  static propTypes = {
    route: PropTypes.string.isRequired,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        operation: PropTypes.string.isRequired,
        config: PropTypes.object
      })
    ).isRequired,
    requestPolicy: PropTypes.string
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
