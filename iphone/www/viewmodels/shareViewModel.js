var shareViewModels = {
	shareStoryViewModel: function(){
		var self = this;     
        self.bystanderFlag = ko.observable("firstPerson");
        self.harassmentTypes = ko.observableArray(["verbal","stalking","homophobic","transphobic","assault","Groping","Racist","Other"]);
	 }
    }
     
    // ... then later ...
    //shareStoryViewModel.bystander; will contain the value that is selected by the user
