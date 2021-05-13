class Navbar {
    constructor() {

        this.done_filter = "N";
        this.checked_day_gruop = false;
        this.checked_order = true;
        this.checked_not_bds = true;
        this.check_order = $("#check_order")
        this.check_day_gruop = $("#check_day_gruop")
        this.check_not_bds = $("#check_not_bds")

        this.world_filter = $("#word_filter")
        this.input_subject_filter = $("#input_subject_filter")
        this.done_day_filter = $("#done_day_filter")
        this.l_day_filter = $("#l_day_filter")
        
        this.word_filter = "";
        this.subject_filter = "";
        this.last_day_filter = null;

        this.closed = false;
        this.open_filters = $("#open_filters")
        this.nav_inputs_filter = $("#nav_inputs_filter")
    }

}

var NavBar = new Navbar();
Conn.subject_filter = "";

NavBar.world_filter.keyup( function(){  
    
    NavBar.word_filter = $(this).val().replaceAll("'","\"");

    if(NavBar.word_filter.length == 0){
        Conn.word_filter = "";
    } else {
        Conn.word_filter = "AND (nameTask LIKE '%"+NavBar.word_filter+"%' OR descriptionTask LIKE '%"+NavBar.word_filter+"%')";
    }

    get_tasks();
})
NavBar.input_subject_filter.change( function(){  
   
    NavBar.subject_filter = $(this).val();

    if(NavBar.subject_filter.length == 0){
        Conn.subject_filter = "";
    } else {
        Conn.subject_filter = "AND subjectTask = '"+NavBar.subject_filter + "'";
    }

    get_tasks();
    
});
NavBar.done_day_filter.change( function(){  
   
    NavBar.done_filter = $(this).val();

    if(NavBar.done_filter.length == 0){
        Conn.done_filter = "";
    } else {
        Conn.done_filter = "AND doneTask = '"+ NavBar.done_filter + "'";
    }

    get_tasks();
    
});
NavBar.l_day_filter.keyup( function(){  
    
    NavBar.last_day_filter = $(this).val();

    get_tasks();

})

function open_close(){
    if(NavBar.closed){
        NavBar.closed = false;
        NavBar.nav_inputs_filter.attr("class","navbar__opened");
        NavBar.open_filters.text(">");
    } else {
        close_filters()
    }
}
function close_filters(){
    NavBar.closed = true;
        NavBar.nav_inputs_filter.attr("class","navbar__closed");
        NavBar.open_filters.text("v");
}
NavBar.open_filters.click(function(){
    open_close();
})


// DOTS
NavBar.check_order.click(function(){ 
    NavBar.checked_order = !NavBar.checked_order; 
    Conn.order_sentence = (NavBar.checked_order) ? "" : "DESC"

    get_tasks();
});
NavBar.check_day_gruop.click(function(){ 
    NavBar.checked_day_gruop = !NavBar.checked_day_gruop; 
    get_tasks();
});
NavBar.check_not_bds.click(function(){ 
    NavBar.checked_not_bds = !NavBar.checked_not_bds; 
    generate_tasks(true);
});
