window.onload = function() {

    // Get Data
    try{
        data_tasks = JSON.parse(localStorage.getItem("data_tasks"))

        if(!data_tasks) {
            data_tasks = {}; 
            localStorage.setItem("data_tasks", "{}")
            
        }
    } catch {
        data_tasks = {}
    }

    for (const key in data_tasks) { 

        if(data_tasks[key].length == 0){
            delete data_tasks[key]
        }

    }

    try{
        data_ftasks = JSON.parse(localStorage.getItem("data_ftasks"))
    } catch {
        data_ftasks = []
    }    
    if(!data_ftasks){ data_ftasks = [] }

    //data_tasks =    (!data_tasks)  ? {} : JSON.parse(localStorage.getItem("data_tasks"))
    //data_ftasks =   (!data_ftasks) ? {} : JSON.parse(localStorage.getItem("data_ftasks"))

    days_m[1] = (index_year % 4 == 0) ? 29 : 28

    localStorage.setItem("edit_day", "")
    localStorage.setItem("day_selected", "")

    update()

};


// Funcion para almacenar en el LocalStorage
function save_data(key, value){

    localStorage.setItem(key, JSON.stringify(value))
    value = JSON.parse(localStorage.getItem(key))

    return (value)
}



function update(){

    update_filter_vars()

    generate_calendar()

    if(checked_ftask) generate_panel_ftasks()

    normal_tasks_group.html("")
    if(checked_ntask) generate_panel_ntasks()

    close_card()

    clear_inputs()

}


$(document).on('click', '.day_number', function() {

    day_input.val($(this).text())
    month_input.val(index_month)
    year_input.val(index_year)

})


function date_before_today(date){
    
    var days_until = getDaysUntil(real_date, date)
    
    if(days_until == 0) days_until = getDaysUntil(date, real_date) * -1

    return (days_until < 0) ? true : false;

}



function get_index_day(day, month){

    var index = 0

    for(var x = 0; x < parseInt(month)-1; x++){
        index+=days_m[x]
    }
    
    return (index+parseInt(day))
}











function bad_dic(){
    bad_array = [[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[["Practica S.I. T1 - 1 - GS","12","10",0,"","H","100"],["Examen S.I. T1 - GS","12","10",0,"Nota 8","H","100"]],[null],null,[["Practica L.M. T1 - 1 - GS","15","10",0,"Actividades XML","H","100"]],[null],null,null,null,null,null,null,null,null,null,null,null,[["Examen L.M. T1 - GS","28","10",0,"Nota 9","H","100"]],null,[["Examen S.I. T2 - GS","30","10",0,"Nota 9","H","100"]],null,null,[["Practica S.I. Aportacion 2 - GS","2","11",0,"","H","100"]],null,[null,null],null,[null,null],[null],null,null,null,[null,null,null,null],[null,null,null],[null,null,null,null],[null,null],[["Cubo Magico","15","11",0,"","P","0"],null,["Escribir Carta","15","11",0,"","P","0"]],[null,["Ingles 3 Tareas W, R, L","16","11",0,"","H","100"]],null,null,null,[null],[null,null,null],[["Examen S.I. T3 - GS","22","11",0,"Nota 10","H","100"],["Practica S.I. T3 - 1 - GS","22","11",0,"Archivos comprimidos","H","100"],["Practica S.I. T3 - 2 - GS","22","11",0,"Innovaciones Video","H","100"]],[null,["Matricula B1 Ingles","23","11",0,"A pagar a pagar\n105€","NP","0"]],null,null,[null],null,[["Practica E.D. T1 - 1 - GS","28","11",0,"Hacer documentacion","H","100"],["Examen E.D. T1 - GS","28","11",0,"Nota 10","H","100"]],[["Examen L.M. T2 - GS","29","11",0,"Nota 9'17","H","100"],["Practica L.M. T2 - 1 - GS","29","11",0,"Hacer 3 webs...","H","100"]],null,null,null,[null,["Examen BBDD T3 - GS","3","12",0,"","NP","0"],["Examen P.R. T1 - GS","3","12",0,"Nota 10","H","100"],["Examen P.R. T2 - GS","3","12",0,"Nota 9","H","100"],["Examen BBDD T1 - GS","3","12",0,"Nota 10","H","100"],["Examen BBDD T2 - GS","3","12",0,"Nota 9´8","H","100"],["Practica FOL 1 - GS","3","12",0,"Curriculum Nota 9","H","100"],["Practica FOL 2 - GS","3","12",0,"Reuniones Scrum","NP","10"]],null,null,[null,null,["Practica S.I. T2 - 1 - GS","6","12",0,"Noticias Actuales","P","60"]],null,null,null,[["Examen B1 Ingles","10","12",0,"Miedo","NP","0"]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[["Requisitos T1 Resumen","9","6",1,"Subrayar","P","70"]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[null,null],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0]]
    
    ndic = {}
    for(x = 0; x < 2; x++){
        for(y = 0; y < 367; y++){

            c_task = bad_array[x][y]
            if(c_task){
                
                for(z = 0; z < c_task.length; z++){
                    if(c_task[z]){

                        

                        bad_day = c_task[z][1]
                        bad_mon = c_task[z][2]
                        bad_yea = c_task[z][3] + 2020

                        bad_nam = c_task[z][0]
                        bad_des = c_task[z][4]

                        bad_res = c_task[z][5]
                        bad_por = c_task[z][6]

                        data_task = [bad_day,bad_mon,bad_yea,bad_nam,bad_des,bad_res,bad_por]
                        key = bad_yea+"_"+bad_mon+"_"+bad_day

                        if(ndic[key]){
                            ndic[key].push(data_task)
                        } else {
                            ndic[key] = [data_task]
                        }
                    }
                }
            }
        }
    }
    console.log( JSON.stringify(ndic) )
    //localStorage.setItem("data_tasks", JSON.stringify(ndic))
}

