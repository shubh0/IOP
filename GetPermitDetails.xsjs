var pstmt;
var rs;
var get_query;
var output = { PTWDetails:{ TOJSAREVIEW:{},
	                         TOPTWHEADER:[],
							TOPTWREQDOC:[],
							TOPTWAPPROVAL: [],
							TOPTWTESTREC : {},
							TOPTWTESTRES : [],
							TOPTWCLOSEOUT: [],
							TOPTWCWPWORK : {},
							TOPTWHWPWORK : {}, 
							TOPTWCSEWORK : {},
							TOPTWPEOPLE :[]
}};
var permitNumber = $.request.parameters.get("permitNumber"); // input parameter for Permit Number
var permitType = $.request.parameters.get("permitType") ;// input parameter for Permit type
//var permitNumber ;

var ptwPermitNumber;
var isCWP;
var isHWP;
var isCSE;



if (permitType==="COLD") {
	
	ptwPermitNumber = "CWP"+permitNumber ;
	
}


else if (permitType==="HOT"){
	
	ptwPermitNumber = "HWP"+permitNumber ;
}

else if (permitType==="CSE") {
	ptwPermitNumber = "CSE"+permitNumber ;
	
}


function getPermitNumber(){ // Get Permit Number from PTW Permit Number
	
	var conn = $.db.getConnection();
	
	get_query = 'select PERMITNUMBER,ISCWP,ISHWP,ISCSE from "IOP"."PTWHEADER" where PTWPERMITNUMBER =\''+ ptwPermitNumber + "'";
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    while (rs.next()) {
    	permitNumber = rs.getInteger(1);
    	isCWP = rs.getInteger(2);
    	isHWP = rs.getInteger(3);
    	isCSE = rs.getInteger(4);
    	}
	
}

// Get the date level details for the ptw ....




function getJSAREVIEW() { // Get JSA REVIEW Details
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."JSAREVIEW" where PERMITNUMBER =' +permitNumber;  
//	$.response.setBody(get_query);
//	get_query.setString(1,permitNumber);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
  //  var JSAREVIEW = {};
    
while (rs.next()) {
	

	output.PTWDetails.TOJSAREVIEW.permitNumber = rs.getInteger(1);
	output.PTWDetails.TOJSAREVIEW.createdBy = rs.getString(2);
	output.PTWDetails.TOJSAREVIEW.approvedBy= rs.getString(3);
	output.PTWDetails.TOJSAREVIEW.approvedDate= rs.getString(4).split('.')[0];
	output.PTWDetails.TOJSAREVIEW.lastUpdatedBy= rs.getString(5);
	output.PTWDetails.TOJSAREVIEW.lastUpdatedDate= rs.getString(6).split('.')[0];
	output.PTWDetails.TOJSAREVIEW.createdDate = rs.getString(7).split('.')[0];


  
    	
    	
    	
    }

}




function getPTWHEADER() { // Get PTW Header Details
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTWHEADER" where PTWPERMITNUMBER=\''+ ptwPermitNumber+"'" ;  
	
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    var PTWHEADER = {};
    
while (rs.next()) {
	PTWHEADER.permitNumber = rs.getInteger(1);
	PTWHEADER.ptwPermitNumber = rs.getString(2);
	PTWHEADER.isCWP = rs.getInteger(3);
    PTWHEADER.isHWP = rs.getInteger(4);
    PTWHEADER.isCSE = rs.getInteger(5);
    PTWHEADER.plannedDateTime = rs.getString(6).split('.')[0];
    PTWHEADER.location = rs.getString(7);
    PTWHEADER.createdBy = rs.getString(8);
    PTWHEADER.contractorPerformingWork = rs.getString(9);
    PTWHEADER.estimatedTimeOfCompletion = rs.getString(10).split('.')[0];
    PTWHEADER.equipmentID = rs.getString(11);
    PTWHEADER.workOrderNumber = rs.getString(12);
    PTWHEADER.status = rs.getString(13);    
    output.PTWDetails.TOPTWHEADER.push(PTWHEADER);
    


    PTWHEADER = {};
    	
    	
    	
    }


    
} 
	function getPTWREQDOC() {
		
		var conn = $.db.getConnection();
		
		get_query = 'select * from "IOP"."PTWREQUIREDDOCUMENT" where PERMITNUMBER='+ permitNumber +' and ISCWP = '+ isCWP + ' and ISHWP = ' + isHWP + ' and ISCSE = ' + isCSE ;  
		
	//	$.response.setBody(get_query);
	    pstmt = conn.prepareStatement(get_query);
	    rs = pstmt.executeQuery();
	    var PTWREQDOC = {};
	    while (rs.next()) {
	    	PTWREQDOC.serialNo= rs.getInteger(1);
	    	PTWREQDOC.permitNumber = rs.getInteger(2);
	    	PTWREQDOC.isCWP = rs.getInteger(3);
            PTWREQDOC.isHWP= rs.getInteger(4);
            PTWREQDOC.isCSE  = rs.getInteger(5);
            PTWREQDOC.atmosphericTestRecord  = rs.getInteger(6);
            PTWREQDOC.loto = rs.getInteger(7);
            PTWREQDOC.procedure = rs.getInteger(8);
            PTWREQDOC.pAndIdOrDrawing = rs.getInteger(9);
            PTWREQDOC.certificate  = rs.getString(10);
            PTWREQDOC.temporaryDefeat = rs.getInteger(11);
            PTWREQDOC.rescuePlan = rs.getInteger(12);
            PTWREQDOC.sds = rs.getInteger(13);
            PTWREQDOC.otherWorkPermitDocs = rs.getString(14);
            PTWREQDOC.fireWatchChecklist = rs.getInteger(15);
            PTWREQDOC.liftPlan = rs.getInteger(16);
            PTWREQDOC.simopDeviation = rs.getInteger(17);
            PTWREQDOC.safeWorkPractice = rs.getInteger(18);
            
            output.PTWDetails.TOPTWREQDOC.push(PTWREQDOC);
            PTWREQDOC = {};
            
           
	    
	    }
	    
	    
	    }
	
