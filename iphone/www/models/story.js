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
			
			storyMessage.header = generateStoryHeader();
			
			storyMessage.message = new Object();
			
			if (bystanderToSet == "bystander"){
				storyMessage.message.bystander = bystanderToSet;
			}		
      		
      		if(harassmentTypesToSet){
      			storyMessage.message.category = harassmentTypesToSet;
      		}
      		
      		storyMessage.message.gps = new Object();
      		storyMessage.message.gps.longitude = new Object();
      		
      		if (longitudeToSet){
      			storyMessage.message.gps.longitude.degrees = longitudeToSet;
      		}      		   
      		
      		storyMessage.message.gps.latitude = new Object();
      		   		
      		if (latitudeToSet){
      			storyMessage.message.gps.latitude.degrees = latitudeToSet;
      		}
      		      		
      		if (manualLocationToSet){
      			storyMessage.message.stringlocation = manualLocationToSet;
      		}
    
    		if (textToSet){
	      		storyMessage.message.description = textToSet;
    		}
    		
      		if (photoToSet){
      			storyMessage.message.images = photoToSet;
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
		

		
		function generateStoryHeader(){
			var storyHeader = new Object();
			
			storyHeader.header = new Object();
			
			storyHeader.header.username = self.userInformation.userName;
			storyHeader.header.password = self.userInformation.password;
			
			storyHeader.header.source = new Object();
			
			storyHeader.header.source.iphone_unique_id = device.uuid;
			storyHeader.header.source.iphone_model = "";
			storyHeader.header.source.iphone_system_name = device.platform;
			storyHeader.header.source.iphone_system_version = device.version;
			storyHeader.header.source.iphone_device_name = device.name;
			
			return storyHeader.header;
			
		};
	
		self.read();
	
	},//end Story Information
};