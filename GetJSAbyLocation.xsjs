var pstmt;
var rs;
var get_query;
var output = { JSADetails:[]};
var facility = $.request.parameters.get("facility");
var muwi 	 = $.request.parameters.get("muwi");

function uniq(a) {		// function to delete duplicates from array
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1];
    });
}

try {
	
	var conn = $.db.getConnection();

	if (muwi!=="''"){ // Check if the MUWI number is passed through or not
		
		var get_permit_query = 'select "L"."PERMITNUMBER" from "JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where ("L"."MUWI" ='+ muwi + ' or ("L"."FACILITY" = '+ facility +' and "L"."MUWI" = \'\' )) AND ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
		
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
	    
	get_query = 'select "J"."JSAPERMITNUMBER", "J"."TASKDESCRIPTION","J"."STATUS","P"."PTWPERMITNUMBER","R"."CREATEDDATE","R"."CREATEDBY" , "L"."FACILTYORSITE", "R"."LASTUPDATEDDATE", "R"."APPROVEDDATE","J"."PERMITNUMBER" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" IN '+ str +' ORDER BY "R"."LASTUPDATEDDATE" DESC ' ;  
	
	
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
    	if(rs.getString(7) !== null){
    	JSArecord.lastUpdatedDate       = rs.getString(8).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	}
    	if(rs.getString(8) !== null){
    	JSArecord.approvedDate			= rs.getString(9).split('.')[0]; // Truncate nanoseconds from Timestamp;
    	}
    	JSArecord.permitNumber          = rs.getString(10);
    	output.JSADetails.push(JSArecord);
    	JSArecord = {};
   
    }
   
	}
	}
	
	else{
		
		var get_permit_query = 'select "L"."PERMITNUMBER" from "JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "L"."FACILITY" ='+ facility +' and ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
		
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
    
		get_query = 'select "J"."JSAPERMITNUMBER", "J"."TASKDESCRIPTION","J"."STATUS","P"."PTWPERMITNUMBER","R"."CREATEDDATE","R"."CREATEDBY" ,"L"."FACILTYORSITE", "R"."LASTUPDATEDDATE", "R"."APPROVEDDATE","J"."PERMITNUMBER" from "IOP"."JSAHEADER" as J left join "IOP"."JSA_LOCATION" as L on "J"."PERMITNUMBER" = "L"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "J"."PERMITNUMBER" = "P"."PERMITNUMBER" left join "IOP"."JSAREVIEW" as R on "J"."PERMITNUMBER" = "R"."PERMITNUMBER" where  "J"."PERMITNUMBER" IN '+ str +' ORDER BY "R"."LASTUPDATEDDATE" DESC' ;  
		
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
	    	output.JSADetails.push(JSArecord);
	    	JSArecord = {};
	    }
	    
		
	}
	}
//    Below logic is to make ouptput in a representable format so that UI can consume it
    var jsaDetailLength = output.JSADetails.length;
    var i;

    var finalDataArry = [];
    var obj = {}; 
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
    	if (!obj.ptwPermitNumber ) {
    		obj.ptwPermitNumber = [];
		}
    	if (!obj.facilityorsite ) {
    		obj.facilityorsite = [];
		}
    	
		if (i === jsaDetailLength-1) {
			
			if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
			obj.ptwPermitNumber.push(output.JSADetails[i].ptwPermitNumber);
			}
			if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
			obj.facilityorsite.push(output.JSADetails[i].facilityorsite); // Added by Shubham
			}
			obj.facilityorsite = uniq(obj.facilityorsite);
			finalDataArry.push(obj);
			
			break;
		} else if(output.JSADetails[i].jsaPermitNumber === output.JSADetails[i+1].jsaPermitNumber){
			if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
				obj.ptwPermitNumber.push(output.JSADetails[i].ptwPermitNumber);
				}
				if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
				obj.facilityorsite.push(output.JSADetails[i].facilityorsite); // Added by Shubham
				}
			
		}else {
			if(output.JSADetails[i].ptwPermitNumber !== null){ // Insert only if the value is not null
				obj.ptwPermitNumber.push(output.JSADetails[i].ptwPermitNumber);
				}
				if(output.JSADetails[i].facilityorsite !== ""){ // Insert only if the value is not null
				obj.facilityorsite.push(output.JSADetails[i].facilityorsite); // Added by Shubham
				}
			obj.facilityorsite = uniq(obj.facilityorsite); // Filtering duplicate from location
			finalDataArry.push(obj);
			obj = {};
			obj.ptwPermitNumber = [];
			obj.facilityorsite = [];
		}
	}
 

   
    conn.close();
    
   var body = JSON.stringify(finalDataArry);
//    var out = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
//    $.response.setBody(JSON.stringify(
//            {
//                   "Success": str,
//                   
//            }
//));
    $.response.status = $.net.http.OK;
    
} catch (e) {
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
	}

