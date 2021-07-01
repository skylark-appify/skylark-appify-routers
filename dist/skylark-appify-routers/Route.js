/**
 * skylark-appify-routers - An Elegant HTML5 Routing Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.6
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./routers"],function(e,t){var n=t.createEvent,r=e.Evented.inherit({klassName:"Route",init:function(t,n){var r=(n=e.mixin({},n)).pathto||"",i=r,u=i.match(/\:([a-zA-Z0-9_]+)/g);null!==u?(u=u.map(function(e){return e.substring(1)}),i=i.replace(/\:([a-zA-Z0-9_]+)/g,"(.*?)")):u=[],i="*"===i?"(.*)":i.replace("/","\\/"),this._setting=n,this.name=t,this.pathto=r,this.paramNames=u,this.params=i,this.regex=new RegExp("^"+i+"$","");var a=this;["entering","entered","exiting","exited"].forEach(function(t){e.isFunction(n[t])&&a.on(t,n[t])})},enter:function(t,r){if(r){var i=this._entering(t),u=this;return e.Deferred.when(i).then(function(){var e=n("entering",{route:u,result:!0});return u.trigger(e),e.result})}return this._entered(t),this.trigger(n("entered",e.safeMixin({route:this},t))),this},exit:function(t,r){if(r){if(!this._exiting(t))return!1;var i=n("exiting",{route:this,result:!0});return this.trigger(i),i.result}return this._exited(t),this.trigger(n("exited",e.safeMixin({route:this},t))),this},match:function(e){var t=this.paramNames,n=e.indexOf("?"),r=(e=~n?e.slice(0,n):decodeURIComponent(e),this.regex.exec(e));if(!r)return!1;for(var i={},u=1,a=r.length;u<a;++u){var s=t[u-1],h=decodeURIComponent(r[u]);i[s]=h}return i},path:function(e){var t=this.pathto;return e&&(t=t.replace(/:([a-zA-Z0-9_]+)/g,function(t,n){return e[n]})),t},_entering:function(e){return!0},_entered:function(e){return!0},_exiting:function(e){return!0},_exited:function(e){return!0}});return t.Route=r});
//# sourceMappingURL=sourcemaps/route.js.map
