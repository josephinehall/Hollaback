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
			//window.localStorage
		};
				
		
		self.submitStory = function(bystanderToSet, harassmentTypesToSet, manualLocationToSet, latitudeToSet, longitudeToSet, photoURI, textToSet, callback){		
			
			
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
    		
    		if (photoURI) {
    			var options = new FileUploadOptions();
	            options.fileKey = "hollabackposting";
	            options.fileName = photoURI.substr(photoURI.lastIndexOf('/')+1);
	            options.mimeType = "image/jpeg";
	 
	            options.params = storyMessage;
	            options.chunkedMode = false;
	 
	            var ft = new FileTransfer();
	            ft.upload(photoURI, urlConfig.getStoryUrl(), 
	            	function(r) {
	            		callback(r.response);
	            	},
	            	function(error) {
	            		navigator.notification.alert(
    							"Sorry, we couldn't submit your story. Please try again later",  // message
    							function(){},        // callback
   								"Oops",            // title
    							"OK"                  // buttonName
						);	
	            		callback("Error");
	            	},
	            	options);    		
    		}
    		else{
    		
				$.ajax({
				         type: 'POST',
				         url: urlConfig.getStoryUrl(),
				         data: storyMessage,
				         contentType: false,
	       				 cache: false,
				         success: function(response) {	
							 if(response == 'OK') {
							  	callback("Story Submission Successful");								  	
							 }
							 else {
							 	navigator.notification.alert(
									"Sorry, we couldn't submit your story. Please try again later",  // message
									function(){},        // callback
										"Oops",            // title
									"OK"                  // buttonName
								);	
							  	callback("Error");
							 }						         		
		         		 },
				         error: function(xhr, status, error) {				         	
				         	navigator.notification.alert(
    							"Sorry, we couldn't submit your story. Please try again later",  // message
    							function(){},        // callback
   								"Oops",            // title
    							"OK"                  // buttonName
							);	

				         	callback("Error");
				         }
				});
			}

		};
		

    		
    		//JQUERY AJAX FORMDATA OBJECT
    		
    		/*
			var data = new FormData();
    		
    		data.append("username", self.userInformation.userName);
    		data.append("password", self.userInformation.password);
    		data.append("iphone_unique_id", "");
    		data.append("iphone_model", "");
    		data.append("iphone_system_name", "");
    		data.append("iphone_system_version", "");
    		data.append("iphone_device_name", "");
    		
    		if (bystanderToSet){
    			data.append("bystander", bystanderToSet.value);	
			}		      		
      		if(harassmentTypesToSet){
      		    var harassmentstring = harassmentTypesToSet.join(", ");
      			data.append("category", harassmentstring);
      		}     		      		
      		if (longitudeToSet){
      			data.append("longitude", longitudeToSet);
      		}      		         		   		
      		if (latitudeToSet){
      			data.append("latitude", latitudeToSet);
      		}     		      		
      		if (manualLocationToSet){
      			data.append("stringlocation", manualLocationToSet);
      		}    
    		if (textToSet){
	      		data.append("description", textToSet);
    		}

    		
    		
    		if (photoData) {
      			//this would be easier if we could send it as base64
      			var decoded = window.atob(photoData);
      			alert(decoded);
    			data.append("hollabackposting", decoded);
    		}
*/
	
	}//end Story Information
};