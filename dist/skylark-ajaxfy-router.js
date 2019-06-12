/**
 * skylark-ajaxfy-router - An Elegant HTML5 Routing Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.6-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(r,e){var o=e.define,t=e.require,n="function"==typeof o&&o.amd,a=!n&&"undefined"!=typeof exports;if(!n&&!o){var u={};o=e.define=function(r,e,o){"function"==typeof o?(u[r]={factory:o,deps:e.map(function(e){return function(r,e){if("."!==r[0])return r;var o=e.split("/"),t=r.split("/");o.pop();for(var n=0;n<t.length;n++)"."!=t[n]&&(".."==t[n]?o.pop():o.push(t[n]));return o.join("/")}(e,r)}),resolved:!1,exports:null},t(r)):u[r]={factory:null,resolved:!0,exports:o}},t=e.require=function(r){if(!u.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var o=u[r];if(!o.resolved){var n=[];o.deps.forEach(function(r){n.push(t(r))}),o.exports=o.factory.apply(e,n)||null,o.resolved=!0}return o.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,e){r("skylark-ajaxfy-router/routers",["skylark-langx/skylark"],function(r){return r.attach("ajaxfy.routers",{})}),r("skylark-ajaxfy-router/main",["./routers"],function(r){return r}),r("skylark-ajaxfy-router",["skylark-ajaxfy-router/main"],function(r){return r})}(o),!n){var s=t("skylark-langx/skylark");a?module.exports=s:e.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-ajaxfy-router.js.map
