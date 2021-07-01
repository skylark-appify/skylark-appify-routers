define([
    "skylark-langx/langx",
    "./routers",
    "./route"
],function(langx,routers,Route){
    var createEvent = routers.createEvent;

    function Router() {
        var _curCtx,
            _prevCtx,
            _baseUrl,
            _homePath,
            _routes = {},
            _cache = {},
            _hub = new langx.Evented();

        var router = this;


        function current() {
            return _curCtx;
        }

        // refresh the current route
        function dispatch(ctx) {

            if (_curCtx) {
                var ret = _curCtx.route.exit({
                    path: _curCtx.path,
                    params: _curCtx.params
                }, true);
                if (!ret) {
                    return;
                }
            }

            _prevCtx = _curCtx;
            _curCtx = ctx;
            if (!_curCtx.route) {
                var m = map(_curCtx.path);
                _curCtx.route = m.route;
                _curCtx.params = m.params;
            }

            var r = _curCtx.route.enter({
                force: _curCtx.force,
                path: _curCtx.path,
                params: _curCtx.params
            },true);

            langx.Deferred.when(r).then(function() {
                _hub.trigger(createEvent("routing", {
                    current: _curCtx,
                    previous: _prevCtx
                }));

                _curCtx.route.enter({
                    path: _curCtx.path,
                    params: _curCtx.params
                },false);

                if (_prevCtx) {
                    _prevCtx.route.exit({
                        path: _prevCtx.path,
                        params: _prevCtx.params
                    }, false);
                }

                _hub.trigger(createEvent("routed", {
                    current: _curCtx,
                    previous: _prevCtx
                }));
            });
        }

        function go(path, force) {
            if (!force && _curCtx && _curCtx.path == path) {
                return false;
            }
            var ctx = map(path);
            if (ctx) {
                ctx.path = path;

                if (router.useHistoryApi) {
                    var state = {
                        force: force,
                        path: path
                    }

                    window.history.pushState(state, document.title, (_baseUrl + path).replace("//", "/"));
                    window.dispatchEvent(createEvent("popstate", {
                        state: state
                    }));
                } else if (router.useHashbang) {
                    var newHash = "#!" + path;
                    if (window.location.hash !== newHash) {
                        window.location.hash = newHash;
                    } else {
                        dispatch(ctx);
                    };
                } else {
                    dispatch(ctx);
                }
            }
            return true;
        }

        function map(path, noCache) {
            var finded = false;
            if (!noCache) {
                finded = _cache[path];
                if (finded) {
                    return finded;
                }
            }
            langx.each(_routes, function(name, route) {
                var ret = route.match(path);
                if (ret) {
                    finded = {
                        route: route,
                        params: ret
                    }
                    return false;
                }
                return true;
            });
            if (finded && !noCache) {
                _cache[path] = finded;
            }
            return finded;
        }

        function path(routeName, params) {
            var route = _routes[routeName],
                path;
            if (route) {
                path = route.path(params);
            }
            return path;
        }

        function previous() {
            return _prevCtx;
        }

        function baseUrl(path) {
            if (langx.isDefined(path)) {
                _baseUrl = path;
                return this;
            } else {
                return _baseUrl;
            }
        }

        function hub(){
            return _hub;
        }

        function homePath(path) {
            if (langx.isDefined(path)) {
                _homePath = path;
                return this;
            } else {
                return _homePath;
            }
        }

        function route(name, setting) {
            if (langx.isDefined(setting)) {
                var settings = {};
                settings[name] = setting;
                routes(settings);
                return this;
            } else {
                return _routes[name];
            }
        }

        function routes(settings) {
            if (!langx.isDefined(settings)) {
                return langx.mixin({}, _routes);
            } else {
                for (var name in settings) {
                    _routes[name] = new router.Route(name, settings[name]);
                }
            }
        }

        //starts routing urls
        function start() {
            if (router.useHashbang == null && router.useHistoryApi == null) {
                if (window.location.host  && window.history.pushState) {
                    //web access
                    router.useHistoryApi = true;
                } else {
                    // local access
                    router.useHashbang = true;
                }
            }

            var initPath = "";

            if (router.useHistoryApi) {
                initPath = window.location.pathname;
                if (_baseUrl === undefined) {
                    _baseUrl = initPath.replace(/\/$/, "");
                }
                initPath = initPath.replace(_baseUrl, "") || _homePath || "/";
            } else if (router.useHashbang) {
                initPath = window.location.hash.replace("#!", "") || _homePath || "/";
            } else {
                initPath = "/";
            }

            if (!initPath.startsWith("/")) {
                initPath = "/" + initPath;
            }
            /*
            eventer.on(document.body, "click", "a[href]", function(e) {
                var elm = e.currentTarget,
                    url = elm.getAttribute("href");

                if (url == "#") {
                    return;
                }
                if (url && langx.isSameOrigin(elm.href)) {
                    if (url.indexOf(_baseUrl) === 0) {
                        url = url.substr(_baseUrl.length);
                        eventer.stop(e);
                        url = url.replace('#!', '');
                        go(url);
                    }
                }
            });
            */
            if (router.useHistoryApi) {
                window.addEventListener("popstate", function(e) {
                    if(e.state) dispatch(e.state);
                    e.preventDefault();
                });
            } else if (router.useHashbang) {
                window.addEventListener("hashchange", function(e) {
                    dispatch({
                        path: window.location.hash.replace(/^#!/, "")
                    });
                    e.preventDefault();
                });
            }

            go(initPath);
        }

        langx.mixin(router, {
            "Route": Route,

            // Current path being processed
            "current": current,

            // Changes the current path
            "go": go,

            "map": map,

            "hub": hub,

            "off": function() {
                _hub.off.apply(_hub, arguments);
            },

            "on": function() {
                _hub.on.apply(_hub, arguments);
            },

            "one": function() {
                _hub.one.apply(_hub, arguments);
            },

            // Returns the path of the named route
            "path": path,

            "previous": previous,

            "baseUrl": baseUrl,

            "homePath": homePath,

            "route": route,

            "routes": routes,

            //starts routing urls
            "start": start,

            "trigger": function(e) {
                _hub.trigger(e);
                return this;
            },

            "useHistoryApi": null,
            "useHashbang": null
        });

    }

    return routers.Router = Router;
});
