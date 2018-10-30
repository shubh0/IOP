var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

function getSerialNo() {
    var sId;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.SERIALNO_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        sId = rs.getString(1);
    }
    return sId;
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

	var conn = $.hdb.getConnection();
	var successFlag = true ;
	
	  var ptwConditionChk = "",i, isCWPFlag = false, isHWPFlag=false, isCSEFlag=false;
	    try {
	        if (ReqBody && ReqBody.TOPTWHEADER) {
	            var maxlength = ReqBody.TOPTWHEADER.length;
	            for (i = 0; i < maxlength; i++) {
	                //      	  ptwHeader = "";
	                if (ReqBody.TOPTWHEADER[i].isCWP === 1) {
	                    ptwConditionChk = true;
	                    isCWPFlag = true;
	                } else if (ReqBody.TOPTWHEADER[i].isHWP === 1) {
	                    ptwConditionChk = true;
	                    isHWPFlag = true;
	                } else if (ReqBody.TOPTWHEADER[i].isCSE === 1) {
	                    ptwConditionChk = true;
	                    isCSEFlag = true;
	                }
	            }
	        }
	    } catch (e) {
	        ptwConditionChk = "";
	    }
	
	    $.trace.error(" isCWPFlag  " +isCWPFlag  + " isHWPFlag " + isHWPFlag + " isCSEFlag " + isCSEFlag);
	    if (ptwConditionChk) {
	        
	        try{
	    	
	 var  taskPermitNo = "" +ReqBody.TOPTWHEADER[0].permitNumber;
	    	// -------- Updating PTWHEADER table ------ //
	    	var TOPTWHEADER = 'UPDATE "IOP"."PTWHEADER" SET   "PLANNEDDATETIME"=?, "STATUS"=?, "LOCATION"=?, "CREATEDBY"=?,"CONTRACTORPERFORMINGWORK"=?,"ESTIMATEDTIMEOFCOMPLETION"=?, "EQUIPMENTID"=?, "WORKORDERNUMBER"=? where "PERMITNUMBER"=? AND "ISCWP"=? AND "ISHWP"=? AND "ISCSE"=?';
	    	var maxlength=ReqBody.TOPTWHEADER.length;
	    	var i ;
	    	for(i=0;i<maxlength;i++) {
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWHEADER,
	    				ReqBody.TOPTWHEADER[i].plannedDateTime,
	    				ReqBody.TOPTWHEADER[i].status,
	    				ReqBody.TOPTWHEADER[i].location,
	    				ReqBody.TOPTWHEADER[i].createdBy,
	    				ReqBody.TOPTWHEADER[i].contractorPerformingWork,
	    				ReqBody.TOPTWHEADER[i].estimatedTimeOfCompletion,
	    				ReqBody.TOPTWHEADER[i].equipmentID,
	    				ReqBody.TOPTWHEADER[i].workOrderNumber,
	    				ReqBody.TOPTWHEADER[i].permitNumber,
	    				ReqBody.TOPTWHEADER[i].isCWP,
	    				ReqBody.TOPTWHEADER[i].isHWP,
	    				ReqBody.TOPTWHEADER[i].isCSE
	    		);
	    		
	    	}
	    	
	        }
	        catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWHEADER", ["","plannedDateTime","status","location","createdBy","contractorPerformingWork",
		 "estimatedTimeOfCompletion","equipmentID","workOrderNumber","permitNumber","isCWP","isHWP",
		 "isCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	    	
	    	$.trace.error("  Updating PTWHEADER table  " +taskPermitNo );
	    	
