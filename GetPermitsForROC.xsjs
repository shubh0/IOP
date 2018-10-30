var pstmt;
var rs;
var get_query;
var facility = $.request.parameters.get("facility");
var muwi 	 = $.request.parameters.get("muwi");
var output= {CWP:[],
			 HWP:[],
			 CSE:[]
};
var transdata = {ptwRecord:[]};
var ptwRecord = {};
var isCWP ;
var isHWP ;
var isCSE ;
var Location  = $.request.parameters.get("Location");
var LocationType 	 = $.request.parameters.get("LocationType");
var conn = $.db.getConnection();

/////////////// ********* This function is to get facilities for the given fields ************** ///////////////////
function getFacility(Fields){ 

	var get_facility_query = 'select distinct LOCATION_TEXT from "IOP"."PRODUCTION_LOCATION" where PARENT_CODE in '+ Fields;
		
    pstmt = conn.prepareStatement(get_facility_query);

rs = pstmt.executeQuery();
var str = "";
var i = 0;
while (rs.next()) {
	
	if(i === 0){
		str = '(\'' + rs.getString(1) + '\'';
		i = i+1;
	}
	else{
	str = str + ',' + '\''+  rs.getString(1) + '\'';
	}
}
	str = str + ')';
	
	$.trace.error("Fields - "+str);
	return str;
}

/////////////// ********* This function is to get wells for the given wellpads ************** ///////////////////
function getWells(wellPad){
    
var getWellQuery = 'select distinct LOCATION_CODE from "IOP"."PRODUCTION_LOCATION" where PARENT_CODE in '+ wellPad;

pstmt = conn.prepareStatement(getWellQuery);

rs = pstmt.executeQuery();
var wells = "";
var i = 0;
while (rs.next()) {

if(i === 0){
	wells = '(\'' + rs.getString(1) + '\'';
	i = i+1;
}
else{
wells = wells + ',' + '\''+  rs.getString(1) + '\'';
}
}
wells = wells + ')';

var get_muwi_query = 'select distinct MUWI from "IOP"."WELL_MUWI" where LOCATION_CODE in '+ wells;

pstmt = conn.prepareStatement(get_muwi_query);

rs = pstmt.executeQuery();
var str = "";
var i = 0;
while (rs.next()) {

if(i === 0){
	str = '(\'' + rs.getString(1) + '\'';
	i = i+1;
}
else{
str = str + ',' + '\''+  rs.getString(1) + '\'';
}
}
str = str + ')';
return str;
}

////////// ********** This function is to parse the input ********** //////////////

function parseInputParameter(location){
	var i,str;
	var location_array = location.split(',');
	for( i = 0; i < location_array.length; i++) {

		
		if(i === 0){
			str ='('+ location_array[i];
			
		}
		else{
		str = str + ',' + location_array[i];
		}
		
	}
	str = str + ')';
	return str;
}

////////////***********  This function to create seprate array for Different types of Permits ******************* //////////////////////

