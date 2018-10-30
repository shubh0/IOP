
function Trigger_Hierarchy(){
var companyCode = "0329";
var locationPattern = "MUR-US-EFS";
var destination;
var client;

	
	destination = $.net.http.readDestination("IOP","HCI_Destination");

	client = new $.net.http.Client();
	try{
	
	  var request = new $.net.http.Request($.net.http.POST,"/updatehierarchy");
	  request.headers.set("Content-Type","application/json");
	  request.headers.set("Accept","application/json");
	 
	  request.setBody(JSON.stringify(
			  {
				  "wellHierarchy": {
    "updateHierachy": {
      "COMPANY_CODE": companyCode,
      "HIERARCHY": "",
      "LOCATION_PATTERN": "%"+locationPattern+"%",
      "WELLS_NUWI": ""
    }
  }
				  }));
	  
	  client.request(request, destination);
	  //Checking the status ( 201 for success )
	 var response = client.getResponse();
	// $.trace.error("Trigger Hierarchy Job Response : "+ response.body.asString());
	 var currentdatetime =  new Date();
	 $.trace.error("Trigger Hierarchy Job Run succesfull at:"+new Date(currentdatetime.valueOf() + currentdatetime.getTimezoneOffset() * 60000)); 

	 
	}
	catch(e){

	 $.trace.error("Trigger Hierarchy Job Response when exception is caught : "+ e.message);
	}
}
	