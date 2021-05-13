var month_name = $("#month_name")
var cc_right = $("#cc_right")
var cc_left = $("#cc_left")
var days_group = $("#days_group")

var CDate = new DateData();

function get_start_month(start, month){

    var index = start;
        
    for(a = 0; a < (month-1); a++){
        index += CDate.days_month[a]
    }

    var loop = true;
    while(loop){
        
        if(index < 7){
            loop = false
        } else {
            index-= 7
        }
        
    }

    return (index)
}

// Change month calendar
cc_right.click( function(){ change_month(false) })
cc_left.click(  function(){ change_month(true)  })

function change_month(dir){
    if(dir){
        if((CDate.index_month-1) < 11){   CDate.index_month++
        } else {                CDate.index_month = 1
                                CDate.index_year += 1 }
    } else {
        if((CDate.index_month-1) > 0){    CDate.index_month--
        } else {                CDate.index_month = 12
                                CDate.index_year -= 1 }
    }

    // Avoid year Limits
    CDate.index_year = (CDate.index_year > 2024) ? 2024 : CDate.index_year
    CDate.index_year = (CDate.index_year < 2019) ? 2019 : CDate.index_year

    // Calculate Bisiests
    CDate.days_month[1] = (CDate.index_year%4 == 0) ? 29 : 28

    generate_calendar()
}



function generate_calendar(){


    // String of HTML to INJECT
    var days_str = ''

    // Amount of other month days after month 
    var start_index = get_start_month( CDate.start_month[CDate.index_year-2019], CDate.index_month)

    rest_days = 42 - (start_index + CDate.days_month[CDate.index_month-1])

    // center days id are only 28 and start in monday
    if((start_index + rest_days) >= 14){
        start_index += 7
        rest_days-= 7
    }

    // Generare Previus !Real Days
    for(x = 0; x < start_index; x++){
        days_str += '<div class="day-block noselect"></div>'
    }

    // Generate Real Days
    for(day = 0; day < CDate.days_month[CDate.index_month-1]; day++){

        // Get current day tasks
        var datatasks_str = ""

        // Detect today day
        day_today = (day+1 == CDate.real_day && CDate.index_month == CDate.real_month && CDate.index_year == CDate.real_year) ? 'id="day_today" ' : '';

        // Detect selected day
        selected_day = (parseInt(localStorage.getItem("day_selected")) == (day+1)) ? " selected_day" : ""
        
        var tday = (((day+1)+"").length == 1) ? "0"+(day+1) : (day+1);
        var tmonth = ((CDate.index_month+"").length == 1) ? "0"+CDate.index_month : CDate.index_month;
        date = CDate.index_year + "-" + tmonth + "-" + tday;
        // Append real days
        days_str += '<div class="day nselect"><p class="day_number'+selected_day+'" '+day_today+'>'+(day+1)+'</p>';
        days_str += '<div class="day_tasks" id="task'+date+'">'+datatasks_str+'</div></div>';
    }

    // Generare After !Real Days
    for(x = 0; x < rest_days; x++){
        days_str += '<div class="day-block noselect"></div>'
    }

    // Append every day
    days_group.html(days_str)

    // Navbar date
    month_name.html(CDate.months[CDate.index_month-1] + "  -  " + CDate.index_year)
    
    generate_tasks(false)
}


/*function get_today_datataks(year, month, day){

    tasks_str = ""

    // Generate day KEY
    current_key = year+"_"+month+"_"+(day+1)
    
    day_tasks = data_tasks[current_key]

    // If KEY exists
    if(day_tasks){
        // Itearate daytasks
        for(task = day_tasks.length; task >= 0 ; task--){
            
            // If daytask isnt NULL
            if(day_tasks[task]){
               
                // Current TaskData
                task_data = day_tasks[task]

                task_day    = task_data[0]
                task_month  = task_data[1]
                task_year   = (task_data[2]) ? task_data[2] : CDate.index_year
                task_name   = task_data[3]
                task_desc   = task_data[4]
                task_r      = task_data[5]
                task_progress = task_data[6]

                // Get days until TASk date
                days_until = getDaysUntil(real_date, (task_month+'/'+task_day+'/'+task_year))
                if(days_until == 0) days_until = getDaysUntil((task_month+'/'+task_day+'/'+task_year), real_date) * -1


                // Through filters
                if(world_in == "" || task_name.includes(world_in) || task_desc.includes(world_in)){ // Word Filter
                    if(r_in == "" || task_r == r_in_filter1 || task_r == r_in_filter2){             // Resolution Filter
                        if(f_day_in == "" || days_until >= f_day_in){                               // First day Filter
                            if(l_day_in == "" || days_until <= l_day_in){                           // Last day Filter

                                // Append dataTask
                                var ytask = ""
                                if(year == "0"){
                                    task_year = "0"
                                    ytask = " ytask"
                                }

                                tasks_str += '<div class="day_task'+ytask+'" title="'+task_desc+'" data-indextask="'+task+'" data-indexyear="'+task_year+'" data-indexmonth="'+ task_month +'" data-indexday="'+task_day+'">'
                                tasks_str += '<div class="progress_day_task" style="width:'+task_progress+'%">&nbsp;</div><div><p class="day_task_name">'+task_name+'</p>'
                                tasks_str += '</div></div>'
                            }
                        }
                    }
                }
            }
        }
    }
    return (tasks_str)
}*/