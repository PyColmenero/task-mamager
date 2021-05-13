

function load_pumples(){

    $.ajax({
        type : "POST",  //type of method
        url  : "./php/get_bds_tasks.php",  //your page
        data : {"table_name" : "task_table_" + Conn.id},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            if(output_type != '0'){

                console.log( output_total );
                $("#php_errors").html('<'+output_total)

            } else {
                
                var pumples = JSON.parse(output_total)

                for(var x = 0; x < pumples.length; x++){

                    var date = pumples[x].date;


                    var day = date.split("-")[2]
                    var month = date.split("-")[1]
                    var year = date.split("-")[0];
                
                    var uk_task_date = (month+'/'+day+'/'+year)
                    var days_until = CDate.getDaysUntil(CDate.real_date, uk_task_date)
                    if(days_until == 0) days_until = CDate.getDaysUntil(uk_task_date, CDate.real_date) * -1
                    
                    if(days_until < 0){
                        var new_date = (parseInt(year)+1) + "/" + month + "/" + day;
                        update_bd(pumples[x].id, new_date)
                    }
                }
            }
        }
    });
}

function update_bd(id, new_date){

    console.log(id, new_date);

    $.ajax({
        type : "POST",  //type of method
        url  : "./php/update_bd.php",  //your page
        data : {"table_name" : "task_table_" + Conn.id,
                "id": id,
                "new_date": new_date},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            if(output_type != '0'){

                console.log( output_total );
                $("#php_errors").html('<'+output_total)

            } else {
                
                console.log(output_total);

            }
        }
    });

}