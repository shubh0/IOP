function downloadData()
/*
* This function downloads the data in form of an excel file.
*/
{
	var body = '';
  var fin_query = 'SELECT * from  "IOP"."TEST2" ';
  var conn = $.db.getConnection();
var pstmt;
  var rs;
  pstmt = conn.prepareStatement(fin_query); 
  rs = pstmt.executeQuery();
while(rs.next()){
    body += "\n"+rs.getString(1) 
  + "," + rs.getString(2) 
  + "," + rs.getString(3)
  + "," + rs.getString(4) 
  +"," + rs.getString(5)
//   "\t" + rs.getString(6) + 
//   "\t" + rs.getString(7)+
//   "\t" + rs.getString(8)+ 
//   "\t" + rs.getString(9) + 
//   "\t" + rs.getString(10)
;//Branch
  

}

	var Data = "FILENAME" +
		","+"NAME"+
		","+"TEST"+
		","+"TEST1"+
		","+"RESULTS"+
// 		"\t"+"LOCATION"+
// 		"\t"+"PUSER_ID"+
// 		"\t"+"FIRST_NAME"+
// 		"\t"+"LAST_NAME"+
// 		"\t"+"FACILITY"+
		
		body;
  $.response.setBody(Data);
  $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le'; 
  $.response.headers.set('Content-Disposition','attachment; filename=test.csv'); 
  $.response.headers.set('access-control-allow-origin','*'); 
  $.response.status = $.net.http.OK;
}
downloadData();