module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dists/",t(t.s=9)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("invariant")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SET_QUERY_DATA="SET_QUERY_DATA",t.SET_PAGE_DOWNLOAD_PROGRESS="SET_PAGE_DOWNLOAD_PROGRESS"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.createSignatureHash=function(e,t){return""+e+JSON.stringify(t)}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.ComposerContext=void 0;var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(0),c=n(s),l=r(1),f=n(l),p=r(10),d=n(p),h=t.ComposerContext=(0,d.default)({client:{},store:{}}),y=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){var e=this.props,t=e.store,r=e.children,n=e.client,o={store:t,client:n};return c.default.createElement(h.Provider,{value:o},r)}}]),t}(c.default.PureComponent);y.propTypes={client:f.default.any,store:f.default.any},t.default=y},function(e,t){e.exports=require("lodash")},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),f=n(l),p=r(1),d=n(p),h=r(6),y=n(h),b=r(5),m=function(e){function t(e,r){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));v.call(n),n.subscribe();var o=n.updateState(),i=o.nextState;return n.state=s({},i),n}return i(t,e),c(t,[{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){return this.props.children(this.state)}}]),t}(f.default.PureComponent);m.propTypes={mapStateToProps:d.default.func,store:d.default.any,client:d.default.any};var v=function(){var e=this;this.updateState=function(){var t=e.props,r=t.mapStateToProps,n=t.store,o=n.getState,a=(n.listen,e.state||{}),u=!1,i=r(o()),s=Object.keys(i).reduce(function(e,t){return y.default.isEqual(i[t],a[t])?(t in a||(u=!0),e[t]=a[t]):(u=!0,e[t]=i[t]),e},{});return{shouldSetState:u,nextState:s}},this.subscribe=function(){var t=e.props.store.listen;e.unsubscribe=t(function(){var t=e.updateState(),r=t.shouldSetState,n=t.nextState;r&&e.setState(s({},n))})}},g=null;t.default=g=function(e){var t=e.children,r=o(e,["children"]);return f.default.createElement(b.ComposerContext.Consumer,null,function(e){var n=s({},e,r);return f.default.createElement(m,n,function(r){return t(r,e)})})},g.propTypes={children:d.default.any}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t,r,n){this.store=e,this.client=t,this.loader=n,r&&(this.progressCount=0)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2),s=(n(i),r(6)),c=n(s),l=r(3),f=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(l),p=r(4);a.prototype.subscribeToQuery=function(e,t){var r=null;if(this.client.isUseBeforeCallbackSupplied){var n=this.client.defaults.headers,o=this.client.useBeforeCallback(c.default.cloneDeep(n));r=this.sendQuery(o,t,e)}else r=this.sendQuery(null,t,e);return r},a.prototype.sendQuery=function(e,t,r){var n=this;return new Promise(function(o,a){var i=t||{};e&&(n.client.defaults.headers=e),n.client[r](u({},i)).then(function(e){n.sendResponseToCallback(e),o(e)}).catch(function(e){n.sendResponseToCallback(e),a(e)})})},a.prototype.subscribeToMutation=function(e,t){var r=null;if(this.client.isUseBeforeCallbackSupplied){var n=this.client.defaults.headers,o=this.client.useBeforeCallback(c.default.cloneDeep(n));r=this.sendMutation(o,t,e)}else r=this.sendMutation(null,t,e);return r},a.prototype.sendMutation=function(e,t,r){var n=this;return new Promise(function(o,a){var i=t||{};e&&(n.client.defaults.headers=e),n.client[r](u({},i)).then(function(e){n.sendResponseToCallback(e),o(e)}).catch(function(e){n.sendResponseToCallback(e),a(e)})})},a.prototype.subscribeToMultiConcurrentQueries=function(e,t){var r=null;if(this.client.isUseBeforeCallbackSupplied){var n=this.client.defaults.headers,o=this.client.useBeforeCallback(c.default.cloneDeep(n));r=this.sendMultipleConcurrentQueries(o,e,t)}else r=this.sendMultipleConcurrentQueries(null,e,t);return r},a.prototype.sendMultipleConcurrentQueries=function(e,t,r){var n=this;return new Promise(function(o,a){e&&(n.client.defaults.headers=e),n.buildRequestHandshakePromise(t,r).then(function(e){n.sendResponseToCallback(e),o(n.loader?e.splice(1):e)}).catch(function(e){n.sendResponseToCallback(e),a(e)})})},a.prototype.buildRequestHandshakePromise=function(e,t){return this.loader?Promise.all([this.loader()].concat(o(this.composeAxiosInstance(e,t)))):Promise.all([].concat(o(this.composeAxiosInstance(e,t))))},a.prototype.composeAxiosInstance=function(e,t){var r=this;return this.lengthOfArrayOfQueryConfig=e.length,e.reduce(function(e,n){var o=n.operation,a=n.config,u=n.fetchPolicy,i=a||{},s=null;return s="cache-first"===(u||"network-only")?r.getQueryFromStore(o,i,t):r.getQueryAxiosInstance(o,i,t),e.push(s),e},[])},a.prototype.getQueryFromStore=function(e,t,r){var n=this.store.getState()[f.SET_QUERY_DATA]||{},o=n[(0,p.createSignatureHash)(e,t)];return o?(this.progressCount+=100,r(this.progressCount/this.lengthOfArrayOfQueryConfig),new Promise(function(e,t){return e({data:o})})):this.getQueryAxiosInstance(e,t,r)},a.prototype.getQueryAxiosInstance=function(e,t,r){var n=this;return this.client[e](u({},t,{onDownloadProgress:function(e){var t=e.loaded/e.total*100;n.progressCount+=t>=10?t:10;var o=n.progressCount/n.lengthOfArrayOfQueryConfig;r(o||0)}}))},a.prototype.sendResponseToCallback=function(e){var t=this.client,r=t.isUseAfterCallbackSupplied,n=t.useAfterCallback;r&&n(e)},t.default=a},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Router=t.Connector=t.Mutation=t.Query=t.ComposerProvider=void 0;var o=r(5),a=n(o),u=r(11),i=n(u),s=r(12),c=n(s),l=r(13),f=n(l),p=r(14),d=n(p);t.ComposerProvider=a.default,t.Query=i.default,t.Mutation=c.default,t.Connector=f.default,t.Router=d.default},function(e,t){e.exports=require("create-react-context")},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e){return{queries:e[w.SET_QUERY_DATA]}}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(0),h=n(d),y=r(1),b=n(y),m=r(2),v=n(m),g=r(6),O=n(g),_=r(7),S=n(_),P=r(3),w=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(P),E=r(8),j=n(E),T=r(4),R=function(e){function t(e,r){u(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));C.call(n);var o=e.operation,a=e.options,s=(e.queries,e.store),c=e.client;return(0,v.default)("string"==typeof o,"Props [operation] must be passed to component Queries and it must be of type [string]"),a&&a.config&&(0,v.default)(a&&a.config&&"object"===f(a.config)&&a.config instanceof Object,"[config] property in props [options] and must be of type [object] for your Query components"),(0,v.default)("GET"===o.slice(0,3).toUpperCase(),"It doesn't feel like you are about performing a query. Queries could only be of the form getUser, getTicket etc with the get method as a prefix. please check the docs"),n.subscriber=new j.default(s,c),n.beforeFirstRenderCall(),n}return s(t,e),p(t,[{key:"componentWillReceiveProps",value:function(e){if(e.queries){var t=e.queries,r=e.skip,n=this.props,o=n.operation,u=n.options,i=this.state[o].data,s=u||{},c=s.config||{},f=t[(0,T.createSignatureHash)(o,c)];r||!O.default.isEqual(f,i)&&f&&this.setState(a({},o,l({},this.state[o],{data:t[(0,T.createSignatureHash)(o,c)]})))}}},{key:"render",value:function(){var e=this.props,t=e.operation,r=e.renderLoading,n=e.renderError,o=this.state[t],a=o.loading,u=o.error;return a&&r?r:u&&n?n:this.props.children(this.state[t],this.fetchMore,this.refetchQuery)}}]),t}(h.default.PureComponent);R.propTypes={operation:b.default.string.isRequired,skip:b.default.bool,options:b.default.shape({config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only","cache-only","cache-and-network"])}),renderError:b.default.element,renderLoading:b.default.element,client:b.default.any,store:b.default.any};var C=function(){var e=this;this.setInitialStateBeforeMount=function(t,r){e.state=a({},t,l({},r))},this.beforeFirstRenderCall=function(){var t=e.props,r=t.options,n=t.queries,o=t.operation,a=t.skip,u=r||{},i=u.config||{},s=u.fetchPolicy||"cache-first",c=n||{},f={};switch(s){case"network-only":f=l({},f,{loading:!0,isInitialDataSet:!1}),e.setInitialStateBeforeMount(o,f),e._state=null,e.refetchQuery(void 0);break;case"cache-only":(0,v.default)(c[(0,T.createSignatureHash)(o,i)]&&!a,"It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"),f=l({},f,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,f);break;case"cache-and-network":(0,v.default)(c[(0,T.createSignatureHash)(o,i)]&&!a,"It appears that you want to get a query data which is not available in the cache. It is advisable to use cache-first fetch policy"),f=l({},f,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,f),e._state=null,e.refetchQuery(void 0);break;default:c[(0,T.createSignatureHash)(o,i)]?(f=l({},f,e.getInitialStateFromStore()),e.setInitialStateBeforeMount(o,f)):(f=l({},f,{loading:!0,isInitialDataSet:!1}),e.setInitialStateBeforeMount(o,f),e._state=null,e.refetchQuery(void 0))}return f},this.getInitialStateFromStore=function(){var t=e.props,r=t.operation,n=t.queries,o=t.options,a=t.skip,u=o||{},i=u.config||{},s=a?void 0:n[(0,T.createSignatureHash)(r,i)];return{loading:!1,isInitialDataSet:!!s,data:s}},this.setLoadingDataState=function(){var t=e.props.operation,r=e.state&&e.state[t]||e._state;e._state?e.setState(a({},t,l({},r,{loading:!0}))):e._state=1},this.setSuccessDataState=function(t,r){var n={isInitialDataSet:!0},o=e.props,u=o.operation,i=o.store,s=i.getState()[w.SET_QUERY_DATA]||{},c=l({},s,a({},(0,T.createSignatureHash)(u,r),t));i.dispatch(w.SET_QUERY_DATA,c),e.setState(a({},u,l({},e.state[u],{error:void 0},n,{loading:!1,data:t})))},this.setErrorDataState=function(t){var r=e.props.operation;e.setState(a({},r,l({},e.state[r],{loading:!1,error:t})))},this.refetchQuery=function(t){var r=e.props,n=r.skip,o=r.operation,a=r.options,u=a||{},i=u.config||{},s=null;s=t?l({},i,t):i||{},n||(e.setLoadingDataState(),e.subscriber.subscribeToQuery(o,s).then(function(t){e.setSuccessDataState(t.data,s)}).catch(function(t){return e.setErrorDataState(t.response||t.message)}))},this.fetchMore=function(t){var r=e.props,n=r.skip,o=r.operation,a=r.options,u=(r.store,a||{}),i=t.updateQuery;if(!n){(0,v.default)(i,"[updateQuery] is needed as a config parameter in [options.fetchMore]"),e.setLoadingDataState();var s=t.config||u.config||{};e.subscriber.subscribeToQuery(o,s).then(function(t){var r=i(e.state[o].data,{fetchMoreResult:t.data});(0,v.default)(r,"A result of any type must be returned to form the new state from the updateQuery config option"),e.setSuccessDataState(r,s)}).catch(function(t){return e.setErrorDataState(t.response||t.message)})}}},A=null;t.default=A=function(e){var t=e.children,r=o(e,["children"]);return h.default.createElement(S.default,{mapStateToProps:c},function(e,n){var o=l({},n,r,e);return h.default.createElement(R,o,function(e,r,n){return t(e,r,n)})})},A.propTypes={children:b.default.any,operation:b.default.string.isRequired,skip:b.default.bool,options:b.default.shape({config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only","cache-only","cache-and-network"])})}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),p=r(0),d=n(p),h=r(1),y=n(h),b=r(2),m=n(b),v=r(8),g=n(v),O=r(5),_=r(3),S=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(_),P=r(4),w=function(e){function t(e,r){u(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));E.call(n);var o=e.operation,s=e.options,c=e.store,f=e.client;return(0,m.default)("string"==typeof o,"Props [operation] must be passed to component Mutation and it must be of type [string]"),s&&s.config&&(0,m.default)(s&&s.config&&"object"===l(s.config)&&s.config instanceof Object,"[config] property is required in props [options] and must be of type [object] for your Mutation component"),(0,m.default)("CREATE"===o.slice(0,6).toUpperCase()||"UPDATE"===o.slice(0,6).toUpperCase()||"PARTUPDATE"===o.slice(0,10).toUpperCase()||"DELETE"===o.slice(0,6).toUpperCase(),"It doesn't feel like you want the component to perform a mutation. Mutations could only be of the form createUser, deleteTicket etc with the ***create, update, partUpdate and delete*** methods as a prefix. please check the docs"),n.state=a({},o,{loading:!1}),n.subscriber=new g.default(c,f),n}return s(t,e),f(t,[{key:"render",value:function(){var e=this.props.operation;return this.props.children(this.state[e],this.mutate)}}]),t}(d.default.PureComponent);w.propTypes={operation:y.default.string.isRequired,options:y.default.shape({refetchQueries:y.default.arrayOf(y.default.shape({operation:y.default.string.isRequired,config:y.default.object})),config:y.default.object}),client:y.default.any,store:y.default.any};var E=function(){var e=this;this.setLoadingDataState=function(){var t=e.props.operation;e.setState(a({},t,{loading:!e.state[t].loading}))},this.refetchQueries=function(t){var r=e.props.store;t.forEach(function(t){var n=t.operation,o=t.config;o=o||{},function(t,n){e.subscriber.subscribeToQuery(t,n||{}).then(function(e){var o=r.getState()[S.SET_QUERY_DATA]||{},u=c({},o,a({},(0,P.createSignatureHash)(t,n),e.data));r.dispatch(S.SET_QUERY_DATA,u)}).catch(function(e){"production"!==process.env.NODE_ENV&&console.log(e)})}(n,o)})},this.mutate=function(t){var r=e.props,n=r.operation,o=r.options,a=o||{},u=a.refetchQueries,i=a.config||{},s=null;return s=t?c({},i,t):i||{},e.setLoadingDataState(),e.subscriber.subscribeToMutation(n,s).then(function(t){return e.setLoadingDataState(),u&&e.refetchQueries(u),Promise.resolve(t.data)}).catch(function(t){return e.setLoadingDataState(),Promise.reject(t)})}},j=null;t.default=j=function(e){var t=e.children,r=o(e,["children"]);return d.default.createElement(O.ComposerContext.Consumer,null,function(e){var n=c({},e,r);return d.default.createElement(w,n,function(e,r){return t(e,r)})})},j.propTypes={children:y.default.any,operation:y.default.string.isRequired,options:y.default.shape({refetchQueries:y.default.arrayOf(y.default.shape({operation:y.default.string.isRequired,config:y.default.object})),config:y.default.object})}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{progress:e[v.SET_PAGE_DOWNLOAD_PROGRESS]}}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(0),p=n(f),d=r(1),h=n(d),y=r(2),b=n(y),m=r(3),v=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(m),g=r(7),O=n(g),_=["NULL","LOADING/ERROR","COMPONENT"],S=function(e){function t(e,r){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));n.timedOutPromise=function(){return new Promise(function(e,t){setTimeout(t,n.timeout,{type:"error"})})},n.loadable=function(){return(0,n.props.loader)().then(function(e){return Promise.resolve({type:"success",component:e.default?e.default:e})}).catch(function(e){return Promise.reject({type:"error"})})};var o=n.props,i=o.name,s=o.delay,c=o.loadingComponent,l=o.timeout;return(0,b.default)("string"==typeof i,"The [name] prop must be passed to the Connector component and must be of type [string]"),s&&(0,b.default)("number"==typeof s,"The delay supplied to the Connector component must be of type [number]"),l&&(0,b.default)("number"==typeof l,"The timeout supplied to the Connector component must be of type [number]"),n.delay=s||2e3,n.timeout=l||1e8,n.state={component:null,renderState:_[0]},setTimeout(function(){var e=n.state.renderState;e!==_[2]&&e!==_[1]&&n.setState({component:c,renderState:_[1]})},n.delay),n}return i(t,e),l(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props,r=(t.timeout,t.loader),n=t.errorComponent;r&&Promise.race([this.timedOutPromise(),this.loadable()]).then(function(t){e.setState({component:t.component,renderState:_[2]})}).catch(function(t){return e.setState({component:n,renderState:_[1]})})}},{key:"render",value:function(){var e=this.props,t=e.name,r=e.progress,n=e.children,o=e.loader,a=this.state,u=a.component,i=a.renderState,s=r||{},c=s[t]||0;if(o){if(i!==_[2]){return n({},!0,i===_[0]?null:"function"==typeof u?u():u,!0)}return n({progressCount:c},!0,u,!1)}return n({progress:c},!1,null)}}]),t}(p.default.PureComponent);S.propTypes={name:h.default.string.isRequired,loader:h.default.func,progress:h.default.any,loadingComponent:h.default.oneOfType([h.default.func,h.default.element]),errorComponent:h.default.oneOfType([h.default.element,h.default.func]),delay:h.default.number,timeout:h.default.number};var P=null;t.default=P=function(e){var t=e.children,r=o(e,["children"]);return p.default.createElement(O.default,{mapStateToProps:s},function(e,n){var o=c({},n,r,e);return p.default.createElement(S,o,function(e,r,n,o){return r?o?null!==n?p.default.cloneElement(n,e):null:t(n,e):t(e)})})},P.propTypes={children:h.default.any,name:h.default.string.isRequired,loader:h.default.func,loadingComponent:h.default.oneOfType([h.default.func,h.default.element]),errorComponent:h.default.oneOfType([h.default.element,h.default.func]),delay:h.default.number,timeout:h.default.number}},function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{progress:e[O.SET_PAGE_DOWNLOAD_PROGRESS]}}Object.defineProperty(t,"__esModule",{value:!0});var f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},p=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(0),h=o(d),y=r(1),b=o(y),m=r(2),v=o(m),g=r(3),O=n(g),_=r(7),S=o(_),P=r(8),w=o(P),E=r(15),j=n(E),T=r(4),R=function(e){function t(e,r){i(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));C.call(n);var o=e.name,a=e.resources,c=e.store,l=e.client,f=e.onRequestRoute,p=e.loader;return(0,v.default)("string"==typeof o,"Props [name] must be passed to component Router and it must be of type string"),(0,v.default)("function"==typeof f,"Props [onRequestRoute] must be passed to the component Router and it must be of type [function]"),(0,v.default)(a&&a instanceof Array,"[resources] property is required in props passed to the Router component \n and it must be of type Array"),p&&(0,v.default)("function"==typeof p,"The [loader] props supplied to Router component must be of type [function]"),n.requestPolicy="request-all",n.state=u({},o,{}),n.subscriber=new w.default(c,l,!0,p),n}return c(t,e),p(t,[{key:"render",value:function(){var e=this.props,t=e.name,r=e.progress,n=r||{};return this.props.children(this.state[t],n[t],this.push)}}]),t}(h.default.PureComponent);R.propTypes={name:b.default.string.isRequired,loader:b.default.func,resources:b.default.arrayOf(b.default.shape({operation:b.default.string.isRequired,config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only"])})).isRequired,onRequestRoute:b.default.func.isRequired,client:b.default.any,store:b.default.any,progress:b.default.any};var C=function(){var e=this;this.setErrorDataState=function(t){var r=e.props.name;e.setState(u({},r,f({},e.state[r],{error:t})))},this.setSuccessDataState=function(t){var r=e.props,n=r.resources,o=r.store,a=r.onRequestRoute;n.forEach(function(e,r){var n=e.operation,a=e.config;a=a||{},function(e,n){var a=o.getState()[O.SET_QUERY_DATA]||{},i=f({},a,u({},(0,T.createSignatureHash)(e,n),t[r].data));o.dispatch(O.SET_QUERY_DATA,i)}(n,a)}),e.completeProgressCount(),a()},this.completeProgressCount=function(){var t=e.props,r=t.name;t.store.performAsyncAction(j.completeProgressCount(r))},this.push=function(){var t=e.props,r=t.resources;t.name;e.subscriber.subscribeToMultiConcurrentQueries(r,function(t){var r=e.props,n=r.store,o=r.name,a=n.getState()[O.SET_PAGE_DOWNLOAD_PROGRESS]||{},i=f({},a,u({},o,t/2));n.dispatch(O.SET_PAGE_DOWNLOAD_PROGRESS,i)}).then(function(t){return e.setSuccessDataState(t)}).catch(function(t){return e.setErrorDataState(t.response||t.message)})}},A=null;t.default=A=function(e){var t=e.children,r=a(e,["children"]);return h.default.createElement(S.default,{mapStateToProps:l},function(e,n){var o=f({},n,r,e);return h.default.createElement(R,o,function(e,r,n){return t(e,r,n)})})},A.propTypes={children:b.default.any,name:b.default.string.isRequired,loader:b.default.func,resources:b.default.arrayOf(b.default.shape({operation:b.default.string.isRequired,config:b.default.object,fetchPolicy:b.default.oneOf(["cache-first","network-only"])})).isRequired,onRequestRoute:b.default.func.isRequired}},function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.completeProgressCount=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=r(3),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(a),i=r(2),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.completeProgressCount=function(e){return function(t){try{var r=window.performance.now(),a=requestAnimationFrame(function i(s){if(a){var c=(s-r)/1e3,l=t.getState()[u.SET_PAGE_DOWNLOAD_PROGRESS]||{},f=0;f=c>=1?0:c<=.5?50:100*c,t.dispatch(u.SET_PAGE_DOWNLOAD_PROGRESS,o({},l,n({},e,f))),c>=1?a=null:requestAnimationFrame(i)}})}catch(e){(0,s.default)(window,"React-Composer does not currently support server-pull before route in your current environment. Please use this feature or the Router component only on the web. \n However we plan to support this in feature releases")}}}}]);