var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

function getPTWAPPROVAL()
{
       var ptwApproval;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.PTWAPPROVAL_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   ptwApproval = rs.getString(1);
       }
       return ptwApproval;
}

try {
	
	if (ReqBody.TOPTWAPPROVAL) {
		
		var permitNumber =  ReqBody.TOPTWAPPROVAL.permitNumber;
		var isCWP = ReqBody.TOPTWAPPROVAL.isCWP;
		var isHWP = ReqBody.TOPTWAPPROVAL.isHWP;
		var isCSE = ReqBody.TOPTWAPPROVAL.isCSE;
		
	
	
	var conn = $.db.getConnection();
	var updatePTW = 'UPDATE "IOP"."PTWHEADER" SET "STATUS" =? where "PERMITNUMBER"=? AND "ISCWP"=? AND "ISHWP"=? AND "ISCSE"=? ' ;
	
	var conn = $.hdb.getConnection();
	conn.executeUpdate(updatePTW,
			ReqBody.status,
			permitNumber,
			isCWP,
			isHWP,
			isCSE
			);
	
	
	 var ptwApproval = getPTWAPPROVAL();
	  var TOPTWAPPROVAL_query =  "INSERT INTO \"IOP\".\"PTWAPPROVAL\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
 conn.executeUpdate(
		  TOPTWAPPROVAL_query,
		  ptwApproval,
		 ReqBody.TOPTWAPPROVAL.permitNumber,
         ReqBody.TOPTWAPPROVAL.isCWP,
         ReqBody.TOPTWAPPROVAL.isHWP,
         ReqBody.TOPTWAPPROVAL.isCSE,
         ReqBody.TOPTWAPPROVAL.isWorkSafeToPerform,
         ReqBody.TOPTWAPPROVAL.prejobWalkthroughBy,
         ReqBody.TOPTWAPPROVAL.approvedBy,
         ReqBody.TOPTWAPPROVAL.approvalDate,
         ReqBody.TOPTWAPPROVAL.controlBoardDistribution,
         ReqBody.TOPTWAPPROVAL.worksiteDistribution,
         ReqBody.TOPTWAPPROVAL.simopsDistribution,
         ReqBody.TOPTWAPPROVAL.otherDistribution,
         ReqBody.TOPTWAPPROVAL.picName,
         ReqBody.TOPTWAPPROVAL.picDate,
         ReqBody.TOPTWAPPROVAL.superitendentName,
         ReqBody.TOPTWAPPROVAL.superitendentDate
               ); 
	}
	
//	Commit to DB
	conn.commit();
	
	$.response.contentType = 'application/json';
	$.response.setBody(JSON.stringify(
			{
				"Success": permitNumber + " approved succesfully."
			}
	));
	conn.close();
}
catch(e)
{
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
	}