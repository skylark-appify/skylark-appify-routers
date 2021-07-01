define([
	"skylark-langx/langx",
	"./routers"
],function(langx,routers){
    var createEvent = routers.createEvent;
    
    var Route = langx.Evented.inherit({
        klassName: "Route",
        init: function(name, setting) {
            setting = langx.mixin({}, setting);
            var pathto = setting.pathto || "",
                pattern = pathto,
                paramNames = pattern.match(/\:([a-zA-Z0-9_]+)/g);
            if (paramNames !== null) {
                paramNames = paramNames.map(function(paramName) {
                    return paramName.substring(1);
                });
                pattern = pattern.replace(/\:([a-zA-Z0-9_]+)/g, '(.*?)');
            } else {
                paramNames = [];
            }
            if (pattern === "*") {
                pattern = "(.*)";
            } else {
                pattern = pattern.replace("/", "\\/");
            }

            this._setting = setting;
            this.name = name;
            this.pathto = pathto;
            this.paramNames = paramNames;
            this.params = pattern;
            this.regex = new RegExp("^" + pattern + "$", "");

            var self = this;
            ["entering", "entered", "exiting", "exited"].forEach(function(eventName) {
                if (langx.isFunction(setting[eventName])) {
                    self.on(eventName, setting[eventName]);
                }
            });
        },

        enter: function(ctx,query) {
            if (query) {
                var r = this._entering(ctx),
                    self = this;

                return langx.Deferred.when(r).then(function(){
                    var e = createEvent("entering", {
                        route: self,
                        result: true
                    });

                    self.trigger(e);

                    return e.result;
                });
            } else {
                this._entered(ctx);

                this.trigger(createEvent("entered", langx.safeMixin({
                    route: this
                }, ctx)));
                return this;
            }
        },

        exit: function(ctx, query) {
            if (query) {
                var ok = this._exiting(ctx);
                if (!ok) {
                    return false;
                }

                var e = createEvent("exiting", {
                    route: this,
                    result: true
                });

                this.trigger(e);

                return e.result;
            } else {
                this._exited(ctx);
                this.trigger(createEvent("exited", langx.safeMixin({
                    route: this
                }, ctx)));

                return this;
            }
        },

        match: function(path) {
            var names = this.paramNames,
                x = path.indexOf('?'),
                path = ~x ? path.slice(0, x) : decodeURIComponent(path),
                m = this.regex.exec(path);

            if (!m) {
                return false
            };

            var params = {};
            for (var i = 1, len = m.length; i < len; ++i) {
                var name = names[i - 1],
                    val = decodeURIComponent(m[i]);
                params[name] = val;
            }

            return params;
        },

        path: function(params) {
            var path = this.pathto;
            if (params) {
                path = path.replace(/:([a-zA-Z0-9_]+)/g, function(match, paramName) {
                    return params[paramName];
                });
            }
            return path;
        },

        _entering: function(ctx) {
            return true;
        },
        _entered: function(ctx) {
            return true;
        },
        _exiting: function(ctx) {
            return true;
        },
        _exited: function(ctx) {
            return true;
        }
    });

	return routers.Route = Route;	
})