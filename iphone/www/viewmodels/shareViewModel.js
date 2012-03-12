var shareViewModels = {
	shareStoryViewModel: function(){
		var self = this;     
        self.bystanderFlag = ko.observable("firstPerson");
        self.harassmentTypes = ko.observableArray(["verbal","stalking","homophobic","transphobic","assault","groping","racist","other"]);
        self.useGPS = ko.observable(true);
	 }
    }
     
    // ... then later ...
    //shareStoryViewModel.bystander; will contain the value that is selected by the user
