
world_filter = $("#word_filter")
r_filter = $("#r_filter")
f_day_filter = $("#f_day_filter")
l_day_filter = $("#l_day_filter")


world_filter.keyup(function(){  update_panel(); generate_m() })
r_filter.keyup(function(){      update_panel(); generate_m() })
f_day_filter.keyup(function(){  update_panel(); generate_m() })
l_day_filter.keyup(function(){  update_panel(); generate_m() })


function update_panel(){

    task_str = ""

    task_str = generate_fast_tasks(task_str)

    task_str = generate_tasks(task_str)
    
    tasks_group.html(task_str)
}


function generate_fast_tasks(task_str){

    // Iterate Fast Tasks array
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

    return task_str
}


function generate_tasks(task_str){
    

    world_in = world_filter.val()
    r_in     = r_filter.val()
    f_day_in = f_day_filter.val()
    l_day_in = l_day_filter.val()

    // If is N, search P and NP tasks ELSE also H
    r_in_filter1 = ""
    r_in_filter2 = ""
    if(r_in == "N"){
        r_in_filter1 = "P"
        r_in_filter2 = "NP"
    } else if(r_in == "H"){
        r_in_filter1 = "H"
        r_in_filter2 = "H"
    } else {
        r_in_filter1 = r_in
        r_in_filter2 = r_in
    }

    // Empty TaskPanel
    tasks_group.html('')

    // Iterate Tasks
    for (const key in data_tasks) {
        
        for(task = 0; task < data_tasks[key].length; task++){

            // Set importante vars
            current_datatask = data_tasks[key][task]
            if(current_datatask){

                // Get all vars
                task_day    = current_datatask[0]
                task_month  = current_datatask[1]
                task_year   = current_datatask[2]
                task_name   = current_datatask[3]
                task_r      = current_datatask[5]
                task_desc   = current_datatask[4]
                task_date   = task_day+'/'+task_month+'/'+task_year
                uk_task_date = (task_month+'/'+task_day+'/'+task_year)

                // Get days until TaskDate
                days_until = getDaysUntil(real_date, uk_task_date)

                // Trough Filter
                if(world_in == "" || task_name.includes(world_in) || task_desc.includes(world_in)){
                    if(r_in == "" || task_r == r_in_filter1 || task_r == r_in_filter2){
                        if(f_day_in == "" || days_until >= f_day_in){
                            if(l_day_in == "" || days_until <= l_day_in){
                                
                                // WORLD FILTER BOLD
                                if(world_in != ""){
                                    name_index = task_name.indexOf(world_in)
                                    desc_index = task_desc.indexOf(world_in)
                                    if(name_index != -1)    task_name = task_name.substring(0, name_index) + "<strong>" + world_in + "</strong>" + task_name.substring(name_index+world_in.length, task_name.length)
                                    if(desc_index != -1)    task_desc = task_desc.substring(0, desc_index) + "<strong>" + world_in + "</strong>" + task_desc.substring(desc_index+world_in.length, task_desc.length)
                                }

                                // Days until COLOR
                                bg_color = ""
                                if(days_until == 0){            bg_color = "rgb(150, 0, 100)"
                                } else if(days_until <= 1){     bg_color = "rgb(245, 54, 54)"
                                } else if(days_until <= 3) {    bg_color = "rgb(250, 250, 30)"
                                } else {                        bg_color = "rgb(10, 250, 10)"   }

                                // Is done task
                                class_done = !(current_datatask[5] == "H") ? "" : "done_task"
                                
                                // Append taskHTML                
                                task_str += '<div class="task '+class_done+'"> <div class="days_until" style="background-color:'+bg_color+';"  data-indextask="'+task+'" data-indexyear="'+task_year+'" data-indexmonth="'+ task_month +'" data-indexday="'+task_day+'">'
                                task_str += '<p class="nselect">'+days_until+'</p></div><div><p>'+task_name+'</p>'
                                task_str += '<p>'+task_desc+'</p></div>'
                                task_str += '<div><p>'+current_datatask[5]+'</p>'
                                task_str += '<p>'+task_date+'</p></div></div>'
                                
                            }
                        }
                    }
                }
            }
        }
    }
    return(task_str)
}