function outputStructure(transdata){
	
	
	var obj = {};
	var maxlength = transdata.ptwRecord.length;
	var i;
	obj.facilityorsite = "";
	var rawdata = [];
	for (i= 0; i<maxlength ; i++){
		
		obj.jsaPermitNumber = transdata.ptwRecord[i].jsaPermitNumber;
		obj.ptwPermitNumber = transdata.ptwRecord[i].ptwPermitNumber;
		obj.createdBy		= transdata.ptwRecord[i].createdBy;
		obj.createdDate     = transdata.ptwRecord[i].createdDate;
		obj.isCWP           = transdata.ptwRecord[i].isCWP;
		obj.isHWP   		= transdata.ptwRecord[i].isHWP;
		obj.isCSE			= transdata.ptwRecord[i].isCSE;
		obj.permitNumber	= transdata.ptwRecord[i].permitNumber;
		obj.lastUpdatedDate = transdata.ptwRecord[i].lastUpdatedDate;
		obj.status          = transdata.ptwRecord[i].status;
		obj.taskDescription = transdata.ptwRecord[i].taskDescription;
		
		if( i === maxlength-1 ){
			if(transdata.ptwRecord[i].facilityorsite !== ""){
				if (obj.facilityorsite === ""){
					obj.facilityorsite =  transdata.ptwRecord[i].facilityorsite;
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  transdata.ptwRecord[i].facilityorsite;
				}	
			}
			rawdata.push(obj);
			break;
			
		}
		
		else if(transdata.ptwRecord[i].ptwPermitNumber ===transdata.ptwRecord[i+1].ptwPermitNumber ){
			if(transdata.ptwRecord[i].facilityorsite !== ""){
				if (obj.facilityorsite === ""){
					obj.facilityorsite =  transdata.ptwRecord[i].facilityorsite;
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  transdata.ptwRecord[i].facilityorsite;
				}	
			}
			
			
		}
		else {
			if(transdata.ptwRecord[i].facilityorsite !== ""){
				if (obj.facilityorsite === ""){
					obj.facilityorsite =  transdata.ptwRecord[i].facilityorsite;
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  transdata.ptwRecord[i].facilityorsite;
				}				}
			rawdata.push(obj);
			obj = {};
			
			obj.facilityorsite = ""; // To avoid comma at the first place in the string
		}
		
	}
	
	//// ********* To create seprate array for Different types of Permits ********** ///////
	var permitRecord={};
	var rawdatalength = rawdata.length;
	for(i=0; i<rawdatalength ; i++ ){
		permitRecord.jsaPermitNumber = rawdata[i].jsaPermitNumber;
    	permitRecord.ptwPermitNumber = rawdata[i].ptwPermitNumber;
    	permitRecord.createdBy 	     = rawdata[i].createdBy;
    	isCWP		 	 		     = rawdata[i].isCWP;
    	isHWP		 	  		     =  rawdata[i].isHWP;
    	isCSE		 	  		     =  rawdata[i].isCSE;
    	permitRecord.createdDate     =  rawdata[i].createdDate; 
    	permitRecord.facilityorsite  =  rawdata[i].facilityorsite;
    	permitRecord.permitNumber	 = rawdata[i].permitNumber;
    	permitRecord.lastUpdatedDate = rawdata[i].lastUpdatedDate;
    	permitRecord.status			 = rawdata[i].status;
    	permitRecord.taskDescription = rawdata[i].taskDescription;
    	if(isCWP === '1'){
    	output.CWP.push(permitRecord);
    	}
    	if(isHWP === '1'){
	    	output.HWP.push(permitRecord);
	    	}
    	if(isCSE === '1'){
	    	output.CSE.push(permitRecord);
	    	}
    	
    	permitRecord={};
		
		
	}
	var body = JSON.stringify(output);
	$.response.contentType = 'application/json';
    $.response.setBody(body);
	
}
////////////***********  This function is to get the Permits based on Facility values ******************* //////////////////////
function getPermitsBasedonFacility(facilities){
	
	var get_permit_query = 'select "L"."PERMITNUMBER" from "JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "L"."FACILITY" in '+ facilities +' and ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
	
    pstmt = conn.prepareStatement(get_permit_query);

rs = pstmt.executeQuery();
var str = "";
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
if( str!== "") // Check if there are any permit's for given location
    
{
str = str + ')' ; // Close the string for SQL query

	get_query = 'select "J"."PERMITNUMBER","P"."PTWPERMITNUMBER","P"."CREATEDBY","P"."ISCWP","P"."ISHWP","P"."ISCSE","R"."CREATEDDATE","L"."FACILTYORSITE","J"."PERMITNUMBER", "R"."LASTUPDATEDDATE", "P"."STATUS","J"."TASKDESCRIPTION" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" in' +str+' ORDER BY "R"."CREATEDDATE" DESC ' ;   

	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    
    rs = pstmt.executeQuery();
    while (rs.next()) {
    	ptwRecord.jsaPermitNumber = rs.getString(1);
    	ptwRecord.ptwPermitNumber = rs.getString(2);
    	ptwRecord.createdBy 	  = rs.getString(3);
    	ptwRecord.isCWP		 	  = rs.getString(4);
    	ptwRecord.isHWP		 	  = rs.getString(5);
    	ptwRecord.isCSE		 	  = rs.getString(6);
    	ptwRecord.createdDate     = rs.getString(7).split('.')[0]; 
    	ptwRecord.facilityorsite  = rs.getString(8);
    	ptwRecord.permitNumber	  = rs.getString(9);
    	ptwRecord.lastUpdatedDate = rs.getString(10).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	ptwRecord.status    	  = rs.getString(11);
    	ptwRecord.taskDescription = rs.getString(12);
    	transdata.ptwRecord.push(ptwRecord);
    	ptwRecord={};
}
	
}

return transdata;
}

function getPermitsBasedOnWells(wells,facility){
	var get_permit_query = 'select "L"."PERMITNUMBER" from "JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where ("L"."MUWI" in '+ wells + ' or ("L"."FACILITY" = ? and "L"."MUWI" = \'\' )) and ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
	
    pstmt = conn.prepareStatement(get_permit_query);
    pstmt.setString(1,facility);
rs = pstmt.executeQuery();
var str = "";
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
if( str!== "") // Check if there are any permit's for given location
    
{
str = str + ')' ; // Close the string for SQL query
	
	get_query = 'select "J"."PERMITNUMBER","P"."PTWPERMITNUMBER","P"."CREATEDBY","P"."ISCWP","P"."ISHWP","P"."ISCSE","R"."CREATEDDATE","L"."FACILTYORSITE","J"."PERMITNUMBER" , "R"."LASTUPDATEDDATE", "P"."STATUS","J"."TASKDESCRIPTION" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" in' +str+ 'ORDER BY "R"."LASTUPDATEDDATE" DESC ' ;  

	
	$.response.setBody(get_query);
    pstmt = conn.prepareStatement(get_query);
    
    rs = pstmt.executeQuery();
    while (rs.next()) {
    	ptwRecord.jsaPermitNumber = rs.getString(1);
    	ptwRecord.ptwPermitNumber = rs.getString(2);
    	ptwRecord.createdBy 	  = rs.getString(3);
    	ptwRecord.isCWP		 	  = rs.getString(4);
    	ptwRecord.isHWP		 	  = rs.getString(5);
    	ptwRecord.isCSE		 	  = rs.getString(6);
    	ptwRecord.createdDate     = rs.getString(7).split('.')[0]; 
    	ptwRecord.facilityorsite  = rs.getString(8);
    	ptwRecord.permitNumber	  = rs.getString(9);
    	ptwRecord.lastUpdatedDate = rs.getString(10).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	ptwRecord.status    	  = rs.getString(11);
    	ptwRecord.taskDescription = rs.getString(12);
    	transdata.ptwRecord.push(ptwRecord);
    	ptwRecord={};
    	
}

}

return transdata;
}



