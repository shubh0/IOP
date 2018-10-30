var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

var output = {ptwPermitNumber:[]};
function getPermitNumber()
{
       var perMitNumber ;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.PERMITNUMBER_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
//    	   bothValue = {};
//    	   bothValue.pId = 'JHS'+rs.getString(1);
    	   perMitNumber = rs.getString(1);
       }
       return perMitNumber;
}

var PermitNumber = getPermitNumber();

function getSerialNo()
{
       var sId;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.SERIALNO_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   sId = rs.getString(1);
       }
       return sId;
}

function getJSASTEPSSerialNo()
{
       var jsaSteps;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.JSASTEPS_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   jsaSteps = rs.getString(1);
       }
       return jsaSteps;
}

function getJSASTOPSerialNo()
{
       var jsaStop;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.JSASTOP_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   jsaStop = rs.getString(1);
       }
       return jsaStop;
}

//function getpwaHeaderNo()
//{
//       var ptwHeader;
//       var con = $.db.getConnection();
//       var sts = con.prepareStatement("select IOP.PWAHEADER_SEQ.NEXTVAL FROM DUMMY");
//       var rs = sts.executeQuery();
//       while (rs.next()) {
//    	   ptwHeader = rs.getString(1);
//       }
//       return ptwHeader;
//}

function getPTWREQDOC()
{
       var ptwreqDoc;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.PTWREQDOC_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   ptwreqDoc = rs.getString(1);
       }
       return ptwreqDoc;
}

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

function getPTWTESTREC()
{
       var ptwtestRec;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.PTWTESTREC_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   ptwtestRec = rs.getString(1);
       }
       return ptwtestRec;
}

function getPTWATESTRES()
{
       var ptwWatestres;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.PTWATESTRES_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   ptwWatestres = rs.getString(1);
       }
       return ptwWatestres;
}

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

