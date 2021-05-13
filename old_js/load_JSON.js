card_JSON = $("#card_JSON")
open_JSON = $("#open_JSON")
close_JSON = $("#close_JSON")

load_JSON = $("#load_JSON")
get_JSON = $("#get_JSON")
textarea_JSON = $("#textarea_JSON")

open_JSON.click(function(){ card_JSON.css("display","flex") })
close_JSON.click(function(){ card_JSON.css("display","none") })

get_JSON.click(function(){ textarea_JSON.val( localStorage.getItem("data_tasks") ) })

load_JSON.click(function(){
    
    console.log(textarea_JSON.val())

    data_tasks = JSON.parse( textarea_JSON.val() )
    data_tasks = save_data("data_tasks", data_tasks)


    textarea_JSON.val("")
    card_JSON.css("display","none")

    update()

})

