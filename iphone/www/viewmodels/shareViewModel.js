var shareViewModels = {

	shareStoryViewModel: function(storyInformation){
	
		var photoData = "";
		var self = this;    
   		self.storyInformation = storyInformation;
		 
        self.bystander = ko.observable("bystander");
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
        
        self.story = ko.observable();
        
        self.responseText = ko.observable();
        
        self.submit = function(){        	
			self.storyInformation.submitStory(
        	self.bystander(), 
        	self.harassmentTypes(), 
        	self.manualAddress(), 
        	"40",
        	"42",
        	photoData, 
        	self.story(), 
        	function(message){storySubmissionSuccessful(message)} )

        };

        
        
       
        function storySubmissionSuccessful(message){
     		self.responseText(message);
			$.mobile.loadPage("#congratsPage");
        	//reset the object maybe?
		};  


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
		};
		
		function onFail(message) {
			alert("Failed because: " + message);
		};

		function onSuccess(imageData) {
			var smallImage = document.getElementById("smallImage");
	        smallImage.style.display = 'block';     
	        smallImage.src = imageData;
	        
	        window.resolveLocalFileSystemURI(imageData, gotFileEntry, fsFail); 

		};

		function gotFileEntry(fileEntry) { 			
			readDataUrl(fileEntry.fullPath);
		}; 
		
		function fsFail(error) { 
		    console.log("failed with error code: " + error.code); 
		};


    	function readDataUrl(file) {
	        var reader = new FileReader();
	        reader.onloadend = function(evt) {
/* 	            console.log(evt.target.result); */
	            photoData = evt.target.result;
	        };
	        reader.readAsDataURL(file);
    	};
		   
	 },
	 
	 
}
     
   