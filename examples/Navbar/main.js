require.config({
  baseUrl: "./"
  ,paths : {
     "skylark-langx-all" : "../../node_modules/skylark-langx/dist/uncompressed/skylark-langx-all" ,
     "skylark-domx-all" : "../../node_modules/skylark-domx/dist/uncompressed//skylark-domx-all" ,
     "skylark-appify-routers" : "../../dist/uncompressed/skylark-appify-routers" ,
  }
});

require(["skylark-domx-all"],function(){
    require(["skylark-domx"],function(domx){

        require(["skylark-appify-routers/Router"], function (Router) {
            var router = new Router();
            var $ = domx.query;
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


    });

});
 
