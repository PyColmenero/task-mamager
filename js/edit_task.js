

$(document).on("click",".days_until", function(){
    get_task_clicked_data( $(this) );
})
$(document).on("click",".day_task", function(){
    get_task_clicked_data( $(this) );
})

function get_task_clicked_data(task){

    Edit.id = task.attr("data-id");
    Edit.edit_create = "E";

    $.ajax({
        type : "POST",
        url  : "./php/get_single_task.php",
        data : {"table_name" : "task_table_" + Conn.id, 
                "taskID": Edit.id},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            if(output_type != '0'){

                console.log( output_total );
                $("#php_errors").html('<'+output_total)

            } else {
                
                Edit.edit_create_p.text("EDITAR")
                Edit.delete_task.css("display", "block"); 

                Edit.task = JSON.parse(output_total)[0];

                var date = Edit.task.date;
                var day = date.split("-")[2]
                var month = date.split("-")[1]
                var year = date.split("-")[0]

                open_card(); 
                if(DEVICE == PHONE){
                    tasks.css("display","block");
                    calendar.css("display","none");
                    close_filters();
                }
                change_inputs(Edit.task.name, Edit.task.description, day, month, year, Edit.task.subject, Edit.task.done, Edit.task.porcentaje, Edit.task.type);

                Edit.edit_create = "E";

            }
            
        }
    });
}

function edit_task(){

    var task_added = add_task();

    console.log(task_added);

    if(task_added) {
        delete_task_f(Edit.id);
        close_card();
    }

}

