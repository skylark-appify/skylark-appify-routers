# skylark-ajaxify-router
An elaborate front-end routing framework.

## Features

- Support Hashbang, HTML5 pushstate, internal implementation three routing mode, the routing mode can be set by attributes or automatically by  the framework, without affecting the implementation of the application.
- Supports global events to implement hooker functions.
- Lightweight, even if allinone is only 13k(minified),5k(gzip)

## Dependences
| Project | Status | Description |
|---------|--------|-------------|
| [skylark-langx](https://github.com/skylarklangx/skylark-langx)   | v0.9.1 | Javascript language extension library |

##  Different builds
|  | build | Description |
|---------|--------|-------------|
| full | skylark-ajaxify-router-all.js | included skylark-langx |
| only router | skylark-ajaxify-router.js | not included skylark-langx |
| full （development） | uncompressed/skylark-ajaxify-router-all.js | included skylark-langx |
| only router （development）| uncompressed/skylark-ajaxify-router.js | not included skylark-langx |


## Installation
There are multiple ways to install the skylark-ajaxify-router library. 
- cdn  
http://registry.skylarkjs.org/packages/skylark-ajaxify-router/v0.9.2/skylark-ajaxify-router-all.js    or  
http://registry.skylarkjs.org/packages/skylark-ajaxify-router/v0.9.2/uncompressed/skylark-ajaxify-router-all.js 
- npm  
npm install skylark-ajaxify-router --save
- bower  
bower install skylark-ajaxify-router

## Usage

Refence router module object.
----------------------------

- Using the skylark-ajaxify-router library for a AMD module.  
```js
require({
  'paths': {
     'skylark-langx': 'http://registry.skylarkjs.org/packages/skylark-langx/v0.9.1/skylark-langx',
     'skylark-ajaxify-router': 'http://registry.skylarkjs.org/packages/skylark-ajaxify-router/v0.9.2/skylark-ajaxify-router' 
  }
}, ['skylark-ajaxify-router'], function(srouter) {
  // srouter.route(path,setting);
});
```

- Using the skylark-ajaxify-router library for a global object named skylarkjs.  
```js
<script type="text/javascript" src="http://registry.skylarkjs.org/packages/skylark-ajaxify-router/v0.9.2/skylark-ajaxify-router-all.js"></script>
<script>
  // skylarkjs.router.route(path,setting);
</script>
```

- Using the skylark-ajaxify-router library for a AMD package.  
```js
require({
  'packages': [
    { 'name': 'skylark-langx', 'location': 'http://registry.skylarkjs.org/packages/skylark-langx/v0.9.1/skylark-langx/' },
    { 'name': 'skylark-ajaxify-router', 'location': 'http://registry.skylarkjs.org/packages/skylark-ajaxify-router/v0.9.2/skylark-ajaxify-router/' }
  ]
}, ['skylark-ajaxify-router/router'], function(srouter) {
  // srouter.route(path,setting);
});
```
Add route defines. 
-------------------
```js
var homeRoute = router.route('home', { 
    pathto : '/', 
    entered (){ 
        $("#yield").html($('#home').html()); 
    }      
}); 
             
var pageRoute = router.route('page', { 
    pathto : '/page/:id', 
    entered(e){ 
        $("#yield").html($('#page' + e.params.id).html()); 
    } 
}); 
```

add callback function for route.
--------------------------------

When the route is changed, the following event are triggered in order.

1. exiting (for previous route) 
2. entering (for new route) 
3. entered (for new route) 
4. exited (for previous route) 

In adding route at the same time, you can add the same name of the callback function, after the route is added,you can also add callback function for these events.

```js
homeRoute.on("exited",function(){ 
   console.log('good bye Home'); 
}); 

pageRoute.on("exited",function(){ 
    var field = $('[name="field"]').val(); 
    if (field) { 
        return confirm('Are you sure you want to quit this page ?'); 
    }            
}); 
```

Start router.
--------------
```js
srouter.start(); 
```

## Hooker

The router supports global events and you can implement hooker functions by listening to global events. 
Built-in global events have routing before current route change and routed after current route change.

```js
router.on("routed",function(e){ 
    var links = $("a.active"); 

    links.removeClass("active"); 

    links = $("a[href=\"" + e.current.path + "\"]"); 
    links.addClass("active"); 
    links[0].focus(); 
}); 
```
## Select engine

The router support the following three routing engines.

1. html5 history API egine 
2. hash egine 
3. internal management engine 

The useHistoryApi attribute and useHashbang attribute of router object are used to control which engine is used：

- useHistoryApi === null && useHashbang===null （default）  
The router automatically determine which engine to use, if running on the web, he html5 history API egine is used; if running in the local file system, The internal egine is used.
- useHistoryApi === true  
The html5 history API egine is used.
- useHistoryApi !== true && useHashbang===true  
The hash egine is used.
- useHistoryApi === false && useHashbang===false  
The internal management engine is used.

## API Document
- baseUrl()
- current()
- go()
- map()
- off()
- on()
- one()
- path()
- previous()
- Route
  * Route.prototype.match
  * Route.prototype.path
- route()
- routes()
- start()
- trigger()

## Examples
Please access the following site for the execution of each example program under the "/examples" directory.

- http://examples.skylarkjs.org/skylark-ajaxify-router/


## Building skylark-ajaxify-router

- Ensure that Node.js is installed.
- Run npm gulp -g to ensure gulp is installed.
- Run npm install to ensure the required dependencies are installed.
- change current directory to build/, and run gulp. The builds will be placed in the dist/ directory.

## Integration
This library is completely built-in on [skylark-spa](https://github.com/skylark-ajaxify/skylark-ajaxify-spa), and when you use [skylark-ajaxify-spa](https://github.com/skylark-ajaxify/skylark-ajaxify-spa) or [skylark.js](https://github.com/skylarkjs/skylark) to develop an application, you do not have to use this library's API directly

## License

Released under the [MIT](http://opensource.org/licenses/MIT)
