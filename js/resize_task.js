


$(document).on('dblclick', '.task_text', function() {
    
    if($(this).attr("expanded") == "true"){
        $(this).attr("expanded", "false")

        var task = $(this).parent().parent().parent().parent()
        task.removeAttr("style");
    } else {
        $(this).attr("expanded", "true")

        var task = $(this).parent().parent().parent().parent()
        task.height( $(this).height() + 15 )
    }

});
