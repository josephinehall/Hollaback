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
        
        self.uploadPhoto = ko.observable();
        self.story = ko.observable();
        
        self.responseText = ko.observable();
        
        self.submit = function(){
        	self.storyInformation.submitStory(self.bystander(), self.harassmentTypes(), self.manualAddress(), "40", "42", "photo", self.story(), function(message){storySubmissionSuccessful(message)} )
        };
        
        
       
        function storySubmissionSuccessful(message){
     		self.responseText(message);
			$.mobile.loadPage("#congratsPage");
        	//reset the object maybe?
		};  

       
        
	 },
	 
	 
}
     
   