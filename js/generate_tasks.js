var normal_tasks_group = $("#normal_tasks_group");
var fast_tasks_group = $("#fast_tasks_group");

var last_task_date;
var str_panel_tasks = "";
var str_fast_tasks = "";
var str_calen_tasks = "";

var calendar_day_class = "";
var last_calendar_day_class = "";

var fast_tasks_ammount = 0;
var calendar_day;

var index = 0;

function generate_tasks(load_panel){

    $(".day_tasks").html("");
    if(load_panel) normal_tasks_group.html("");
    last_task_date = "";

    str_fast_tasks = "";
    str_panel_tasks = "";
    str_calen_tasks = "";
    calendar_day_class = "";
    last_calendar_day_class = "";
    

    for(var x = 0; x < every_user_task.length; x++) {

        var task_data = every_user_task[x];

        var task_id = task_data.id;
        var task_date = task_data.date;
        var task_day = task_date.split("-")[2];
        var task_mon = task_date.split("-")[1];
        var task_yea = task_date.split("-")[0];
        var pumple = false;

        // GET DAYS UNTILL
        var uk_task_date = (task_mon+'/'+task_day+'/'+task_yea)
        var days_until = CDate.getRealDaysUntil(uk_task_date);


        if(NavBar.last_day_filter == null || NavBar.last_day_filter == "" || days_until < NavBar.last_day_filter){

                    // ================= AÑADIR AL CALENDARIO =================
                    // si es un cumpleaños, se generará en el CALENDAR sin importar el año
                    if(task_data.type == "2") fast_tasks_ammount++;

                    if(task_data.type == "1" || task_data.type == "3"){
                        calendar_day_class = "#task" + CDate.index_year + "-" + task_mon + "-" + task_day;
                        pumple = true;
                    } else {
                        calendar_day_class = "#task" + task_data.date;
                        pumple = false;
                    }
                    
                    if(calendar_day_class != last_calendar_day_class){
                        day_group = $(last_calendar_day_class)
                        // re comprobamos que existe el DAY GROUP
                        if( day_group.length == 1){   
                            // si es PUMPLE, según esté ek CHECK BOX
                            day_group.html( day_group.html() + str_calen_tasks);
                            str_calen_tasks = "";
                        }      
                    }

                    // generamos y apendamos al STR en el caso que exista ese DAY GROUP
                    if( $(calendar_day_class).length == 1){   
                        // si es PUMPLE, según esté ek CHECK BOX
                        if(pumple){
                            if(!NavBar.checked_not_bds){
                                str_calen_tasks += generate_calendar_task(task_data, task_id, pumple);
                            }
                        } else {
                            str_calen_tasks += generate_calendar_task(task_data, task_id, pumple);
                        }
                    }
                
                    last_calendar_day_class = calendar_day_class;

                    // ================= AÑADIR AL PANEL LATERAL =================
                    if(pumple){
                        if(!NavBar.checked_not_bds){
                            if(load_panel){

                                var current_str_task = generate_panel_task(task_data, task_id, task_data.date, pumple, days_until);
                                str_panel_tasks += current_str_task;
                                
                                if(task_data.type == "2" || task_data.type == "3") {
                                    str_fast_tasks += current_str_task;
                                }
                            } 
                        }
                    } else {
                        if(load_panel){

                            var current_str_task = generate_panel_task(task_data, task_id, task_data.date, pumple, days_until);
                            str_panel_tasks += current_str_task;

                            if(task_data.type == "2" || task_data.type == "3") {
                                str_fast_tasks += current_str_task;
                            }
                        } 
                    }

        }
        

        





    }

     
    

    //console.log(calendar_day_class);
    $(calendar_day_class).html($(calendar_day_class).html() + str_calen_tasks);
    //console.log(str_calen_tasks);

    // AÑADIMOS LAS TASKS EN PROCESO
    if(load_panel){
        if(fast_tasks_ammount == 0){
            fast_tasks_group.html( "" )
        } else {
            fast_tasks_group.html( "<div class='day_group todo'> TO DO </div>" + str_fast_tasks + "<hr/>" );
        }
    }
    

    // solo si cambiamos un filtro en el nabvar
    // o creamos otro Task
    // el PanelTasks se  actualiza
    if(load_panel) normal_tasks_group.html(normal_tasks_group.html() + str_panel_tasks);
    str_panel_tasks = "";


}



