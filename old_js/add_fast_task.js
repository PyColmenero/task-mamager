
var hidden_input_div = $("#hidden_input_div")
var hidden_input = $("#hidden_input")

// Click close button
function close_hInput(){ 
    open_fast_task.css("display","block")
    hidden_input_div.css("display","none")
}


// if press Enter
hidden_input.keypress(function(e) {
    if(e.which == 13 && hidden_input.val().length >= 2) {

        // Remove EMPTY items
        data_ftasks = data_ftasks.filter(function(val) { return val !== null; })
        
         // Append current FTask
        data_ftasks.push([hidden_input.val(),0])

        // Save changes
        data_ftasks = save_data("data_ftasks", data_ftasks)

        // Clear input
        hidden_input.val("")
        
        // Close Input
        update()

    }
});


// Delete Fast task
$(document).on('click', '.delete_fast_task', function(){

    // Get index of FTask
    index = $(this).parent().attr("data-index")

    // Delete it
    data_ftasks[index] = null
    
    // Remove EMPTY items
    data_ftasks = data_ftasks.filter(function(val) { return val !== null; })

    // Save changes
    data_ftasks = save_data("data_ftasks", data_ftasks)

    update()

})  


// done fast tasks
$(document).on('click', '.fast_task_done', function(){

    index = $(this).parent().parent().attr("data-index")

    console.log(data_ftasks[index][1])
    data_ftasks[index][1] == "0" ? data_ftasks[index][1] = 1 : data_ftasks[index][1] = 0

    data_ftasks = save_data("fast_tasks", data_ftasks)

    update()
})