var config = {

	urlConfiguration: function() {
		
		self.backendPrefix = "http://testbackend.ihollaback.com/";
		self.boundary ="boundary=0xKhTmLbOuNdArY";
	
		this.getSignupUrl = function(){		
			return backendPrefix +"signup/";         
		};
		
        this.getLoginUrl = function(){
            return backendPrefix + "authenticate/";
        };
        
		this.getSignupContentType = function(){
			return "multipart/form-data; " + boundary;
		};	
        
        this.getLogInContentType = function(){
            return "multipart/form-data; " + boundary;
        };
        
        this.getLoginStartRequestBoundary = function(){
            return "--0xKhTmLbOuNdArY\nContent-Disposition: form-data; name=\"hollabackposting\"; filename=\"file.bin\"\r\n\r\n \n"
        };
        
        this.getLoginEndRequestBoundary = function(){
            return "\n--0xKhTmLbOuNdArY--\r\n--%@--\r\n";
        };
        
                
        this.getStoryUrl = function(){
            return backendPrefix + "incoming/";
        };
        
        this.getStoryContentType = function(){
        	return "multipart/form-data" + boundary;
        };
	},

};