$.response.contentType = 'application/json';
var output = {};
var facility = $.request.parameters.get("facility");
var muwi = $.request.parameters.get("muwi");
var conn = $.db.getConnection();


if (muwi === undefined || muwi === null) {
	
//	var Query = 'SELECT d.FIRSTNAME, d.LASTTNAME, d.CONTACTNUMBER, c.PERMITNUMBER, c.FACILTYORSITE FROM ( SELECT a.PERMITNUMBER, a.FACILTYORSITE, b.ISACTIVE FROM ( SELECT PERMITNUMBER, FACILTYORSITE FROM "IOP"."JSA_LOCATION" WHERE FACILITY = ? ) AS a INNER JOIN "IOP"."JSAHEADER" AS b ON a.PERMITNUMBER = b.PERMITNUMBER AND b.ISACTIVE IN (1,2)) AS c LEFT OUTER JOIN "IOP"."PTWPEOPLE" AS d ON c.PERMITNUMBER = d.PERMITNUMBER';
	
	var Query_Shubham = 'Select "P"."FIRSTNAME" , "P"."LASTTNAME", "P"."CONTACTNUMBER", "P"."PERMITNUMBER", "L"."FACILTYORSITE" from "IOP"."PTWPEOPLE" as P inner join "IOP"."JSAHEADER" as J on "P"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSA_LOCATION" as L on "P"."PERMITNUMBER" = "L"."PERMITNUMBER" where  "L"."FACILITY" = ? AND ("J"."ISACTIVE" in( 1,2))';
	
	
		var TOJSALOCATION = conn.prepareStatement(Query_Shubham);
	TOJSALOCATION.setString(1,facility);
	
	
	var rs = TOJSALOCATION.executeQuery();
	var res=[];
	while (rs.next()) {
		output={};
		   output.firstName = rs.getString(1);
		   output.lastName = rs.getString(2);
		   output.contactNumer = rs.getString(3);
		   output.permitNumber = rs.getString(4);
		   output.faciltyorsite = rs.getString(5);
		   
		   
		   res.push(output);
	}
}

else{
//	var Query = 'SELECT d.FIRSTNAME, d.LASTTNAME, d.CONTACTNUMBER, c.PERMITNUMBER, c.FACILTYORSITE FROM ( SELECT a.PERMITNUMBER, a.FACILTYORSITE, b.ISACTIVE FROM ( SELECT PERMITNUMBER, FACILTYORSITE FROM "IOP"."JSA_LOCATION" WHERE ((FACILITY = ? AND MUWI = \'\' ) or MUWI=?)) AS a INNER JOIN "IOP"."JSAHEADER" AS b ON a.PERMITNUMBER = b.PERMITNUMBER AND b.ISACTIVE IN (1,2)) AS c LEFT OUTER JOIN "IOP"."PTWPEOPLE" AS d ON c.PERMITNUMBER = d.PERMITNUMBER';
	
	var Query_Shubham = 'Select "P"."FIRSTNAME" , "P"."LASTTNAME", "P"."CONTACTNUMBER", "P"."PERMITNUMBER", "L"."FACILTYORSITE" from "IOP"."PTWPEOPLE" as P inner join "IOP"."JSAHEADER" as J on "P"."PERMITNUMBER" = "J"."PERMITNUMBER" inner join "IOP"."JSA_LOCATION" as L on "P"."PERMITNUMBER" = "L"."PERMITNUMBER" where  ("L"."MUWI" = ? or ("L"."FACILITY" = ? and "L"."MUWI" = \'\' )) AND ("J"."ISACTIVE" in( 1,2))';

	
	
	var TOJSALOCATION = conn.prepareStatement(Query_Shubham);
	TOJSALOCATION.setString(1,muwi);
	TOJSALOCATION.setString(2, facility);
	var rs = TOJSALOCATION.executeQuery();
	var res=[];
	while (rs.next()) {
		output={};
		   output.firstName = rs.getString(1);
		   output.lastName = rs.getString(2);
		   output.contactNumer = rs.getString(3);
		   output.permitNumber = rs.getString(4);
		   output.faciltyorsite = rs.getString(5);
		   
		   
		   res.push(output);
	}



}

res.sort(function(a,b){
	return a.faciltyorsite > b.faciltyorsite ? 1 : -1;
});
var resultDataList = res.length;
var i;
var ptwPermitNumber = []; 
var finalDataArry = [];
var obj = {}; 
var faciltyorsiteData = {};
for ( i = 0; i < resultDataList; i++) {
	obj = {};
	obj.permitNumber = res[i].permitNumber;
	obj.firstName = res[i].firstName;
	obj.lastName = res[i].lastName;
	obj.contactNumer = res[i].contactNumer;
	faciltyorsiteData.faciltyorsite = res[i].faciltyorsite;
	if (!faciltyorsiteData.ptwPeople ) {
		faciltyorsiteData.ptwPeople = [];
	}
	
	if (i === resultDataList-1) {
		finalDataArry.push(faciltyorsiteData);
		faciltyorsiteData.ptwPeople.push(obj);
		break;
	} else if(res[i].faciltyorsite === res[i+1].faciltyorsite){
		faciltyorsiteData.ptwPeople.push(obj);
	}else {
		faciltyorsiteData.ptwPeople.push(obj);
		finalDataArry.push(faciltyorsiteData);
		faciltyorsiteData = {};
		faciltyorsiteData.ptwPeople = [];
	}
} 



rs.close();
TOJSALOCATION.close();
conn.close();
var resp=JSON.stringify(finalDataArry);
$.response.setBody(resp);
