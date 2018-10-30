$.response.contentType = 'application/json';
var output = {};
var permitNumber = $.request.parameters.get("permitNumber");
var conn = $.db.getConnection();

	var Query = 'select * from "IOP"."PTWTESTRESULTS" where PERMITNUMBER= ?';
	var PTWTESTRESULTS = conn.prepareStatement(Query);
         PTWTESTRESULTS.setString(1,permitNumber);
	      var rs = PTWTESTRESULTS.executeQuery();
	      var resAllData = [];
	
//	$.response.setBody(get_query);
    // pstmt = conn.prepareStatement(get_query);
    // rs = pstmt.executeQuery();
  //  var PTWTESTRES = {};
    while (rs.next()) {
        output = {};
    	output.serialNo    = rs.getInteger(1);
    	output.permitNumber = rs.getInteger(2);
    	output.isCWP = rs.getInteger(3);
        output.isHWP = rs.getInteger(4);
        output.isCSE = rs.getInteger(5);
        output.preStartOrWorkTest = rs.getString(6);
        output.oxygenPercentage = rs.getFloat(7);
        output.toxicType = rs.getString(8);
        output.toxicResult = rs.getFloat(9);
        output.flammableGas = rs.getString(10);
        output.othersType = rs.getString(11);
        output.othersResult = rs.getFloat(12);
        output.date = rs.getString(13).split('.')[0];
        output.time = rs.getString(14);
        
        resAllData.push(output);

    }
    
    var Query1 = 'select * from "IOP"."PTWTESTRECORD" where PERMITNUMBER= ?'  ;
	var PTWTESTRECORD = conn.prepareStatement(Query1);
         PTWTESTRECORD.setString(1,permitNumber);
	      var rs = PTWTESTRECORD.executeQuery();
	      var output1 = {};
	 
    while (rs.next()) {
        output1={};
    	output1.serialNo    = rs.getInteger(1);
    	output1.permitNumber = rs.getInteger(2);
    	output1.isCWP = rs.getInteger(3);
        output1.isHWP = rs.getInteger(4);
        output1.isCSE = rs.getInteger(5);
        output1.detectorUsed = rs.getString(6);
        output1.DateOfLastCalibration = rs.getString(7).split('.')[0];
        output1.testingFrequency = rs.getString(8);
        output1.continuousGasMonitoring = rs.getInteger(9);
        output1.priorToWorkCommencing = rs.getInteger(10);
        output1.eachWorkPeriod = rs.getInteger(11);
        output1.everyHour = rs.getInteger(12);
        output1.gasTester = rs.getString(13);
        output1.gasTesterComments = rs.getString(14);
        output1.areaToBeTested = rs.getString(15);
        output1.deviceSerialNo = rs.getString(16);
        output1.isO2 = rs.getInteger(17);
        output1.isLELS = rs.getInteger(18);
        output1.isH2S = rs.getInteger(19);
        output1.Other = rs.getString(20);
        
    	
    }
	      
    
    var allData = {
			
		TOPTWTESTRES:resAllData,
		TOPTWTESTREC:output1
	
		
		
};


rs.close();
PTWTESTRESULTS.close();
conn.close();
var resp=JSON.stringify(allData);
$.response.setBody(resp);