function getPTWAPPROVAL() {
		
		var conn = $.db.getConnection();
		
		get_query = 'select * from "IOP"."PTWAPPROVAL" where PERMITNUMBER='+ permitNumber +' and ISCWP = '+ isCWP + ' and ISHWP = ' + isHWP + ' and ISCSE = ' + isCSE ;  
		
	//	$.response.setBody(get_query);
	    pstmt = conn.prepareStatement(get_query);
	    rs = pstmt.executeQuery();
	    var PTWAPPROVAL = {};
	    while (rs.next()) {
	    	PTWAPPROVAL.serialNo = rs.getInteger(1);
	    	PTWAPPROVAL.permitNumber = rs.getInteger(2);
	    	PTWAPPROVAL.isCWP = rs.getInteger(3);
            PTWAPPROVAL.isHWP = rs.getInteger(4);
            PTWAPPROVAL.isCSE = rs.getInteger(5);
            PTWAPPROVAL.isWorkSafeToPerform= rs.getInteger(6);
            PTWAPPROVAL.prejobWalkthroughBy = rs.getString(7);
            PTWAPPROVAL.approvedBy  = rs.getString(8);
            PTWAPPROVAL.approvalDate = rs.getString(9).split('.')[0];
            PTWAPPROVAL.controlBoardDistribution = rs.getInteger(10);
            PTWAPPROVAL.worksiteDistribution = rs.getInteger(11);
            PTWAPPROVAL.simopsDistribution = rs.getInteger(12);
            PTWAPPROVAL.otherDistribution = rs.getString(13);
            PTWAPPROVAL.picName = rs.getString(14);
            PTWAPPROVAL.picDate = rs.getString(15).split('.')[0];
            PTWAPPROVAL.supritendentName = rs.getString(16);
            PTWAPPROVAL.supritendentDate = rs.getString(17).split('.')[0];
            output.PTWDetails.TOPTWAPPROVAL.push(PTWAPPROVAL);
            PTWAPPROVAL = {};
	    	
	    }
	    }

function getPTWTESTREC() {
	
	var conn = $.db.getConnection();
	
//	get_query = 'select * from "IOP"."PTWTESTRECORD" where PERMITNUMBER='+ permitNumber +' and ISCWP = '+ isCWP + ' and ISHWP = ' + isHWP + ' and ISCSE = ' + isCSE ;
	get_query = 'select * from "IOP"."PTWTESTRECORD" where PERMITNUMBER='+ permitNumber  ;
	
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    //var PTWTESTREC = {};
    while (rs.next()) {
    	output.PTWDetails.TOPTWTESTREC.serialNo    = rs.getInteger(1);
    	output.PTWDetails.TOPTWTESTREC.permitNumber = rs.getInteger(2);
    	output.PTWDetails.TOPTWTESTREC.isCWP = rs.getInteger(3);
        output.PTWDetails.TOPTWTESTREC.isHWP = rs.getInteger(4);
        output.PTWDetails.TOPTWTESTREC.isCSE = rs.getInteger(5);
        output.PTWDetails.TOPTWTESTREC.detectorUsed = rs.getString(6);
        output.PTWDetails.TOPTWTESTREC.DateOfLastCalibration = rs.getString(7).split('.')[0];
        output.PTWDetails.TOPTWTESTREC.testingFrequency = rs.getString(8);
        output.PTWDetails.TOPTWTESTREC.continuousGasMonitoring = rs.getInteger(9);
        output.PTWDetails.TOPTWTESTREC.priorToWorkCommencing = rs.getInteger(10);
        output.PTWDetails.TOPTWTESTREC.eachWorkPeriod = rs.getInteger(11);
        output.PTWDetails.TOPTWTESTREC.everyHour = rs.getInteger(12);
        output.PTWDetails.TOPTWTESTREC.gasTester = rs.getString(13);
        output.PTWDetails.TOPTWTESTREC.gasTesterComments = rs.getString(14);
        output.PTWDetails.TOPTWTESTREC.areaToBeTested = rs.getString(15);
        output.PTWDetails.TOPTWTESTREC.deviceSerialNo = rs.getString(16);
        output.PTWDetails.TOPTWTESTREC.isO2 = rs.getInteger(17);
        output.PTWDetails.TOPTWTESTREC.isLELS = rs.getInteger(18);
        output.PTWDetails.TOPTWTESTREC.isH2S = rs.getInteger(19);
        output.PTWDetails.TOPTWTESTREC.Other = rs.getString(20);
        // output.PTWDetails.TOPTWTESTREC.push(PTWTESTREC);
        // PTWTESTREC = {};
    	
    }
    }

