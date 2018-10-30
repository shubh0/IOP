var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);
var conn = $.hdb.getConnection();
function getPTWREQDOC() {
    var ptwreqDoc;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.PTWREQDOC_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        ptwreqDoc = rs.getString(1);
    }
    return ptwreqDoc;
}
function getJSASTEPSSerialNo() {
    var jsaSteps;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.JSASTEPS_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        jsaSteps = rs.getString(1);
    }
    return jsaSteps;
}
function getPTWAPPROVAL() {
    var ptwApproval;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.PTWAPPROVAL_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        ptwApproval = rs.getString(1);
    }
    return ptwApproval;
}

function getJSASTOPSerialNo() {
    var jsaStop;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.JSASTOP_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        jsaStop = rs.getString(1);
    }
    return jsaStop;
}
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
function getPTWTESTREC() {
    var ptwtestRec;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.PTWTESTREC_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        ptwtestRec = rs.getString(1);
    }
    return ptwtestRec;
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

function getTOPTWCLOSEOUT() {
    var ptwcloseOut;
    var con = $.db.getConnection();
    var sts = con.prepareStatement("select IOP.CLOSE_OUT_SEQ.NEXTVAL FROM DUMMY");
    var rs = sts.executeQuery();
    while (rs.next()) {
        ptwcloseOut = rs.getString(1);
    }
    return ptwcloseOut;
}

