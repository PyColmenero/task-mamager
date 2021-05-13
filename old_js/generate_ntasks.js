
fast_tasks_group = $("#fast_tasks_group")
normal_tasks_group = $("#normal_tasks_group")


function generate_panel_ntasks(){
    
    var task_str = ""

    // sort tasks
    task_list = sort_tasks()

    // generate them
    var last_task_date =  ""

    for(var day = 0; day < task_list.length ; day++){

        
        for(ti = 0; ti < task_list[day].length; ti++){

            task = task_list[day][ti]

                
            // Get all vars
            task_day    = task[0]
            task_month  = task[1]
            task_year   = task[2]
            task_name   = task[3]
            task_r      = task[5]
            task_desc   = task[4]
            task_porc   = task[6]

            if( !(task_year == 0 && !checked_ytask)){

                if(task_year == 0){
                    is_past = date_before_today( task_month+'/'+task_day+'/'+index_year )
                    task_year = (is_past) ? index_year+1 : index_year
                }

                task_date   = task_day+'/'+task_month+'/'+task_year
                uk_task_date = (task_month+'/'+task_day+'/'+task_year)


                // Get days until TaskDate
                days_until = getDaysUntil(real_date, uk_task_date)
                if(days_until == 0) days_until = getDaysUntil(uk_task_date, real_date) * -1
                

                // Trough Filter
                if( navbar_filter(task_name, task_desc, task_r, days_until) ) {

                    // WORLD FILTER BOLD
                    if(world_in != ""){
                        task_name = bold_filter(task_name, world_in)
                        task_desc = bold_filter(task_desc, world_in)
                    }


                    // Days until COLOR
                    bg_color = get_dayuntil_color(days_until)
                    

                    // If date changes
                    last_date_task  = (task_date == last_task_date) ? "" : " last_task"
                    day_div         = (task_date == last_task_date) ? "" : "<div class='day_group' style='background-color:"+bg_color+"' >"+task_date+"</div>"

                    var ytask = (task_year == "0") ? " ytask" : ""

                    // Append taskHTML                
                    task_str += day_div + '<div class="task'+last_date_task+''+ytask+'"> <div class="days_until" style="background-color:'+bg_color+';" data-indexyear="'+task_year+'" data-indexmonth="'+ task_month +'" data-indexday="'+task_day+'">'
                    task_str += '<p class="nselect">'+days_until+'</p></div>'
                    task_str += '<div class="task_data" > <div><p class="task_name">'+task_name+'</p>'
                    task_str += '<p class="task_desc">'+task_desc+'</p></div>'
                    task_str += '<div><p>'+task_r+'</p> <p>'+task_date+'</p></div> <div  style="width:'+task_porc+'%"></div> </div></div>'

                    last_task_date = task_date

                }
            }
            
        }
    }

    normal_tasks_group.html(task_str)
}

function get_dayuntil_color(day){

    var color = ""

    if(day <= 0){            
        color = "rgb(200, 50, 50)"
    } else if(day <= 1){     
        color = "rgb(255, 150, 150)"
    } else if(day <= 3) {    
        color = "rgb(255, 255, 100)"
    } else {                        
        color = "rgb(160, 255, 160)"   
    }

    return color;
}

function bold_filter(str, word){

    name_index = str.indexOf(word)

    if(name_index != -1){
        bolded = "<strong>" + word + "</strong>" 
        str = str.replace(word, bolded )
    }

    return str;

}


function sort_tasks(){

    var tasks = []

    for (const key in data_tasks) { 
        tasks.push( data_tasks[key] )
    }

    // Sort both
    aux = 0;
    for(x = 0; x < (tasks.length-1); x++ ) 
    {
        for(y = x+1; y < tasks.length; y++) 
        {

            var day = tasks[x][0][0]
            var month = tasks[x][0][1]
            var year = tasks[x][0][2]

            var day1 = tasks[y][0][0]
            var month1 = tasks[y][0][1]
            var year1 = tasks[y][0][2]

            if(year == "0") {
                if( date_before_today( month + "/" + day + "/" + index_year ) ){
                    year  = index_year+1
                } else {
                    year  = index_year
                }
            }
            if(year1 == "0") {
                if( date_before_today( month1 + "/" + day1 + "/" + index_year ) ){
                    year1  = index_year+1
                } else {
                    year1  = index_year
                }
            }
            

            var days_until = getDaysUntil(real_date, month + "/" + day + "/" + year)
            if(days_until == 0) days_until = getDaysUntil(month + "/" + day + "/" + year, real_date) * -1

            var days_until1 = getDaysUntil(real_date, month1 + "/" + day1 + "/" + year1)
            if(days_until1 == 0) days_until1 = getDaysUntil(month1 + "/" + day1 + "/" + year1, real_date) * -1

            if(days_until > days_until1){
                aux = tasks[x];
                tasks[x] = tasks[y];
                tasks[y] = aux;
            }
        }
    }

    return tasks;
}