try{
	
	
	var parsedLocation = parseInputParameter(Location); /////  This is to get the input in string format
	
	
	
	if (LocationType === "FIELD"){
	var facilities = getFacility(parsedLocation);
	outputStructure(getPermitsBasedonFacility(facilities));
	
	}
	
	else if(LocationType === 'FACILITY'){
		//  Query to get description of facilities
	    var getFacilityDesc = 'select LOCATION_TEXT from "IOP"."PRODUCTION_LOCATION" where LOCATION_CODE in ' + parsedLocation;
	    
	    pstmt = conn.prepareStatement(getFacilityDesc);
rs = pstmt.executeQuery();
var str = "";
var i = 0;
while (rs.next()) {
	
	if(i === 0){
	str = '(\'' + rs.getString(1) + '\'';
	i = i+1;
}
else{
str = str + ',' + '\''+  rs.getString(1) + '\'';
}
}
str = str + ')';
	    
		outputStructure(getPermitsBasedonFacility(str));
	}
	
	else if(LocationType ==='WELL PAD'){
		var wells = getWells(parsedLocation);
// 	Get facility code for given well pads
		var get_facility_query = 'select distinct PARENT_CODE from "IOP"."PRODUCTION_LOCATION" where LOCATION_CODE in '+ parsedLocation;
		
			
	    pstmt = conn.prepareStatement(get_facility_query);

	rs = pstmt.executeQuery();
	var facility = "";
	var i = 0;
	while (rs.next()) {
		facility = rs.getString(1);
		
	}
	// 	Get facility description for the facility
	var getFacilityDescQuery = 'select distinct LOCATION_TEXT from "IOP"."PRODUCTION_LOCATION" where LOCATION_CODE = \'' + facility+'\'';
 pstmt = conn.prepareStatement(getFacilityDescQuery);
	rs = pstmt.executeQuery();
	var facility = " ";
	var i = 0;
	while (rs.next()) {
		facility = rs.getString(1);
		
	}
	
	outputStructure(getPermitsBasedOnWells(wells,facility));
	}

	
	else if (LocationType ==='WELL'){
var getWellPadQuery = 'select distinct a.PARENT_CODE from "IOP"."PRODUCTION_LOCATION" as a inner join "IOP"."WELL_MUWI" as b '+
                            'on a.LOCATION_CODE=b.LOCATION_CODE where b.MUWI in '+ parsedLocation;
	
	    pstmt = conn.prepareStatement(getWellPadQuery);
rs = pstmt.executeQuery();
var str = "";
var i = 0;
while (rs.next()) {
	
	if(i === 0){
	str = '(\'' + rs.getString(1) + '\'';
	i = i+1;
}
else{
str = str + ',' + '\''+  rs.getString(1) + '\'';
}
}
str = str + ')';
	$.trace.error("wellpad- "+ str);

var getFacilityQuery = 'select distinct PARENT_CODE from "IOP"."PRODUCTION_LOCATION" where LOCATION_CODE in ' + str;
 pstmt = conn.prepareStatement(getFacilityQuery);
	rs = pstmt.executeQuery();
	var facility = " ";
	var i = 0;
	while (rs.next()) {
		facility = rs.getString(1);
		
	}
	$.trace.error("facility- "+ facility);
	
	var getFacilityDescQuery = 'select distinct LOCATION_TEXT from "IOP"."PRODUCTION_LOCATION" where LOCATION_CODE = \'' + facility+'\'';
 pstmt = conn.prepareStatement(getFacilityDescQuery);
	rs = pstmt.executeQuery();
	var facility = " ";
	var i = 0;
	while (rs.next()) {
		facility = rs.getString(1);
		
	}
	
		$.trace.error("facility desc- "+ facility);
	outputStructure(getPermitsBasedOnWells(parsedLocation,facility));
		
	}
//		
		
		
	
//	$.response.contentType = 'application/json';
//    $.response.setBody(JSON.stringify(
//    		
//    {
//    	
//    	"Params": facility
//    })
//    		);
}

catch(e){
	
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}