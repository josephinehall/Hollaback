var shareViewModels = {

	shareStoryViewModel: function(storyInformation){
		var self, photoData, storyMaxCharacters;
		self = this;  
		photoData = "";     
        storyMaxCharacters = 300;
   		
   		self.storyInformation = storyInformation;
        self.storyType = ko.observable();
        self.storyTypes = ko.observableArray([new story.storyType("I saw this",1),new story.storyType("I experienced this ",0)]);
        
        self.harassmentTypes = ko.observableArray();        
        self.useGPS = ko.observable(false);
                
        self.gpsLocation = ko.computed(function() {
			return self.useGPS();
   		}, self);   		
        
		self.manualLocation = ko.computed(function() {
			return !self.useGPS();   	
   		}, self);

        self.manualAddress = ko.observable();
        self.gpsAddress = ko.observable();
        self.verifyAddress = ko.observable();
        
        self.uploadPhoto = function(){
        	capturePhoto();
        };

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

        
        self.characterCount = ko.computed(function(){
                                          var currentCount = 0;
                                          if(self.story() != undefined){
                                            currentCount = self.story().length;
                                          }
                                          return currentCount + "/"+ storyMaxCharacters;
                                          },this);
        
        self.responseText = ko.observable();
        
    	self.errors = ko.validation.group(self);
        
        self.submit = function(){
            
            var isValid = validateStory();
            if(isValid){
                alert("submitting ");
                alert(self.harassmentTypes());
        	
                self.storyInformation.submitStory(
                                                  self.storyType(), 
                                                  self.harassmentTypes(), 
                                                  self.manualAddress(), 
                                                  "40", "42", photoData, 
                                                  self.story(), 
                                                  function(message){storySubmissionSuccessful(message);});
            }
        };
        
        self.reset = function(){
    		//for each property on the page, set it back to be nothin
    		self.storyType();
    		
        
        	self.harassmentTypes();
    	};
       
        function storySubmissionSuccessful(message){
     		self.responseText(message);
			$.mobile.changePage("#congratsPage");
		}


		function capturePhoto() {
		  // Take picture using device camera and retrieve image as base64-encoded string

			navigator.camera.getPicture(onSuccess, onFail, 
				{ 
					quality: 20,
					targetWidth: 300,
					targetHeight: 300,
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
	        
	        window.resolveLocalFileSystemURI(imageData, gotFileEntry, onFail); 

		}

		function gotFileEntry(fileEntry) { 			
			readDataUrl(fileEntry.fullPath);
		}

    	function readDataUrl(file) {
	        var reader = new FileReader();
	        reader.onloadend = function(evt) {
	            photoData = evt.target.result;
	        };
	        reader.readAsDataURL(file);
    	}
		   
		function onFail(message) {
			alert('Failed because: ' + message);
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
     
   