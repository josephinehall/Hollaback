var hollabackLocation = {


	hollabackChapters: function(urlConfig){
		var self = this;
		self.urlConfig = urlConfig;
		
		self.getAllChapters = function(callback){		
			$.ajax({
    		url: self.urlConfig.getHollabackChaptersUrl(),
			dataType: 'jsonp',
			success: function(data){
				var chapters =[];
				var jsonText = JSON.stringify(data);
				var array = jQuery.parseJSON(jsonText);
				for(key in array) {
					chapters.push(new user.location(key));
				}
				callback(chapters);
			}
    		});
		};
		
	},	
	
	usersLocation: function(){
		var self = this;
		self.hollabackLocation;
		self.gps = new hollabackLocation.gpsLocation();
			
		self.bestAvailableLocation = function(){
			self.gps.updateLocation()
			if(self.gps.allows)
			{
				return self.gps;
			}
			else
			{
				return self.hollabackLocation;
			}
		};
			
		self.hasLocation = function(){	
			return self.gps.allows || (self.hollabackLocation != undefined);
		};
		
		self.setHollabackLocation = function(localHollaback){
			self.hollabackLocation = localHollaback;
		};
	},
	
	gpsLocation: function(){
		var self = this;
		self.long;
		self.lat;
		self.allows = false;
		self.lastTimeQueried;
		
		self.updateLocation = function(){		
			navigator.geolocation.getCurrentPosition(onSuccess,onError);		
		};
		
		self.getLatLong = function(){
			return self.lat + "," + self.long;
		}
		
		function onSuccess(position){
			 self.long = position.coords.longitude;		 
			 self.lat = position.coords.latitude;
			 self.allows = true;
			 self.lastTimeQueried = new Date();
			 console.log(self.getLatLong());
		};
		
		function onError(error){
			 self.allows = false;
			 self.lastTimeQueried = new Date();
			 console.log('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
		};
		
		self.updateLocation();
		
	},
	
	
};