function generate_panel_task(task, id, date, pumple, days_until){

    var task_str = "";
    var last_date_task = "";
    var day_div = "";

    // Get days until TaskDate
    var day = date.split("-")[2]
    var month = date.split("-")[1]
    var year = date.split("-")[0];

    // Days until COLOR
    var bg_color = "";
    if(days_until == 0){             bg_color = "day_until_0"
    } else if(days_until <= 1){      bg_color = "day_until_1"
    } else if(days_until <= 3) {     bg_color = "day_until_2"
    } else {                         bg_color = "day_until_3"   }

    var bg = (pumple) ? "birthday" : "";


    // If date changes
    if(!NavBar.checked_day_gruop){
        last_date_task  = (date == last_task_date) ? "" : " last_task"
        day_div         = (date == last_task_date) ? "" : "</div> <div class='day_group "+bg_color+"'>"+ (day+" de "+CDate.months[parseInt(month)-1]+", "+year) +"</div> ";  
    }

    // PONER EN BOLD LAS PALABRAS DE WORD FILTER
    var taskName = task.name;
    var taskDesc = task.description;
    if(NavBar.word_filter.length != 0){
        taskName = taskName.replace(NavBar.word_filter, "<label class='word_filter'>"+NavBar.word_filter+"</label>");
        taskDesc = taskDesc.replace(NavBar.word_filter, "<label class='word_filter'>"+NavBar.word_filter+"</label>");
    }

    var subject = task.subject;
    if(task.subject == "Cumpleanyos")   subject = "Cumple";
    if(task.subject == "Instituto")     subject = "Insti";

    // Append taskHTML 
    task_str = day_div;               
    task_str += '<div class="task '+last_date_task+'">\
                    <div class="days_until '+bg_color+'" data-id="'+id+'">\
                        <p class="nselect"> '+ days_until +' </p>\
                    </div>\
                    <div class="task_right">\
                        <div class="porcentaje_task"> \
                            <div class="porc" style="width:'+ task.porcentaje +'%;"></div> \
                        </div>\
                        <div class="task_data '+bg+'">\
                            <div>\
                                <div class="task_text">\
                                    <p class="task_name"> '+ taskName +' </p>\
                                    <p class="task_desc">'+ taskDesc +'</p>\
                                </div>\
                            </div>\
                            <div>\
                                <p> '+ task.done +' </p>\
                                <p> '+ subject +' </p>\
                            </div>\
                        </div>\
                    </div>\
                </div>';

    last_task_date = date;

    return task_str;
}

function generate_calendar_task(task, id, pumple){

    var tasks_str = "";
    var bg = (pumple) ? "birthday" : "";

    tasks_str += '<div class="day_task '+bg+'" title="'+task.description+'" data-id="'+id+'">';
    tasks_str += '<div class="progress_day_task" style="width:'+task.porcentaje+'%">&nbsp;</div><div><p class="day_task_name">'+task.name+'</p>';
    tasks_str += '</div></div>';

    return tasks_str;
}

/*

jax
get_user_tasks.js:5 ajax
generate_tasks.js:83 </div> <div class='day_group day_until_3'>2021-11-06</div> <div class="task  last_task">                    <div class="days_until day_until_3" data-id="167">                        <p class="nselect"> 237 </p>                    </div>                    <div class="task_right">                        <div class="porcentaje_task">                             <div class="porc" style="width:0%;">.</div>                         </div>                        <div class="task_data">                            <div>                                <div class="task_text">                                    <p class="task_name"> Mi cumple </p>                                    <p class="task_desc">g er r</p>                                </div>                            </div>                            <div>                                <p> N </p>                                <p> Cumpleanyos </p>                            </div>                        </div>                    </div>                </div>
generate_tasks.js:84 type: 3
generate_tasks.js:96 </div> <div class='day_group day_until_1'>2020-11-19</div> <div class="task  last_task">                    <div class="days_until day_until_1" data-id="123">                        <p class="nselect"> -115 </p>                    </div>                    <div class="task_right">                        <div class="porcentaje_task">                             <div class="porc" style="width:100%;">.</div>                         </div>                        <div class="task_data">                            <div>                                <div class="task_text">                                    <p class="task_name"> Practica LM T2 </p>                                    <p class="task_desc">Crear página web solo HTML.

Nota 9.5.</p>                                </div>                            </div>                            <div>                                <p> H </p>                                <p> Instituto </p>                            </div>                        </div>                    </div>                </div>
generate_tasks.js:98 type: 2
generate_tasks.js:96 </div> <div class='day_group day_until_1'>2020-10-16</div> <div class="task  last_task">                    <div class="days_until day_until_1" data-id="103">                        <p class="nselect"> -149 </p>                    </div>                    <div class="task_right">                        <div class="porcentaje_task">                             <div class="porc" style="width:100%;">.</div>                         </div>                        <div class="task_data">                            <div>                                <div class="task_text">                                    <p class="task_name"> Practica SI T1_02 </p>                                    <p class="task_desc">10 Preguntas sobre sistemas informaticos.
Nota 10.</p>                                </div>                            </div>                            <div>                                <p> H </p>                                <p> Instituto </p>                            </div>                        </div>                    </div>                </div>
generate_tasks.js:98 type: 2

*/