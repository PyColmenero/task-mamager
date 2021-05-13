var every_user_task = [];
var open_JSON = $("#open_JSON")

var DEVICE;
var LAST_DEVICE;
var COMPUTER = 0;
var PHONE = 1;

var w = window.innerWidth;
var h = window.innerHeight;

var calendar = $("#calendar")
var tasks = $("#tasks")
var show_tasks = $("#show_tasks")
var show_calendar = $("#show_calendar")

resize();
get_device();

window.onload = function() {
    
    generate_calendar();

    var user_data = open_JSON.attr("data-cookie").trim().split("@");
    if(user_data.length == 2){
        login(user_data[0], user_data[1], false, false);
        open_JSON.removeAttr("data-cookie")
    }

};

function get_device(){
    DEVICE = (window.innerWidth > window.innerHeight) ? COMPUTER : PHONE;
    if(DEVICE != LAST_DEVICE) resize();
    LAST_DEVICE = DEVICE;
}


function resize(){
    if(DEVICE == COMPUTER){
        tasks.css("display","block");
        calendar.css("display","block");
    } else {
        tasks.css("display","block");
        calendar.css("display","none");
    }
}

show_tasks.click(function(){
    tasks.css("display","block");
    calendar.css("display","none");
})
show_calendar.click(function(){
    tasks.css("display","none");
    calendar.css("display","block");
})

window.addEventListener("resize", get_device);  