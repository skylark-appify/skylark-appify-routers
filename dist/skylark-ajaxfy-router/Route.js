/**
 * skylark-ajaxfy-router - An Elegant HTML5 Routing Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.6-beta
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./routing"],function(e,t){var n=e.Evented.inherit({klassName:"Route",init:function(t,n){var r=(n=e.mixin({},n)).pathto||"",i=r,a=i.match(/\:([a-zA-Z0-9_]+)/g);null!==a?(a=a.map(function(e){return e.substring(1)}),i=i.replace(/\:([a-zA-Z0-9_]+)/g,"(.*?)")):a=[],i="*"===i?"(.*)":i.replace("/","\\/"),this._setting=n,this.name=t,this.pathto=r,this.paramNames=a,this.params=i,this.regex=new RegExp("^"+i+"$","");var u=this;["entering","entered","exiting","exited"].forEach(function(t){e.isFunction(n[t])&&u.on(t,n[t])})},enter:function(t,n){if(n){var r=this._entering(t),i=this;return e.Deferred.when(r).then(function(){var e=createEvent("entering",{route:i,result:!0});return i.trigger(e),e.result})}return this._entered(t),this.trigger(createEvent("entered",e.safeMixin({route:this},t))),this},exit:function(t,n){if(n){if(!this._exiting(t))return!1;var r=createEvent("exiting",{route:this,result:!0});return this.trigger(r),r.result}return this._exited(t),this.trigger(createEvent("exited",e.safeMixin({route:this},t))),this},match:function(e){var t=this.paramNames,n=e.indexOf("?"),r=(e=~n?e.slice(0,n):decodeURIComponent(e),this.regex.exec(e));if(!r)return!1;for(var i={},a=1,u=r.length;a<u;++a){var s=t[a-1],h=decodeURIComponent(r[a]);i[s]=h}return i},path:function(e){var t=this.pathto;return e&&(t=t.replace(/:([a-zA-Z0-9_]+)/g,function(t,n){return e[n]})),t},_entering:function(e){return!0},_entered:function(e){return!0},_exiting:function(e){return!0},_exited:function(e){return!0}});return t.Route=n});
//# sourceMappingURL=sourcemaps/Route.js.map
