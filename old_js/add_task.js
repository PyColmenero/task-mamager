var name_input = $("#name_input")
var day_input = $("#day_input")
var month_input = $("#month_input")
var year_input = $("#year_input")
var resol_input = $("#resol_input")
var subject_input = $("#subject_input")
var percentaje_input = $("#percentaje_input")
var desc_input = $("#desc_input")

var button_task_creator = $("#button_task_creator")

button_task_creator.click(function(){ 
    if(create_edit == "C"){    
        add_task();
    } else {            
        edit_task();
    }
})


var close_card_button = $("#close_card_button")
close_card_button.click(function(){ close_card() })

resol_input.keyup(function(){
    if(resol_input.val() == "H"){
        percentaje_input.val("100")
    }
})


function add_task(){

    var task_month = month_input.val()
    var task_year = year_input.val()


    if(day_input.val() && task_month && name_input.val() && resol_input.val()){
        // Make TaskDataArray
        /*data_task = [day_input.val(),task_month, task_year,name_input.val(),desc_input.val(),resol_input.val(),percentaje_input.val()]

        task_key = task_year+"_"+task_month+"_"+day_input.val()

        // If DayTask is in Diccionay
        if(data_tasks[task_key]){
            // Add TaskDataArray in key Array
            data_tasks[task_key].push(data_task)
        } else {
            // Add TaskDataArray into Array
            data_tasks[task_key] = [data_task]
        }

        // Storage DataTasks
        data_tasks = save_data("data_tasks", data_tasks)

        // Asign current task date to calendar
        index_month = parseInt(task_month)
        if(task_year != "0") index_year =  parseInt(task_year)

        create_edit = true

        update()*/

        console.log("ola");
        new_task(name_input.val(),desc_input.val(),subject_input.val(),percentaje_input.val(),resol_input.val(), day_input.val(), task_month, task_year);

        update()

    } else {
        console.log("EMPTY INPUTS")
    }
    

}