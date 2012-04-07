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
    	var currentLocationLabel ="Current Location";
    	self.usersLocation = usersLocation; 
    	self.hasLocation =  ko.observable(true);	  
        
        self.selectedHollabackLocation = ko.observable();
        self.selectedHollabackLocation.subscribe(function(newValue){ 	
        	if(newValue.name == currentLocationLabel){
        		showCurrentLocation(newValue)
            }
            else
            {                               
        	    loadMap(newValue.gpsCoordinates);  
            }
        });
        
        self.resetMap= function(){
        	self.hasLocation = ko.observable(self.usersLocation.hasLocation());	
        };
 
    	self.availableLocations = ko.observableArray();	
 
    	hollabackChapters.getAllChapters(function(chapters){		
    		self.availableLocations(chapters.slice(0));	
    		self.availableLocations.unshift(new hollabackLocation.hollabackLocation("","","gps",currentLocationLabel));
    	});		
    
       
       	function showCurrentLocation(currentLocation){
       		self.usersLocation.bestAvailableLocation(function(gps){
                                                        if(gps){
                                                     console.log("loading map to current location: " + gps.latitude+"," +gps.longitude);
                                                            loadMap(gps);
                                                        }else{
                                                            $("#map_canvas").hide('slow');
                                                        }
                                                     });
        };
	    	
    	function loadMap(gpsCoordinates){
            $("#map_canvas").show('slow');
    		var myLatlng = new google.maps.LatLng(gpsCoordinates.latitude,gpsCoordinates.longitude);					
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
    	};
    	
    	    	

    },
        
}