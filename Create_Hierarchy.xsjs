var ReqBody = $.request.body.asString();
ReqBody = JSON.parse(ReqBody);

try{
    
	var maxLength;
	var conn = $.hdb.getConnection();
	
// 	Delete the existing hierarchy data from the Location table
	var hierachy = "DELETE FROM \"IOP\".\"PRODUCTION_LOCATION_DUMMY\" WHERE 1=1";
            // var conn = $.hdb.getConnection();
            conn.executeUpdate(
            		hierachy
            );
	////// To insert Prodcution Location data into DB
	maxLength = ReqBody.ROOT.HIERARCHY.item.length;
	var Insert_Hierarchy_query,i;
	for(i=0;i<maxLength;i++){
		Insert_Hierarchy_query = 'Insert into "IOP"."PRODUCTION_LOCATION_DUMMY" values (?,?,?,?)';
		conn.executeUpdate(
				Insert_Hierarchy_query,
				ReqBody.ROOT.HIERARCHY.item[i].LOCATION_CODE,
				ReqBody.ROOT.HIERARCHY.item[i].PARENT_LOCATION_CODE,
				ReqBody.ROOT.HIERARCHY.item[i].LOCATION_TYPE,
				ReqBody.ROOT.HIERARCHY.item[i].LOCATION_TEXT
				);
		
	}
	/// Delete Nueces Field
		var deleteNueces = "DELETE FROM \"IOP\".\"PRODUCTION_LOCATION_DUMMY\" WHERE LOCATION_CODE = 'MUR-US-EFS-NC00'";
            // var conn = $.hdb.getConnection();
            conn.executeUpdate(
            		deleteNueces
            );
            
            
            // Trim the first 9 character from Well Pad Description
            var trimWellPadPrefix = 'Update "IOP"."PRODUCTION_LOCATION_DUMMY" set "LOCATION_TEXT"=trim(SUBSTRING(LOCATION_TEXT,1,9) from LOCATION_TEXT) where LOCATION_TYPE= '+'\'Well Pad\'';
	         conn.executeUpdate(
            		trimWellPadPrefix
            );
            $.trace.error(trimWellPadPrefix);
            
	// 	Delete the existing well and muwi data from the Location table
		var well_muwi = "DELETE FROM \"IOP\".\"WELL_MUWI_DUMMY\" WHERE 1=1";
            // var conn = $.hdb.getConnection();
            conn.executeUpdate(
            		well_muwi
            );
            
	//// To insert MUWI details to DB
		maxLength = ReqBody.ROOT.WELLS_MUWI.item.length;
	var Insert_MUWI_query;
	for(i=0;i<maxLength;i++){
		Insert_Hierarchy_query = 'Insert into "IOP"."WELL_MUWI_DUMMY" values (?,?)';
		conn.executeUpdate(
				Insert_Hierarchy_query,
				ReqBody.ROOT.WELLS_MUWI.item[i].WELL,
				ReqBody.ROOT.WELLS_MUWI.item[i].MUWI
			
				);
		
	}
	
	
	
	
	conn.commit();
	
	var output = {
			"Success": maxLength// "Hierarchy Data is inserted Successfully"
	};
	
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify(output));
	
}
catch(e){
	
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}