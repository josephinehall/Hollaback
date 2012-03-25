var hollabackViewModels = {
	
    menuPageViewModel: function(userInformation) {   
    	var self = this; 	
    	self.userInformation = userInformation;
    	self.loggedInUserName = ko.observable(userInformation.userName);
        
        self.signout = function(){
           self.userInformation.removeCredentials();
		   $.mobile.changePage("#indexPage");   
        };
        
        self.reset = function(){
        	self.loggedInUserName(userInformation.userName)
        };
    },
    
   	mapPageViewModel: function(usersLocation,hollabackChapters){  	
    	var self = this;
    	self.usersLocation = usersLocation; 
    	self.hasLocation = ko.computed(function(){return self.usersLocation.hasLocation();},this);	
        self.isLoadingMap = ko.observable(false);      
       	
        self.selectedHollabackLocation = ko.observable();
        self.selectedHollabackLocation.subscribe(function(newValue){
        	 console.log("User selected location" + newValue);   	
        	 self.usersLocation.setHollabackLocation(newValue);
        	 loadMap(42.74701217318067,-77.783203125); //todo this needs to pass through the hollaback locations   
        	 hasLocation(self.usersLocation.hasLocation());   	
        });
 
    	self.availableLocations = ko.observableArray();	
    	
    	if(!self.hasLocation())
    	{
    		hollabackChapters.getAllChapters(function(chapters){
    				
    				for(key in chapters) {
						self.availableLocations.push(new user.location(key));
					}
    				
    		});
    		
    	}
    	else
    	{
    		var gps = self.usersLocation.bestAvailableLocation();
    		loadMap(gps.lat,gps.long);
    	}
    	
    	function loadMap(lat,long){
    	 	self.isLoadingMap(true);
    		var myLatlng = new google.maps.LatLng(lat,long);					
			var mapElement = document.getElementById('map_canvas');			
			var map = new google.maps.Map(mapElement, {
				center: myLatlng, 
				zoom: 13,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				key: 'ABQIAAAAwKDTDkhucqHv_wpXKXZrxSM3jwuDZFWueHXkEvbQnmOGW1gUhSHFE07YUT0JMwuC9RjSS4Z9fyATQ',
				sensor: true
				
			});
						
			 var tableid = 426994;
			 var layer = new google.maps.FusionTablesLayer(tableid);
			 layer.setMap(map);						 
        	 self.isLoadingMap(false);
    	};
    	
    	    	

    },
        
}