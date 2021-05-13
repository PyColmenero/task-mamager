
function login(username, pw, save, do_encrypt){

    if(do_encrypt == undefined) do_encrypt = true;
    if(do_encrypt) pw = encrypt(pw)

    console.log(save);

    $.ajax({
        type : "POST",  //type of method
        url  : "./php/login.php",  //your page
        data : { "username" : username, "password": pw, "save": save},// passing the values
        success: function(res){  

            var output_type = res.substring(0,1);
            var output_total = res.substring(1, res.length);
            
            //console.log(res);

            if(output_type != '0'){

                login__error.text(output_total);

            } else {
                

                login__error.text("");

                // LOGGED
                Conn = new Connection();
                Conn.username = username;
                Conn.id = output_total;

                user_name_p.html("<p><b>" + username + "</b></p>");

                //login__.css("display","none")
                login__username.val("")
                login__password.val("")
                login__.css("display","none")

                NavBar = new Navbar();
                

                get_tasks();
            }
            
        }
    });
}


var login__ = $("#login");
var register__form = $("#register__form");
var login__form = $("#login__form");
var login__button = $("#login__button");
var login__username = $("#login__username");
var login__password = $("#login__password");
var register__button = $("#register__button");
var register__username = $("#register__username");
var register__password = $("#register__password");
var register__rpassword = $("#register__rpassword");
var register__error__un = $("#register__error__un");
var register__error__pw = $("#register__error__pw");
var register__error__rpw = $("#register__error__rpw");
var register__error = $("#register__error");
var login__error = $("#login__error");
var login__close = $(".login__close");
var login__save = $("#login__save");
var register__save = $("#register__save");
var wanna_log = $("#wanna_log");
var wanna_reg = $("#wanna_reg");
var save = false;

wanna_log.click(function(){
    login__form.css("display","none");
    register__form.css("display","block");
});
wanna_reg.click(function(){
    login__form.css("display","block");
    register__form.css("display","none");
});
login__button.click(function(){
    save = login__save.is(":checked");
    login(login__username.val(), login__password.val(), save, true);
});
register__button.click(function(){

    var correct_form = true;
    save = register__save.is(":checked");

    if(register__username.val().length >= 5){
        var patt = /[^a-zA-Z0-9]/;
        if(patt.test( register__username.val() )){
            register__error__un.text("Username only has letters, capital letters and numbers");
            correct_form = false;
        } else {
            register__error__un.text("");
        }   
    } else {
        register__error__un.text("Username should has at least 5 characters");
        correct_form = false;
    }

    if(register__password.val().length >= 8){
        var patt = /[^a-zA-Z0-9\-\_\.\;\,]/;
        if(patt.test( register__password.val() )){
            var patt = /[^a-zA-Z0-9\-\_\.\;\,]/;
            register__error__pw.text("Valid chars: a-z A-Z _ - . _ and ,");
            correct_form = false;
        } else {
            register__error__pw.text("");
        }
    } else {
        register__error__pw.text("Username should has at least 8 characters");
        correct_form = false;
    }

    if(register__password.val() != register__rpassword.val()){
        register__error__rpw.text("Passwords are not equals");
        correct_form = false;
    } else {
        register__error__rpw.text("");
    }


    if(correct_form) register(register__username.val(), register__password.val(), save);
});
login__close.click(function(){
    login__.css("display","none")
});
open_JSON.click(function(){
    login__.css("display","flex")
});