function getPTWTESTRES() {
	
	var conn = $.db.getConnection();
	
//	get_query = 'select * from "IOP"."PTWTESTRESULTS" where PERMITNUMBER='+ permitNumber +' and ISCWP = '+ isCWP + ' and ISHWP = ' + isHWP + ' and ISCSE = ' + isCSE ; 
	
	get_query = 'select * from "IOP"."PTWTESTRESULTS" where PERMITNUMBER='+ permitNumber ;  
	
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    var PTWTESTRES = {};
    while (rs.next()) {
    	PTWTESTRES.serialNo    = rs.getInteger(1);
    	PTWTESTRES.permitNumber = rs.getInteger(2);
    	PTWTESTRES.isCWP = rs.getInteger(3);
        PTWTESTRES.isHWP = rs.getInteger(4);
        PTWTESTRES.isCSE = rs.getInteger(5);
        PTWTESTRES.preStartOrWorkTest = rs.getString(6);
        PTWTESTRES.oxygenPercentage = rs.getFloat(7);
        PTWTESTRES.toxicType = rs.getString(8);
        PTWTESTRES.toxicResult = rs.getFloat(9);
        PTWTESTRES.flammableGas = rs.getString(10);
        PTWTESTRES.othersType = rs.getString(11);
        PTWTESTRES.othersResult = rs.getFloat(12);
        PTWTESTRES.date = rs.getString(13).split('.')[0];
        PTWTESTRES.time = rs.getString(14);

        output.PTWDetails.TOPTWTESTRES.push(PTWTESTRES);
        PTWTESTRES = {};
        
        

    	
    }
    
}
    
function getPTWCLOSEOUT() {
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTWCLOSEOUT" where PERMITNUMBER='+ permitNumber ;  
	
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    var PTWCLOSEOUT = {};
    
    while (rs.next()) {
    	PTWCLOSEOUT.serialNo = rs.getInteger(1);
    	PTWCLOSEOUT.permitNumber  = rs.getInteger(2);
    	PTWCLOSEOUT.isCWP = rs.getInteger(3);
    	PTWCLOSEOUT.isHWP = rs.getInteger(4);
    	PTWCLOSEOUT.isCSE = rs.getInteger(5);
    	PTWCLOSEOUT.picName = rs.getString(6);
    	PTWCLOSEOUT.workCompleted = rs.getInteger(7);
        PTWCLOSEOUT.closedBy = rs.getString(8);
        PTWCLOSEOUT.closedDate = rs.getString(9).split('.')[0];
        PTWCLOSEOUT.workStatusComment = rs.getString(10);
        
        
         output.PTWDetails.TOPTWCLOSEOUT.push(PTWCLOSEOUT);
         PTWCLOSEOUT = {};
         
         
 
         
    }
    }
    
