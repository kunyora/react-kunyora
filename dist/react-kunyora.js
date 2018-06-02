module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dists/",t(t.s=9)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("invariant")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SET_QUERY_DATA="SET_QUERY_DATA",t.SET_PAGE_DOWNLOAD_PROGRESS="SET_PAGE_DOWNLOAD_PROGRESS"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createSignatureHash=function(e,t){return""+e+JSON.stringify(t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.KunyoraContext=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(1),f=r(l),p=n(10),d=r(p),h=t.KunyoraContext=(0,d.default)({client:{},store:{}}),y=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=e.store,n=e.children,r=e.client,o={store:t,client:r};return c.default.createElement(h.Provider,{value:o},n)}}]),t}(c.default.PureComponent);y.propTypes={client:f.default.any,store:f.default.any},t.default=y},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),f=r(l),p=n(1),d=r(p),h=n(6),y=r(h),b=n(5),m=function(e){function t(e,n){a(this,t);var r=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));v.call(r),r.subscribe();var o=r.updateState(),i=o.nextState;return r.state=s({},i),r}return i(t,e),c(t,[{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){return this.props.children(this.state)}}]),t}(f.default.PureComponent);m.propTypes={mapStateToProps:d.default.func,store:d.default.any,client:d.default.any};var v=function(){var e=this;this.updateState=function(){var t=e.props,n=t.mapStateToProps,r=t.store,o=r.getState,a=(r.listen,e.state||{}),u=!1,i=n(o()),s=Object.keys(i).reduce(function(e,t){return y.default.isEqual(i[t],a[t])?(t in a||(u=!0),e[t]=a[t]):(u=!0,e[t]=i[t]),e},{});return{shouldSetState:u,nextState:s}},this.subscribe=function(){var t=e.props.store.listen;e.unsubscribe=t(function(){var t=e.updateState(),n=t.shouldSetState,r=t.nextState;n&&e.setState(s({},r))})}},g=null;t.default=g=function(e){var t=e.children,n=o(e,["children"]);return f.default.createElement(b.KunyoraContext.Consumer,null,function(e){var r=s({},e,n);return f.default.createElement(m,r,function(n){return t(n,e)})})},g.propTypes={children:d.default.any}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e,t,n,r){this.store=e,this.client=t,this.loader=r,n&&(this.progressCount=0)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(2),s=(r(i),n(6)),c=r(s),l=n(3),f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(l),p=n(4);a.prototype.subscribeToQuery=function(e,t){var n=null;if(this.client.isUseBeforeCallbackSupplied){var r=this.client.defaults.headers,o=this.client.useBeforeRequest(c.default.cloneDeep(r));n=this.sendQuery(o,t,e)}else n=this.sendQuery(null,t,e);return n},a.prototype.sendQuery=function(e,t,n){var r=this;return new Promise(function(o,a){var i=t||{};e&&(r.client.defaults.headers=e),r.client[n](u({},i)).then(function(e){r.sendResponseToCallback(e),o(e)}).catch(function(e){r.sendResponseToCallback(e),a(e)})})},a.prototype.subscribeToMutation=function(e,t){var n=null;if(this.client.isUseBeforeCallbackSupplied){var r=this.client.defaults.headers,o=this.client.useBeforeRequest(c.default.cloneDeep(r));n=this.sendMutation(o,t,e)}else n=this.sendMutation(null,t,e);return n},a.prototype.sendMutation=function(e,t,n){var r=this;return new Promise(function(o,a){var i=t||{};e&&(r.client.defaults.headers=e),r.client[n](u({},i)).then(function(e){r.sendResponseToCallback(e),o(e)}).catch(function(e){r.sendResponseToCallback(e),a(e)})})},a.prototype.subscribeToMultiConcurrentQueries=function(e){var t=null;if(this.client.isUseBeforeCallbackSupplied){var n=this.client.defaults.headers,r=this.client.useBeforeRequest(c.default.cloneDeep(n));t=this.sendMultipleConcurrentQueries(r,e)}else t=this.sendMultipleConcurrentQueries(null,e);return t},a.prototype.sendMultipleConcurrentQueries=function(e,t){var n=this;return new Promise(function(r,o){e&&(n.client.defaults.headers=e),n.buildRequestHandshakePromise(t).then(function(e){n.sendResponseToCallback(e),r(n.loader?e.splice(1):e)}).catch(function(e){n.sendResponseToCallback(e),o(e)})})},a.prototype.buildRequestHandshakePromise=function(e){return this.loader?Promise.all([this.loader()].concat(o(this.composeAxiosInstance(e)))):Promise.all([].concat(o(this.composeAxiosInstance(e))))},a.prototype.composeAxiosInstance=function(e){var t=this;return this.lengthOfArrayOfQueryConfig=e.length,e.reduce(function(e,n){var r=n.operation,o=n.config,a=n.fetchPolicy,u=o||{},i=null;return i="cache-first"===(a||"network-only")?t.getQueryFromStore(r,u):t.getQueryAxiosInstance(r,u),e.push(i),e},[])},a.prototype.getQueryFromStore=function(e,t){var n=this.store.getState()[f.SET_QUERY_DATA]||{},r=n[(0,p.createSignatureHash)(e,t)];return r?new Promise(function(e,t){return e({data:r})}):this.getQueryAxiosInstance(e,t)},a.prototype.getQueryAxiosInstance=function(e,t){return this.client[e](u({},t))},a.prototype.sendResponseToCallback=function(e){var t=this.client,n=t.isUseAfterCallbackSupplied,r=t.useAfterResponse;n&&r(e)},t.default=a},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Router=t.Connector=t.Mutation=t.Query=t.KunyoraProvider=void 0;var o=n(5),a=r(o),u=n(11),i=r(u),s=n(12),c=r(s),l=n(13),f=r(l),p=n(14),d=r(p);t.KunyoraProvider=a.default,t.Query=i.default,t.Mutation=c.default,t.Connector=f.default,t.Router=d.default},function(e,t){e.exports=require("create-react-context")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e,t,n){var r=n||{},o=r.config||{};return{queries:(e[w.SET_QUERY_DATA]||{})[(0,R.createSignatureHash)(t,o)]}}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),h=r(d),y=n(1),b=r(y),m=n(2),v=r(m),g=n(6),O=r(g),_=n(7),S=r(_),P=n(3),w=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(P),E=n(8),j=r(E),R=n(4),T=function(e){function t(e,n){u(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));C.call(r);var o=e.operation,a=e.options,s=(e.queries,e.store),c=e.client;return(0,v.default)("string"==typeof o,"Props [operation] must be passed to component Queries and it must be of type [string]"),a&&a.config&&(0,v.default)(a&&a.config&&"object"===f(a.config)&&a.config instanceof Object,"[config] property in props [options] and must be of type [object] for your Query components"),(0,v.default)("GET"===o.slice(0,3).toUpperCase(),"It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"),r.isComponentMounted=!0,r.subscriber=new j.default(s,c),r.beforeFirstRenderCall(),r}return s(t,e),p(t,[{key:"componentWillReceiveProps",value:function(e){if(e.queries){var t=e.queries,n=e.skip,r=this.props.operation,o=this.state[r].data;n||!O.default.isEqual(t,o)&&t&&this.isComponentMounted&&this.setState(a({},r,l({},this.state[r],{data:t})))}}},{key:"componentWillUnmount",value:function(){this.isComponentMounted=!1}},{key:"render",value:function(){var e=this.props,t=e.operation,n=e.renderLoading,r=e.renderError,o=this.state[t],a=o.loading,u=o.error;return!a||null!==n&&void 0===n?!u||null!==r&&void 0===r?this.props.children(this.state[t],this.fetchMore,this.refetchQuery):r:n}}]),t}(h.default.PureComponent);T.propTypes={operation:b.default.string.isRequired,skip:b.default.bool,options:b.default.shape({config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only","cache-only","cache-and-network"])}),renderError:b.default.element,renderLoading:b.default.element,client:b.default.any,store:b.default.any};var C=function(){var e=this;this.setInitialStateBeforeMount=function(t,n){e.state=a({},t,l({},n))},this.beforeFirstRenderCall=function(){var t=e.props,n=t.options,r=t.queries,o=t.operation,a=t.skip,u=n||{},i=u.fetchPolicy||"cache-first",s={};switch(i){case"network-only":s=l({},s,{loading:!0,isInitialDataSet:!1}),e.setInitialStateBeforeMount(o,s),e._state=null,e.refetchQuery(void 0);break;case"cache-only":(0,v.default)(r&&!a,"It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"),s=l({},s,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,s);break;case"cache-and-network":(0,v.default)(r&&!a,"It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"),s=l({},s,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,s),e._state=null,e.refetchQuery(void 0);break;default:r?(s=l({},s,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,s)):(s=l({},s,{loading:!0,isInitialDataSet:!1}),e.setInitialStateBeforeMount(o,s),e._state=null,e.refetchQuery(void 0))}return s},this.getInitialStateFromStore=function(){var t=e.props,n=t.queries,r=t.skip,o=r?void 0:n;return{loading:!1,isInitialDataSet:!!o,data:o}},this.setLoadingDataState=function(){var t=e.props.operation,n=e.state&&e.state[t]||e._state;e._state&&e.isComponentMounted?e.setState(a({},t,l({},n,{loading:!0}))):e._state=1},this.setSuccessDataState=function(t,n){var r={isInitialDataSet:!0},o=e.props,u=o.operation,i=o.store,s=i.getState()[w.SET_QUERY_DATA]||{},c=l({},s,a({},(0,R.createSignatureHash)(u,n),t));i.dispatch(w.SET_QUERY_DATA,c),e.isComponentMounted&&e.setState(a({},u,l({},e.state[u],{error:void 0},r,{loading:!1,data:t})))},this.setErrorDataState=function(t){var n=e.props.operation;e.isComponentMounted&&e.setState(a({},n,l({},e.state[n],{loading:!1,error:t})))},this.refetchQuery=function(t){var n=e.props,r=n.skip,o=n.operation,a=n.options,u=a||{},i=u.config||{},s=null;s=t?l({},i,t):i||{},r||(e.setLoadingDataState(),e.subscriber.subscribeToQuery(o,s).then(function(t){e.setSuccessDataState(t.data,s)}).catch(function(t){return e.setErrorDataState(t.response||t.message)}))},this.fetchMore=function(t){var n=e.props,r=n.skip,o=n.operation,a=n.options,u=(n.store,a||{}),i=t.updateQuery;if(!r){(0,v.default)(i,"[updateQuery] is needed as a config parameter in [options.fetchMore]"),e.setLoadingDataState();var s=t.config||u.config||{};e.subscriber.subscribeToQuery(o,s).then(function(t){var n=i(e.state[o].data,{fetchMoreResult:t.data});(0,v.default)(n,"A result of any type must be returned to form the new state from the updateQuery config option"),e.setSuccessDataState(n,s)}).catch(function(t){return e.setErrorDataState(t.response||t.message)})}}},M=null;t.default=M=function(e){var t=e.children,n=o(e,["children"]);return h.default.createElement(S.default,{mapStateToProps:function(e){return c(e,n.operation,n.options)}},function(e,r){var o=l({},r,n,e);return h.default.createElement(T,o,function(e,n,r){return t(e,n,r)})})},M.propTypes={children:b.default.any,operation:b.default.string.isRequired,skip:b.default.bool,options:b.default.shape({config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only","cache-only","cache-and-network"])})}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(0),d=r(p),h=n(1),y=r(h),b=n(2),m=r(b),v=n(8),g=r(v),O=n(5),_=n(3),S=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(_),P=n(4),w=function(e){function t(e,n){u(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));E.call(r);var o=e.operation,s=e.options,c=e.store,f=e.client;return(0,m.default)("string"==typeof o,"Props [operation] must be passed to component Mutation and it must be of type [string]"),s&&s.config&&(0,m.default)(s&&s.config&&"object"===l(s.config)&&s.config instanceof Object,"[config] property is required in props [options] and must be of type [object] for your Mutation component"),(0,m.default)("CREATE"===o.slice(0,6).toUpperCase()||"UPDATE"===o.slice(0,6).toUpperCase()||"PARTUPDATE"===o.slice(0,10).toUpperCase()||"DELETE"===o.slice(0,6).toUpperCase(),"It doesn't feel like you want the component to perform a mutation. Mutations could only be of the form createUser, deleteTicket etc with the ***create, update, partUpdate and delete*** methods as a prefix. please check the docs"),r.state=a({},o,{loading:!1}),r.isComponentMounted=!0,r.subscriber=new g.default(c,f),r}return s(t,e),f(t,[{key:"componentWillUnmount",value:function(){this.isComponentMounted=!1}},{key:"render",value:function(){var e=this.props.operation;return this.props.children(this.state[e],this.mutate)}}]),t}(d.default.PureComponent);w.propTypes={operation:y.default.string.isRequired,options:y.default.shape({refetchQueries:y.default.arrayOf(y.default.shape({operation:y.default.string.isRequired,config:y.default.object})),config:y.default.object}),client:y.default.any,store:y.default.any};var E=function(){var e=this;this.setLoadingDataState=function(){var t=e.props.operation;e.isComponentMounted&&e.setState(a({},t,{loading:!e.state[t].loading}))},this.refetchQueries=function(t){var n=e.props.store;t.forEach(function(t){var r=t.operation,o=t.config;o=o||{},function(t,r){e.subscriber.subscribeToQuery(t,r||{}).then(function(e){var o=n.getState()[S.SET_QUERY_DATA]||{},u=c({},o,a({},(0,P.createSignatureHash)(t,r),e.data));n.dispatch(S.SET_QUERY_DATA,u)}).catch(function(e){"production"!==process.env.NODE_ENV&&console.log(e)})}(r,o)})},this.mutate=function(t){var n=e.props,r=n.operation,o=n.options,a=o||{},u=a.refetchQueries,i=a.config||{},s=null;return s=t?c({},i,t):i||{},e.setLoadingDataState(),e.subscriber.subscribeToMutation(r,s).then(function(t){return e.setLoadingDataState(),u&&e.refetchQueries(u),Promise.resolve(t.data)}).catch(function(t){return e.setLoadingDataState(),Promise.reject(t)})}},j=null;t.default=j=function(e){var t=e.children,n=o(e,["children"]);return d.default.createElement(O.KunyoraContext.Consumer,null,function(e){var r=c({},e,n);return d.default.createElement(w,r,function(e,n){return t(e,n)})})},j.propTypes={children:y.default.any,operation:y.default.string.isRequired,options:y.default.shape({refetchQueries:y.default.arrayOf(y.default.shape({operation:y.default.string.isRequired,config:y.default.object})),config:y.default.object})}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return{progress:(e[v.SET_PAGE_DOWNLOAD_PROGRESS]||{})[t]}}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),p=r(f),d=n(1),h=r(d),y=n(2),b=r(y),m=n(3),v=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(m),g=n(7),O=r(g),_=["NULL","LOADING/ERROR","COMPONENT"],S=function(e){function t(e,n){a(this,t);var r=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));r.timedOutPromise=function(){return new Promise(function(e,t){setTimeout(t,r.timeout,{type:"error"})})},r.loadable=function(){return(0,r.props.loader)().then(function(e){return Promise.resolve({type:"success",component:e.default?e.default:e})}).catch(function(e){return Promise.reject({type:"error"})})};var o=r.props,i=o.name,s=o.delay,c=o.loadingComponent,l=o.timeout;return(0,b.default)("string"==typeof i,"The [name] prop must be passed to the Connector component and must be of type [string]"),s&&(0,b.default)("number"==typeof s,"The delay supplied to the Connector component must be of type [number]"),l&&(0,b.default)("number"==typeof l,"The timeout supplied to the Connector component must be of type [number]"),r.isComponentMounted=!0,r.delay=s||2e3,r.timeout=l||1e8,r.state={component:null,renderState:_[0]},setTimeout(function(){var e=r.state.renderState;e!==_[2]&&e!==_[1]&&r.isComponentMounted&&r.setState({component:c,renderState:_[1]})},r.delay),r}return i(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=(t.timeout,t.loader),r=t.errorComponent;n&&Promise.race([this.timedOutPromise(),this.loadable()]).then(function(t){e.isComponentMounted&&e.setState({component:t.component,renderState:_[2]})}).catch(function(t){e.isComponentMounted&&e.setState({component:r,renderState:_[1]})})}},{key:"componentWillUnmount",value:function(){this.isComponentMounted=!1}},{key:"render",value:function(){var e=this.props,t=(e.name,e.progress),n=e.children,r=e.loader,o=this.state,a=o.component,u=o.renderState,i=t||0;if(r){if(u!==_[2]){return n({},!0,u===_[0]?null:"function"==typeof a?a():a,!0)}return n({progressCount:i},!0,a,!1)}return n({progress:i},!1,null)}}]),t}(p.default.PureComponent);S.propTypes={name:h.default.string.isRequired,loader:h.default.func,progress:h.default.any,loadingComponent:h.default.oneOfType([h.default.func,h.default.element]),errorComponent:h.default.oneOfType([h.default.element,h.default.func]),delay:h.default.number,timeout:h.default.number};var P=null;t.default=P=function(e){var t=e.children,n=o(e,["children"]);return p.default.createElement(O.default,{mapStateToProps:function(e){return s(e,n.name)}},function(e,r){var o=c({},r,n,e);return p.default.createElement(S,o,function(e,n,r,o){return n?o?null!==r?p.default.cloneElement(r,e):null:t(r,e):t(null,e)})})},P.propTypes={children:h.default.any,name:h.default.string.isRequired,loader:h.default.func,loadingComponent:h.default.oneOfType([h.default.func,h.default.element]),errorComponent:h.default.oneOfType([h.default.element,h.default.func]),delay:h.default.number,timeout:h.default.number}},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){return{progress:(e[O.SET_PAGE_DOWNLOAD_PROGRESS]||{})[t]}}Object.defineProperty(t,"__esModule",{value:!0});var f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),h=o(d),y=n(1),b=o(y),m=n(2),v=o(m),g=n(3),O=r(g),_=n(7),S=o(_),P=n(8),w=o(P),E=n(15),j=r(E),R=n(4),T=function(e){function t(e,n){i(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));C.call(r);var o=e.name,a=e.resources,c=e.store,l=e.client,f=e.onRequestRoute,p=e.loader;return(0,v.default)("string"==typeof o,"Props [name] must be passed to component Router and it must be of type string"),(0,v.default)("function"==typeof f,"Props [onRequestRoute] must be passed to the component Router and it must be of type [function]"),(0,v.default)(a&&a instanceof Array,"[resources] property is required in props passed to the Router component \n and it must be of type Array"),p&&(0,v.default)("function"==typeof p,"The [loader] props supplied to Router component must be of type [function]"),r.requestPolicy="request-all",r.state=u({},o,{}),r.isComponentMounted=!0,r.subscriber=new w.default(c,l,!0,p),r}return c(t,e),p(t,[{key:"componentWillUnmount",value:function(){this.isComponentMounted=!1}},{key:"render",value:function(){var e=this.props,t=e.name,n=e.progress;return this.props.children(this.state[t],n,this.push)}}]),t}(h.default.PureComponent);T.propTypes={name:b.default.string.isRequired,loader:b.default.func,resources:b.default.arrayOf(b.default.shape({operation:b.default.string.isRequired,config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only"])})).isRequired,onRequestRoute:b.default.func.isRequired,client:b.default.any,store:b.default.any,progress:b.default.any};var C=function(){var e=this;this.setErrorDataState=function(t){var n=e.props.name;e.isComponentMounted&&e.setState(u({},n,f({},e.state[n],{error:t})))},this.setSuccessDataState=function(t){var n=e.props,r=n.resources,o=n.store,a=n.onRequestRoute;r.forEach(function(e,n){var r=e.operation,a=e.config;a=a||{},function(e,r){var a=o.getState()[O.SET_QUERY_DATA]||{},i=f({},a,u({},(0,R.createSignatureHash)(e,r),t[n].data));o.dispatch(O.SET_QUERY_DATA,i)}(r,a)}),e.completeProgressCount(),a()},this.completeProgressCount=function(){var t=e.props,n=t.name;t.store.performAsyncAction(j.completeProgressCount(n))},this.push=function(){var t=e.props,n=t.resources,r=t.name;t.store.performAsyncAction(j.startProgressCount(r)),e.subscriber.subscribeToMultiConcurrentQueries(n).then(function(t){return e.setSuccessDataState(t)}).catch(function(t){return e.setErrorDataState(t.response||t.message)})}},M=null;t.default=M=function(e){var t=e.children,n=a(e,["children"]);return h.default.createElement(S.default,{mapStateToProps:function(e){return l(e,n.name)}},function(e,r){var o=f({},r,n,e);return h.default.createElement(T,o,function(e,n,r){return t(e,n,r)})})},M.propTypes={children:b.default.any,name:b.default.string.isRequired,loader:b.default.func,resources:b.default.arrayOf(b.default.shape({operation:b.default.string.isRequired,config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only"])})).isRequired,onRequestRoute:b.default.func.isRequired}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.completeProgressCount=t.startProgressCount=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(3),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),i=n(2),s=function(e){return e&&e.__esModule?e:{default:e}}(i),c=0,l=!1,f=function(e){return Math.pow(e,2)};t.startProgressCount=function(e){return function(t){try{l=!1;var n=window.performance.now(),a=requestAnimationFrame(function i(s){if(a||!l){var p=t.getState()[u.SET_PAGE_DOWNLOAD_PROGRESS]||{};c=(s-n)/1e3,c<=.8?(t.dispatch(u.SET_PAGE_DOWNLOAD_PROGRESS,o({},p,r({},e,100*f(c)))),requestAnimationFrame(i)):a=null}})}catch(e){(0,s.default)(window,"React-Kunyora does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases")}}},t.completeProgressCount=function(e){return function(t){try{var n=window.performance.now(),a=requestAnimationFrame(function i(s){if(a){var l=t.getState()[u.SET_PAGE_DOWNLOAD_PROGRESS]||{},p=(s-n)/1e3;p>=c&&p<1?(c=p,t.dispatch(u.SET_PAGE_DOWNLOAD_PROGRESS,o({},l,r({},e,100*f(c)))),requestAnimationFrame(i)):p>=1?(t.dispatch(u.SET_PAGE_DOWNLOAD_PROGRESS,o({},l,r({},e,0))),c=0,a=null):requestAnimationFrame(i)}})}catch(e){(0,s.default)(window,"React-Kunyora does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases")}}}}]);