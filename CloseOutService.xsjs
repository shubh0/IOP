var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

function getTOPTWCLOSEOUT()
{
       var ptwcloseOut;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.CLOSE_OUT_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   ptwcloseOut = rs.getString(1);
       }
       return ptwcloseOut;
}


function getPTWATESTRES() {
    var ptwWatestres;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.PTWATESTRES_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        ptwWatestres = rs.getString(1);
    }
    return ptwWatestres;
}

function errorPrint(tableName, tableData, msg){
	var position = " ";
	if (msg.split("position")[1] && msg.split("position")[1].split(" is")[0]) {
		position = msg.split("position")[1].split(" is")[0];
	}
	position = position.trim();
	var objVal = tableData[position];
	var completeMsg = "Error at "+ tableName + " : " + objVal + " and  Message : " + msg;
	 $.response.setBody(completeMsg);
}

var successFlag = true;


try {
	
	var ptwcloseOut = "";
	var TOPTWCLOSEOUT_query, i;
	var conn = $.hdb.getConnection();
	 var maxlength = 0;
	 var taskPermitNo = " " ;
	 var updateStatus;
	 
	 var permitNumber = ReqBody.TOPTWCLOSEOUT[0].permitNumber;
	 var isCWP = ReqBody.TOPTWCLOSEOUT[0].isCWP;
	 var isHWP =  ReqBody.TOPTWCLOSEOUT[0].isHWP;
	 var isCSE = ReqBody.TOPTWCLOSEOUT[0].isCSE;
	 
	  updateStatus = "Update \"IOP\".\"PTWHEADER\" set \"STATUS\" = ?  where \"PERMITNUMBER\" = "+parseInt(permitNumber) +" and \"ISCWP\" = "+parseInt(isCWP) +" and \"ISHWP\" = "+parseInt(isHWP) +" and \"ISCSE\"="+parseInt(isCSE)+"";
	 conn.executeUpdate(
			 updateStatus,
			 ReqBody.status
             
			 );
}	 
catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("PTWHEADER", ["","status"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	 
	  if(successFlag){
	      try{
	      
	if (ReqBody.TOPTWCLOSEOUT) {
		
		 maxlength = ReqBody.TOPTWCLOSEOUT.length;
		 taskPermitNo = "" +  ReqBody.TOPTWCLOSEOUT[0].permitNumber;
	}
	for (i = 0; i < maxlength; i++) {

		ptwcloseOut = getTOPTWCLOSEOUT();
		TOPTWCLOSEOUT_query = "INSERT INTO \"IOP\".\"PTWCLOSEOUT\" VALUES (?,?,?,?,?,?,?,?,?,?)";
		conn.executeUpdate(
				TOPTWCLOSEOUT_query,
				ptwcloseOut, 
				ReqBody.TOPTWCLOSEOUT[i].permitNumber,
				ReqBody.TOPTWCLOSEOUT[i].isCWP, 
				ReqBody.TOPTWCLOSEOUT[i].isHWP,
				ReqBody.TOPTWCLOSEOUT[i].isCSE,
				ReqBody.TOPTWCLOSEOUT[i].picName,
				ReqBody.TOPTWCLOSEOUT[i].workCompleted,
				ReqBody.TOPTWCLOSEOUT[i].closedBy,
				ReqBody.TOPTWCLOSEOUT[i].closedDate,
				ReqBody.TOPTWCLOSEOUT[i].workStatusComments

		);

	}
	      }
	      
	      catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCLOSEOUT", ["","ptwcloseOut","permitNumber","isCWP","isHWP","isCSE","picName","workCompleted","closedBy"
		 ,"closedDate","workStatusComments"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	  }
	
	 $.trace.error("created sucessfully PTWTESTRESULTS Success    " );
	
	if(successFlag){
	      try{
	 var maxlength = 0;
	    if (ReqBody.TOPTWATESTRES) {
	    	 maxlength = ReqBody.TOPTWATESTRES.length;
	    	 
	   // 	 var isCWP = ReqBody.TOPTWATESTRES[0].isCWP;
	   // 	 var isHWP =  ReqBody.TOPTWATESTRES[0].isHWP;
	   // 	 var isCSE = ReqBody.TOPTWATESTRES[0].isCSE;
	    	 
	    	 
		}
	    
	    $.trace.error("Deleted PTWTESTRESULTS Success    " +taskPermitNo );
	    var i;
	    var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWTESTRESULTS\" WHERE PERMITNUMBER =?";
	    // var conn = $.hdb.getConnection();
	    conn.executeUpdate(
	    		PTWHEADERQuery,
	    		taskPermitNo
	    		
	    );
	    $.trace.error("Deleted PTWTESTRESULTS Success    " );
	    
	    var ptwatestres = "",TOPTWATESTRES_query;
        for (i = 0; i < maxlength; i++) {
            ptwatestres = getPTWATESTRES();
            TOPTWATESTRES_query = "INSERT INTO \"IOP\".\"PTWTESTRESULTS\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            conn.executeUpdate(
                TOPTWATESTRES_query,
                ptwatestres,
                taskPermitNo,
                ReqBody.TOPTWATESTRES[i].isCWP,
                ReqBody.TOPTWATESTRES[i].isHWP,
                ReqBody.TOPTWATESTRES[i].isCSE,
                ReqBody.TOPTWATESTRES[i].preStartOrWorkTest,
                ReqBody.TOPTWATESTRES[i].oxygenPercentage,
                ReqBody.TOPTWATESTRES[i].toxicType,
                ReqBody.TOPTWATESTRES[i].toxicResult,
                ReqBody.TOPTWATESTRES[i].flammableGas,
                ReqBody.TOPTWATESTRES[i].othersType,
                ReqBody.TOPTWATESTRES[i].othersResult,
                ReqBody.TOPTWATESTRES[i].date,
                ReqBody.TOPTWATESTRES[i].time

            );
        }
	      }
	      
	      catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWATESTRES", ["","ptwatestres","taskPermitNo","isCWP","isHWP","isCSE","preStartOrWorkTest","oxygenPercentage"
		 ,"toxicType","toxicResult","flammableGas","othersType","othersResult","date","time"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	      
	}
	if(successFlag){
	      try{
	
        conn.commit();
        
        $.response.contentType = 'application/json';
        $.response.setBody(JSON.stringify(
                     {
                            "Success": "Permit number " + taskPermitNo + " closed"
                            
                     }
        ));
        
	      }
	      
	      	catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to closed the Request");
					}
	      
	}
        conn.close();
	



