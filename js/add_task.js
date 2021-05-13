var name_input = $("#name_input")
var day_input = $("#day_input")
var month_input = $("#month_input")
var year_input = $("#year_input")
var resol_input = $("#resol_input")
var subject_input = $("#subject_input")
var percentaje_input = $("#percentaje_input")
var desc_input = $("#desc_input")
var check_type_input = $("#check_type_input")

var button_task_creator = $("#button_task_creator")

button_task_creator.click(function(){ 

    if(Edit.edit_create == "C"){    
        add_task(); 
    } else {
        edit_task();
    }
    
})


var close_card_button = $("#close_card_button")
close_card_button.click(function(){ close_card() })

resol_input.change(function(){
    if(resol_input.val() == "H"){
        percentaje_input.val("100")
    } else {
        if(percentaje_input.val() == "100"){
            percentaje_input.val("0")
        }
    }
})

year_input.blur(function(){
    if(year_input.val().length == 4){
        if(new RegExp('[0-9]{4}').test(year_input.val())){
            if(year_input.val() < 2019 || year_input.val() > 2024){
                year_input.val(CDate.real_year)
            }
        } else {
            year_input.val(CDate.real_year)
        }
    } else {
        year_input.val(CDate.real_year)
    }
})

day_input.blur(function(){

    var day = day_input.val();
    var pday = parseInt( day );

    if( day.length == 1 || day.length == 2){
        if( pday != NaN ){
            if( pday > 0 && pday <= CDate.days_month[month_input.val()-1] ){
                day_input.val( pday )
            } else {
                day_input.val(CDate.real_day)    
            }
        } else {
            day_input.val(CDate.real_day)
        }
    } else {
        day_input.val(CDate.real_day)
    }
})

percentaje_input.blur(function(){
    
    var per = percentaje_input.val();
    var pper = parseInt( per );

    if( per.length >= 1 && per.length <= 3){
        if( pper != NaN ){
            if( pper >= 0 && pper <= 100 ){
                percentaje_input.val( pper )
            } else {
                percentaje_input.val(0)    
            }
        } else {
            percentaje_input.val(0)
        }
    } else {
        percentaje_input.val(0)
    }
})


function add_task(){

    var task_day = day_input.val()
    var task_month = month_input.val()
    var task_year = year_input.val()
    var task_name = name_input.val().replaceAll("'","\"")
    var desc_name = desc_input.val().replaceAll("'","\"")
    var task_subj = subject_input.val()
    var task_type = (check_type_input.prop('checked')) ? "on" : "off";

    // 0 = no pumple, not TODO
    // 1 = si pumple, not TODO
    // 2 = not pumple, si TODO
    // 3 = si pumple, si TODO
    var type = ""; 

    if(task_type == "off"){
        type = (task_subj === "Cumpleanyos") ? 1 : 0;
    } else {
        type = (task_subj === "Cumpleanyos") ? 3 : 2;
    }


    // si es cumple le ponemos este año  
    if(task_subj === "Cumpleanyos"){
        var uk_task_date = (task_month+'/'+task_day+'/'+task_year)
        var days_until = CDate.getRealDaysUntil(uk_task_date);

        if(days_until < 0){
            task_year = CDate.real_year + 1;
        } else {
            task_year = CDate.real_year;
        }
    }

    
    console.log(type);
    console.log(task_year);

    if(task_day && task_month && task_year && task_name){
        
        console.log(task_name);
        console.log(desc_name);

        new_task( task_name , desc_name, subject_input.val(), percentaje_input.val(), resol_input.val(), task_day, task_month, task_year, type);
        
        close_card();

        Edit.taskscalendar.attr("class","")
        
        return true
    } else {

        console.log("EMPTY INPUTS");
        return false;
    }
}

function new_task(name, desc, subject, porcentaje, done, day, month, year, type){
    
    var date = year + "/" + month + "/" + day;

    console.log("ajax");

    $.ajax({
        type : "POST",  //type of method
        url  : "./php/new_task.php",  //your page
        data : {"table_name" : "task_table_" + Conn.id,
                "name" : name, 
                "desc": desc, 
                "subject": subject, 
                "porcentaje": porcentaje, 
                "done": done, 
                "date": date, 
                "type":type},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            if(output_type != '0'){

                console.log( output_total );

            } else {
                
                // new task sussesfully
                console.log("Task creada:" + output_total);
                
                get_tasks();
                
            }
            
        }
    });
}