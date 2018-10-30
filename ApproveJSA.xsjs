var pstmt;
var rs;
var get_query;
var jsaPermitNumber = $.request.parameters.get("jsaPermitNumber");
var status = $.request.parameters.get("status");
var approvedBy = $.request.parameters.get("approvedBy");
var conn = $.db.getConnection();

try {
	var currentdatetime =  new Date();
	// Calculate GMT date time
	var GMTdatetime = new Date(currentdatetime.valueOf() + currentdatetime.getTimezoneOffset() * 60000); 
//	var conn = $.db.getConnection();
	var permitNumber ;
	var GETPERMITNUMBER = conn.prepareStatement(" select PERMITNUMBER from \"IOP\".\"JSAHEADER\" where \"JSAPERMITNUMBER\" ='"+jsaPermitNumber+"'" );
	 rs = GETPERMITNUMBER.executeQuery();
	
	while (rs.next()) {
		permitNumber = rs.getString(1);
	}
	
	var isActive = 1;
//	var updateJSAHEADER = "UPDATE \"IOP\".\"JSAHEADER\" SET \"STATUS\" =?,\"ISACTIVE\"=? where \"JSAPERMITNUMBER\"=?" ;
//	var conn = $.hdb.getConnection();
//	conn.executeUpdate(updateJSAHEADER,
//			status,
//			isActive,
//			jsaPermitNumber
//			
//			);
//	
	//var conn = $.hdb.getConnection();
	var updateJSAHEADER =  ("UPDATE \"IOP\".\"JSAHEADER\" SET \"STATUS\" ='" + status + "',\"ISACTIVE\"= " + parseInt(isActive) + " where \"JSAPERMITNUMBER\"='" + jsaPermitNumber + "'");
//	updateJSAHEADER.setString(1, status);
//	updateJSAHEADER.setInteger(2, 1);
//	updateJSAHEADER.setString(3, jsaPermitNumber);
	//var conn = $.hdb.getConnection();
	var conn = $.hdb.getConnection();
	conn.executeUpdate(updateJSAHEADER);
	
	
	var updateJSAREVIEW = 'UPDATE "IOP"."JSAREVIEW" SET "APPROVEDDATE" = ? , "LASTUPDATEDDATE" = ? , "APPROVEDBY"= ? where "PERMITNUMBER"=' + permitNumber ;

	conn.executeUpdate(updateJSAREVIEW,
			GMTdatetime,
			GMTdatetime,
			approvedBy
			);
	//	Commit to DB
	conn.commit();
	
	$.response.contentType = 'application/json';
	$.response.setBody(JSON.stringify(
			{
				"Success": "JSA " +permitNumber+ " approved succesfully."
			}
	));
	conn.close();
}
catch(e)
{
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
	}