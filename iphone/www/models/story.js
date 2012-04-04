var story ={
    
    storyType: function(name, value){
        var self = this;
        self.name = name;
        self.value = value;
    },

	storyInformation: function(configuration, userInformation){
		var self = this;
		var urlConfig = configuration; 
		
		self.userInformation = userInformation;
		self.bystander;
		self.harassmentTypes;
		self.location;
		self.photo;
		self.text;
		

		
		self.getGpsLocation = function(location){
			//phonegap geolocations
		};
		
		self.setLocationText = function(location){
			self.location = location;
			window.localStorage.setItem(locationStorageKey, self.location);
		};
		
		self.clearStory = function (){
			window.localStorage
		};
				
		
		self.submitStory = function(bystanderToSet, harassmentTypesToSet, manualLocationToSet, latitudeToSet, longitudeToSet, photoToSet, textToSet, callback){		
			
			var storyMessage = new Object();	
			
			storyMessage.username = self.userInformation.userName;
			storyMessage.password = self.userInformation.password;
			
			storyMessage.iphone_unique_id = "";//device.uuid;
			storyMessage.iphone_model = "";
			storyMessage.iphone_system_name = "";//device.platform;
			storyMessage.iphone_system_version = "";//device.version;
			storyMessage.iphone_device_name = "";//device.name;
			
			if (bystanderToSet){
				storyMessage.bystander = bystanderToSet.value;
			}		
      		
      		if(harassmentTypesToSet){
      		    var harassmentstring = harassmentTypesToSet.join(", ");
      			storyMessage.category = harassmentstring;
      		}
      		      		
      		if (longitudeToSet){
      			storyMessage.longitude = longitudeToSet;
      		}      		   
      		   		
      		if (latitudeToSet){
      			storyMessage.latitude = latitudeToSet;
      		}
      		      		
      		if (manualLocationToSet){
      			storyMessage.stringlocation = manualLocationToSet;
      		}
    
    		if (textToSet){
	      		storyMessage.description = textToSet;
    		}
       		if (photoToSet){
       			alert(photoToSet);
      			storyMessage.images = photoToSet;
      		}
      		
    
      	
      		
			$.ajax({
			         type: 'POST',
			         url: urlConfig.getStoryUrl(),
			         data: jQuery.param(storyMessage),
			         processData: false,
       				 contentType: "text",
			         success: function(response){	
								 if(response == 'OK')
								 {
								  	callback("Story Submission Successful");								  	
								 }
								 else
								 {
								  	callback(response);
								 }						         		
			         		},
			         error: function(xhr, status, error){callback("There was an error");},
			         });
		};
		

	
	}//end Story Information
};