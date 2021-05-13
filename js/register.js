user_name_p = $("#open_JSON");

var Conn = new Connection();

function register(u,pw,save){

    register__error.text("Signing up...")

    $.ajax({
        type : "POST",  //type of method
        url  : "./php/register.php",  //your page
        data : { "username" : u, "password" : encrypt(pw) },// passing the values
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);

            if(output_type != '0'){
                
                register__error.text(output_total);

            } else {
                
                // registered                
                Conn.username = u;
                login(u, pw, save, false);

                
                create_table();

            }
        }
    });
}

function create_table(){

    register__error.text("Reserving memory in our database...");

    $.ajax({
        type : "POST",
        url  : "./php/create_table.php",
        data : { "username" : Conn.username},
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);

            if(output_type != '0'){

                console.log( output_total );
                register__error.text("An error ocurred: " + output_total)

            } else {

                login__username.val("")
                login__password.val("")
                register__username.val("")
                register__password.val("")
                register__rpassword.val("")
                register__error.val("")
                login__.css("display","none")

            }
            
        }
    });
}




