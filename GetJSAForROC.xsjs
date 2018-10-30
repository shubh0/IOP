var pstmt;
var rs;
var get_query;
var conn = $.db.getConnection();
var output = { JSADetails:[]};
var Location  = $.request.parameters.get("Location");
var finalDataArry = [];
var LocationType 	 = $.request.parameters.get("LocationType");


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

//////////// ***********  This function is to get the JSA's based on Facility values ******************* //////////////////////
function getJSABasedonFacility(facilities){
	
	var get_permit_query = 'select "L"."PERMITNUMBER" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "L"."FACILITY" in '+facilities+' and ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
	
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


	get_query = 'select "J"."PERMITNUMBER", "J"."TASKDESCRIPTION","J"."STATUS","P"."PTWPERMITNUMBER","R"."CREATEDDATE","R"."CREATEDBY" ,"L"."FACILTYORSITE", "R"."LASTUPDATEDDATE", "R"."APPROVEDDATE","J"."PERMITNUMBER","P"."ISCWP","P"."ISHWP","P"."ISCSE" from "IOP"."JSAHEADER" as J left join "IOP"."JSA_LOCATION" as L on "J"."PERMITNUMBER" = "L"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "J"."PERMITNUMBER" = "P"."PERMITNUMBER" left join "IOP"."JSAREVIEW" as R on "J"."PERMITNUMBER" = "R"."PERMITNUMBER" where  "J"."PERMITNUMBER" IN '+ str +' ORDER BY "R"."LASTUPDATEDDATE" DESC' ;  
	
	$.trace.error(get_query);
    pstmt = conn.prepareStatement(get_query);
    
    rs = pstmt.executeQuery();
    	    
    var JSArecord = {};
    
    while (rs.next()) {
    	JSArecord.jsaPermitNumber	 	= rs.getString(1);
    	JSArecord.taskDescription  		= rs.getString(2);
    	JSArecord.status			 	= rs.getString(3);
    	JSArecord.ptwPermitNumber  		= rs.getString(4);
    	if(rs.getString(5) !== null){
    	JSArecord.createdDate           = rs.getString(5).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	}
    	JSArecord.createdBy				= rs.getString(6);
    	JSArecord.facilityorsite		= rs.getString(7);
    	if(rs.getString(8) !== null){
    	JSArecord.lastUpdatedDate       = rs.getString(8).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	}
    	if(rs.getString(9) !== null){
    	JSArecord.approvedDate			= rs.getString(9).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	}
    	JSArecord.permitNumber          = rs.getString(10);
    	JSArecord.isCWP 			    = rs.getString(11);
    	JSArecord.isHWP 			    = rs.getString(12);
    	JSArecord.isCSE 			    = rs.getString(13);
    	output.JSADetails.push(JSArecord);
    	JSArecord = {};
    }
    
    var jsaDetailLength = output.JSADetails.length;
    

    
    var obj = {}; 
    obj.facilityorsite = "";
    for ( i = 0; i < jsaDetailLength; i++) {
    	obj.jsaPermitNumber 	= output.JSADetails[i].jsaPermitNumber;
    	obj.taskDescription 	= output.JSADetails[i].taskDescription;
    	obj.status 				= output.JSADetails[i].status;
    	obj.createdBy 			= output.JSADetails[i].createdBy;
    	obj.createdDate 		= output.JSADetails[i].createdDate;
//    	obj.facilityorsite 		= output.JSADetails[i].facilityorsite;
    	obj.lastUpdatedDate		= output.JSADetails[i].lastUpdatedDate;
    	obj.approvedDate		= output.JSADetails[i].approvedDate;
    	obj.permitNumber		= output.JSADetails[i].permitNumber;
    	
    
  
if (i === jsaDetailLength-1) {
			
			if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
				
			if(output.JSADetails[i].isCWP === "1"){
				obj.CWP = output.JSADetails[i].ptwPermitNumber;
					$.trace.error("PTW Permit Number -" +output.JSADetails[i].ptwPermitNumber);
						$.trace.error("CWP -1");
			}	
			
			if(output.JSADetails[i].isHWP === "1"){
				obj.HWP = output.JSADetails[i].ptwPermitNumber;
					$.trace.error("PTW Permit Number -" +output.JSADetails[i].ptwPermitNumber);
					$.trace.error("HWP-1");
			}
			
			if(output.JSADetails[i].isCSE === "1"){
				obj.CSE = output.JSADetails[i].ptwPermitNumber;
					$.trace.error("PTW Permit Number -" +output.JSADetails[i].ptwPermitNumber);
					$.trace.error("CSE -1");
			}
			
			}
			if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
				
				if (obj.facilityorsite === ''){
					obj.facilityorsite =  output.JSADetails[i].facilityorsite;
				}
				else if(obj.facilityorsite.match(output.JSADetails[i].facilityorsite)){
				     // To make sure duplicate entries doesn't pass
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
				}
			}
			finalDataArry.push(obj);
			obj = {};
		    obj.facilityorsite = "";
			
			break;
		} else if(output.JSADetails[i].jsaPermitNumber === output.JSADetails[i+1].jsaPermitNumber){
			if(output.JSADetails[i].ptwPermitNumber !== null){  // Insert only if the value is not null
				
				if(output.JSADetails[i].isCWP === "1"){
					obj.CWP = output.JSADetails[i].ptwPermitNumber;
				}	
				
				if(output.JSADetails[i].isHWP === "1"){
					obj.HWP = output.JSADetails[i].ptwPermitNumber;
				}
				
				if(output.JSADetails[i].isCSE === "1"){
					obj.CSE = output.JSADetails[i].ptwPermitNumber;
				}
				
				}
				if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
					
					if (obj.facilityorsite === ''){
						obj.facilityorsite =  output.JSADetails[i].facilityorsite;
					}
						else if(obj.facilityorsite.match(output.JSADetails[i].facilityorsite)){
				     // To make sure duplicate entries doesn't pass
				}
					else{
						obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
					}
				}
			
		}else {
			if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
				if(output.JSADetails[i].isCWP === "1"){
					obj.CWP = output.JSADetails[i].ptwPermitNumber;
				}	
				
				if(output.JSADetails[i].isHWP === "1"){
					obj.HWP = output.JSADetails[i].ptwPermitNumber;
				}
				
				if(output.JSADetails[i].isCSE === "1"){
					obj.CSE = output.JSADetails[i].ptwPermitNumber;
				}
				
				
				}
				if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
					
					if (obj.facilityorsite === ''){
						obj.facilityorsite =  output.JSADetails[i].facilityorsite;
					}
						else if(obj.facilityorsite.match(output.JSADetails[i].facilityorsite)){
				    // To make sure duplicate entries doesn't pass
				}
					else{
						obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
					}
				}
			finalDataArry.push(obj);
			obj = {};
		    obj.facilityorsite = ""; // To avoid comma at the first place in the string

		}
	}

    	
    	
	
}


