
	function markInActive(){
	////***************** This function gives (currentTime-milliseconds) in GMT format ************************** /////
	function calculateDate(milliseconds){ 
		var currentdatetime =  new Date();
		var GMTdatetime = new Date(currentdatetime.valueOf() + currentdatetime.getTimezoneOffset() * 60000); // Calculate GMT date time 
		var date = new Date(GMTdatetime - milliseconds); 
		var calculateddate = date.getUTCFullYear() + '-' +
		('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
		('00' + date.getUTCDate()).slice(-2) + ' ' + 
		('00' + date.getUTCHours()).slice(-2) + ':' + 
		('00' + date.getUTCMinutes()).slice(-2) + ':' + 
		('00' + date.getUTCSeconds()).slice(-2);
		
		return calculateddate;
	}
	
	////**************************** This function is to mark JSA as active which will be called in  ***********************************////
	function MarkActive() 
	{
		var conn = $.db.getConnection();
	var twelvehours_datetime = calculateDate(43200000);
//var twelvehours_datetime = calculateDate(60000);// Date 12 hours prior to current date
	var status = 'APPROVED';

	var str = ""; // TO store all the permit numbers for "in" condition of Update query

	var Query = 'SELECT "R"."PERMITNUMBER" FROM "IOP"."JSAREVIEW" as R inner join "IOP"."JSAHEADER" as J on "R"."PERMITNUMBER" = "J"."PERMITNUMBER"  WHERE "R"."APPROVEDDATE" < ? and "J"."STATUS" = ? and "J"."ISACTIVE" = 1'; 
	var getPermit = conn.prepareStatement(Query);
		getPermit.setString(1, twelvehours_datetime);
		getPermit.setString(2,status);
		var rs = getPermit.executeQuery();
	var i = 0;
	while (rs.next()) {
		if(i === 0){
			str = '(' + rs.getString(1);
			i = i+1;
		}
		else{
		str = str + ',' + rs.getString(1);
		}
	}
	
	$.trace.error("Job to mark InActive ran for approved time as  "+twelvehours_datetime);
	$.trace.error("Job to mark InActive ran for approved time as  "+str);
			
	if(str!==""){
	str = str + ')';
	

	var updateInActive = 'UPDATE "IOP"."JSAHEADER" SET ISACTIVE = 0 WHERE STATUS = ? AND PERMITNUMBER IN '+ str ;

	 conn = $.hdb.getConnection(); 
	conn.executeUpdate(
			updateInActive,
			status	
		);
	$.trace.error("Following Permits are marked Inactive   "+str + "where approved time is " + twelvehours_datetime);
	conn.commit();
	}
}
	////*************************** This function is to call the Rest Service which sends the notification ****************************////
	function sendPushNotification(createdBy,permitNumber){
		try{
		var destination;
		var client;
		
		destination = $.net.http.readDestination("IOP","PushNotification_Dest");

		client = new $.net.http.Client();
		
		  var request = new $.net.http.Request($.net.http.POST,"");
		  request.headers.set("Content-Type","application/json");
		  request.headers.set("Accept","application/json");
		  $.trace.error("In Push Notification function for Permit "+ permitNumber );
		  request.setBody(JSON.stringify(
				  {
					  "notification": {
					  "alert": "Permit " + permitNumber + " is going to expire in an hour",
					  "sound": "default"
					  },
					  "users": [createdBy]
					  }));
		  
		  client.request(request, destination);
		  //Checking the status ( 201 for success )
		 
		  return(client.getResponse());
		}
		catch(e){
			
			$.trace.error("Exception in Push Nitificaiton Job   "+e.message );
		}

		
	}
	//// ************************  This function sends the notification to the permit holders ************************* /////
	function pushNotification(){
		try{
		var conn = $.db.getConnection();
		var seventyminutesbefore = calculateDate(39000000); // Date 11 hours prior to current date in GMT format
		var fiftyminutesbefore   = calculateDate(40200000);
		
	//	var seventyminutesbefore = calculateDate(55000); // Date 11 hours prior to current date in GMT format
	//	var fiftyminutesbefore   = calculateDate(35000);
		var permitNumber,createdBy;
		
		var qry = 'SELECT PERMITNUMBER,CREATEDBY FROM "IOP"."JSAREVIEW" WHERE APPROVEDDATE BETWEEN \''+fiftyminutesbefore+'\' AND \'' +seventyminutesbefore+'\'';
		var getPermit = conn.prepareStatement(qry); 
		var rs = getPermit.executeQuery();
		
		while (rs.next()) {
			
			permitNumber = rs.getString(1);
			createdBy    =   rs.getString(2)  ;
			
		sendPushNotification(createdBy,permitNumber);
		}
		
		$.trace.error("Push Notificaiton for Permits approved beteen "+fiftyminutesbefore + " and " + seventyminutesbefore);
		
//		$.response.contentType = 'application/json';
//		$.response.setBody(JSON.stringify({
//			"response":response.status,
//			"permit":createdBy,
//			"Fiftyminutes":fiftyminutesbefore,
//			"seventyminutesbefore":seventyminutesbefore,
//			
//		}));
//		
////		$.response.setBody(JSON.stringify(userDetails));
//		$.response.status = $.net.http.OK;
		
	
		}
		catch(e){
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			$.response.setBody(e.message);
			$.trace.error("Exception in Push Nitificaiton Job   "+e.message );
		}
	}
	MarkActive();
	pushNotification();
	
	}



