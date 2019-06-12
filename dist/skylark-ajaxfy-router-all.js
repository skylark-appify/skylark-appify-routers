/**
 * skylark-ajaxfy-router - An Elegant HTML5 Routing Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.6-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(r,t){var n=t.define,e=t.require,o="function"==typeof n&&n.amd,a=!o&&"undefined"!=typeof exports;if(!o&&!n){var u={};n=t.define=function(r,t,n){"function"==typeof n?(u[r]={factory:n,deps:t.map(function(t){return function(r,t){if("."!==r[0])return r;var n=t.split("/"),e=r.split("/");n.pop();for(var o=0;o<e.length;o++)"."!=e[o]&&(".."==e[o]?n.pop():n.push(e[o]));return n.join("/")}(t,r)}),resolved:!1,exports:null},e(r)):u[r]={factory:null,resolved:!0,exports:n}},e=t.require=function(r){if(!u.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var n=u[r];if(!n.resolved){var o=[];n.deps.forEach(function(r){o.push(e(r))}),n.exports=n.factory.apply(t,o)||null,n.resolved=!0}return n.exports}}if(!n)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,t){r("skylark-langx/_attach",[],function(){return function(r,t,n){"string"==typeof t&&(t=t.split("."));for(var e=t.length,o=r,a=0,u=t[a++];a<e;)o=o[u]=o[u]||{},u=t[a++];return o[u]=n}}),r("skylark-langx/skylark",["./_attach"],function(r){var t={attach:function(n,e){return r(t,n,e)}};return t}),r("skylark-ajaxfy-router/routers",["skylark-langx/skylark"],function(r){return r.attach("ajaxfy.routers",{})}),r("skylark-ajaxfy-router/main",["./routers"],function(r){return r}),r("skylark-ajaxfy-router",["skylark-ajaxfy-router/main"],function(r){return r})}(n),!o){var f=e("skylark-langx/skylark");a?module.exports=f:t.skylarkjs=f}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-ajaxfy-router-all.js.map
