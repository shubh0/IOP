function escape(v1)
{
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return v2;
}
$.response.contentType = "text/html";
try
{
          var conn = $.db.getConnection();
           var conn1 = $.hdb.getConnection();
          var filename = $.request.parameters.get("filename");
//          var pstmtTime = conn.prepareStatement( "select UTCTOLOCAL(CURRENT_UTCTIMESTAMP,'EST') from dummy");
//          var rs = pstmtTime.executeQuery();
//          var batchTimestamp;
//          if (rs.next())
//          {
//                    batchTimestamp = rs.getTimestamp(1);
//          }
//          var batchId = filename+"_"+batchTimestamp;
          var query = conn.prepareStatement('truncate table "IOP"."TEST2"');
          query.execute();
          
          
          var pstmt =  "insert into \"IOP\".\"TEST2\" values(?,?,?,?,?)" ;
          if($.request.entities.length>0){
                    var file_body = $.request.entities[0].body.asString();
                    var allTextLines = file_body.split(/\r\n|\n/);
                    var lines;
                    var entries;
                    var i;
                    var col;
                    var te;
                    
                    var col1;
                    var arry=[];
                    var X;
                    //pstmt.setBatchSize(allTextLines.length-1);
                    $.trace.error("All line length"+allTextLines.length);
                    for (lines=0; lines<allTextLines.length-1; lines++)
                    {	
                    	 
                            entries = allTextLines[lines].split(',');
                             
                          col = entries.splice(0,allTextLines.length);
                      
                          $.trace.error("The value of col" +col.toString());
                          
                              if ( col[0].length > 0 )
                              {
                                  
                                  $.trace.error( "the value of col[0] length "+col[0].length.toString());
                                        col[0] = escape(col[0]);
                                        col[1] = escape(col[1]);
                                        col[2] = escape(col[2]);
                                        col[3] = escape(col[3]);
                                        
                                       // X=col[1]*col[2];
                                        // pstmt.setString(1,filename);
                                        // pstmt.setString(2,col[0]);
                                        // pstmt.setString(3,col[1]);
                                        //  pstmt.setString(4,col[2]);
                                        //  pstmt.setInteger(5,X);
                                        var intialarry=[filename,col[0],col[1],col[2],col[3]];
                                         
                                         arry.push(intialarry);
                                        $.trace.error("the value of col[0]"+col[0].toString());
                                       // pstmt.addBatch();
                                         $.trace.error("BATCH VALUE"+arry);
                                        
                                        
                              }


                              
                              
                    }
                    
//                     var newArray = [];
// arry.forEach(function(item, index, arry) {
//     var value1, value2, value3 = 0, value4 = 0, value5 = 0;

//     arry.forEach(function(item1, index1, array1) {
//         if (item[0] === item1[0] && item[1] === item1[1]) {
//             value1 = item[0];
//             value2 = item[1];
//             value3 = value3 + item1[2];
//             value4 = value4 + item1[3];
//             value5 = value5 + item1[4];

//         }

//     });

//     var tempArray = [];
//     tempArray.push(value1);
//     tempArray.push(value2);
//     tempArray.push(value3);
//     tempArray.push(value4);
//     tempArray.push(value5);

//     newArray.push(tempArray);

// });

// var hashMap = {};

// newArray.forEach(function(arr){
//   hashMap[arr.join("|")] = arr;
// });

// var result = Object.keys(hashMap).map(function(k){
//   return hashMap[k];
// });


                    conn1.executeUpdate(
                        pstmt,
                        arry
                        );
          }
          else
          {
                    $.response.setBody("No Entries");
          }
        //  pstmt.close();
          conn.commit();
          conn1.commit();
          conn.close();
         $.response.setBody("[200]:Upload successful!");
         
}
catch(err)
{
         
          $.response.setBody(err.message);
}