var body = JSON.stringify(finalDataArry);
$.response.setBody(body);
$.response.contentType = 'application/json';


}

function getJSABasedOnWell(wells,facility){
	var get_permit_query = 'select "L"."PERMITNUMBER" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where ("L"."MUWI" in '+ wells + ' or ("L"."FACILITY" = \''+ facility + '\' and "L"."MUWI" = \'\' )) AND ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
    $.trace.error("get permit query - " + get_permit_query);
    pstmt = conn.prepareStatement(get_permit_query);
    // pstmt.setString(1,facility);
rs = pstmt.executeQuery();
var str = "";
var i = 0;
$.trace.error("string - " + str);
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
     $.trace.error("In iF - ");
    
str = str + ')' ; // Close the string for SQL query

	
	
get_query = 'select "J"."PERMITNUMBER", "J"."TASKDESCRIPTION","J"."STATUS","P"."PTWPERMITNUMBER","R"."CREATEDDATE","R"."CREATEDBY" , "L"."FACILTYORSITE", "R"."LASTUPDATEDDATE", "R"."APPROVEDDATE","J"."PERMITNUMBER","P"."ISCWP","P"."ISHWP","P"."ISCSE" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" IN '+ str +' ORDER BY "R"."LASTUPDATEDDATE" DESC ' ;  


$.response.setBody(get_query);
pstmt = conn.prepareStatement(get_query);

rs = pstmt.executeQuery();



var JSArecord = {};

while (rs.next()) {
	JSArecord.jsaPermitNumber	 	= rs.getString(1);
	JSArecord.taskDescription  		= rs.getString(2);
	JSArecord.status			 	= rs.getString(3);
	JSArecord.ptwPermitNumber  		= rs.getString(4);
	if(rs.getString(5) !== null){
	JSArecord.createdDate           = rs.getString(5).split('.')[0]; // Truncate nanoseconds from Timestamp;
	}
	JSArecord.createdBy				= rs.getString(6);
	JSArecord.facilityorsite		= rs.getString(7);
	if(rs.getString(8) !== null){
	JSArecord.lastUpdatedDate       = rs.getString(8).split('.')[0]; // Truncate nanoseconds from Timestamp;
	}
	if(rs.getString(9) !== null){
	JSArecord.approvedDate			= rs.getString(9).split('.')[0]; // Truncate nanoseconds from Timestamp;
	}
	JSArecord.permitNumber          = rs.getString(10);
	JSArecord.isCWP 			    = rs.getString(11);
	JSArecord.isHWP 			    = rs.getString(12);
	JSArecord.isCSE 			    = rs.getString(13);
	output.JSADetails.push(JSArecord);
	JSArecord = {};
}
var jsaDetailLength = output.JSADetails.length;



var obj = {}; 
obj.facilityorsite = "";
for ( i = 0; i < jsaDetailLength; i++) {
	obj.jsaPermitNumber 	= output.JSADetails[i].jsaPermitNumber;
	obj.taskDescription 	= output.JSADetails[i].taskDescription;
	obj.status 				= output.JSADetails[i].status;
	obj.createdBy 			= output.JSADetails[i].createdBy;
	obj.createdDate 		= output.JSADetails[i].createdDate;
//	obj.facilityorsite 		= output.JSADetails[i].facilityorsite;
	obj.lastUpdatedDate		= output.JSADetails[i].lastUpdatedDate;
	obj.approvedDate		= output.JSADetails[i].approvedDate;
	obj.permitNumber		= output.JSADetails[i].permitNumber;
	
	

if (i === jsaDetailLength-1) {
		
		if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
			
		if(output.JSADetails[i].isCWP === "1"){
			obj.CWP = output.JSADetails[i].ptwPermitNumber;
		}	
		
		if(obj.isHWP === "1"){
			obj.HWP = output.JSADetails[i].ptwPermitNumber;
		}
		
		if(obj.isCSE === "1"){
			obj.CSE = output.JSADetails[i].ptwPermitNumber;
		}
		
		}
		if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
//		obj.facilityorsite.push(output.JSADetails[i].facilityorsite); // Added by Shubham
			
			if (obj.facilityorsite === ''){
				obj.facilityorsite =  output.JSADetails[i].facilityorsite;
			}
			else{
				obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
			}
		}
		finalDataArry.push(obj);
		
		break;
	} else if(output.JSADetails[i].jsaPermitNumber === output.JSADetails[i+1].jsaPermitNumber){
		if(output.JSADetails[i].ptwPermitNumber !== null){  // Insert only if the value is not null
			
			if(output.JSADetails[i].isCWP === "1"){
				obj.CWP = output.JSADetails[i].ptwPermitNumber;
			}	
			
			if(obj.isHWP === "1"){
				obj.HWP = output.JSADetails[i].ptwPermitNumber;
			}
			
			if(obj.isCSE === "1"){
				obj.CSE = output.JSADetails[i].ptwPermitNumber;
			}
			
			}
			if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
				
				if (obj.facilityorsite === ''){
					obj.facilityorsite =  output.JSADetails[i].facilityorsite;
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
				}
			}
		
	}else {
		if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
			if(output.JSADetails[i].isCWP === "1"){
				obj.CWP = output.JSADetails[i].ptwPermitNumber;
			}	
			
			if(obj.isHWP === "1"){
				obj.HWP = output.JSADetails[i].ptwPermitNumber;
			}
			
			if(obj.isCSE === "1"){
				obj.CSE = output.JSADetails[i].ptwPermitNumber;
			}
			
			
			}
			if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
				
				if (obj.facilityorsite === ''){
					obj.facilityorsite =  output.JSADetails[i].facilityorsite;
				}
				else{
					obj.facilityorsite = obj.facilityorsite +', '+  output.JSADetails[i].facilityorsite;
				}
			}
		finalDataArry.push(obj);
		obj = {};
	    obj.facilityorsite = ""; // To avoid comma at the first place in the string

	}
}

	
	

}


var body = JSON.stringify(finalDataArry);
$.response.setBody(body);
$.response.contentType = 'application/json';



	

}
try{
	
	
	var parsedLocation = parseInputParameter(Location); /////  This is to get the input in string format
	
	
	
	if (LocationType === "FIELD"){
	var facilities = getFacility(parsedLocation);
	getJSABasedonFacility(facilities);
	
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
	    
		getJSABasedonFacility(str);
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
	
// 	call the method to get JSA based on well and facillity
	getJSABasedOnWell(wells,facility);

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
	
	getJSABasedOnWell(parsedLocation,facility);
		
	
}
		
		

	
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