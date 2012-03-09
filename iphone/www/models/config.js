var config = {

	urlConfiguration: function() {
		
		self.backendPrefix = "http://testbackend.ihollaback.com/";
		self.boundary ="boundary=0xKhTmLbOuNdArY";
	
		this.getSignupUrl = function(){		
			return backendPrefix +"signup/";         
		};
		
		this.getSignupContentType = function(){
			return "multipart/form-data; " + boundary;
		};	
	},

};