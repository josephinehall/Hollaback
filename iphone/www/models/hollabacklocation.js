var hollabackLocation = {


	hollabackChapters: function(urlConfig){
		var self = this;
		self.chapters = [];
		self.urlConfig = urlConfig;
		
		self.getAllChapters = function(callback){		
			if(self.chapters.length == 0){
				$.ajax({
					url: self.urlConfig.getHollabackChaptersUrl(),
					dataType: 'jsonp',
					success: function(data){
						var jsonText = JSON.stringify(data);
						var array = jQuery.parseJSON(jsonText);
						for(key in array) {
							var location = array[key];
							self.chapters.push(new hollabackLocation.hollabackLocation(location.latitude,location.longitude,location.subdomain,location.name));
						}
						callback(self.chapters);
					}
				});
			}else
			{
				callback(self.chapters);
			}
			
		};
		
	},	
	
    gpsCoordinates: function(latitude,longitude){
        var self = this;
		self.latitude = latitude;
		self.longitude = longitude;
        
        self.isAvailable= function(){
            return self.latitude != undefined && self.longitude != undefined;
        }
        
        self.getLatLong = function(){
			return self.latitude + "," + self.longitude;
		};
        
    },
    
	hollabackLocation: function(latitude,longitude,subdomain,name){
		var self = this;
		self.gpsCoordinates = new hollabackLocation.gpsCoordinates(latitude,longitude);
		self.subdomain = subdomain;
		self.name = name;
	},
	
	usersLocation: function(){
		var self = this;
        self.geocoder = new google.maps.Geocoder();
		self.hollabackLocation = new hollabackLocation.hollabackLocation();
		self.gps = new hollabackLocation.gpsLocation();
			
		self.bestAvailableLocation = function(callback){
           
            self.gps.updateLocation(function(gpsLocation){
                                        if(gpsLocation)
                                        {
                                            console.log("Best location is gps" + gpsLocation.getLatLong());
                                            self.gps = gpsLocation;
                                            callback(gpsLocation);
                                        }
                                        else
                                        {                                    
                                            console.log("Best location is local hollaback " + self.hollabackLocation.name);
                                            callback(self.hollabackLocation.gpsCoordinates);
                                        }
                                    });
        };
            
		self.hasLocation = function(){	
			return self.gps.allows || (self.hollabackLocation != undefined);
		};
		
		self.setHollabackLocation = function(localHollaback){
			self.hollabackLocation = localHollaback;
		};
        
        self.getAddressAsLocation = function(address, callback){
            if(address)
            {
                self.geocoder.geocode( { 'address': address}, function(results, status) {
                                 if (status == google.maps.GeocoderStatus.OK) 
                                 {
                                      console.log(results[0].geometry.location);
                                      var lat = results[0].geometry.location.lat();
                                      var long = results[0].geometry.location.lng();
                                      callback(new hollabackLocation.gpsCoordinates(lat,long));
                                 } 
                                 else 
                                 {
                                      alert("Geocode was not successful for the following reason: " + status);
                                      callback();
                                 }
                });
            }
            else
            {
                console.log("Could not resolve manually entered location as it is undefined"); 
                callback();
            }
        };
	},
    
	gpsLocation: function(){
		var self = this;
        self.gpsCoordinates = new hollabackLocation.gpsCoordinates();
		self.lastTimeQueried;
		
		self.updateLocation = function(callback){
			navigator.geolocation.getCurrentPosition(function(position){
                                                        var gps = new hollabackLocation.gpsCoordinates(position.coords.latitude,position.coords.longitude);
                                                        self.lastTimeQueried = new Date();
                                                        self.gpsCoordinates = gps;
                                                        console.log(self.getLatLong());
                                                        navigator.geolocation.stop();
                                                        callback(gps);
                                                     },function(error){
                                                        self.allows = false;
                                                        self.lastTimeQueried = new Date();
                                                        console.log('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
                                                     
                                                        navigator.geolocation.stop();
                                                        callback();
                                                     },options);		
		};
		
		self.getLatLong = function(){
			return self.gpsCoordinates.latitude + "," + self.gpsCoordinates.longitude;
		};

	},
	
	
};