function getPTWCWPWORK() {
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTW_CWP_WORK_TYPE" where PERMITNUMBER='+ permitNumber ;  
	
	//$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    
    while (rs.next()) {
    	output.PTWDetails.TOPTWCWPWORK.permitNumber = rs.getInteger(1);
    	output.PTWDetails.TOPTWCWPWORK.criticalOrComplexLift = rs.getInteger(2);
        output.PTWDetails.TOPTWCWPWORK.craneOrLiftingDevice = rs.getInteger(3);
        output.PTWDetails.TOPTWCWPWORK.groundDisturbanceOrExcavation = rs.getInteger(4);
        output.PTWDetails.TOPTWCWPWORK.handlingHazardousChemicals = rs.getInteger(5);
        output.PTWDetails.TOPTWCWPWORK.workingAtHeight = rs.getInteger(6);
        output.PTWDetails.TOPTWCWPWORK.paintingOrBlasting = rs.getInteger(7);
        output.PTWDetails.TOPTWCWPWORK.workingOnPressurizedSystems = rs.getInteger(8);
        output.PTWDetails.TOPTWCWPWORK.erectingOrDismantlingScaffolding = rs.getInteger(9);
        output.PTWDetails.TOPTWCWPWORK.breakingContainmentOfClosedOperatingSystem = rs.getInteger(10);
        output.PTWDetails.TOPTWCWPWORK.workingInCloseToHazardousEnergy = rs.getInteger(11);
        output.PTWDetails.TOPTWCWPWORK.removalOfIdleEquipmentForRepair = rs.getInteger(12);
        output.PTWDetails.TOPTWCWPWORK.higherRiskElectricalWork = rs.getInteger(13);
        output.PTWDetails.TOPTWCWPWORK.otherTypeOfWork = rs.getString(14);
        output.PTWDetails.TOPTWCWPWORK.descriptionOfWorkToBePerformed = rs.getString(15);
        
        

    	
    }
    }

function getPTWHWPWORK() {
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTW_HWP_WORK_TYPE" where PERMITNUMBER='+ permitNumber ;  
	
	//$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    
    while (rs.next()) {
    	output.PTWDetails.TOPTWHWPWORK.permitNumber = rs.getInteger(1);
    	 output.PTWDetails.TOPTWHWPWORK.cutting = rs.getInteger(2);
         output.PTWDetails.TOPTWHWPWORK.wielding = rs.getInteger(3);
         output.PTWDetails.TOPTWHWPWORK.electricalPoweredEquipment = rs.getInteger(4);
         output.PTWDetails.TOPTWHWPWORK.grinding = rs.getInteger(5);
         output.PTWDetails.TOPTWHWPWORK.abrasiveBlasting = rs.getInteger(6);
         output.PTWDetails.TOPTWHWPWORK.otherTypeOfWork = rs.getString(7);
         output.PTWDetails.TOPTWHWPWORK.descriptionOfWorkToBePerformed = rs.getString(8);
    	
    }
    
    
   
    
    
    }

function getPTWCSEWORK() {
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTW_CSE_WORK_TYPE" where PERMITNUMBER='+ permitNumber ;  
	
//	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    
    while (rs.next()) {
    	 output.PTWDetails.TOPTWCSEWORK.permitNumber = rs.getInteger(1);
    	 output.PTWDetails.TOPTWCSEWORK.tank = rs.getInteger(2);
         output.PTWDetails.TOPTWCSEWORK.vessel = rs.getInteger(3);
         output.PTWDetails.TOPTWCSEWORK.excavation = rs.getInteger(4);
         output.PTWDetails.TOPTWCSEWORK.pit = rs.getInteger(5);
         output.PTWDetails.TOPTWCSEWORK.tower = rs.getInteger(6);
         output.PTWDetails.TOPTWCSEWORK.other = rs.getString(7);
         output.PTWDetails.TOPTWCSEWORK.reasonForCse = rs.getString(8);
    }
    
 
}

function getPTWPEOPLE() {
	
	var conn = $.db.getConnection();
	
	get_query = 'select * from "IOP"."PTWPEOPLE" where PERMITNUMBER='+ permitNumber  ;  
	
	//$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    var PTWPEOPLE = {};
    while (rs.next()) {
    	PTWPEOPLE.serialNo = rs.getInteger(1);
    	PTWPEOPLE.permitNumber = rs.getInteger(2);
    	PTWPEOPLE.firstName = rs.getString(3);
        PTWPEOPLE.lastName = rs.getString(4);
        PTWPEOPLE.contactNumber = rs.getString(5);
        PTWPEOPLE.hasSignedJSA = rs.getInteger(6);
        PTWPEOPLE.hasSignedCWP = rs.getInteger(7);
        PTWPEOPLE.hasSignedHWP = rs.getInteger(8);
        PTWPEOPLE.hasSignedCSE = rs.getInteger(9);
        
        output.PTWDetails.TOPTWPEOPLE.push(PTWPEOPLE);
        PTWPEOPLE = {};
        
        
        
    }
    }
    

try{
	
	getPermitNumber();
	getJSAREVIEW();
	getPTWHEADER();
	getPTWREQDOC();
	getPTWAPPROVAL();
	getPTWTESTREC();
	getPTWTESTRES();
	getPTWCLOSEOUT();
	getPTWCWPWORK();
	getPTWHWPWORK();
	getPTWCSEWORK();
	getPTWPEOPLE();
	
	    
	}
	


catch (e) {
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
	}

var body = JSON.stringify(output);
$.response.contentType = 'application/json';
$.response.setBody(body);
$.response.status = $.net.http.OK;


