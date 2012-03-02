

function onBodyLoad()
{		
    document.addEventListener("deviceready", onDeviceReady, false);
}


// PhoneGap is ready
function onDeviceReady() {
    navigator.notification.alert("PhoneGap is working");
   	alert("device ready");
	var foo = new yourNamespace.foo();
}
