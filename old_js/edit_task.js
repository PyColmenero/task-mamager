
floating_task = $("#floating_task")

$(document).on('click', '.day_task',    function() { select_task($(this)) });
$(document).on('click', '.days_until',  function() { 
    
    // get task date
    index_day   = $(this).attr("data-indexday")
    index_mon   = $(this).attr("data-indexmonth")
    index_yea   = $(this).attr("data-indexyear")

    // save day
    localStorage.setItem( "day_selected" , index_day )

    index_month = parseInt(index_mon)
    index_year = parseInt(index_yea)

    // update
    update()
})

var date_change = [0,0,0]

function select_task(element){

    open_card()
    edit_create_p.text("EDIT")
    create_edit = false

    //Get Data from Task Elemnt
    current_indexday = element.attr("data-indexday")
    current_indexmonth = element.attr("data-indexmonth")
    current_indexyear = element.attr("data-indexyear")
    current_indextask = element.attr("data-indextask")


    console.log(current_indexyear)

    // save Key metadata
    data_key = [current_indexday, current_indexmonth, current_indexyear, current_indextask]
    localStorage.setItem( "edit_day" , JSON.stringify(data_key) )

    // Generate KEY
    key = current_indexyear+"_"+current_indexmonth+"_"+current_indexday
    console.log(key)
    current_data = data_tasks[key][current_indextask]

    // Set Inputs values
    name_input.val(current_data[3])
    day_input.val(current_data[0])
    month_input.val(current_data[1])
    year_input.val(current_indexyear)
    resol_input.val(current_data[5])
    percentaje_input.val(current_data[6])
    desc_input.val(current_data[4])

    // Current Date if change
    date_change = [day_input.val(), month_input.val(), year_input.val()]


    delete_task.css("display", "block")
}

function edit_task(){

    name        = name_input.val()
    resol       = resol_input.val()
    percentaje  = percentaje_input.val()
    desc        = desc_input.val()

    // acces to edit key data
    data_key = JSON.parse( localStorage.getItem("edit_day") )
    current_indexday = data_key[0]
    current_indexmonth = data_key[1]
    current_indexyear = data_key[2]
    current_indextask = data_key[3]

    // Current DataTask
    data_task = [day_input.val(), month_input.val(), year_input.val(), name, desc, resol, percentaje]
    
    console.log(year_input.val())

    // The day was not changed
    if(date_change[0] == day_input.val() && date_change[1] == month_input.val() && date_change[2] == year_input.val()  ){

        key = current_indexyear+"_"+current_indexmonth+"_"+current_indexday
        data_tasks[key][current_indextask] = data_task

    } else {

        // add task to correct date
        var curren_key = year_input.val()+"_"+month_input.val()+"_"+day_input.val()
        console.log(curren_key)

        if(data_tasks[curren_key]){
            data_tasks[curren_key].push(data_task)
        } else {
            data_tasks[curren_key] = [data_task]
        }

        // get last key date
        key = current_indexyear+"_"+current_indexmonth+"_"+current_indexday

        // Delete current Task
        data_tasks[key][current_indextask] = null
        data_tasks[key] = data_tasks[key].filter(function(val) { return val !== null; })
    }

    // Delete kay if its empty
    if(data_tasks[key].length == 0){
        delete data_tasks[key];
    } 
    

    // Storage DataTasks
    data_tasks = save_data("data_tasks", data_tasks)


    create_edit = true
    edit_create_p.text("CREATE")


    index_month = month_input.val()
    if(year_input.val() != "0"){
        index_year = parseInt(year_input.val())
    }

    update()

}