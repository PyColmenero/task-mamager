function delogin(){

    $.ajax({
        type : "POST",
        url  : "./php/delogin.php",
        data : { },
        success: function(res){  
            
            console.log(res);

            window.location.reload()
            
        }
    });
}

var delogin_ = $("#delogin");
delogin_.click(function(){
    delogin()
})