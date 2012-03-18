var story{

	storyInformation: function(configuration, userInformation){
		var self this;
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
				
		
		self.submitStory = function(bystanderToSet, harassmentTypesToSet, locationToSet, photoToSet, textToSet, callback){		
			
			var storyMessage = new Object();			
      		storyMessage.bystander = bystanderToSet;
      		storyMessage.harassmentTypes = harassmenTypesToSet;
      		storyMessage.location = locationToSet;
      		storyMessage.photo = photoToSet;
      		storyMessage.text = textToSet;
      		
      		var hollaback = new Object();
      		hollaback.header = generateStoryHeader();
      		hollaback.message = storyMessage;
      		
			$.ajax({
			         type: 'POST',
			         url: urlConfig.getStoryUrl(),
			         data: jQuery.param(hollaback),
			         processData: false,
       				 contentType: false,
			         success: function(response){	
								 if(response == 'OK')
								 {
								  	showConfirmation();
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
		
		function showConfirmation(){
		//redirect to the confrimation page?
		//dispose of the message object if we need to?
		};
		
		function generateStoryHeader(){
			var storyHeader = new Object();
			
			storyHeader.username = self.userInformation.userName;
			storyHeader.password = self.userInformation.password;
			
		};
	
		self.read();
	
	}//end Story Information
};