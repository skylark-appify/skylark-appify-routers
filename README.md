# skylark-router
An Elaborate HTML5 Routing Framework.

## Installation
There are multiple ways to install the skylark-uitls library. 
- npm  
npm install skylark-router --save
- bower  
bower install skylark-router
- cdn  
http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-router.js    or  
http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/uncompressed/skylark-router.js 

## Usage

Refence router module object.
----------------------------

- Using the skylark-router library for a AMD module.  
```js
require({
  'paths': {
     'skylark-utils': 'http://registry.skylarkjs.org/packages/skylark-utils/v0.9.0/skylark-utils',
     'skylark-router': 'http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-router' 
  }
}, ['skylark-router'], function(srouter) {
  // srouter.route(path,setting);
});
```

- Using the skylark-router library for a global object named skylark.  
```js
<script type="text/javascript" src="http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-router.js"></script>
<script>
  // skylark.router.route(path,setting);
</script>
```

- Using the skylark-router library for a AMD package.  
```js
require({
  'packages': [
    { 'name': 'skylark-router', 'location': 'http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-router/' },
    { 'name': 'skylark-router', 'location': 'http://registry.skylarkjs.org/packages/skylark-router/v0.9.0/skylark-router/' }
  ]
}, ['skylark-router/mover'], function(srouter) {
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
skyalrk.js application framwork contains the above modules, so the module API documentation can refer to sklark.js's guilde

- http://www.skylarkjs.org/api

## Examples
Please access the following site for the execution of each example program under the "/examples" directory.

- http://www.skylarkjs.org/examples
- http://examples.skylarkjs.org/skylark-router/

## License

Released under the [MIT](http://opensource.org/licenses/MIT)
