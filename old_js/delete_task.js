

delete_task.click(function(){

    // acces to edit key data
    data_key = JSON.parse( localStorage.getItem("edit_day") )
    current_indexday = data_key[0]
    current_indexmonth = data_key[1]
    current_indexyear = data_key[2]
    current_indextask = data_key[3]

    // get key day
    key = current_indexyear+"_"+current_indexmonth+"_"+current_indexday
    
    // Delete Current Task
    data_tasks[key][current_indextask] = null
    data_tasks[key] = data_tasks[key].filter(function(val) { return val !== null; })
    
    // If there are no more taks, delte KEY
    if(data_tasks[key].length == 0){
        delete data_tasks[key];
    } 

    // Storage DataTasks
    data_tasks = save_data("data_tasks", data_tasks)

    localStorage.setItem( "edit_day" , "" )

    update()
})