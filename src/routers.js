define([
	"skylark-langx/skylark",
	"skylark-langx/langx"	
],function(skylark,langx){

	return skylark.attach("appify.routers",{
        createEvent : function (type,props) {
            var e = new CustomEvent(type,props);
            return langx.safeMixin(e, props);
        }

	});	
});