//	    	// -------- Updating PTWPEOPLE table ------ //
//	    	
//	    	var TOPTWPEOPLE = 'UPDATE "IOP"."PTWPEOPLE" SET  "FIRSTNAME"=?, "LASTTNAME"=?, "CONTACTNUMBER"=?, "HASSIGNEDJSA"=?, "HASSIGNEDCWP"=?, "HASSIGNEDHWP"=?, "HASSIGNEDCSE"=? where "SERIALNO"=?';
//	    	var maxlength=ReqBody.TOPTWPEOPLE.length;
//	    	var i ;
//	    	for(i=0;i<maxlength;i++) {
//	    		
//	    		conn.executeUpdate(
//	    				TOPTWPEOPLE,
//	    				ReqBody.TOPTWPEOPLE[i].firstName,
//	    				ReqBody.TOPTWPEOPLE[i].lastName,
//	    				ReqBody.TOPTWPEOPLE[i].contactNumber,
//	    				ReqBody.TOPTWPEOPLE[i].hasSignedJSA,
//	    				ReqBody.TOPTWPEOPLE[i].hasSignedCWP,
//	    				ReqBody.TOPTWPEOPLE[i].hasSignedHWP,
//	    				ReqBody.TOPTWPEOPLE[i].hasSignedCSE,
//	    				ReqBody.TOPTWPEOPLE[i].serialNo
//	    		);
//	    	}
	    	
	    	
	    	//---------------------------PTW People need to delete first than it will Insert the new Payload -------------------------
	    	
	    	if (successFlag){ 
    	
    	try{
	        var maxlength= 0;
            if (ReqBody.TOPTWPEOPLE) {
            	  maxlength= ReqBody.TOPTWPEOPLE.length;
        	}
            
//            var maxlength=ReqBody.TOPTWPEOPLE.length;
            
            var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWPEOPLE\" WHERE PERMITNUMBER =? ";
            // var conn = $.hdb.getConnection();
            conn.executeUpdate(
            		PTWHEADERQuery,
            		taskPermitNo
            );
            var TOPTWPEOPLE,i,seId,TOPTWPEOPLE_query ;
            for(i=0;i<maxlength;i++) {
                seId = getSerialNo();
                TOPTWPEOPLE_query = "INSERT INTO \"IOP\".\"PTWPEOPLE\" VALUES (?,?,?,?,?,?,?,?,?)";
                conn.executeUpdate(
                    TOPTWPEOPLE_query,
                    seId,
                    taskPermitNo,
                    ReqBody.TOPTWPEOPLE[i].firstName,
                    ReqBody.TOPTWPEOPLE[i].lastName,
                    ReqBody.TOPTWPEOPLE[i].contactNumber,
                    ReqBody.TOPTWPEOPLE[i].hasSignedJSA,
                    ReqBody.TOPTWPEOPLE[i].hasSignedCWP,
                    ReqBody.TOPTWPEOPLE[i].hasSignedHWP,
                    ReqBody.TOPTWPEOPLE[i].hasSignedCSE

                );
            } 
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWPEOPLE", ["","seId","taskPermitNo","firstName","lastName","contactNumber",
		 "hasSignedJSA","hasSignedCWP","hasSignedHWP","hasSignedCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    	}
            
        	$.trace.error("  Delete PTWPEOPLE table  and create the new " +taskPermitNo );
	    	
	    	
	    	// -------- Updating PTWRequiredDocumnet table ------ //
	    	if (successFlag){ 
    	
    	try{
	    	
	    	var TOPTWREQDOC = 'UPDATE "IOP"."PTWREQUIREDDOCUMENT" SET  "ISCWP"=?, "ISHWP"=?, "ISCSE"=?, "ATMOSPHERICTESTRECORD"=?, "LOTO"=?, "PROCEDURE"=?, "PANDIDORDRAWING"=?,"CERTIFICATE"=?,"TEMPORARYDEFEAT"=?, "RESCUEPLAN"=?, "SDS"=?,"OTHERWORKPERMITDOCS"=?,"FIREWATCHCHECKLIST"=?,"LIFTPLAN"=?,"SIMOPDEVIATION"=?,"SAFEWORKPRACTICE"=? where "SERIALNO"=?';
	    	var maxlength=ReqBody.TOPTWREQDOC.length;
	    	var i ;
	    	for(i=0;i<maxlength;i++) {
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWREQDOC,
	    				ReqBody.TOPTWREQDOC[i].isCWP,
	    				ReqBody.TOPTWREQDOC[i].isHWP,
	    				ReqBody.TOPTWREQDOC[i].isCSE,
	    				ReqBody.TOPTWREQDOC[i].atmosphericTestRecord,
	    				ReqBody.TOPTWREQDOC[i].loto,
	    				ReqBody.TOPTWREQDOC[i].procedure,
	    				ReqBody.TOPTWREQDOC[i].pAndIdOrDrawing,
	    				ReqBody.TOPTWREQDOC[i].certificate,
	    				ReqBody.TOPTWREQDOC[i].temporaryDefeat,
	    				ReqBody.TOPTWREQDOC[i].rescuePlan,
	    				ReqBody.TOPTWREQDOC[i].sds,
	    				ReqBody.TOPTWREQDOC[i].otherWorkPermitDocs,
	    				ReqBody.TOPTWREQDOC[i].fireWatchChecklist,
	    				ReqBody.TOPTWREQDOC[i].liftPlan,
	    				ReqBody.TOPTWREQDOC[i].simopDeviation,
	    				ReqBody.TOPTWREQDOC[i].safeWorkPractice,
	    				ReqBody.TOPTWREQDOC[i].serialNo
	    		);
	    		
	    	}
    	}
    	
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWREQDOC", ["","isCWP","isHWP","isCSE","atmosphericTestRecord","loto",
		 "procedure","pAndIdOrDrawing","certificate","temporaryDefeat","rescuePlan","sds","otherWorkPermitDocs","fireWatchChecklist"
		 ,"liftPlan","simopDeviation","safeWorkPractice","serialNo"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    	}
	    	
	    	
	    	$.trace.error("  Updating PTWRequiredDocumnet table "  );
	    	// -------- Updating PTWApproval table ------ //
	    	if (successFlag){ 
    	
    	try{
	    	
	    	if (ReqBody.TOPTWAPPROVAL) {
				
			
	    	var maxlength=ReqBody.TOPTWAPPROVAL.length;
	    	var i ;
	    	var TOPTWAPPROVAL;
	    	for(i=0;i<maxlength;i++) {
	    	
	    	 TOPTWAPPROVAL = 'UPDATE "IOP"."PTWAPPROVAL" SET  "ISCWP"=?, "ISHWP"=?, "ISCSE"=?, "ISWORKSAFETOPERFORM"=?, "PREJOBWALKTHROUGHBY"=?, "APPROVEDBY"=?, "APPROVALDATE"=?,"CONTROLBOARDDISTRIBUTION"=?,"WORKSITEDISTRIBUTION"=?, "SIMOPSDISTRIBUTION"=?, "OTHERDISTRIBUTION"=?,"PICNAME"=?,"PICDATE"=?,"SUPERITENDENTNAME"=?,"SUPERITENDENTDATE"=? where "SERIALNO"=?';
	    	
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWAPPROVAL,
	    				ReqBody.TOPTWAPPROVAL[i].isCWP,
	    				ReqBody.TOPTWAPPROVAL[i].isHWP,
	    				ReqBody.TOPTWAPPROVAL[i].isCSE,
	    				ReqBody.TOPTWAPPROVAL[i].isWorkSafeToPerform,
	    				ReqBody.TOPTWAPPROVAL[i].prejobWalkthroughBy,
	    				ReqBody.TOPTWAPPROVAL[i].approvedBy,
	    				ReqBody.TOPTWAPPROVAL[i].approvalDate,
	    				ReqBody.TOPTWAPPROVAL[i].controlBoardDistribution,
	    				ReqBody.TOPTWAPPROVAL[i].worksiteDistribution,
	    				ReqBody.TOPTWAPPROVAL[i].simopsDistribution,
	    				ReqBody.TOPTWAPPROVAL[i].otherDistribution,
	    				ReqBody.TOPTWAPPROVAL[i].picName,
	    				ReqBody.TOPTWAPPROVAL[i].picDate,
	    				ReqBody.TOPTWAPPROVAL[i].superitendentName,
	    				ReqBody.TOPTWAPPROVAL[i].superitendentDate,
	    				ReqBody.TOPTWAPPROVAL[i].serialNo
	    		);
	    		
	    	}	
	    	}
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWAPPROVAL", ["","isCWP","isHWP","isCSE","isWorkSafeToPerform","prejobWalkthroughBy",
		 "approvedBy","approvalDate","controlBoardDistribution","worksiteDistribution","simopsDistribution",
		 "otherDistribution","picName","picDate"
		 ,"superitendentName","superitendentDate","serialNo"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    	}
	    	
	    	$.trace.error("  Updating PTWApproval table "  );
	    	
	    	
	    	
	    	// -------- Updating PTWTestRecord table ------ //
	    	if (successFlag){ 
    	
    	try{	
	    	if (ReqBody.TOPTWTESTREC) {
				
			
	    	var TOPTWTESTREC = 'UPDATE "IOP"."PTWTESTRECORD" SET  "ISCWP"=?, "ISHWP"=?, "ISCSE"=?, "DETECTORUSED"=?, "DATEOFLASTCALIBRATION"=?, "TESTINGFREQUENCY"=?, "CONTINUOUSGASMONITORING"=?,"PRIORTOWORKCOMMENCING"=?,"EACHWORKPERIOD"=?, "EVERYHOUR"=?, "GASTESTER"=?,"GASTESTERCOMMENTS"=?,"AREATOBETESTSED"=?,"DEVICESERIALNO"=?,"ISO2"=?,"ISLELS"=?,"ISH2S"=?,"OTHER"=? where "SERIALNO"=?';
	    	
	    		conn.executeUpdate(
	    				TOPTWTESTREC,
	    				ReqBody.TOPTWTESTREC.isCWP,
	    				ReqBody.TOPTWTESTREC.isHWP,
	    				ReqBody.TOPTWTESTREC.isCSE,
	    				ReqBody.TOPTWTESTREC.detectorUsed,
	    				ReqBody.TOPTWTESTREC.DateOfLastCalibration,
	    				ReqBody.TOPTWTESTREC.testingFrequency,
	    				ReqBody.TOPTWTESTREC.continuousGasMonitoring,
	    				ReqBody.TOPTWTESTREC.priorToWorkCommencing,
	    				ReqBody.TOPTWTESTREC.eachWorkPeriod,
	    				ReqBody.TOPTWTESTREC.everyHour,
	    				ReqBody.TOPTWTESTREC.gasTester,
	    				ReqBody.TOPTWTESTREC.gasTesterComments,
	    				ReqBody.TOPTWTESTREC.areaTobeTested,
	    				ReqBody.TOPTWTESTREC.deviceSerialNo,
	    				ReqBody.TOPTWTESTREC.isO2,
	    				ReqBody.TOPTWTESTREC.isLELs,
	    				ReqBody.TOPTWTESTREC.isH2S,
	    				ReqBody.TOPTWTESTREC.Other,
	    				ReqBody.TOPTWTESTREC.serialNo
	    		);
	    		
	    	}
	    	
	    	}
	    	
	    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWTESTREC", ["","isCWP","isHWP","isCSE","detectorUsed","DateOfLastCalibration",
		 "testingFrequency","continuousGasMonitoring","priorToWorkCommencing","eachWorkPeriod","everyHour",
		 "gasTester","gasTesterComments","areaTobeTested"
		 ,"deviceSerialNo","isO2","isLELs","isH2S","Other","serialNo"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	    	
    	
    	
	    	}
	    	
	    	$.trace.error(" Updating PTWTestRecord table "  );
	    	
//	    	// -------- Updating PTWTestRESULT table ------ //
//	    	var TOPTWATESTRES = 'UPDATE "IOP"."PTWTESTRESULTS" SET  "ISCWP"=?, "ISHWP"=?, "ISCSE"=?, "PRESTARTORWORKTEST"=?, "OXYGENPERCENTAGE"=?, "TOXICTYPE"=?, "TOXICRESULT"=?,"FLAMMABLEGAS"=?,"OTHERSTYPE"=?, "OTHERSRESULT"=?, "DATE"=?,"TIME"=? where "SERIALNO"=?';
//	    	var maxlength=ReqBody.TOPTWATESTRES.length;
//	    	var i ;
//	    	for(i=0;i<maxlength;i++) {
//	    		conn.executeUpdate(
//	    				TOPTWATESTRES,
//	    				ReqBody.TOPTWATESTRES[i].isCWP,
//	    				ReqBody.TOPTWATESTRES[i].isHWP,
//	    				ReqBody.TOPTWATESTRES[i].isCSE,
//	    				ReqBody.TOPTWATESTRES[i].preStartOrWorkTest,
//	    				ReqBody.TOPTWATESTRES[i].oxygenPercentage,
//	    				ReqBody.TOPTWATESTRES[i].toxicType,
//	    				ReqBody.TOPTWATESTRES[i].toxicResult,
//	    				ReqBody.TOPTWATESTRES[i].flammableGas,
//	    				ReqBody.TOPTWATESTRES[i].othersType,
//	    				ReqBody.TOPTWATESTRES[i].othersResult,
//	    				ReqBody.TOPTWATESTRES[i].date,
//	    				ReqBody.TOPTWATESTRES[i].time,
//	    				ReqBody.TOPTWATESTRES[i].serialNo
//	    		);
//	    		
//	    	}	
	    	
	    	
	    	
	    	
	    	// -------- delete PTWTestRESULT table insert it again ------ //
	    	
	    	
	    	if (successFlag){ 
    	
    	try{		
	    	var maxlength= 0;
	    	var sQuery;
	    	if (ReqBody.TOPTWATESTRES) {
	    		
	    		
	         sQuery = "DELETE FROM \"IOP\".\"PTWTESTRESULTS\" WHERE PERMITNUMBER =?";
	    	 conn.executeUpdate(
	    			 sQuery,
	    			 taskPermitNo
	    	 );
	   // 	 $.trace.error("Deleted PTWTESTRESULTS Success    " +taskPermitNo +isCWP+isHWP+isCSE );
	         maxlength= ReqBody.TOPTWATESTRES.length;
	     	
	         
//	         var maxlength = ReqBody.TOPTWATESTRES.length;
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
	    	
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWATESTRES", ["","ptwatestres","taskPermitNo","isCWP","isHWP","isCSE","preStartOrWorkTest","oxygenPercentage",
		 "toxicType","toxicResult","flammableGas","othersType","othersResult",
		 "date","time"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
	    	
	    	}
	    	
	    	
	    	
	   // 	 $.trace.error("create PTWTESTRESULTS Success    " +taskPermitNo +isCWP+isHWP+isCSE );
	    	// -------- Updating PTWcloseOut table ------ //
	         
	         	if (successFlag){ 
    	
    	try{
	         
	         if (ReqBody.TOPTWCLOSEOUT) {
				
			
	    	var maxlength=ReqBody.TOPTWCLOSEOUT.length;
	    	var i ;
	    	var TOPTWCLOSEOUT;
	    	for(i=0;i<maxlength;i++) {
	    	 TOPTWCLOSEOUT = 'UPDATE "IOP"."PTWCLOSEOUT" SET  "ISCWP"=?, "ISHWP"=?, "ISCSE"=?, "PICNAME"=?, "WORKCOMPLETED"=?, "CLOSEDBY"=?, "CLOSEDDATE"=?,"WORKSTATUSCOMMENT"=? where "SERIALNO"=?';
	    
	    		
	    		conn.executeUpdate(
	    				TOPTWCLOSEOUT,
	    				ReqBody.TOPTWCLOSEOUT[i].isCWP,
	    				ReqBody.TOPTWCLOSEOUT[i].isHWP,
	    				ReqBody.TOPTWCLOSEOUT[i].isCSE,
	    				ReqBody.TOPTWCLOSEOUT[i].picName,
	    				ReqBody.TOPTWCLOSEOUT[i].workCompleted,
	    				ReqBody.TOPTWCLOSEOUT[i].closedBy,
	    				ReqBody.TOPTWCLOSEOUT[i].closedDate,
	    				ReqBody.TOPTWCLOSEOUT[i].workStatusComments,
	    				ReqBody.TOPTWCLOSEOUT[i].serialNo
	    		);
	    		
	    	}
	    	
	         }
    	}
    	
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCLOSEOUT", ["","isCWP","isHWP","isCSE","picName","workCompleted","closedBy","closedDate",
		 "workStatusComments","serialNo"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	         	}
	         
	         $.trace.error("Updating PTWcloseOut table  "  );
	    	
	    		if (successFlag){ 
    	try{
	    	
	    	if (isCWPFlag) {
				
	    		// -------- Updating PTW_CWP_WORK_TYPE table ------ //
	    		var TOPTWCWPWORK = 'UPDATE "IOP"."PTW_CWP_WORK_TYPE" SET  "CRITICALORCOMPLEXLIFT"=?, "CRANEORLIFTINGDEVICE"=?, "GROUNDDISTURBANCEOREXCAVATION"=?, "HANDLINGHAZARDOUSCHEMICALS"=?, "WORKINGATHEIGHT"=?, "PAINTINGORBLASTING"=?, "WORKINGONPRESSURIZEDSYSTEMS"=?,"ERECTINGORDISMANTLINGSCAFFOLDING"=?,"BREAKINGCONTAINMENTOFCLOSEDOPERATINGSYSTEM"=?,"WORKINGINCLOSETOHAZARDOUSENERGY"=?,"REMOVALOFIDLEEQUIPMENTFORREPAIR"=?,"HIGHERRISKELECTRICALWORK"=?,"OTHERTYPEOFWORK"=?,"DESCRIPTIONOFWORKTOBEPERFORMED"=? where "PERMITNUMBER"=?';
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWCWPWORK,
	    				ReqBody.TOPTWCWPWORK.criticalOrComplexLift,
	    				ReqBody.TOPTWCWPWORK.craneOrLiftingDevice,
	    				ReqBody.TOPTWCWPWORK.groundDisturbanceOrExcavation,
	    				ReqBody.TOPTWCWPWORK.handlingHazardousChemicals,
	    				ReqBody.TOPTWCWPWORK.workingAtHeight,
	    				ReqBody.TOPTWCWPWORK.paintingOrBlasting,
	    				ReqBody.TOPTWCWPWORK.workingOnPressurizedSystems,
	    				ReqBody.TOPTWCWPWORK.erectingOrDismantlingScaffolding,
	    				ReqBody.TOPTWCWPWORK.breakingContainmentOfClosedOperatingSystem,
	    				ReqBody.TOPTWCWPWORK.workingInCloseToHazardousEnergy,
	    				ReqBody.TOPTWCWPWORK.removalOfIdleEquipmentForRepair,
	    				ReqBody.TOPTWCWPWORK.higherRiskElectricalWork,
	    				ReqBody.TOPTWCWPWORK.otherTypeOfWork,
	    				ReqBody.TOPTWCWPWORK.descriptionOfWorkToBePerformed,
	    				ReqBody.TOPTWCWPWORK.permitNumber
	    		);
			}
			
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCWPWORK", ["","criticalOrComplexLift","craneOrLiftingDevice","groundDisturbanceOrExcavation",
		 "handlingHazardousChemicals","workingAtHeight","paintingOrBlasting","workingOnPressurizedSystems","erectingOrDismantlingScaffolding",
		 "breakingContainmentOfClosedOperatingSystem","workingInCloseToHazardousEnergy","removalOfIdleEquipmentForRepair",
		 "higherRiskElectricalWork","otherTypeOfWork","descriptionOfWorkToBePerformed","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    		}
	    	
	    	if (successFlag){ 
    	try{	
	    	if (isHWPFlag) {
	    		// -------- Updating PTW_HWP_WORK_TYPE table ------ //
	    		var TOPTWHWPWORK = 'UPDATE "IOP"."PTW_HWP_WORK_TYPE" SET  "CUTTING"=?, "WIELDING"=?, "ELECTRICALPOWEREDEQUIPMENT"=?, "GRINDING"=?, "ABRASIVEBLASTING"=?, "OTHERTYPEOFWORK"=?, "DESCRIPTIONOFWORKTOBEPERFORMED"=? where "PERMITNUMBER"=?';
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWHWPWORK,
	    				ReqBody.TOPTWHWPWORK.cutting,
	    				ReqBody.TOPTWHWPWORK.wielding,
	    				ReqBody.TOPTWHWPWORK.electricalPoweredEquipment,
	    				ReqBody.TOPTWHWPWORK.grinding,
	    				ReqBody.TOPTWHWPWORK.abrasiveBlasting,
	    				ReqBody.TOPTWHWPWORK.otherTypeOfWork,
	    				ReqBody.TOPTWHWPWORK.descriptionOfWorkToBePerformed,
	    				ReqBody.TOPTWHWPWORK.permitNumber
	    		);
			}
    	}
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWHWPWORK", ["","cutting","wielding","electricalPoweredEquipment",
		 "grinding","abrasiveBlasting","otherTypeOfWork","descriptionOfWorkToBePerformed","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    	}
	    		if (successFlag){ 
    	try{
	    	
	    	if (isCSEFlag) {
	    		// -------- Updating PTW_HWP_WORK_TYPE table ------ //
	    		var TOPTWCSEWORK = 'UPDATE "IOP"."PTW_CSE_WORK_TYPE" SET  "TANK"=?, "VESSEL"=?, "EXCAVATION"=?, "PIT"=?, "TOWER"=?, "OTHER"=?, "REASONFORCSE"=? where "PERMITNUMBER"=?';
	    		
	    		
	    		conn.executeUpdate(
	    				TOPTWCSEWORK,
	    				ReqBody.TOPTWCSEWORK.tank,
	    				ReqBody.TOPTWCSEWORK.vessel,
	    				ReqBody.TOPTWCSEWORK.excavation,
	    				ReqBody.TOPTWCSEWORK.pit,
	    				ReqBody.TOPTWCSEWORK.tower,
	    				ReqBody.TOPTWCSEWORK.other,
	    				ReqBody.TOPTWCSEWORK.reasonForCSE,
	    				ReqBody.TOPTWCSEWORK.permitNumber
	    		);	    	
			}
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCSEWORK", ["","tank","vessel","excavation",
		 "pit","tower","other","reasonForCSE","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
	    		}
	    	
		}

if (successFlag){ 
    	try{
		    conn.commit();
	$.response.contentType = 'application/json';
	$.trace.error("  tableData " +taskPermitNo );
	$.response.setBody(JSON.stringify(
			{
				
				"Success": "Permit "+ taskPermitNo +" updated sucessfully."
			}
	));
    	}
    	
    	catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to Update the Permit");
					}
    	
}
	conn.close();


