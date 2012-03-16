var shareViewModels = {

	shareStoryViewModel: function(){
		var self = this;    
   
		 
        self.bystander = ko.observable("bystander");
        
        self.harassmentTypes = ko.observableArray(["verbal","stalking","homophobic","transphobic","assault","groping","racist","other"]);
        
        self.useGPS = ko.observable("useGPS");
        
        self.manualAddress = ko.observable();
        self.verifyAddress = ko.observable();
        self.uploadPhoto = ko.obserable();
        self.story = ko.observable();
	 },
}
     
    // ... then later ...
    //shareStoryViewModel.bystander; will contain the value that is selected by the user
