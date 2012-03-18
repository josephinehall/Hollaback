var story{

	storyInformation: function(configuration){
		var self this;
		var urlConfig = configuration; 
		var bystanderStorageKey = "bystanderStorageKey";
		var harassmentTypesStorageKey = "harassmentTypesStorageKey";
		var locationStorageKey = "locationStorageKey";
		var photoStorageKey = "photoStorageKey";
		var textStorageKey = "textStorageKey";
		
		self.bystander;
		self.harassmentTypes;
		self.location;
		self.photo;
		self.text;
		
		self.read: function(){
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
			//call the phonegaps here to get the location from the mobile device	
		};
		
		self.setLocationText = function(location){
			self.location = location;
			window.localStorage.setItem(locationStorageKey, self.location);
		};
		
		
		
		self.submitStory = function(bystanderToSet, harassmentTypesToSet, locationToSet, photoToSet, textToSet, callback){
		//submit story stuff here.
		
			var storyRequest = "";
			
			var submitStoryUrl = "testbackend.ihollaback.com/incoming/";
			$.ajax({
			         type: 'POST',
			         url: urlConfig.getStoryUrl(),
			         data:storyrequest,
			         dataType: 'xml',
			         contentType:urlConfig.getStoryContentType(),
			         success: function(response){			         
							         		 var status = $(response).find('status').text();
											 var message = $(response).find('msg').text();
											 if(status == 'error')
											 {
											  	callback(message);
											 }
											 else
											 {
											  	displayConfirmation();
											  	callback("Story Submission Successful");
											 }						         		
			         		},
			        error: function(xhr, status, error){callback("There was an error");},
			        });
		};
	
	}
};