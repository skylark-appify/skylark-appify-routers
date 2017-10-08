require.config({
  baseUrl: "./"
  ,paths : {
     "skylark-langx" : "http://registry.skylarkjs.org/packages/skylark-langx/v0.9.0/uncompressed/skylark-langx" ,
     "skylark-utils" : "http://registry.skylarkjs.org/packages/skylark-utils/v0.9.2/uncompressed/skylark-utils" ,
     "skylark-router" : "../../dist/uncompressed/skylark-router" ,
  }
});
 
require(["skylark-utils","skylark-router/router"], function (skylark,router) {
    var $ = skylark.query;
    // Declare root route
    router.route('home', {
    	pathto : '/',
        entered (){
            $("#yield").html($('#home').html());
        },
    	exited() {
            console.log('good bye Home');
    	}        
    });
    		
    router.route('page', {
    	pathto : '/page/:id',
        entered(e){
    		$("#yield").html($('#page' + e.params.id).html());
    	},
    	exiting(e) {
            var field = $('[name="field"]').val();
            if (field) {
                var ret = confirm('Are you sure you want to quit this chapter ?');
                if (!ret) {
                    e.result = false;
                }
            }  
        } 
    });
  

    //The following is to use the internal routine engine.
    if (window.seHistoryApiEngine) {
        router.useHistoryApi = true;
    } else if (window.useHashbangEngine) {
        router.useHashbang = true;
    } else if (window.useInternalEngine) {
        router.useHistoryApi = false;
        router.useHashbang = false
    } else {
        // default : useHistoryApiEngine for web or useHashbang for local html
    }

    router.on("routed",function(e){
            var links = $("a.active");

            links.removeClass("active");

            links = $("a[href*=\"'" + e.current.path + "'\"]");
            links.addClass("active");
            links[0].focus();
    });

    window.go = router.go;
    
    router.start();
    
});