function getTOJSALOCATION() {
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

function getStatusCode(msg) {
    var m = msg.match('\\:\\s(\\d+)\\s\\-');
    return (m) ? parseInt(m[1], 10) : null;
}
var code = 0;
////*************************** This function is to call the Rest Service which sends the notification ****************************////
function sendPushNotification(createdBy,permitNumber){
	try{
	var destination;
	var client;
	destination = $.net.http.readDestination("IOP","PushNotification_Dest");
	client = new $.net.http.Client();
	  var request = new $.net.http.Request($.net.http.POST,"");
	  request.headers.set("Content-Type","application/json");
	  
	  
	  
	  request.setBody(JSON.stringify(
			  {
				  "notification": {
				  "alert": "Permit " + permitNumber + " has been updated",
				  "sound": "default"
				  },
				  "users": [createdBy]
				  }));
	  
	  client.request(request, destination);
	  //Checking the status ( 201 for success )
	 
	  return(client.getResponse());
			  
	}
	catch(e){
		return e.message;
	}
	
}
var successFlag = true;
try{

    // JSA Header  Table Update  ----------------------------------------------

    var TOJSAHEADER = "UPDATE \"IOP\".\"JSAHEADER\" SET  \"HASCWP\"=?,\"HASHWP\"=?,\"HASCSE\"=?,\"TASKDESCRIPTION\"=?,\"IDENTIFYMOSTSERIOUSPOTENTIALINJURY\"=?,\"ISACTIVE\"=?,\"STATUS\"=? WHERE \"PERMITNUMBER\"=?";
    var taskPermitNo = "" ;
    if (ReqBody.TOJSAHAZARDMOBILE) {
	
    	 taskPermitNo = "" +  ReqBody.TOJSAHAZARDMOBILE.permitNumber;
}
    var conn = $.hdb.getConnection();
    
    if (ReqBody.TOJSAHEADER) {
    	conn.executeUpdate(
    			TOJSAHEADER,
    			ReqBody.TOJSAHEADER.hasCWP,
    			ReqBody.TOJSAHEADER.hasHWP,
    			ReqBody.TOJSAHEADER.hasCSE,
    			ReqBody.TOJSAHEADER.taskDescription,
    			ReqBody.TOJSAHEADER.identifyMostSeriousPotentialInjury,
    			ReqBody.TOJSAHEADER.isActive,
    			ReqBody.TOJSAHEADER.status,
    			ReqBody.TOJSAHEADER.permitNumber
    	);
	}
	
}

catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHEADER", ["","hasCWP","hasHWP","hasCSE",
		                           "taskDescription","identifyMostSeriousPotentialInjury","isActive","status","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

    // JSA REVIEW Table Update ----------------------------------------------------
if(successFlag){
    try{
    var TOJSAREVIEW = "UPDATE \"IOP\".\"JSAREVIEW\" SET  \"CREATEDBY\"=?,\"APPROVEDBY\"=?," +
        "\"APPROVEDDATE\"=?,\"LASTUPDATEDBY\"=?,\"LASTUPDATEDDATE\"=?,\"CREATEDDATE\"=? WHERE \"PERMITNUMBER\"=?";

    if (ReqBody.TOJSAREVIEW) {
    	conn.executeUpdate(
    			TOJSAREVIEW,
    			ReqBody.TOJSAREVIEW.createdBy,
    			ReqBody.TOJSAREVIEW.approvedBy,
    			ReqBody.TOJSAREVIEW.approvedDate,
    			ReqBody.TOJSAREVIEW.lastUpdatedBy,
    			ReqBody.TOJSAREVIEW.lastUpdatedDate,
    			ReqBody.TOJSAREVIEW.createdDate,
    			ReqBody.TOJSAREVIEW.permitNumber
    	);
		
	}
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAREVIEW", ["","createdBy","approvedBy","approvedDate","lastUpdatedBy",
		                           "lastUpdatedDate","createdDate","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}

    // JSA Risk AssEsment Table Update ----------------------------------------------------
if(successFlag){
    try{
    
    var TOJSARISKASS = "UPDATE \"IOP\".\"JSARISKASSESMENT\" SET  \"MUSTMODIFYEXISTINGWORKPRACTICE\"=?,\"HASCONTINUEDRISK\"=? WHERE \"PERMITNUMBER\"=?";
   
    if (ReqBody.TOJSARISKASS) {
    	conn.executeUpdate(
    			TOJSARISKASS,
    			ReqBody.TOJSARISKASS.mustModifyExistingWorkPractice,
    			ReqBody.TOJSARISKASS.hasContinuedRisk,
    			ReqBody.TOJSARISKASS.permitNumber
    	);
	}
}

 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSARISKASS", ["","mustModifyExistingWorkPractice","hasContinuedRisk","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
    // JSA PPE  Table Update ----------------------------------------------------
if(successFlag){
    try{

    var TOJSE_PPE = "UPDATE \"IOP\".\"JSA_PPE\" SET  \"HARDHAT\"=?,\"SAFETYBOOT\"=?,\"GOGGLES\"=?," +
        "\"FACESHIELD\"=?,\"SAFETYGLASSES\"=?,\"SINGLEEAR\"=?,\"DOUBLEEARS\"=?,\"RESPIRATORTYPEDESCRIPTION\"=?," +
        "\"NEEDSCBA\"=?,\"NEEDDUSTMASK\"=?,\"COTTONGLOVE\"=?,\"LEATHERGLOVE\"=?," +
        "\"IMPACTPROTECTION\"=?,\"GLOVEDESCRIPTION\"=?,\"CHEMICALGLOVEDESCRIPTION\"=?,\"FALLPROTECTION\"=?," +
        "\"FALLRESTRAINT\"=?,\"CHEMICALSUIT\"=?,\"APRON\"=?,\"FLAMERESISTANTCLOTHING\"=?,\"OTHERPPEDESCRIPTION\"=?," +
        "\"NEEDFOULWEATHERGEAR\"=?,\"HAVECONSENTOFTASKLEADER\"=?,\"COMPANYOFTASKLEADER\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSE_PPE) {  
    conn.executeUpdate(
        TOJSE_PPE,
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
        ReqBody.TOJSE_PPE.companyOfTaskLeader,
        ReqBody.TOJSE_PPE.permitNumber
    );
    }
    
    }
     catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSE_PPE", ["","hardHat","safetyBoot","goggles","faceShield","safetyGlasses","singleEar","doubleEars","respiratorTypeDescription"
		 ,"needSCBA","needDustMask","cottonGlove","leatherGlove","impactProtection","gloveDescription","chemicalGloveDescription","fallProtection","fallRestraint","chemicalSuit",
		 "apron","flameResistantClothing","otherPPEDescription","needFoulWeatherGear","haveConsentOfTaskLeader","companyOfTaskLeader","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    
}
    // JSA HAZARDPRESS  Table Update ----------------------------------------------------
if(successFlag){
    try{
    var TOJSAHAZARDPRESS = "UPDATE \"IOP\".\"JSAHAZARDSPRESSURIZED\" SET  \"PRESURIZEDEQUIPMENT\"=?,\"PERFORMISOLATION\"=?,\"DEPRESSURIZEDRAIN\"=?," +
        "\"RELIEVETRAPPEDPRESSURE\"=?,\"DONOTWORKINLINEOFFIRE\"=?,\"ANTICIPATERESIDUAL\"=?,\"SECUREALLHOSES\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDPRESS) {  
    conn.executeUpdate(
        TOJSAHAZARDPRESS,
        ReqBody.TOJSAHAZARDPRESS.presurizedEquipment,
        ReqBody.TOJSAHAZARDPRESS.performIsolation,
        ReqBody.TOJSAHAZARDPRESS.depressurizeDrain,
        ReqBody.TOJSAHAZARDPRESS.relieveTrappedPressure,
        ReqBody.TOJSAHAZARDPRESS.doNotWorkInLineOfFire,
        ReqBody.TOJSAHAZARDPRESS.anticipateResidual,
        ReqBody.TOJSAHAZARDPRESS.secureAllHoses,
        ReqBody.TOJSAHAZARDPRESS.permitNumber
    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDPRESS", ["","presurizedEquipment","performIsolation","depressurizeDrain","relieveTrappedPressure",
		 "doNotWorkInLineOfFire","anticipateResidual","secureAllHoses","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    
}
    
    // JSA HAZARDVISIBILETITY  Table Update ----------------------------------------------------

if(successFlag){
    try{
    var TOJSAHAZARDVISIBLE = "UPDATE \"IOP\".\"JSAHAZARDSVISIBILITY\" SET  \"POORLIGHTING\"=?,\"PROVIDEALTERNATELIGHTING\"=?,\"WAITUNTILVISIBILITYIMPROVE\"=?," +
        "\"DEFERUNTILVISIBILITYIMPROVE\"=?,\"KNOWDISTANCEFROMPOLES\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDVISIBLE) {  
    conn.executeUpdate(
        TOJSAHAZARDVISIBLE,
        ReqBody.TOJSAHAZARDVISIBLE.poorLighting,
        ReqBody.TOJSAHAZARDVISIBLE.provideAlternateLighting,
        ReqBody.TOJSAHAZARDVISIBLE.waitUntilVisibilityImprove,
        ReqBody.TOJSAHAZARDVISIBLE.deferUntilVisibilityImprove,
        ReqBody.TOJSAHAZARDVISIBLE.knowDistanceFromPoles,
        ReqBody.TOJSAHAZARDVISIBLE.permitNumber

    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDVISIBLE", ["","poorLighting","provideAlternateLighting","waitUntilVisibilityImprove","deferUntilVisibilityImprove",
		 "knowDistanceFromPoles","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA JSAHAZARDSPERSONNEL  Table Update ----------------------------------------------------


if(successFlag){
    try{
    var TOJSAHAZARDPERSON = "UPDATE \"IOP\".\"JSAHAZARDSPERSONNEL\" SET  \"PERSONNEL\"=?,\"PERFORMINDUCTION\"=?,\"MENTORCOACHSUPERVISE\"=?," +
        "\"VERIFYCOMPETENCIES\"=?,\"ADDRESSLIMITATIONS\"=?,\"MANAGELANGUAGEBARRIERS\"=?,\"WEARSEATBELTS\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDPERSON) {  
    conn.executeUpdate(
        TOJSAHAZARDPERSON,
        ReqBody.TOJSAHAZARDPERSON.personnel,
        ReqBody.TOJSAHAZARDPERSON.performInduction,
        ReqBody.TOJSAHAZARDPERSON.mentorCoachSupervise,
        ReqBody.TOJSAHAZARDPERSON.verifyCompetencies,
        ReqBody.TOJSAHAZARDPERSON.addressLimitations,
        ReqBody.TOJSAHAZARDPERSON.manageLanguageBarriers,
        ReqBody.TOJSAHAZARDPERSON.wearSeatBelts,
        ReqBody.TOJSAHAZARDPERSON.permitNumber

    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDPERSON", ["","personnel","performInduction","mentorCoachSupervise","verifyCompetencies",
		 "addressLimitations","manageLanguageBarriers","wearSeatBelts","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}

    // JSA HazardsCSE  Table Update ----------------------------------------------------
if(successFlag){
    try{
    var TOJSAHAZARDCSE = "UPDATE \"IOP\".\"JSAHAZARDSCSE\" SET  \"CONFINEDSPACEENTRY\"=?,\"DISCUSSWORKPRACTICE\"=?,\"CONDUCTATMOSPHERICTESTING\"=?," +
        "\"MONITORACCESS\"=?,\"PROTECTSURFACES\"=?,\"PROHIBITMOBILEENGINE\"=?,\"PROVIDEOBSERVER\"=?,\"DEVELOPRESCUEPLAN\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDCSE) {  
    conn.executeUpdate(
        TOJSAHAZARDCSE,
        ReqBody.TOJSAHAZARDCSE.confinedSpaceEntry,
        ReqBody.TOJSAHAZARDCSE.discussWorkPractice,
        ReqBody.TOJSAHAZARDCSE.conductAtmosphericTesting,
        ReqBody.TOJSAHAZARDCSE.monitorAccess,
        ReqBody.TOJSAHAZARDCSE.protectSurfaces,
        ReqBody.TOJSAHAZARDCSE.prohibitMobileEngine,
        ReqBody.TOJSAHAZARDCSE.provideObserver,
        ReqBody.TOJSAHAZARDCSE.developRescuePlan,
        ReqBody.TOJSAHAZARDCSE.permitNumber

    );
    }
    }
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDCSE", ["","confinedSpaceEntry","discussWorkPractice","conductAtmosphericTesting","monitorAccess",
		 "protectSurfaces","prohibitMobileEngine","provideObserver","developRescuePlan","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardsSimultaneous  Table Update ----------------------------------------------------
if(successFlag){
    
    try{

    var TOJSAHAZARDSIMULTAN = "UPDATE \"IOP\".\"JSAHAZARDSSIMULTANEOUS\" SET  \"SIMULTANEOUSOPERATIONS\"=?,\"FOLLOWSIMOPSMATRIX\"=?,\"MOCREQUIREDFOR\"=?," +
        "\"INTERFACEBETWEENGROUPS\"=?,\"USEBARRIERSAND\"=?,\"HAVEPERMITSIGNED\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDSIMULTAN) {  
    conn.executeUpdate(
        TOJSAHAZARDSIMULTAN,
        ReqBody.TOJSAHAZARDSIMULTAN.simultaneousOperations,
        ReqBody.TOJSAHAZARDSIMULTAN.followSimopsMatrix,
        ReqBody.TOJSAHAZARDSIMULTAN.mocRequiredFor,
        ReqBody.TOJSAHAZARDSIMULTAN.interfaceBetweenGroups,
        ReqBody.TOJSAHAZARDSIMULTAN.useBarriersAnd,
        ReqBody.TOJSAHAZARDSIMULTAN.havePermitSigned,
        ReqBody.TOJSAHAZARDSIMULTAN.permitNumber

    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSIMULTAN", ["","simultaneousOperations","followSimopsMatrix","mocRequiredFor","interfaceBetweenGroups",
		 "useBarriersAnd","havePermitSigned","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardssingNiation  Table Update ----------------------------------------------------
if(successFlag){
    
    try{

    var TOJSAHAZARDIGNITION = "UPDATE \"IOP\".\"JSAHAZARDSIGNITION\" SET  \"IGNITIONSOURCES\"=?,\"REMOVECOMBUSTIBLEMATERIALS\"=?,\"PROVIDEFIREWATCH\"=?," +
        "\"IMPLEMENTABRASIVEBLASTINGCONTROLS\"=?,\"CONDUCTCONTINUOUSGASTESTING\"=?,\"EARTHFORSTATICELECTRICITY\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDIGNITION) {  
    conn.executeUpdate(
        TOJSAHAZARDIGNITION,
        ReqBody.TOJSAHAZARDIGNITION.ignitionSources,
        ReqBody.TOJSAHAZARDIGNITION.removeCombustibleMaterials,
        ReqBody.TOJSAHAZARDIGNITION.provideFireWatch,
        ReqBody.TOJSAHAZARDIGNITION.implementAbrasiveBlastingControls,
        ReqBody.TOJSAHAZARDIGNITION.conductContinuousGasTesting,
        ReqBody.TOJSAHAZARDIGNITION.earthForStaticElectricity,
        ReqBody.TOJSAHAZARDIGNITION.permitNumber

    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDIGNITION", ["","ignitionSources","removeCombustibleMaterials","provideFireWatch","implementAbrasiveBlastingControls",
		 "conductContinuousGasTesting","earthForStaticElectricity","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardsSubstance  Table Update ----------------------------------------------------
if(successFlag){
    
    try{
    var TOJSAHAZARDSUBS = "UPDATE \"IOP\".\"JSAHAZARDSSUBSTANCES\" SET  \"HAZARDOUSSUBSTANCES\"=?,\"DRAINEQUIPMENT\"=?,\"FOLLOWSDSCONTROLS\"=?," +
        "\"IMPLEMENTHEALTHHAZARDCONTROLS\"=?,\"TESTMATERIAL\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDSUBS) { 
    conn.executeUpdate(
        TOJSAHAZARDSUBS,
        ReqBody.TOJSAHAZARDSUBS.hazardousSubstances,
        ReqBody.TOJSAHAZARDSUBS.drainEquipment,
        ReqBody.TOJSAHAZARDSUBS.followSdsControls,
        ReqBody.TOJSAHAZARDSUBS.implementHealthHazardControls,
        ReqBody.TOJSAHAZARDSUBS.testMaterial,
        ReqBody.TOJSAHAZARDSUBS.permitNumber

    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSUBS", ["","hazardousSubstances","drainEquipment","followSdsControls","implementHealthHazardControls",
		 "testMaterial","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    
    // JSA HazardsSubstance  Table Update ----------------------------------------------------
if(successFlag){
    
    try{
    var TOJSAHAZARDSPILL = "UPDATE \"IOP\".\"JSAHAZARDSSPILLS\" SET  \"POTENTIALSPILLS\"=?,\"DRAINEQUIPMENT\"=?,\"CONNECTIONSINGOODCONDITION\"=?," +
        "\"SPILLCONTAINMENTEQUIPMENT\"=?,\"HAVESPILLCLEANUPMATERIALS\"=?,\"RESTRAINHOSESWHENNOTINUSE\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDSPILL) { 
    conn.executeUpdate(
        TOJSAHAZARDSPILL,
        ReqBody.TOJSAHAZARDSPILL.potentialSpills,
        ReqBody.TOJSAHAZARDSPILL.drainEquipment,
        ReqBody.TOJSAHAZARDSPILL.connectionsInGoodCondition,
        ReqBody.TOJSAHAZARDSPILL.spillContainmentEquipment,
        ReqBody.TOJSAHAZARDSPILL.haveSpillCleanupMaterials,
        ReqBody.TOJSAHAZARDSPILL.restrainHosesWhenNotInUse,
        ReqBody.TOJSAHAZARDSPILL.permitNumber
    );
    }
    }
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDSPILL", ["","potentialSpills","drainEquipment","connectionsInGoodCondition","spillContainmentEquipment",
		 "haveSpillCleanupMaterials","restrainHosesWhenNotInUse","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardsWeather  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{

    var TOJSAHAZARDWEATHER = "UPDATE \"IOP\".\"JSAHAZARDSWEATHER\" SET  \"WEATHER\"=?,\"CONTROLSFORSLIPPERYSURFACE\"=?,\"HEATBREAK\"=?," +
        "\"COLDHEATERS\"=?,\"LIGHTNING\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDWEATHER) { 
    conn.executeUpdate(
        TOJSAHAZARDWEATHER,
        ReqBody.TOJSAHAZARDWEATHER.weather,
        ReqBody.TOJSAHAZARDWEATHER.controlsForSlipperySurface,
        ReqBody.TOJSAHAZARDWEATHER.heatBreak,
        ReqBody.TOJSAHAZARDWEATHER.coldHeaters,
        ReqBody.TOJSAHAZARDWEATHER.lightning,
        ReqBody.TOJSAHAZARDWEATHER.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDWEATHER", ["","weather","controlsForSlipperySurface","heatBreak","coldHeaters",
		 "lightning","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
    // JSA HazardsNoise  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{
    var TOJSAHAZARDNOISE = "UPDATE \"IOP\".\"JSAHAZARDSHIGHNOISE\" SET  \"HIGHNOISE\"=?,\"WEARCORRECTHEARING\"=?,\"MANAGEEXPOSURETIMES\"=?," +
        "\"SHUTDOWNEQUIPMENT\"=?,\"USEQUIETTOOLS\"=?,\"SOUNDBARRIERS\"=?,\"PROVIDESUITABLECOMMS\"=?  WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDNOISE) { 
    conn.executeUpdate(
        TOJSAHAZARDNOISE,
        ReqBody.TOJSAHAZARDNOISE.highNoise,
        ReqBody.TOJSAHAZARDNOISE.wearCorrectHearing,
        ReqBody.TOJSAHAZARDNOISE.manageExposureTimes,
        ReqBody.TOJSAHAZARDNOISE.shutDownEquipment,
        ReqBody.TOJSAHAZARDNOISE.useQuietTools,
        ReqBody.TOJSAHAZARDNOISE.soundBarriers,
        ReqBody.TOJSAHAZARDNOISE.provideSuitableComms,
        ReqBody.TOJSAHAZARDNOISE.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDNOISE", ["","highNoise","wearCorrectHearing","manageExposureTimes","useQuietTools",
		 "soundBarriers","provideSuitableComms","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardsNoise  Table Update ----------------------------------------------------

    // var TOJSAHAZARDNOISE = "UPDATE \"IOP\".\"JSAHAZARDSHIGHNOISE\" SET  \"HIGHNOISE\"=?,\"WEARCORRECTHEARING\"=?,\"MANAGEEXPOSURETIMES\"=?," +
    //     "\"SHUTDOWNEQUIPMENT\"=?,\"USEQUIETTOOLS\"=?,\"SOUNDBARRIERS\"=?,\"PROVIDESUITABLECOMMS\"=?  WHERE \"PERMITNUMBER\"=?";
    // if (ReqBody.TOJSAHAZARDNOISE) { 
    // conn.executeUpdate(
    //     TOJSAHAZARDNOISE,
    //     ReqBody.TOJSAHAZARDNOISE.highNoise,
    //     ReqBody.TOJSAHAZARDNOISE.wearCorrectHearing,
    //     ReqBody.TOJSAHAZARDNOISE.manageExposureTimes,
    //     ReqBody.TOJSAHAZARDNOISE.shutDownEquipment,
    //     ReqBody.TOJSAHAZARDNOISE.useQuietTools,
    //     ReqBody.TOJSAHAZARDNOISE.soundBarriers,
    //     ReqBody.TOJSAHAZARDNOISE.provideSuitableComms,
    //     ReqBody.TOJSAHAZARDNOISE.permitNumber
    // );
    // }
    // JSA HazardsDropped  Table Update ----------------------------------------------------

if (successFlag){ 
    	
    	try{
    var TOJSAHAZARDDROPPED = "UPDATE \"IOP\".\"JSAHAZARDSDROPPED\" SET  \"DROPPEDOBJECTS\"=?,\"MARKRESTRICTENTRY\"=?,\"USELIFTINGEQUIPMENTTORAISE\"=?," +
        "\"SECURETOOLS\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDDROPPED) { 
    conn.executeUpdate(
        TOJSAHAZARDDROPPED,
        ReqBody.TOJSAHAZARDDROPPED.droppedObjects,
        ReqBody.TOJSAHAZARDDROPPED.markRestrictEntry,
        ReqBody.TOJSAHAZARDDROPPED.useLiftingEquipmentToRaise,
        ReqBody.TOJSAHAZARDDROPPED.secureTools,
        ReqBody.TOJSAHAZARDDROPPED.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDDROPPED", ["","droppedObjects","markRestrictEntry","useLiftingEquipmentToRaise",
		 "secureTools","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    // JSA HazardsLifting  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{
    var TOJSAHAZARDLIFT = "UPDATE \"IOP\".\"JSAHAZARDSLIFTING\" SET  \"LIFTINGEQUIPMENT\"=?,\"CONFIRMEQUIPMENTCONDITION\"=?,\"OBTAINAPPROVALFORLIFTS\"=?," +
        "\"HAVEDOCUMENTEDLIFTPLAN\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDLIFT) { 
    conn.executeUpdate(
        TOJSAHAZARDLIFT,
        ReqBody.TOJSAHAZARDLIFT.liftingEquipment,
        ReqBody.TOJSAHAZARDLIFT.confirmEquipmentCondition,
        ReqBody.TOJSAHAZARDLIFT.obtainApprovalForLifts,
        ReqBody.TOJSAHAZARDLIFT.haveDocumentedLiftPlan,
        ReqBody.TOJSAHAZARDLIFT.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDLIFT", ["","liftingEquipment","confirmEquipmentCondition","obtainApprovalForLifts",
		 "haveDocumentedLiftPlan","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

    // JSA HazardsHeight  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{
    var TOJSAHAZARDHEIGHT = "UPDATE \"IOP\".\"JSAHAZARDSHEIGHTS\" SET  \"WORKATHEIGHTS\"=?,\"DISCUSSWORKINGPRACTICE\"=?,\"VERIFYFALLRESTRAINT\"=?," +
        "\"USEFULLBODYHARNESS\"=?,\"USELOCKTYPESNAPHOOOKS\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDHEIGHT) { 
    conn.executeUpdate(
        TOJSAHAZARDHEIGHT,
        ReqBody.TOJSAHAZARDHEIGHT.workAtHeights,
        ReqBody.TOJSAHAZARDHEIGHT.discussWorkingPractice,
        ReqBody.TOJSAHAZARDHEIGHT.verifyFallRestraint,
        ReqBody.TOJSAHAZARDHEIGHT.useFullBodyHarness,
        ReqBody.TOJSAHAZARDHEIGHT.useLockTypeSnaphoooks,
        ReqBody.TOJSAHAZARDHEIGHT.permitNumber
    );
    }
}
catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDHEIGHT", ["","workAtHeights","discussWorkingPractice","verifyFallRestraint",
		 "useFullBodyHarness","useLockTypeSnaphoooks","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
    // JSA HazardsElectrical  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{
    var TOJSAHAZARDELECTRICAL = "UPDATE \"IOP\".\"JSAHAZARDSELECTRICAL\" SET  \"PORTABLEELECTRICALEQUIPMENT\"=?,\"INSPECTTOOLSFORCONDITION\"=?,\"IMPLEMENTGASTESTING\"=?," +
        "\"PROTECTELECTRICALLEADS\"=?,\"IDENTIFYEQUIPCLASSIFICATION\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDELECTRICAL) { 
    conn.executeUpdate(
        TOJSAHAZARDELECTRICAL,
        ReqBody.TOJSAHAZARDELECTRICAL.portableElectricalEquipment,
        ReqBody.TOJSAHAZARDELECTRICAL.inspectToolsForCondition,
        ReqBody.TOJSAHAZARDELECTRICAL.implementGasTesting,
        ReqBody.TOJSAHAZARDELECTRICAL.protectElectricalLeads,
        ReqBody.TOJSAHAZARDELECTRICAL.identifyEquipClassification,
        ReqBody.TOJSAHAZARDELECTRICAL.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDELECTRICAL", ["","portableElectricalEquipment","inspectToolsForCondition","implementGasTesting",
		 "protectElectricalLeads","identifyEquipClassification","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
    // JSA HazardsMoving  Table Update ----------------------------------------------------
if (successFlag){ 
    	
    	try{

    var TOJSAHAZARDMOVING = "UPDATE \"IOP\".\"JSAHAZARDSMOVING\" SET  \"MOVINGEQUIPMENT\"=?,\"CONFIRMMACHINERYINTEGRITY\"=?,\"PROVIDEPROTECTIVEBARRIERS\"=?," +
        "\"OBSERVERTOMONITORPROXIMITYPEOPLEANDEQUIPMENT\"=?,\"LOCKOUTEQUIPMENT\"=?,\"DONOTWORKINLINEOFFIRE\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDMOVING) { 
    conn.executeUpdate(
        TOJSAHAZARDMOVING,
        ReqBody.TOJSAHAZARDMOVING.movingEquipment,
        ReqBody.TOJSAHAZARDMOVING.confirmMachineryIntegrity,
        ReqBody.TOJSAHAZARDMOVING.provideProtectiveBarriers,
        ReqBody.TOJSAHAZARDMOVING.observerToMonitorProximityPeopleAndEquipment,
        ReqBody.TOJSAHAZARDMOVING.lockOutEquipment,
        ReqBody.TOJSAHAZARDMOVING.doNotWorkInLineOfFire,
        ReqBody.TOJSAHAZARDMOVING.permitNumber
    );
    }
}
catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMOVING", ["","movingEquipment","confirmMachineryIntegrity","provideProtectiveBarriers",
		 "observerToMonitorProximityPeopleAndEquipment","lockOutEquipment","doNotWorkInLineOfFire","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
if (successFlag){ 
    	
    	try{

    // JSA HazardsManual  Table Update ----------------------------------------------------                
    var TOJSAHAZARDMANUAL = "UPDATE \"IOP\".\"JSAHAZARDSMANUAL\" SET  \"MANUALHANDLING\"=?,\"ASSESSMANUALTASK\"=?,\"LIMITLOADSIZE\"=?," +
        "\"PROPERLIFTINGTECHNIQUE\"=?,\"CONFIRMSTABILITYOFLOAD\"=?,\"GETASSISTANCEORAID\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDMANUAL) {
    conn.executeUpdate(
        TOJSAHAZARDMANUAL,
        ReqBody.TOJSAHAZARDMANUAL.manualHandling,
        ReqBody.TOJSAHAZARDMANUAL.assessManualTask,
        ReqBody.TOJSAHAZARDMANUAL.limitLoadSize,
        ReqBody.TOJSAHAZARDMANUAL.properLiftingTechnique,
        ReqBody.TOJSAHAZARDMANUAL.confirmStabilityOfLoad,
        ReqBody.TOJSAHAZARDMANUAL.getAssistanceOrAid,
        ReqBody.TOJSAHAZARDMANUAL.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMANUAL", ["","manualHandling","assessManualTask","limitLoadSize",
		 "properLiftingTechnique","confirmStabilityOfLoad","getAssistanceOrAid","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

if (successFlag){ 
    	
    	try{

    // JSA HazardsTools  Table Update ----------------------------------------------------                
    var TOJSAHAZARDTOOLS = "UPDATE \"IOP\".\"JSAHAZARDSTOOLS\" SET  \"EQUIPMENTANDTOOLS\"=?,\"INSPECTEQUIPMENTTOOL\"=?,\"BRASSTOOLSNECESSARY\"=?," +
        "\"USEPROTECTIVEGUARDS\"=?,\"USECORRECTTOOLS\"=?,\"CHECKFORSHARPEDGES\"=?,\"APPLYHANDSAFETYPRINCIPLE\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDTOOLS) {
    conn.executeUpdate(
        TOJSAHAZARDTOOLS,
        ReqBody.TOJSAHAZARDTOOLS.EquipmentAndTools,
        ReqBody.TOJSAHAZARDTOOLS.inspectEquipmentTool,
        ReqBody.TOJSAHAZARDTOOLS.brassToolsNecessary,
        ReqBody.TOJSAHAZARDTOOLS.useProtectiveGuards,
        ReqBody.TOJSAHAZARDTOOLS.useCorrectTools,
        ReqBody.TOJSAHAZARDTOOLS.checkForSharpEdges,
        ReqBody.TOJSAHAZARDTOOLS.applyHandSafetyPrinciple,
        ReqBody.TOJSAHAZARDTOOLS.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDTOOLS", ["","EquipmentAndTools","inspectEquipmentTool","brassToolsNecessary",
		 "useProtectiveGuards","useCorrectTools","checkForSharpEdges","applyHandSafetyPrinciple","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
if (successFlag){ 
    	
    	try{
    // JSA Hazards falls  Table Update ----------------------------------------------------                
    var TOJSAHAZARDFALLS = "UPDATE \"IOP\".\"JSAHAZARDSFALLS\" SET  \"SLIPSTRIPSANDFALLS\"=?,\"IDENTIFYPROJECTIONS\"=?,\"FLAGHAZARDS\"=?," +
        "\"SECURECABLES\"=?,\"CLEANUPLIQUIDS\"=?,\"BARRICADEHOLES\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDFALLS) {
    conn.executeUpdate(
        TOJSAHAZARDFALLS,
        ReqBody.TOJSAHAZARDFALLS.slipsTripsAndFalls,
        ReqBody.TOJSAHAZARDFALLS.identifyProjections,
        ReqBody.TOJSAHAZARDFALLS.flagHazards,
        ReqBody.TOJSAHAZARDFALLS.secureCables,
        ReqBody.TOJSAHAZARDFALLS.cleanUpLiquids,
        ReqBody.TOJSAHAZARDFALLS.barricadeHoles,
        ReqBody.TOJSAHAZARDFALLS.permitNumber
    );
    }
    	}
    catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDFALLS", ["","slipsTripsAndFalls","identifyProjections","flagHazards",
		 "secureCables","cleanUpLiquids","barricadeHoles","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

if (successFlag){ 
    	
    	try{

    // JSA HazardsVoltage Table Update ----------------------------------------------------                
    var TOJSAHAZARDVOLTAGE = "UPDATE \"IOP\".\"JSAHAZARDSVOLTAGE\" SET  \"HIGHVOLTAGE\"=?,\"RESTRICTACCESS\"=?,\"DISCHARGEEQUIPMENT\"=?," +
        "\"OBSERVESAFEWORKDISTANCE\"=?,\"USEFLASHBURN\"=?,\"USEINSULATEDGLOVES\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDVOLTAGE) {
    conn.executeUpdate(
        TOJSAHAZARDVOLTAGE,
        ReqBody.TOJSAHAZARDVOLTAGE.highVoltage,
        ReqBody.TOJSAHAZARDVOLTAGE.restrictAccess,
        ReqBody.TOJSAHAZARDVOLTAGE.dischargeEquipment,
        ReqBody.TOJSAHAZARDVOLTAGE.observeSafeWorkDistance,
        ReqBody.TOJSAHAZARDVOLTAGE.useFlashBurn,
        ReqBody.TOJSAHAZARDVOLTAGE.useInsulatedGloves,
        ReqBody.TOJSAHAZARDVOLTAGE.permitNumber
    );
    }
    
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDVOLTAGE", ["","highVoltage","restrictAccess","dischargeEquipment",
		 "observeSafeWorkDistance","useFlashBurn","useInsulatedGloves","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
}

if (successFlag){ 
    	
    	try{

    // JSA HazardsExcavation Table Update ----------------------------------------------------                
    var TOJSAHAZARDEXCAVATION = "UPDATE \"IOP\".\"JSAHAZARDSEXCAVATION\" SET  \"EXCAVATIONS\"=?,\"HAVEEXCAVATIONPLAN\"=?,\"LOCATEPIPESBYHANDDIGGING\"=?," +
        "\"DEENERGIZEUNDERGROUND\"=?,\"CSECONTROLS\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDEXCAVATION) {
    conn.executeUpdate(
        TOJSAHAZARDEXCAVATION,
        ReqBody.TOJSAHAZARDEXCAVATION.excavations,
        ReqBody.TOJSAHAZARDEXCAVATION.haveExcavationPlan,
        ReqBody.TOJSAHAZARDEXCAVATION.locatePipesByHandDigging,
        ReqBody.TOJSAHAZARDEXCAVATION.deEnergizeUnderground,
        ReqBody.TOJSAHAZARDEXCAVATION.cseControls,
        ReqBody.TOJSAHAZARDEXCAVATION.permitNumber
    );
    }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDEXCAVATION", ["","excavations","haveExcavationPlan","locatePipesByHandDigging",
		 "deEnergizeUnderground","cseControls","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

if (successFlag){ 
    	
    	try{
    // JSA HazardsMobile Table Update ----------------------------------------------------                
    var TOJSAHAZARDMOBILE = "UPDATE \"IOP\".\"JSAHAZARDSMOBILE\" SET  \"MOBILEEQUIPMENT\"=?,\"ASSESSEQUIPMENTCONDITION\"=?,\"CONTROLACCESS\"=?," +
        "\"MONITORPROXIMITY\"=?,\"MANAGEOVERHEADHAZARDS\"=?,\"ADHERETORULES\"=? WHERE \"PERMITNUMBER\"=?";
    if (ReqBody.TOJSAHAZARDMOBILE) {
    conn.executeUpdate(
        TOJSAHAZARDMOBILE,
        ReqBody.TOJSAHAZARDMOBILE.mobileEquipment,
        ReqBody.TOJSAHAZARDMOBILE.assessEquipmentCondition,
        ReqBody.TOJSAHAZARDMOBILE.controlAccess,
        ReqBody.TOJSAHAZARDMOBILE.monitorProximity,
        ReqBody.TOJSAHAZARDMOBILE.manageOverheadHazards,
        ReqBody.TOJSAHAZARDMOBILE.adhereToRules,
        ReqBody.TOJSAHAZARDMOBILE.permitNumber
    );
    }

}
catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSAHAZARDMOBILE", ["","mobileEquipment","assessEquipmentCondition","controlAccess",
		 "monitorProximity","manageOverheadHazards","adhereToRules","permitNumber"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}

}
   


    
    
    // JSA HazardsSteps Table Update    -------------------------- Before Update we need to delete the existing datata need to create new one --------------------------   
//	    var PTWHEADERQuery = "DELETE FROM \"IOP\".\"JSASTEPS\" WHERE PERMITNUMBER =? ";
//		// var conn = $.hdb.getConnection();
//		 conn.executeUpdate(
//				 PTWHEADERQuery,
//				 taskPermitNo
//		 );
//		 $.trace.error("Deleted JSASTEPS Success    " );
 
    var maxlength= 0;
    if (ReqBody.TOJSASTEPS) {
    	  maxlength= ReqBody.TOJSASTEPS.length;
	}
    
    var PTWHEADERQuery = "DELETE FROM \"IOP\".\"JSASTEPS\" WHERE PERMITNUMBER =? ";
    // var conn = $.hdb.getConnection();
    conn.executeUpdate(
    		PTWHEADERQuery,
    		taskPermitNo
    );
    $.trace.error("Deleted JSASTEPS Success    " );
    
    if (successFlag){ 
    	
    	try{
                             
                              var TOJSASTEPS,i, steps, TOJSASTEPS_query;
                              for(i=0;i<maxlength;i++) {
                            	  steps = getJSASTEPSSerialNo();
                                  TOJSASTEPS_query = "INSERT INTO \"IOP\".\"JSASTEPS\" VALUES (?,?,?,?,?,?)";
                                  conn.executeUpdate(
                                      TOJSASTEPS_query,
                                      steps,
                                      taskPermitNo,
                                      ReqBody.TOJSASTEPS[i].taskSteps,
                                      ReqBody.TOJSASTEPS[i].potentialHazards,
                                      ReqBody.TOJSASTEPS[i].hazardControls,
                                      ReqBody.TOJSASTEPS[i].personResponsible
                                      
                                      
                                  );
                              }
    	}
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSASTEPS", ["","steps","taskPermitNo","taskSteps","potentialHazards","hazardControls",
		 "personResponsible"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    	
    }
    // JSA HazardsStopTrigger Table Update -------- Before That we need to delete the existing PTA number and need to create new one --------------------------------------------   
                       
//                              var PTWHEADERQuery = "DELETE FROM \"IOP\".\"JSASTOPTRIGGER\" WHERE PERMITNUMBER =? ";
//                      		// var conn = $.hdb.getConnection();
//                      		 conn.executeUpdate(
//                      				 PTWHEADERQuery,
//                      				 taskPermitNo
//                      		 );
//                      		 $.trace.error("Deleted JSASTOPTRIGGER Success    " );
                      		 
                              var maxlength= 0;
                              if (ReqBody.TOJSASTOP) {
                              	  maxlength= ReqBody.TOJSASTOP.length;
                          	}
                              
                              var PTWHEADERQuery = "DELETE FROM \"IOP\".\"JSASTOPTRIGGER\" WHERE PERMITNUMBER =? ";
                              // var conn = $.hdb.getConnection();
                              conn.executeUpdate(
                              		PTWHEADERQuery,
                              		taskPermitNo
                              );
                              $.trace.error("Deleted JSASTOPTRIGGER Success    " );
//                          var maxlength=ReqBody.TOJSASTOP.length;
if (successFlag){ 
    	
    	try{
                        var TOJSASTOP,i,stop,TOJSASTOP_query ;
                        for(i=0;i<maxlength;i++) {
                            stop = getJSASTOPSerialNo();
                            TOJSASTOP_query = "INSERT INTO \"IOP\".\"JSASTOPTRIGGER\" VALUES (?,?,?)";
                            conn.executeUpdate(
                                TOJSASTOP_query,
                                stop,
                                taskPermitNo,
                                ReqBody.TOJSASTOP[i].lineDescription
                            );
                        } 
    	}
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSASTOP", ["","stop","taskPermitNo","lineDescription"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}


                        // JSA TOJSALOCATION Table Update ----------------------------------------------------   
                        var maxlength = 0;
                        if (ReqBody.TOJSALOCATION) {
                        	 maxlength = ReqBody.TOJSALOCATION.length;
                    	}
                        var TOJSALOCATION, i,jsaStenNo;
                        var PTWHEADERQuery = "DELETE FROM \"IOP\".\"JSA_LOCATION\" WHERE PERMITNUMBER =? ";
                        // var conn = $.hdb.getConnection();
                        conn.executeUpdate(
                        		PTWHEADERQuery,
                        		taskPermitNo
                        );
                        $.trace.error("Deleted JSA_LOCATION Success    " );
                 if (successFlag){ 
    	
    	try{
                     
                        for (i = 0; i < maxlength; i++) {
                        	jsaStenNo = getTOJSALOCATION();
                            TOJSALOCATION = "INSERT INTO \"IOP\".\"JSA_LOCATION\" VALUES (?,?,?,?,?,?)";
                           
                            conn.executeUpdate(
                                TOJSALOCATION,
                                jsaStenNo,
                                taskPermitNo,
                                ReqBody.TOJSALOCATION[i].facilityOrSite,
                                ReqBody.TOJSALOCATION[i].hierachyLevel,
                                ReqBody.TOJSALOCATION[i].facility,
                                ReqBody.TOJSALOCATION[i].muwi
//                                ReqBody.TOJSALOCATION[i].serialNo
                            );
                            
                        }
    	}
    		catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOJSALOCATION", ["","jsaStenNo","taskPermitNo","facilityOrSite","hierachyLevel","facility","muwi"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
                 }

    // JSA PtwPeople Table Update ----------------------------That need to be delete first than Create ------------------------   

//                        var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWPEOPLE\" WHERE PERMITNUMBER =? ";
//                  		// var conn = $.hdb.getConnection();
//                  		 conn.executeUpdate(
//                  				 PTWHEADERQuery,
//                  				 taskPermitNo
//                  		 );
                  		 $.trace.error("Deleted PTWPEOPLE Success    " );
                  		 
                        var maxlength= 0;
                        if (ReqBody.TOPTWPEOPLE) {
                        	  maxlength= ReqBody.TOPTWPEOPLE.length;
                    	}
                        
//                        var maxlength=ReqBody.TOPTWPEOPLE.length;
                        
                        var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWPEOPLE\" WHERE PERMITNUMBER =? ";
                        // var conn = $.hdb.getConnection();
                        conn.executeUpdate(
                        		PTWHEADERQuery,
                        		taskPermitNo
                        );
               
               if (successFlag){ 
    	
    	try{         
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
		 errorPrint("TOPTWPEOPLE", ["","seId","taskPermitNo","firstName","lastName","contactNumber","hasSignedJSA","hasSignedCWP","hasSignedHWP","hasSignedCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}


}
    /*************************************************************************************************/
//Fetch data from DB
                        
  // due to issue code is blocked to insert during JSA Update////////                      
                        
    
//    var Query = " SELECT PTWPERMITNUMBER FROM \"IOP\".\"PTWHEADER\" Where PERMITNUMBER = ?";
// 
//    var getconn = $.db.getConnection();
//   var selectPermitdetails = getconn.prepareStatement(Query);
//   $.trace.error("isHWPFlag  prepareStatement    " );
//    selectPermitdetails.setString(1, taskPermitNo);
//    var rs = selectPermitdetails.executeQuery();
//    var permitdetails = {};
//    while (rs.next()) {
//    	if (rs.getString(1).search("HWP") > -1) {
//    		permitdetails.HWP = true;
//		}
//		if (rs.getString(1).search("CWP")> -1) {
//			permitdetails.CWP = true;
//		}
//		if (rs.getString(1).search("CSE") > -1) {
//			permitdetails.CSE = true;
//		}
//		 $.trace.error(rs.getString(1));
//    	//permitdetails.push(rs.getString(1));
//    	
//    }
                        
                     // due to issue code is blocked to insert during JSA Update////////        
    
    $.trace.error("Above ptwconditoncheck");
    var ptwConditionChk = "", isCWPFlag = false, isHWPFlag=false, isCSEFlag=false;
    try {
        if (ReqBody && ReqBody.TOPTWHEADER) {
            var maxlength = ReqBody.TOPTWHEADER.length;
            for (i = 0; i < maxlength; i++) {
                if ( ReqBody.TOPTWHEADER[i].isCWP === 1 ) {
                    ptwConditionChk = true;
                    isCWPFlag = true;
                } else if ( ReqBody.TOPTWHEADER[i].isHWP === 1  ) {
                    ptwConditionChk = true;
                    isHWPFlag = true;
                } else if (ReqBody.TOPTWHEADER[i].isCSE === 1  ) {
                    ptwConditionChk = true;
                    isCSEFlag = true;
                }
            }
        }
    } catch (e) {
        ptwConditionChk = "";
       
    }
   
    if (ptwConditionChk) {
    	 $.trace.error("isHWPFlag    " + isHWPFlag);
    	 
    	 /**********************************Delete Query ****************/
//    	 var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWHEADER\" WHERE PERMITNUMBER =? ";
//    	// var conn = $.hdb.getConnection();
//    	 conn.executeUpdate(
//    			 PTWHEADERQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted Success    " );
//    	 /*****************************************************************/
 
    	var TOPTWHEADER_query;
        var ptwHeader = "";
        
      if (successFlag){ 
    	
    	try{      
    	    
        for (i = 0; i < maxlength; i++) {
            ptwHeader = "";
            if (ReqBody.TOPTWHEADER[i].isCWP === 1) {
                ptwHeader = "CWP" + taskPermitNo;
            } else if (ReqBody.TOPTWHEADER[i].isHWP === 1) {
                ptwHeader = "HWP" + taskPermitNo;
            } else if (ReqBody.TOPTWHEADER[i].isCSE === 1) {
                ptwHeader = "CSE" + taskPermitNo;
            }

             TOPTWHEADER_query = "INSERT INTO \"IOP\".\"PTWHEADER\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
          
             conn.executeUpdate(
                TOPTWHEADER_query,
                taskPermitNo,
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
        
    	}
    	
    	 catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWHEADER", ["","taskPermitNo","ptwHeader","isCWP","isHWP","isCSE",
		 "plannedDateTime","location","createdBy","contractorPerformingWork","estimatedTimeOfCompletion","equipmentID",
		 "workOrderNumber","status"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
code = getStatusCode(e.message);
		    if (code && code === 301) {
		    	
		    	var duplicateKey= "ptwHeader # - "+ptwHeader;
		    	 $.response.setBody("Duplicate key exists" +duplicateKey);
				
		    	 
		    	 
		    	 
		    	
		    } else {
		    errorPrint("TOPTWHEADER", ["","taskPermitNo","ptwHeader","isCWP","isHWP","isCSE",
		 "plannedDateTime","location","createdBy","contractorPerformingWork","estimatedTimeOfCompletion","equipmentID",
		 "workOrderNumber","status"], e.message);
	    	
		    	
		    }





					}
    	
      }

        $.trace.error("Created Successfully    " );
        
        
        
//        var PTWHEADERQuery = "DELETE FROM \"IOP\".\"PTWREQUIREDDOCUMENT\" WHERE PERMITNUMBER =? ";
//    	// var conn = $.hdb.getConnection();
//    	 conn.executeUpdate(
//    			 PTWHEADERQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted PTWREQUIREDDOCUMENT Success    " );
//    	 
if (successFlag){ 
    	
    	try{
       var maxlength= 0;
        if (ReqBody.TOPTWREQDOC) {
        	  maxlength= ReqBody.TOPTWREQDOC.length;
    	}
    	 
//        var maxlength = ReqBody.TOPTWREQDOC.length;
        var TOPTWREQDOC_query;
        var ptwreqDoc = "";
        for (i = 0; i < maxlength; i++) {
            ptwreqDoc = getPTWREQDOC();
            TOPTWREQDOC_query = "INSERT INTO \"IOP\".\"PTWREQUIREDDOCUMENT\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            conn.executeUpdate(
                TOPTWREQDOC_query,
                ptwreqDoc,
                taskPermitNo,
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
		 errorPrint("TOPTWREQDOC", ["","ptwreqDoc","taskPermitNo","isCWP","isHWP","isCSE",
		 "atmosphericTestRecord","loto","procedure","pAndIdOrDrawing","certificate","temporaryDefeat",
		 "rescuePlan","rescuePlan","sds","otherWorkPermitDocs","fireWatchChecklist","liftPlan","simopDeviation","safeWorkPractice"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
//
//        var sQuery = "DELETE FROM \"IOP\".\"PTWAPPROVAL\" WHERE PERMITNUMBER =? ";
//    	// var conn = $.hdb.getConnection();
//    	 conn.executeUpdate(
//    			 sQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted PTWAPPROVAL Success    " );
        var maxlength= 0;
        if (ReqBody.TOPTWAPPROVAL) {
        	  maxlength= ReqBody.TOPTWAPPROVAL.length;
    	}
        
//        var maxlength = ReqBody.TOPTWAPPROVAL.length;
if (successFlag){ 
    	
    	try{
        var ptwApproval = "",TOPTWAPPROVAL_query;
        for (i = 0; i < maxlength; i++) {
            ptwApproval = getPTWAPPROVAL();
            TOPTWAPPROVAL_query = "INSERT INTO \"IOP\".\"PTWAPPROVAL\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            conn.executeUpdate(
                TOPTWAPPROVAL_query,
                ptwApproval,
                taskPermitNo,
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
                ReqBody.TOPTWAPPROVAL[i].superitendentDate

            );
        }
    	}
    	catch (e) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 errorPrint("TOPTWAPPROVAL", ["","ptwApproval","taskPermitNo","isCWP","isHWP","isCSE",
		 "isWorkSafeToPerform","prejobWalkthroughBy","approvedBy","approvalDate","controlBoardDistribution","worksiteDistribution",
		 "simopsDistribution","otherDistribution","picName","picDate","superitendentName","superitendentDate"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
//
//        var sQuery = "DELETE FROM \"IOP\".\"PTWTESTRECORD\" WHERE PERMITNUMBER =? ";
//    	// var conn = $.hdb.getConnection();
//    	 conn.executeUpdate(
//    			 sQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted PTWTESTRECORD Success    " );
if (successFlag){ 
    	
    	try{


var maxlength= 0;

                        if (ReqBody.TOPTWTESTREC) {
                        	  
                    	
                        
//                        var maxlength=ReqBody.TOPTWPEOPLE.length;
                        
                        var TOPTWTESTREC_query = "DELETE FROM \"IOP\".\"PTWTESTRECORD\" WHERE PERMITNUMBER =? ";
                        // var conn = $.hdb.getConnection();
                        conn.executeUpdate(
                        		TOPTWTESTREC_query,
                        		taskPermitNo
                        );
     
                        }
//        var maxlength = ReqBody.TOPTWTESTREC.length;
        
           
           var ptwtestRec = getPTWTESTREC();
        var    TOPTWTESTREC_Query = "INSERT INTO \"IOP\".\"PTWTESTRECORD\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            conn.executeUpdate(
                TOPTWTESTREC_Query,
                ptwtestRec,
                taskPermitNo,
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
		 errorPrint("TOPTWTESTREC", ["","ptwtestRec","taskPermitNo","isCWP","isHWP","isCSE",
		 "detectorUsed","DateOfLastCalibration","testingFrequency","continuousGasMonitoring","priorToWorkCommencing","eachWorkPeriod",
		 "everyHour","gasTester","gasTesterComments","areaTobeTested","deviceSerialNo","isO2","isLELs","isH2S","Other"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}
//
//        var sQuery = "DELETE FROM \"IOP\".\"PTWTESTRESULTS\" WHERE PERMITNUMBER =? ";
//    	// var conn = $.hdb.getConnection();
//    	 conn.executeUpdate(
//    			 sQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted PTWTESTRESULTS Success    " );
       
        
//        var maxlength = ReqBody.TOPTWATESTRES.length;
      if (successFlag){ 
    	
    	try{
    	    var maxlength= 0;
    	    if (ReqBody.TOPTWATESTRES) {
                        	  
                    	
                        
                        maxlength=ReqBody.TOPTWATESTRES.length;
    	    }         
                        var TOPTWATESTRES_query = "DELETE FROM \"IOP\".\"PTWTESTRESULTS\" WHERE PERMITNUMBER =? ";
                        // var conn = $.hdb.getConnection();
                        conn.executeUpdate(
                        		TOPTWATESTRES_query,
                        		taskPermitNo
                        );
     
                        
    	    
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
		 errorPrint("TOPTWATESTRES", ["","ptwatestres","taskPermitNo","isCWP","isHWP","isCSE",
		 "preStartOrWorkTest","oxygenPercentage","toxicType","flammableGas","othersType","othersResult",
		 "date","time"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
      }
        
//
//        var sQuery = "DELETE FROM \"IOP\".\"PTWCLOSEOUT\" WHERE PERMITNUMBER =? ";
//    	 conn.executeUpdate(
//    			 sQuery,
//    			 taskPermitNo
//    	         
//    	 );
//    	 $.trace.error("Deleted PTWCLOSEOUT Success    " );
    
    if (successFlag){ 
    	
    	try{	 
        var maxlength= 0;
        if (ReqBody.TOPTWCLOSEOUT) {
        	  maxlength= ReqBody.TOPTWCLOSEOUT.length;
    	}
        
//        var maxlength = ReqBody.TOPTWCLOSEOUT.length;
        var ptwcloseOut = "",TOPTWCLOSEOUT_query;
        for (i = 0; i < maxlength; i++) {

            ptwcloseOut = getTOPTWCLOSEOUT();
            TOPTWCLOSEOUT_query = "INSERT INTO \"IOP\".\"PTWCLOSEOUT\" VALUES (?,?,?,?,?,?,?,?,?,?)";
            conn.executeUpdate(
                TOPTWCLOSEOUT_query,
                ptwcloseOut,
                taskPermitNo,
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
		 errorPrint("TOPTWCLOSEOUT", ["","ptwcloseOut","taskPermitNo","isCWP","isHWP","isCSE",
		 "picName","workCompleted","closedBy","closedDate","workStatusComments","othersResult"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    }
    
    if (successFlag){ 
    	
    	try{
        if (isCWPFlag) {
        	
//        	 var sQuery = "DELETE FROM \"IOP\".\"PTW_CWP_WORK_TYPE\" WHERE PERMITNUMBER =? ";
//         	// var conn = $.hdb.getConnection();
//         	 conn.executeUpdate(
//         			 sQuery,
//         			 taskPermitNo
//         	         
//         	 );
//         	 $.trace.error("Deleted PTW_CWP_WORK_TYPE Success    " );
        	
        	var TOPTWCWPWORK_query = "INSERT INTO \"IOP\".\"PTW_CWP_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        	conn.executeUpdate(
        			TOPTWCWPWORK_query,
        			taskPermitNo,
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
		 errorPrint("TOPTWCWPWORK", ["","taskPermitNo","criticalOrComplexLift","craneOrLiftingDevice","groundDisturbanceOrExcavation",
		 "handlingHazardousChemicals","workingAtHeight","paintingOrBlasting","workingOnPressurizedSystems","erectingOrDismantlingScaffolding",
		 "breakingContainmentOfClosedOperatingSystem","workingInCloseToHazardousEnergy","removalOfIdleEquipmentForRepair",
		 "higherRiskElectricalWork","otherTypeOfWork","descriptionOfWorkToBePerformed"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
    }
//        
if (successFlag){ 
    	
    	try{
        if (isHWPFlag) {
        	
//        	 var sQuery = "DELETE FROM \"IOP\".\"PTW_HWP_WORK_TYPE\" WHERE PERMITNUMBER =? ";
//          	// var conn = $.hdb.getConnection();
//          	 conn.executeUpdate(
//          			 sQuery,
//          			 taskPermitNo
//          	         
//          	 );
//          	 $.trace.error("Deleted PTW_HWP_WORK_TYPE Success    " );
         	
        	
        	var TOPTWHWPWORK_query = "INSERT INTO \"IOP\".\"PTW_HWP_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?)";
        	conn.executeUpdate(
        			TOPTWHWPWORK_query,
        			taskPermitNo,
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
		 errorPrint("TOPTWHWPWORK", ["","taskPermitNo","cutting","wielding","electricalPoweredEquipment",
		 "grinding","abrasiveBlasting","otherTypeOfWork","descriptionOfWorkToBePerformed"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
    	
}

if (successFlag){ 
    	
    	try{
        if (isCSEFlag) {
        	
//        	 var sQuery = "DELETE FROM \"IOP\".\"PTW_CSE_WORK_TYPE\" WHERE PERMITNUMBER =? ";
//           	// var conn = $.hdb.getConnection();
//           	 conn.executeUpdate(
//           			 sQuery,
//           			 taskPermitNo
//           	         
//           	 );
//           	 $.trace.error("Deleted PTW_CSE_WORK_TYPE Success    " );
        	
        	var TOPTWCSEWORK_query = "INSERT INTO \"IOP\".\"PTW_CSE_WORK_TYPE\" VALUES (?,?,?,?,?,?,?,?)";
        	conn.executeUpdate(
        			TOPTWCSEWORK_query,
        			taskPermitNo,
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
		 errorPrint("TOPTWCSEWORK", ["","taskPermitNo","tank","vessel","excavation",
		 "pit","tower","other","reasonForCSE"], e.message);
			
		 successFlag =false;
		 
//		 if ($.response.status===500 ) {
					}
}
    }
        // new changes in column level 
    var respMsg = "";
    if (successFlag){ 
    	
    	try{
    if(ptwConditionChk){
  	  respMsg = "JSA "+taskPermitNo + " updated successfully"; 
    }else{
  	  respMsg = "JSA "+taskPermitNo + " updated successfully"; 
    }
  	  conn.commit();
     $.response.contentType = 'application/json';
     $.response.setBody(JSON.stringify(
                  {
                         "Success": respMsg
                         
                  }
     ));
    
    
     
     /// Send push notification
     
     var response = sendPushNotification(ReqBody.TOJSAREVIEW.createdBy,ReqBody.TOJSAHEADER.permitNumber);
     //$.trace.error("Response    "  + response.body.asString());
     
    	}
    	
    	catch (e) {
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
					       $.response.setBody("Error to Update the Request",e.message);
					        successFlag =false;
					}
    	
    }
    
    
    if(ptwConditionChk){
         if  (successFlag)  {
       if(isCWPFlag){
      
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
        
    }
     
    
    
    
    
     conn.close();
    
     /*************************************************************************************************/




    //	------------Commit to DB--------------------//
//    conn.commit();
//    $.response.contentType = 'application/json';
//    $.response.setBody(JSON.stringify({
//        "Success": " Updated Sucessfully."
//    }));
//    conn.close();
//  catch (e) {
//     $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
//     $.response.setBody(e.message);
// }