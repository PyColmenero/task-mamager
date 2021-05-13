
class Edition {
    constructor() {

        this.id = "";
        this.task = "";
        this.edit_create = "C";

        this.open_task = $("#open_task")
        this.edit_create_p = $("#edit_create_p")
        this.edit_create_d = $("#edit-create")

        this.delete_task = $("#delete_task")
        
        this.taskscalendar = $("#tasks-calendar")
    }
}

tasks_group = $("#tasks_group")

var Edit = new Edition();


Edit.open_task.click(function(){ 

    if(Conn.id.length != 0){
        
        //NavBar.closed = true;
        NavBar.nav_inputs_filter.attr("class","navbar__closed");

        if(DEVICE == PHONE){
            Edit.taskscalendar.attr("class","not-scroll")
        } else {
            Edit.taskscalendar.attr("class","")
        }

        open_card();
        if(DEVICE == PHONE){
            tasks.css("display","block");
            calendar.css("display","none");
            console.log("ola");
            close_filters();
        }
        Edit.delete_task.css("display", "none"); 
        Edit.edit_create_p.text("CREATE")
        Edit.edit_create = "C";

    }
})

function open_card(){
    Edit.edit_create_d.css("display","flex")
    tasks_group.css("display","none")

    change_inputs("", "", CDate.real_day, CDate.real_month, CDate.real_year, "Instituto", "N", "0", "0");
}

function close_card(){
    Edit.edit_create_d.css("display","none")
    tasks_group.css("display","block")

    Edit.edit_create_p.text("CREATE")
    change_inputs("", "", CDate.real_day, CDate.real_month, CDate.real_year, "Instituto", "N", "0", "0");

    Edit.taskscalendar.attr("class","")

}

function change_inputs(name, desc, day, month, year, subj, resol, porc, type){

    if(type == "2" || type == "3"){
        check_type_input.prop('checked', true);
    } else {
        check_type_input.prop('checked', false);
    }

    var cero_day = day+"";
    var cero_month = month+"";
    if(cero_day.substring(0,1) == 0) cero_day = cero_day.substring(1,2);
    if(cero_month.substring(0,1) == 0) cero_month = cero_month.substring(1,2);

    name_input.val(name)
    desc_input.val(desc)

    day_input.val(cero_day)
    month_input.val(cero_month)
    year_input.val(year)


    subject_input.val(subj).change();
    resol_input.val(resol).change();
    percentaje_input.val(porc)
    

}