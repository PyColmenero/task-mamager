
function generate_panel_ftasks(){

    var task_str = ""
    fast_tasks_group.html("")

    // Iterate Fast Tasks array
    if(data_ftasks){
        for(ft = 0; ft < data_ftasks.length; ft++){
        
            //  IF !null
            if(data_ftasks[ft]){
                style_done = !(data_ftasks[ft][1] == 1) ? "" :"style='background-color:#000000'"
                style_deco = !(data_ftasks[ft][1] == 1) ? "" : "style='text-decoration:line-through'"
    
                task_str += '<div class="fast_task" data-index="' + ft + '">'
                task_str += '<div><img '+style_done+' class="fast_task_done" src="medias/cuadrado.svg"></div> <div '+style_deco+'>' + data_ftasks[ft][0] + '</div>'
                task_str += '<div class="delete_fast_task nselect">x</div> </div>'
            }
        }
    }
    
    fast_tasks_group.html(task_str) 
}