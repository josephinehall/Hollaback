var shareViewModels = {

	shareStoryViewModel: function(storyInformation,usersLocation){
		var self, photoURI, storyMaxCharacters;
		self = this;  
		photoURI;     
        storyMaxCharacters = 300;
   		
   		self.storyInformation = storyInformation;
        self.usersLocation = usersLocation;
        self.storyType = ko.observable();
        self.storyTypes = ko.observableArray([new story.storyType("I saw this",1),new story.storyType("I experienced this ",0)]);     
        self.harassmentTypes = ko.observableArray();        
        self.useGPS = ko.observable(); 
        self.enableGpsSlider = ko.observable(true);
        self.getLocation = function(){
            self.usersLocation.bestAvailableLocation(function(gpsResult){
                                     
                                     if(gpsResult.isAvailable())
                                     {
                                        self.gpsAddress(gpsResult);
                                        self.gpsText(gpsResult.getLatLong());
                                    
                                     }
                                     else
                                     {
                                        console.log("Could not get current location");      
                                        $.mobile.changePage('#locationDialog', {transition: 'slidedown', role: 'dialog'});  
                                     }                                                     
            });

        
        };

        
        self.showLocationType = function(type) {
       		return type === self.useGPS();   
    	};

        self.gpsAddress = ko.observable();
        self.gpsText = ko.observable();
        self.addressIsValid = ko.observable();       
		self.manualAddress = ko.observable("");
        
        self.geocode = function(){
            self.closeDialog();
            self.gpsAddress("");
            self.usersLocation.getAddressAsLocation(self.manualAddress(),function(gpsResult){
                                    if(gpsResult)
                                    {
                                        self.gpsAddress(gpsResult);  
                                        self.gpsText(gpsResult.getLatLong());              
                                    }
                                    else
                                    {                                              
                                        self.gpsText("Could not find location");   
                                    }
                                                    
                                });
        };
        
        self.closeDialog = function(){            
            $("#locationDialog").dialog('close'); 
        }

        self.story = ko.observable().extend({required: { message: 'Please supply your story.' }})
                                    .extend({validation: {
                                            validator: function (val, max) {
                                                return val.length < max;
                                            },
                                            message: 'Your story must be be less than'+ storyMaxCharacters +'characters.',
                                            params: 300
                                            }
        });
        
        self.story.subscribe(function(newValue){
                             var last = newValue.charAt(newValue.length -1);
                            
                             if(last != '\n'){
                                console.log(last != '\n');
                                newValue = newValue + '\n';
                             }
                             
        });
        
        self.uploadPhoto = function(){
        	capturePhoto();
        };

        
        self.characterCount = ko.computed(function(){
                                          var currentCount = 0;
                                          if(self.story() != undefined){
                                            currentCount = self.story().length;
                                          }
                                          return currentCount + "/"+ storyMaxCharacters;
                                          },this);
        
    	self.errors = ko.validation.group(self);
        
        self.submit = function(){
            
            var isValid = validateStory();
            if(isValid){        	
                self.storyInformation.submitStory(
                                                  self.storyType(), 
                                                  self.harassmentTypes(), 
                                                  self.manualAddress(), 
                                                  "40", "42", photoURI, 
                                                  self.story(), 
                                                  function(message){
                                                  	if (message.indexOf("Error") == -1){
                                                  		storySubmissionSuccessful(message);
                                                  		self.reset();
                                                  	}
                                                  	
                                                  }
                                                  );
            }
        };
        
        self.close = function(){
        	alert("Calling reset");
        	self.reset();
        };
        

        self.reset = function(){
    		//for each property on the page, set it back to be nothing
    		self.storyType();
    		self.harassmentTypes();
    		self.story();
        	photoURI = undefined;
    	};
       
        function storySubmissionSuccessful(message){
			$.mobile.changePage("#congratsPage");
		}

		function capturePhoto() {
		  // Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onSuccess, onFail, 
				{ 
					quality: 50,
					targetWidth: 250,
					targetHeight: 250,
					allowEdit: true,
					sourceType : Camera.PictureSourceType.PHOTOLIBRARY
				}
			);   

		}
		
		
		function onFail(message) {
			alert("Failed because: " + message);
		}

		function onSuccess(imageData) {	        
	        var smallImage = document.getElementById("smallImage");
            
	        smallImage.style.display = 'block';     
	        smallImage.src = imageData;
	        
	        photoURI = imageData;
		}
        
        function validateStory(){
        	var isValid = modelIsValid();
        	if (!isValid) {    		 
            	showErrors();
        	}
			return isValid;
        }
        

        function modelIsValid(){
        	return self.errors().length === 0;
        }
        
        function showErrors(){
        	try
			{			
        		navigator.notification.alert(getErrorMessage(), function(){}, "Ooops","Ok let's try again");
			}
			catch(err)
			{
				alert(getErrorMessage());
			}
        }
        
        function getErrorMessage(){
        	var message = "";
        	var i;
        	for (i=0; i < self.errors().length; i++)
			{
				message += self.errors()[i] + "\n";
			}
			return message;
        }              
	 }
}
     
   