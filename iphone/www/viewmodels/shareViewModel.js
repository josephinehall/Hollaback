var shareViewModels = {

	shareStoryViewModel: function(){
		var self = this;    
		 
        self.bystander = ko.observable("false");
        self.cool = ko.observable("bitch'n burritos");
        
        self.harassmentTypes = ko.observableArray(["verbal","stalking","homophobic","transphobic","assault","groping","racist","other"]);
        self.useGPS = ko.observable(true);
	 },
}
     
    // ... then later ...
    //shareStoryViewModel.bystander; will contain the value that is selected by the user