function getTOJSALOCATION()
{
       var jsaLocation;
       var con = $.db.getConnection();
       var sts = con.prepareStatement("select IOP.JSA_LOCATION_SEQ.NEXTVAL FROM DUMMY");
       var rs = sts.executeQuery();
       while (rs.next()) {
    	   jsaLocation = rs.getString(1);
       }
       return jsaLocation;
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


    var i,TOJSAHEADER_query,TOJSAREVIEW_query,TOJSARISKASS_query,TOJSAHAZARDCSE_query,TOJSAHAZARDSUBS_query,TOJSAHAZARDDROPPED_query,
    TOJSAHAZARDSIMULTAN_query,TOJSAHAZARDIGNITION_query,TOJSAHAZARDSPILL_query,TOJSAHAZARDWEATHER_query,TOJSAHAZARDNOISE_query,
    TOJSAHAZARDLIFT_query,TOJSAHAZARDELECTRICAL_query,TOJSAHAZARDMOVING_query,TOJSAHAZARDMANUAL_query,TOJSAHAZARDTOOLS_query,
    TOPTWCWPWORK_query,TOPTWHWPWORK_query,TOPTWCSEWORK_query,
    TOJSASTOP_query,TOPTWHEADER_query,TOPTWREQDOC_query,TOPTWAPPROVAL_query,TOPTWTESTREC_query,TOPTWATESTRES_query,TOPTWCLOSEOUT_query,
    TOJSE_PPE_query,TOPTWPEOPLE_query,TOJSAHAZARDPRESS_query,TOJSAHAZARDVISIBLE_query,TOJSAHAZARDPERSON_query,TOJSAHAZARDMOBILE_query,
    TOJSAHAZARDHEIGHT_query,TOJSAHAZARDFALLS_query,TOJSAHAZARDVOLTAGE_query,TOJSAHAZARDEXCAVATION_query,TOJSASTEPS_query,conn;
    
    var isCWP,isHWP,isCSE;
    
    var successFlag = true;
    
  try{  
    TOJSAHEADER_query =  "INSERT INTO \"IOP\".\"JSAHEADER\" VALUES (?,?,?,?,?,?,?,?,?)" ;
       conn = $.hdb.getConnection();
       var perMitNumber = PermitNumber ;
       var piD = 'JSA'+  perMitNumber ;
       conn.executeUpdate(
    		        TOJSAHEADER_query,
    		        perMitNumber,
    		        piD,
                    ReqBody.TOJSAHEADER.hasCWP,
                    ReqBody.TOJSAHEADER.hasHWP,
                    ReqBody.TOJSAHEADER.hasCSE,
                    ReqBody.TOJSAHEADER.taskDescription,
                    ReqBody.TOJSAHEADER.identifyMostSeriousPotentialInjury,
                    ReqBody.TOJSAHEADER.isActive,
                    ReqBody.TOJSAHEADER.status
                   
       );
  }
  
  catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHEADER", ["","perMitNumber","piD","hasCWP","hasHWP","hasCSE",
		                           "taskDescription","identifyMostSeriousPotentialInjury","isActive","status"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
       $.trace.error(" JSAHEADER  created Success    "  +ReqBody.TOJSAHEADER.taskDescription );
    
    
    	if (successFlag){ 
    	try{    
    	    
    	   TOJSAREVIEW_query =  "INSERT INTO \"IOP\".\"JSAREVIEW\" VALUES (?,?,?,?,?,?,?)" ;
       conn.executeUpdate(
    		   TOJSAREVIEW_query,
    		   perMitNumber,
              ReqBody.TOJSAREVIEW.createdBy,
              ReqBody.TOJSAREVIEW.approvedBy,
              ReqBody.TOJSAREVIEW.approvedDate,
              ReqBody.TOJSAREVIEW.lastUpdatedBy,
              ReqBody.TOJSAREVIEW.createdDate, // lastupdateddate should be equal to created date
              ReqBody.TOJSAREVIEW.createdDate
 );
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAREVIEW", ["","perMitNumber","createdBy","approvedBy","approvedDate","lastUpdatedBy",
		                           "createdDate","createdDate"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	}  
    	if (successFlag){ 
    	
    	try{
    	
    	   TOJSARISKASS_query =  "INSERT INTO \"IOP\".\"JSARISKASSESMENT\" VALUES (?,?,?)" ;
       conn.executeUpdate(
    		   TOJSARISKASS_query,
    		   perMitNumber,
              ReqBody.TOJSARISKASS.mustModifyExistingWorkPractice,
              ReqBody.TOJSARISKASS.hasContinuedRisk
              
 );
 
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSARISKASS", ["","perMitNumber","mustModifyExistingWorkPractice","hasContinuedRisk"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	}
    	
    		if (successFlag){ 
    	
    	try{
    	
       
       TOJSE_PPE_query =  "INSERT INTO \"IOP\".\"JSA_PPE\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
       conn.executeUpdate(
    		   TOJSE_PPE_query,
    		   perMitNumber,
              ReqBody.TOJSE_PPE.hardHat,
              ReqBody.TOJSE_PPE.safetyBoot,
              ReqBody.TOJSE_PPE.goggles,
              ReqBody.TOJSE_PPE.faceShield,
              ReqBody.TOJSE_PPE.safetyGlasses,
              ReqBody.TOJSE_PPE.singleEar,
              ReqBody.TOJSE_PPE.doubleEars,
              ReqBody.TOJSE_PPE.respiratorTypeDescription,
              ReqBody.TOJSE_PPE.needSCBA,
              ReqBody.TOJSE_PPE.needDustMask,
              ReqBody.TOJSE_PPE.cottonGlove,
              ReqBody.TOJSE_PPE.leatherGlove,
              ReqBody.TOJSE_PPE.impactProtection,
              ReqBody.TOJSE_PPE.gloveDescription,
              ReqBody.TOJSE_PPE.chemicalGloveDescription,
              ReqBody.TOJSE_PPE.fallProtection,
              ReqBody.TOJSE_PPE.fallRestraint,
              ReqBody.TOJSE_PPE.chemicalSuit,
              ReqBody.TOJSE_PPE.apron,
              ReqBody.TOJSE_PPE.flameResistantClothing,
              ReqBody.TOJSE_PPE.otherPPEDescription,
              ReqBody.TOJSE_PPE.needFoulWeatherGear,
              ReqBody.TOJSE_PPE.haveConsentOfTaskLeader,
              ReqBody.TOJSE_PPE.companyOfTaskLeader
              
 );
 
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSE_PPE", ["","perMitNumber","hardHat","safetyBoot","goggles","faceShield","safetyGlasses","singleEar","doubleEars","respiratorTypeDescription"
		 ,"needSCBA","needDustMask","cottonGlove","leatherGlove","impactProtection","gloveDescription","chemicalGloveDescription","fallProtection","fallRestraint","chemicalSuit",
		 "apron","flameResistantClothing","otherPPEDescription","needFoulWeatherGear","haveConsentOfTaskLeader","companyOfTaskLeader"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    		}
       
       	if (successFlag){ 
    	
    	try{
       var maxlength=ReqBody.TOPTWPEOPLE.length;
      var seId = "";
      for(i=0;i<maxlength;i++) {
  	  seId = getSerialNo();
       TOPTWPEOPLE_query =  "INSERT INTO \"IOP\".\"PTWPEOPLE\" VALUES (?,?,?,?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOPTWPEOPLE_query,
		      seId,
		      perMitNumber,
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
		 errorPrint("TOPTWPEOPLE", ["","seId","perMitNumber","firstName","lastName","contactNumber","hasSignedJSA","hasSignedCWP","hasSignedHWP","hasSignedCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
       	}
      
      
       	if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDPRESS_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSPRESSURIZED\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		 TOJSAHAZARDPRESS_query,
    		 perMitNumber,
             ReqBody.TOJSAHAZARDPRESS.presurizedEquipment,
             ReqBody.TOJSAHAZARDPRESS.performIsolation,
             ReqBody.TOJSAHAZARDPRESS.depressurizeDrain,
             ReqBody.TOJSAHAZARDPRESS.relieveTrappedPressure,
             ReqBody.TOJSAHAZARDPRESS.doNotWorkInLineOfFire,
             ReqBody.TOJSAHAZARDPRESS.anticipateResidual,
             ReqBody.TOJSAHAZARDPRESS.secureAllHoses
);

}

	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDPRESS", ["","perMitNumber","presurizedEquipment","performIsolation","depressurizeDrain","relieveTrappedPressure",
		 "doNotWorkInLineOfFire","anticipateResidual","secureAllHoses"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
      	if (successFlag){ 
    	
    	try{
      TOJSAHAZARDVISIBLE_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSVISIBILITY\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDVISIBLE_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDVISIBLE.poorLighting,
             ReqBody.TOJSAHAZARDVISIBLE.provideAlternateLighting,
             ReqBody.TOJSAHAZARDVISIBLE.waitUntilVisibilityImprove,
             ReqBody.TOJSAHAZARDVISIBLE.deferUntilVisibilityImprove,
             ReqBody.TOJSAHAZARDVISIBLE.knowDistanceFromPoles
             
);

}

	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDVISIBLE", ["","perMitNumber","poorLighting","provideAlternateLighting","waitUntilVisibilityImprove","deferUntilVisibilityImprove",
		 "knowDistanceFromPoles"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}

if (successFlag){ 
    	
    	try{
      TOJSAHAZARDPERSON_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSPERSONNEL\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDPERSON_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDPERSON.personnel,
             ReqBody.TOJSAHAZARDPERSON.performInduction,
             ReqBody.TOJSAHAZARDPERSON.mentorCoachSupervise,
             ReqBody.TOJSAHAZARDPERSON.verifyCompetencies,
             ReqBody.TOJSAHAZARDPERSON.addressLimitations,
             ReqBody.TOJSAHAZARDPERSON.manageLanguageBarriers,
             ReqBody.TOJSAHAZARDPERSON.wearSeatBelts
             
);

}

	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDPERSON", ["","perMitNumber","personnel","performInduction","mentorCoachSupervise","verifyCompetencies",
		 "addressLimitations","manageLanguageBarriers","wearSeatBelts"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
if (successFlag){ 
    	
    	try{

      TOJSAHAZARDCSE_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSCSE\" VALUES (?,?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDCSE_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDCSE.confinedSpaceEntry,
             ReqBody.TOJSAHAZARDCSE.discussWorkPractice,
             ReqBody.TOJSAHAZARDCSE.conductAtmosphericTesting,
             ReqBody.TOJSAHAZARDCSE.monitorAccess,
             ReqBody.TOJSAHAZARDCSE.protectSurfaces,
             ReqBody.TOJSAHAZARDCSE.prohibitMobileEngine,
             ReqBody.TOJSAHAZARDCSE.provideObserver,
             ReqBody.TOJSAHAZARDCSE.developRescuePlan
             
);

}

	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDCSE", ["","perMitNumber","confinedSpaceEntry","discussWorkPractice","conductAtmosphericTesting","monitorAccess",
		 "protectSurfaces","prohibitMobileEngine","provideObserver","developRescuePlan"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDSIMULTAN_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSSIMULTANEOUS\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDSIMULTAN_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDSIMULTAN.simultaneousOperations,
             ReqBody.TOJSAHAZARDSIMULTAN.followSimopsMatrix,
             ReqBody.TOJSAHAZARDSIMULTAN.mocRequiredFor,
             ReqBody.TOJSAHAZARDSIMULTAN.interfaceBetweenGroups,
             ReqBody.TOJSAHAZARDSIMULTAN.useBarriersAnd,
             ReqBody.TOJSAHAZARDSIMULTAN.havePermitSigned
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSIMULTAN", ["","perMitNumber","simultaneousOperations","followSimopsMatrix","mocRequiredFor","interfaceBetweenGroups",
		 "useBarriersAnd","havePermitSigned"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
      
      if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDIGNITION_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSIGNITION\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDIGNITION_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDIGNITION.ignitionSources,
             ReqBody.TOJSAHAZARDIGNITION.removeCombustibleMaterials,
             ReqBody.TOJSAHAZARDIGNITION.provideFireWatch,
             ReqBody.TOJSAHAZARDIGNITION.implementAbrasiveBlastingControls,
             ReqBody.TOJSAHAZARDIGNITION.conductContinuousGasTesting,
             ReqBody.TOJSAHAZARDIGNITION.earthForStaticElectricity
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDIGNITION", ["","perMitNumber","ignitionSources","removeCombustibleMaterials","provideFireWatch","implementAbrasiveBlastingControls",
		 "conductContinuousGasTesting","earthForStaticElectricity"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
if (successFlag){ 
    	
    	try{

      TOJSAHAZARDSUBS_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSSUBSTANCES\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDSUBS_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDSUBS.hazardousSubstances,
             ReqBody.TOJSAHAZARDSUBS.drainEquipment,
             ReqBody.TOJSAHAZARDSUBS.followSdsControls,
             ReqBody.TOJSAHAZARDSUBS.implementHealthHazardControls,
             ReqBody.TOJSAHAZARDSUBS.testMaterial
);
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSUBS", ["","perMitNumber","hazardousSubstances","drainEquipment","followSdsControls","implementHealthHazardControls",
		 "testMaterial"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
if (successFlag){ 
    	
    	try{


      TOJSAHAZARDSPILL_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSSPILLS\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDSPILL_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDSPILL.potentialSpills,
             ReqBody.TOJSAHAZARDSPILL.drainEquipment,
             ReqBody.TOJSAHAZARDSPILL.connectionsInGoodCondition,
             ReqBody.TOJSAHAZARDSPILL.spillContainmentEquipment,
             ReqBody.TOJSAHAZARDSPILL.haveSpillCleanupMaterials,
             ReqBody.TOJSAHAZARDSPILL.restrainHosesWhenNotInUse
);
      
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSPILL", ["","perMitNumber","potentialSpills","drainEquipment","connectionsInGoodCondition","spillContainmentEquipment",
		 "haveSpillCleanupMaterials","restrainHosesWhenNotInUse"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
}
if (successFlag){ 
    	
    	try{


      TOJSAHAZARDWEATHER_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSWEATHER\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDWEATHER_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDWEATHER.weather,
             ReqBody.TOJSAHAZARDWEATHER.controlsForSlipperySurface,
             ReqBody.TOJSAHAZARDWEATHER.heatBreak,
             ReqBody.TOJSAHAZARDWEATHER.coldHeaters,
             ReqBody.TOJSAHAZARDWEATHER.lightning
);

}

	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDWEATHER", ["","perMitNumber","weather","controlsForSlipperySurface","heatBreak","coldHeaters",
		 "lightning"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDNOISE_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSHIGHNOISE\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDNOISE_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDNOISE.highNoise,
             ReqBody.TOJSAHAZARDNOISE.wearCorrectHearing,
             ReqBody.TOJSAHAZARDNOISE.manageExposureTimes,
             ReqBody.TOJSAHAZARDNOISE.shutDownEquipment,
             ReqBody.TOJSAHAZARDNOISE.useQuietTools,
             ReqBody.TOJSAHAZARDNOISE.soundBarriers,
             ReqBody.TOJSAHAZARDNOISE.provideSuitableComms
);

}
catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDNOISE", ["","perMitNumber","highNoise","wearCorrectHearing","manageExposureTimes","useQuietTools",
		 "soundBarriers","provideSuitableComms"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDDROPPED_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSDROPPED\" VALUES (?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDDROPPED_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDDROPPED.droppedObjects,
             ReqBody.TOJSAHAZARDDROPPED.markRestrictEntry,
             ReqBody.TOJSAHAZARDDROPPED.useLiftingEquipmentToRaise,
             ReqBody.TOJSAHAZARDDROPPED.secureTools
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDDROPPED", ["","perMitNumber","droppedObjects","markRestrictEntry","useLiftingEquipmentToRaise",
		 "secureTools"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}

if (successFlag){ 
    	
    	try{
      TOJSAHAZARDLIFT_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSLIFTING\" VALUES (?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDLIFT_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDLIFT.liftingEquipment,
             ReqBody.TOJSAHAZARDLIFT.confirmEquipmentCondition,
             ReqBody.TOJSAHAZARDLIFT.obtainApprovalForLifts,
             ReqBody.TOJSAHAZARDLIFT.haveDocumentedLiftPlan
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDLIFT", ["","perMitNumber","liftingEquipment","confirmEquipmentCondition","obtainApprovalForLifts",
		 "haveDocumentedLiftPlan"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}
      if (successFlag){ 
    	
    	try{
    	    
      TOJSAHAZARDHEIGHT_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSHEIGHTS\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDHEIGHT_query,
    		  perMitNumber,
             ReqBody.TOJSAHAZARDHEIGHT.workAtHeights,
             ReqBody.TOJSAHAZARDHEIGHT.discussWorkingPractice,
             ReqBody.TOJSAHAZARDHEIGHT.verifyFallRestraint,
             ReqBody.TOJSAHAZARDHEIGHT.useFullBodyHarness,
             ReqBody.TOJSAHAZARDHEIGHT.useLockTypeSnaphoooks
);
}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDHEIGHT", ["","perMitNumber","workAtHeights","discussWorkingPractice","verifyFallRestraint",
		 "useFullBodyHarness","useLockTypeSnaphoooks"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
      if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDELECTRICAL_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSELECTRICAL\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDELECTRICAL_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDELECTRICAL.portableElectricalEquipment,
             ReqBody.TOJSAHAZARDELECTRICAL.inspectToolsForCondition,
             ReqBody.TOJSAHAZARDELECTRICAL.implementGasTesting,
             ReqBody.TOJSAHAZARDELECTRICAL.protectElectricalLeads,
             ReqBody.TOJSAHAZARDELECTRICAL.identifyEquipClassification
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDELECTRICAL", ["","perMitNumber","portableElectricalEquipment","inspectToolsForCondition","implementGasTesting",
		 "protectElectricalLeads","identifyEquipClassification"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
if (successFlag){ 
    	
    	try{

      
      TOJSAHAZARDMOVING_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSMOVING\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDMOVING_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDMOVING.movingEquipment,
             ReqBody.TOJSAHAZARDMOVING.confirmMachineryIntegrity,
             ReqBody.TOJSAHAZARDMOVING.provideProtectiveBarriers,
             ReqBody.TOJSAHAZARDMOVING.observerToMonitorProximityPeopleAndEquipment,
             ReqBody.TOJSAHAZARDMOVING.lockOutEquipment,
             ReqBody.TOJSAHAZARDMOVING.doNotWorkInLineOfFire
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMOVING", ["","perMitNumber","movingEquipment","confirmMachineryIntegrity","provideProtectiveBarriers",
		 "observerToMonitorProximityPeopleAndEquipment","lockOutEquipment","doNotWorkInLineOfFire"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}
if (successFlag){ 
    	
    	try{

      TOJSAHAZARDMANUAL_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSMANUAL\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDMANUAL_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDMANUAL.manualHandling,
             ReqBody.TOJSAHAZARDMANUAL.assessManualTask,
             ReqBody.TOJSAHAZARDMANUAL.limitLoadSize,
             ReqBody.TOJSAHAZARDMANUAL.properLiftingTechnique,
             ReqBody.TOJSAHAZARDMANUAL.confirmStabilityOfLoad,
             ReqBody.TOJSAHAZARDMANUAL.getAssistanceOrAid
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMANUAL", ["","perMitNumber","manualHandling","assessManualTask","limitLoadSize",
		 "properLiftingTechnique","confirmStabilityOfLoad","getAssistanceOrAid"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDTOOLS_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSTOOLS\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDTOOLS_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDTOOLS.EquipmentAndTools,
             ReqBody.TOJSAHAZARDTOOLS.inspectEquipmentTool,
             ReqBody.TOJSAHAZARDTOOLS.brassToolsNecessary,
             ReqBody.TOJSAHAZARDTOOLS.useProtectiveGuards,
             ReqBody.TOJSAHAZARDTOOLS.useCorrectTools,
             ReqBody.TOJSAHAZARDTOOLS.checkForSharpEdges,
             ReqBody.TOJSAHAZARDTOOLS.applyHandSafetyPrinciple
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDTOOLS", ["","perMitNumber","EquipmentAndTools","inspectEquipmentTool","brassToolsNecessary",
		 "useProtectiveGuards","useCorrectTools","checkForSharpEdges","applyHandSafetyPrinciple"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}
if (successFlag){ 
    	
    	try{

      TOJSAHAZARDFALLS_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSFALLS\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDFALLS_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDFALLS.slipsTripsAndFalls,
             ReqBody.TOJSAHAZARDFALLS.identifyProjections,
             ReqBody.TOJSAHAZARDFALLS.flagHazards,
             ReqBody.TOJSAHAZARDFALLS.secureCables,
             ReqBody.TOJSAHAZARDFALLS.cleanUpLiquids,
             ReqBody.TOJSAHAZARDFALLS.barricadeHoles
);
}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDFALLS", ["","perMitNumber","slipsTripsAndFalls","identifyProjections","flagHazards",
		 "secureCables","cleanUpLiquids","barricadeHoles"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
if (successFlag){ 
    	
    	try{

      TOJSAHAZARDVOLTAGE_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSVOLTAGE\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDVOLTAGE_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDVOLTAGE.highVoltage,
             ReqBody.TOJSAHAZARDVOLTAGE.restrictAccess,
             ReqBody.TOJSAHAZARDVOLTAGE.dischargeEquipment,
             ReqBody.TOJSAHAZARDVOLTAGE.observeSafeWorkDistance,
             ReqBody.TOJSAHAZARDVOLTAGE.useFlashBurn,
             ReqBody.TOJSAHAZARDVOLTAGE.useInsulatedGloves
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDVOLTAGE", ["","perMitNumber","highVoltage","restrictAccess","dischargeEquipment",
		 "observeSafeWorkDistance","useFlashBurn","useInsulatedGloves"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDEXCAVATION_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSEXCAVATION\" VALUES (?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDEXCAVATION_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDEXCAVATION.excavations,
             ReqBody.TOJSAHAZARDEXCAVATION.haveExcavationPlan,
             ReqBody.TOJSAHAZARDEXCAVATION.locatePipesByHandDigging,
             ReqBody.TOJSAHAZARDEXCAVATION.deEnergizeUnderground,
             ReqBody.TOJSAHAZARDEXCAVATION.cseControls
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDEXCAVATION", ["","perMitNumber","excavations","haveExcavationPlan","locatePipesByHandDigging",
		 "deEnergizeUnderground","cseControls"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}

if (successFlag){ 
    	
    	try{
      
      TOJSAHAZARDMOBILE_query =  "INSERT INTO \"IOP\".\"JSAHAZARDSMOBILE\" VALUES (?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOJSAHAZARDMOBILE_query,
   		     perMitNumber,
             ReqBody.TOJSAHAZARDMOBILE.mobileEquipment,
             ReqBody.TOJSAHAZARDMOBILE.assessEquipmentCondition,
             ReqBody.TOJSAHAZARDMOBILE.controlAccess,
             ReqBody.TOJSAHAZARDMOBILE.monitorProximity,
             ReqBody.TOJSAHAZARDMOBILE.manageOverheadHazards,
             ReqBody.TOJSAHAZARDMOBILE.adhereToRules
);

}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMOBILE", ["","perMitNumber","mobileEquipment","assessEquipmentCondition","controlAccess",
		 "monitorProximity","manageOverheadHazards","adhereToRules"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}
      
      if (successFlag){ 
    	
    	try{
      var maxlength=ReqBody.TOJSASTEPS.length;
      var steps = "";
      for(i=0;i<maxlength;i++) {
    	  steps = getJSASTEPSSerialNo();
    	  TOJSASTEPS_query =  "INSERT INTO \"IOP\".\"JSASTEPS\" VALUES (?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOJSASTEPS_query,
    		  steps,
		      perMitNumber,
              ReqBody.TOJSASTEPS[i].taskSteps,
              ReqBody.TOJSASTEPS[i].potentialHazards,
              ReqBody.TOJSASTEPS[i].hazardControls,
              ReqBody.TOJSASTEPS[i].personResponsible
              
	    
            ); 
      }
      
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSASTEPS", ["","steps","perMitNumber","taskSteps","potentialHazards","hazardControls",
		 "personResponsible"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
      }
      
      if (successFlag){ 
    	
    	try{
      
      var maxlength=ReqBody.TOJSASTOP.length;
      var stop = "";
      for(i=0;i<maxlength;i++) {
    	  stop = getJSASTOPSerialNo();
    	  TOJSASTOP_query =  "INSERT INTO \"IOP\".\"JSASTOPTRIGGER\" VALUES (?,?,?)" ;
      conn.executeUpdate(
    		  TOJSASTOP_query,
    		  stop,
		      perMitNumber,
              ReqBody.TOJSASTOP[i].lineDescription
            ); 
      }
      
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSASTOP", ["","stop","perMitNumber","lineDescription"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
      }
      
      if (successFlag){ 
    	
    	try{
      
      var maxlength=ReqBody.TOJSALOCATION.length;
      var  TOJSA_LOCATION_query;
      var jsalocation = "";
      
      for(i=0;i<maxlength;i++) {
    	  jsalocation = getTOJSALOCATION();
    	  TOJSA_LOCATION_query =  "INSERT INTO \"IOP\".\"JSA_LOCATION\" VALUES (?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOJSA_LOCATION_query,
    		  jsalocation,
    		  perMitNumber,
              ReqBody.TOJSALOCATION[i].facilityOrSite,
              ReqBody.TOJSALOCATION[i].hierachyLevel,
              ReqBody.TOJSALOCATION[i].facility,
              ReqBody.TOJSALOCATION[i].muwi
             
            ); 
      
      }
      
    	}
    	
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSALOCATION", ["","jsalocation","perMitNumber","facilityOrSite","hierachyLevel","facility","muwi"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
      }
      
      // Create Service for PTW table 
      
      
     // Need to Update the Logic Part 
     
//      var ptwHeader = "";
//      var respMsg = "";
//      if(ptwHeader){
//    	  respMsg = "Created Successfully";
//      }else{
//    	  respMsg = "JSA created successfully";
//      }
   
      
   
      var  ptwConditionChk= "";
		try{
			if (ReqBody && ReqBody.TOPTWHEADER ) {
				 var maxlength=ReqBody.TOPTWHEADER.length;
			for(i=0;i<maxlength;i++) {
//      	  ptwHeader = "";
				if (ReqBody.TOPTWHEADER[i].isCWP === 1) {
					ptwConditionChk = true;
				} else if( ReqBody.TOPTWHEADER[i].isHWP === 1) {
					ptwConditionChk = true;
				}else if(ReqBody.TOPTWHEADER[i].isCSE === 1){
					ptwConditionChk = true;
				}
			}
		}
	}catch(e){
		ptwConditionChk = "";
	}
      
    if (ptwConditionChk) {
		
	  
    var  ptwHeader = "";
      for(i=0;i<maxlength;i++) {
    	  ptwHeader = "";
    	  if (ReqBody.TOPTWHEADER[i].isCWP === 1) {
    		  ptwHeader = "CWP" + PermitNumber;
    		  output.ptwPermitNumber.push(ptwHeader); // PTW Numbers to be added to output.
    		   isCWP = true;    // Flag to check the permit
		} else if( ReqBody.TOPTWHEADER[i].isHWP === 1) {
			ptwHeader = "HWP" + PermitNumber;
			 output.ptwPermitNumber.push(ptwHeader); // PTW Numbers to be added to output.
			  isHWP = true;    // Flag to check the permit
		}else if(ReqBody.TOPTWHEADER[i].isCSE === 1){
			ptwHeader = "CSE" + PermitNumber;
			 output.ptwPermitNumber.push(ptwHeader); // PTW Numbers to be added to output.
			  isCSE = true;    // Flag to check the permit
		}
    	  
    	  if (successFlag){ 
    	
    	try{
    	  
    	  
    	  TOPTWHEADER_query =  "INSERT INTO \"IOP\".\"PTWHEADER\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOPTWHEADER_query,
    		  perMitNumber,
    		  ptwHeader,
              ReqBody.TOPTWHEADER[i].isCWP,
              ReqBody.TOPTWHEADER[i].isHWP,
              ReqBody.TOPTWHEADER[i].isCSE,
              ReqBody.TOPTWHEADER[i].plannedDateTime,
              ReqBody.TOPTWHEADER[i].location,
              ReqBody.TOPTWHEADER[i].createdBy,
              ReqBody.TOPTWHEADER[i].contractorPerformingWork,
              ReqBody.TOPTWHEADER[i].estimatedTimeOfCompletion,
              ReqBody.TOPTWHEADER[i].equipmentID,
              ReqBody.TOPTWHEADER[i].workOrderNumber,
              ReqBody.TOPTWHEADER[i].status
            ); 
      }
      
      catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWHEADER", ["","perMitNumber","ptwHeader","isCWP","isHWP","isCSE",
		 "plannedDateTime","location","createdBy","contractorPerformingWork","estimatedTimeOfCompletion","equipmentID",
		 "workOrderNumber","status"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
      
    	  }
    	  
    	  
      }
      
    	  
      if (successFlag){ 
    	
    	try{
    	    
      var maxlength=ReqBody.TOPTWREQDOC.length;
      var ptwreqDoc = "";
      for(i=0;i<maxlength;i++) {
    	  ptwreqDoc = getPTWREQDOC();
    	  TOPTWREQDOC_query =  "INSERT INTO \"IOP\".\"PTWREQUIREDDOCUMENT\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOPTWREQDOC_query,
    		  ptwreqDoc,
    		  perMitNumber,
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
              ReqBody.TOPTWREQDOC[i].safeWorkPractice
            ); 
      }
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWREQDOC", ["","ptwreqDoc","perMitNumber","isCWP","isHWP","isCSE",
		 "atmosphericTestRecord","loto","procedure","pAndIdOrDrawing","certificate","temporaryDefeat",
		 "rescuePlan","rescuePlan","sds","otherWorkPermitDocs","fireWatchChecklist","liftPlan","simopDeviation","safeWorkPractice"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
      }
      
//      var maxlength=ReqBody.TOPTWAPPROVAL.length;
//      var ptwApproval = "";
//      for(i=0;i<maxlength;i++) {
//    	  ptwApproval = getPTWAPPROVAL();
//    	  TOPTWAPPROVAL_query =  "INSERT INTO \"IOP\".\"PTWAPPROVAL\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
//      conn.executeUpdate(
//    		  TOPTWAPPROVAL_query,
//    		  ptwApproval,
//    		  perMitNumber,
//              ReqBody.TOPTWAPPROVAL[i].isCWP,
//              ReqBody.TOPTWAPPROVAL[i].isHWP,
//              ReqBody.TOPTWAPPROVAL[i].isCSE,
//              ReqBody.TOPTWAPPROVAL[i].isWorkSafeToPerform,
//              ReqBody.TOPTWAPPROVAL[i].prejobWalkthroughBy,
//              ReqBody.TOPTWAPPROVAL[i].approvedBy,
//              ReqBody.TOPTWAPPROVAL[i].approvalDate,
//              ReqBody.TOPTWAPPROVAL[i].controlBoardDistribution,
//              ReqBody.TOPTWAPPROVAL[i].worksiteDistribution,
//              ReqBody.TOPTWAPPROVAL[i].simopsDistribution,
//              ReqBody.TOPTWAPPROVAL[i].otherDistribution,
//              ReqBody.TOPTWAPPROVAL[i].picName,
//              ReqBody.TOPTWAPPROVAL[i].picDate,
//              ReqBody.TOPTWAPPROVAL[i].superitendentName,
//              ReqBody.TOPTWAPPROVAL[i].superitendentDate
//             
//            ); 
//      }
      
      if (successFlag){ 
    	
    	try{
    	   
    	    
    var	  ptwtestRec = getPTWTESTREC();
    	  TOPTWTESTREC_query =  "INSERT INTO \"IOP\".\"PTWTESTRECORD\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOPTWTESTREC_query,
    		  ptwtestRec,
    		  perMitNumber,
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
              ReqBody.TOPTWTESTREC.Other
             
            ); 
            
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWTESTREC", ["","ptwtestRec","perMitNumber","isCWP","isHWP","isCSE",
		 "detectorUsed","DateOfLastCalibration","testingFrequency","continuousGasMonitoring","priorToWorkCommencing","eachWorkPeriod",
		 "everyHour","gasTester","gasTesterComments","areaTobeTested","deviceSerialNo","isO2","isLELs","isH2S","Other"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
      }
      
if (successFlag){ 
    	
    	try{
    	     var maxlength=ReqBody.TOPTWATESTRES.length;
      var ptwatestres = "";
      for(i=0;i<maxlength;i++) {
    	    

    	  ptwatestres = getPTWATESTRES();
    	  TOPTWATESTRES_query =  "INSERT INTO \"IOP\".\"PTWTESTRESULTS\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
      conn.executeUpdate(
    		  TOPTWATESTRES_query,
    		  ptwatestres,
    		  perMitNumber,
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
		 errorPrint("TOPTWATESTRES", ["","ptwatestres","perMitNumber","isCWP","isHWP","isCSE",
		 "preStartOrWorkTest","oxygenPercentage","toxicType","flammableGas","othersType","othersResult",
		 "date","time"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
      
//      var maxlength=ReqBody.TOPTWCLOSEOUT.length;
//      var ptwcloseOut = "";
//      for(i=0;i<maxlength;i++) {
//
//       ptwcloseOut = getTOPTWCLOSEOUT();
//      TOPTWCLOSEOUT_query =  "INSERT INTO \"IOP\".\"PTWCLOSEOUT\" VALUES (?,?,?,?,?,?,?,?,?,?)" ; 
//      conn.executeUpdate(
//    		  TOPTWCLOSEOUT_query,
//    		  ptwcloseOut,
//   		     perMitNumber,
//             ReqBody.TOPTWCLOSEOUT[i].isCWP,
//             ReqBody.TOPTWCLOSEOUT[i].isHWP,
//             ReqBody.TOPTWCLOSEOUT[i].isCSE,
//             ReqBody.TOPTWCLOSEOUT[i].picName,
//             ReqBody.TOPTWCLOSEOUT[i].workCompleted,
//             ReqBody.TOPTWCLOSEOUT[i].closedBy,
//             ReqBody.TOPTWCLOSEOUT[i].closedDate,
//             ReqBody.TOPTWCLOSEOUT[i].workStatusComments
//             
//             
//);
//      
//      }

if (successFlag){ 
    	
    	try{
      if(isCWP){
      TOPTWCWPWORK_query =  "INSERT INTO \"IOP\".\"PTW_CWP_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOPTWCWPWORK_query,
   		     perMitNumber,
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
             ReqBody.TOPTWCWPWORK.descriptionOfWorkToBePerformed
             
);
      }
      
    	}
    	
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCWPWORK", ["","perMitNumber","criticalOrComplexLift","craneOrLiftingDevice","groundDisturbanceOrExcavation",
		 "handlingHazardousChemicals","workingAtHeight","paintingOrBlasting","workingOnPressurizedSystems","erectingOrDismantlingScaffolding",
		 "breakingContainmentOfClosedOperatingSystem","workingInCloseToHazardousEnergy","removalOfIdleEquipmentForRepair",
		 "higherRiskElectricalWork","otherTypeOfWork","descriptionOfWorkToBePerformed"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

if (successFlag){ 
    	
    	try{
      if(isHWP){
      TOPTWHWPWORK_query =  "INSERT INTO \"IOP\".\"PTW_HWP_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOPTWHWPWORK_query,
   		     perMitNumber,
             ReqBody.TOPTWHWPWORK.cutting,
             ReqBody.TOPTWHWPWORK.wielding,
             ReqBody.TOPTWHWPWORK.electricalPoweredEquipment,
             ReqBody.TOPTWHWPWORK.grinding,
             ReqBody.TOPTWHWPWORK.abrasiveBlasting,
             ReqBody.TOPTWHWPWORK.otherTypeOfWork,
             ReqBody.TOPTWHWPWORK.descriptionOfWorkToBePerformed
             
);
      }
      
    	}
    	
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWHWPWORK", ["","perMitNumber","cutting","wielding","electricalPoweredEquipment",
		 "grinding","abrasiveBlasting","otherTypeOfWork","descriptionOfWorkToBePerformed"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
}

if (successFlag){ 
    	
    	try{
      if(isCSE){
      // new changes in column level 
      TOPTWCSEWORK_query =  "INSERT INTO \"IOP\".\"PTW_CSE_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?)" ; 
      conn.executeUpdate(
    		  TOPTWCSEWORK_query,
   		     perMitNumber,
             ReqBody.TOPTWCSEWORK.tank,
             ReqBody.TOPTWCSEWORK.vessel,
             ReqBody.TOPTWCSEWORK.excavation,
             ReqBody.TOPTWCSEWORK.pit,
             ReqBody.TOPTWCSEWORK.tower,
             ReqBody.TOPTWCSEWORK.other,
             ReqBody.TOPTWCSEWORK.reasonForCSE
             
);
      }
    	}
    	
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWCSEWORK", ["","perMitNumber","tank","vessel","excavation",
		 "pit","tower","other","reasonForCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
     
      }
      

      
      
      var respMsg = "";
      if (successFlag){ 
    	
    	try{
      if(ptwConditionChk){
    	  respMsg ="JSA " +perMitNumber + " created successfully"; // Send back the JSA number to UI
      }else{
    	  respMsg =  "JSA "+perMitNumber + " created successfully"; // Send back the JSA number to UI
      }
    	  conn.commit();
       $.response.contentType = 'application/json ;charset=UTF-8';
       output.Success = respMsg; // Append success message to output
       output.jsaPermitNumber = piD;// Append JSA Permit Number to output
       output.permitNumber = perMitNumber; // Append Permit Number to output
       $.response.setBody(JSON.stringify(output));
       
    	}
    	
    		catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to Create the Request");
					}
    	
      }
      
             if(successFlag){
          	var currentdatetime =  new Date();
	// Calculate GMT date time
	var GMTdatetime = new Date(currentdatetime.valueOf() + currentdatetime.getTimezoneOffset() * 60000); 
	
	var isActive = 1;
	var updateJSAHEADER =  ("UPDATE \"IOP\".\"JSAHEADER\" SET \"STATUS\" ='" + ReqBody.TOJSAHEADER.status + "',\"ISACTIVE\"= " + parseInt(isActive) + " where \"JSAPERMITNUMBER\"='" + piD + "'");

	 conn = $.hdb.getConnection();
	conn.executeUpdate(updateJSAHEADER);
	
	
	var updateJSAREVIEW = 'UPDATE "IOP"."JSAREVIEW" SET "APPROVEDDATE" = ? , "LASTUPDATEDDATE" = ? , "APPROVEDBY"= ? where "PERMITNUMBER"=' + perMitNumber ;

	conn.executeUpdate(updateJSAREVIEW,
			GMTdatetime,
			GMTdatetime,
			ReqBody.TOJSAREVIEW.approvedBy
			);
         try{
             conn.commit();
             
         } 
         
         catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to JSA Approved");
					       successFlag =false;
					}
          
      }
  
  if  (successFlag)  {
       if(isCWP){
      
      	if (ReqBody.TOPTWAPPROVAL) {
		
		var permitNumber =  ReqBody.TOPTWAPPROVAL.permitNumber;
		var isCWP = ReqBody.TOPTWAPPROVAL.isCWP;
		var isHWP = ReqBody.TOPTWAPPROVAL.isHWP;
		var isCSE = ReqBody.TOPTWAPPROVAL.isCSE;
		
	
	
	 conn = $.db.getConnection();
	var updatePTW = 'UPDATE "IOP"."PTWHEADER" SET "STATUS" =? where "PERMITNUMBER"=? AND "ISCWP"=? AND "ISHWP"=? AND "ISCSE"=? ' ;
	
	 conn = $.hdb.getConnection();
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
      
       try{
             conn.commit();
             
         } 
         
         catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to PTW Approved");
					       successFlag =false;
					}
      
      
  }
  
  }
       conn.close();



     
