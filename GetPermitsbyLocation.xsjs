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

try{
	var conn = $.db.getConnection();
	if (muwi!=="''"){
		
		var get_permit_query = 'select "L"."PERMITNUMBER" from "JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where ("L"."MUWI" ='+ muwi + ' or ("L"."FACILITY" = '+ facility +' and "L"."MUWI" = \'\' )) and ("J"."ISACTIVE" = 1 or "J"."ISACTIVE" = 2) ORDER BY "R"."LASTUPDATEDDATE" DESC ';
		
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
		
		get_query = 'select "J"."JSAPERMITNUMBER","P"."PTWPERMITNUMBER","P"."CREATEDBY","P"."ISCWP","P"."ISHWP","P"."ISCSE","R"."CREATEDDATE","L"."FACILTYORSITE","J"."PERMITNUMBER" , "R"."LASTUPDATEDDATE", "P"."STATUS" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" in' +str+ 'ORDER BY "R"."LASTUPDATEDDATE" DESC ' ;  
  
		
		$.response.setBody(get_query);
	    pstmt = conn.prepareStatement(get_query);
	    
	    rs = pstmt.executeQuery();
	    while (rs.next()) {
	    	ptwRecord.jsaPermitNumber = rs.getString(1);
	    	ptwRecord.ptwPermitNumber = rs.getString(2);
	    	ptwRecord.createdBy 	  = rs.getString(3);
	    	ptwRecord.isCWP		 	 		  = rs.getString(4);
	    	ptwRecord.isHWP		 	  		  = rs.getString(5);
	    	ptwRecord.isCSE		 	  		  = rs.getString(6);
	    	ptwRecord.createdDate     = rs.getString(7).split('.')[0]; 
	    	ptwRecord.facilityorsite  = rs.getString(8);
	    	ptwRecord.permitNumber	  = rs.getString(9);
	    	ptwRecord.lastUpdatedDate       = rs.getString(10).split('.')[0]; // Truncate nanoseconds from Timestamp;
	    	ptwRecord.status    		= rs.getString(11);
	    	transdata.ptwRecord.push(ptwRecord);
	    	ptwRecord={};
	    	
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
    
		get_query = 'select "J"."JSAPERMITNUMBER","P"."PTWPERMITNUMBER","P"."CREATEDBY","P"."ISCWP","P"."ISHWP","P"."ISCSE","R"."CREATEDDATE","L"."FACILTYORSITE","J"."PERMITNUMBER", "R"."LASTUPDATEDDATE", "P"."STATUS" from "IOP"."JSA_LOCATION" as L inner join "IOP"."JSAHEADER" as J on "L"."PERMITNUMBER" = "J"."PERMITNUMBER" left join "IOP"."PTWHEADER" as P on "L"."PERMITNUMBER" = "P"."PERMITNUMBER" inner join "IOP"."JSAREVIEW" as R on "L"."PERMITNUMBER" = "R"."PERMITNUMBER" where "J"."PERMITNUMBER" in' +str+' ORDER BY "R"."CREATEDDATE" DESC ' ;   

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
	    	transdata.ptwRecord.push(ptwRecord);
	    	ptwRecord={};
	}
		
    }
	}
	
	/// ********* Below logic is for segregating location of Permit Number *********** ////
	var obj = {};
	var maxlength = transdata.ptwRecord.length;
	var i;
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
		if(!obj.facilityorsite){
		obj.facilityorsite  = [];
		}
		
		if( i === maxlength-1 ){
			if(transdata.ptwRecord[i].facilityorsite !== ''){
				obj.facilityorsite.push(transdata.ptwRecord[i].facilityorsite);
			}
			rawdata.push(obj);
			break;
			
		}
		
		else if(transdata.ptwRecord[i].ptwPermitNumber ===transdata.ptwRecord[i+1].ptwPermitNumber ){
			if(transdata.ptwRecord[i].facilityorsite !== ''){
				obj.facilityorsite.push(transdata.ptwRecord[i].facilityorsite);
			}
			
			
		}
		else {
			if(transdata.ptwRecord[i].facilityorsite !== ''){
				obj.facilityorsite.push(transdata.ptwRecord[i].facilityorsite);
			}
			rawdata.push(obj);
			obj = {};
			
			obj.facilityorsite = [];
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
    	permitRecord.facilityorsite  =  rawdata[i].facilityorsite.slice();
    	permitRecord.permitNumber	 = rawdata[i].permitNumber;
    	permitRecord.lastUpdatedDate = rawdata[i].lastUpdatedDate;
    	permitRecord.status			 = rawdata[i].status;
    	
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
	
// $.response.setBody(JSON.stringify(rawdata));
    $.response.status = $.net.http.OK;
}
catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}