var shareViewModels = {

	shareStoryViewModel: function(storyInformation){
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
        	alert("hi");
        	capturePhoto();
        };
        
        self.story = ko.observable();
        
        self.responseText = ko.observable();
        
        self.submit = function(){
            alert("submitting");
        	
			self.storyInformation.submitStory(
        	self.bystander(), 
        	self.harassmentTypes(), 
        	self.manualAddress(), 
        	"40", "42", "photo", 
        	self.story(), 
        	function(message){storySubmissionSuccessful(message)} )

        };

        
        
       
        function storySubmissionSuccessful(message){
     		self.responseText(message);
			$.mobile.loadPage("#congratsPage");
        	//reset the object maybe?
		};  

        // A button will call this function
		//
		function capturePhoto() {
		  // Take picture using device camera and retrieve image as base64-encoded string
		  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
		}
        
	 },
	 
	 
}
     
   