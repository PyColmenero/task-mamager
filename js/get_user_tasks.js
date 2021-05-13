

function get_tasks(){

    if(Conn.id.length!=0) {
        $.ajax({
            type : "POST",  //type of method
            url  : "./php/get_task.php",  //your page
            data : {"table_name" : "task_table_" + Conn.id, 
                    "orderby": Conn.order_sentence, 
                    "word_filter": Conn.word_filter, 
                    "done_filter": Conn.done_filter, 
                    "subject_filter":Conn.subject_filter},  // passing the values
            success: function(res){  

                var output_type = res.substring(0,1);
                var output_total = res.substring(1, res.length);
                
                if(output_type != '0'){

                    console.log( output_total );
                    $("#php_errors").html('<'+output_total)

                } else {
                    
                    every_user_task = JSON.parse(output_total);

                    generate_tasks(true);

                }
                
            }
        });
    }
}