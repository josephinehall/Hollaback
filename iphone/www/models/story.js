var story ={
    
    storyType: function(name, value){
        var self = this;
        self.name = name;
        self.value = value;
    },

	storyInformation: function(configuration, userInformation){
		var self = this;
		var urlConfig = configuration; 
		var bystanderStorageKey = "bystanderStorageKey";
		var harassmentTypesStorageKey = "harassmentTypesStorageKey";
		var locationStorageKey = "locationStorageKey";
		var photoStorageKey = "photoStorageKey";
		var textStorageKey = "textStorageKey";
		
		self.userInformation = userInformation;
		self.bystander;
		self.harassmentTypes;
		self.location;
		self.photo;
		self.text;
		
		self.read = function(){
			self.userInformation.read();
			self.bystander = window.localStorage.getItem(bystanderStorageKey);
			self.harassmentTypes = window.localStorage.getItem(harassmentTypesStorageKey);
			self.location = window.localStorage.getItem(locationStorageKey);
			self.photo = window.localStorage.getItem(photoStorageKey);
			self.text = window.localStorage.getItem(textStorageKey);
		}; 
		
		self.save = function(){
            window.localStorage.setItem(bystanderStorageKey, self.bystander);
            window.localStorage.setItem(harassmentTypesStorageKey, self.harassmentTypes);
            window.localStorage.setItem(locationStorageKey, self.location);
            window.localStorage.setItem(photoStorageKey, self.photo);
            window.localStorage.setItem(textStorageKey, self.text);              
		};
		
		self.getGpsLocation = function(location){
			//phonegap geolocations
		};
		
		self.setLocationText = function(location){
			self.location = location;
			window.localStorage.setItem(locationStorageKey, self.location);
		};
		
		self.clearStory = function (){
			window.localStorage.clear();
		};
				
		
		self.submitStory = function(bystanderToSet, harassmentTypesToSet, manualLocationToSet, latitudeToSet, longitudeToSet, photoToSet, textToSet, callback){		
			
			var storyMessage = new Object();	
			
			storyMessage.username = self.userInformation.userName;
			storyMessage.password = self.userInformation.password;
			
			storyMessage.iphone_unique_id = device.uuid;
			storyMessage.iphone_model = "";
			storyMessage.iphone_system_name = device.platform;
			storyMessage.iphone_system_version = device.version;
			storyMessage.iphone_device_name = device.name;
			
			if (bystanderToSet){
				storyMessage.bystander = bystanderToSet.value;
			}		
      		
      		if(harassmentTypesToSet){
      			storyMessage.category = harassmentTypesToSet;
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
		
	
		self.read();
	
	}//end Story Information
};