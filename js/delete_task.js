Edit.delete_task.click(function(){

    delete_task_f(Edit.id);
    get_tasks();
    close_card();

})

function delete_task_f(task_id){
    
    $.ajax({
        type : "POST",
        url  : "./php/delete_task.php",
        data : {"table_name": "task_table_" + Conn.id, 
                "taskID": task_id},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            if(output_type != '0'){

                console.log( output_total );
                $("#php_errors").html('<'+output_total)

            } else {

                console.log("Task Deleted: " + output_total);
                get_tasks()

            }
        }
    });
}