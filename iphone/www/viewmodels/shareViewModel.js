var shareViewModels = {

	shareStoryViewModel: function(storyInformation){
		var self = this;    
   		self.storyInformation = storyInformation;
		 
        self.bystander = ko.observable("bystander");
        
        self.harassmentTypes = ko.observableArray(["verbal","stalking","homophobic","transphobic","assault","groping","racist","other"]);
        
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
        self.submit = function(){};
	 },
}
     
   