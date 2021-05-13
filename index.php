<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks</title>

    <link rel="shortcut icon" href="medias/logo_b.png">

    <!-- CSS -->
    <link rel="stylesheet" href="styles/general.css">
    <link rel="stylesheet" href="styles/navbar.css">
    <link rel="stylesheet" href="styles/taks_panel.css">
    <link rel="stylesheet" href="styles/tasks.css">
    <link rel="stylesheet" href="styles/fast_tasks.css">
    <link rel="stylesheet" href="styles/calendar.css">
    <link rel="stylesheet" href="styles/load_json.css">
    <link rel="stylesheet" href="styles/login_reg.css">


    <link rel="preconnect" href="https://fonts.gstatic.com"> <!-- font-family: 'Poppins', sans-serif; -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q3BP1QKT6N"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-Q3BP1QKT6N');
    </script>

</head>

<body>

    <div id="data_current_selected"></div>

    <div id="open_JSON" class="nselect" data-cookie="<?php   
            if(isset($_COOKIE["data-login"])){
                echo $_COOKIE["data-login"];
            }
        ?>">
        <p>Sign In / Sign Up</p>
    </div>

    <div id="login" style="display: none;">
            <div id="register__form" class="lr__form" style="display: none;">
                <img src="medias/close.png" alt="Cerrar register" class="login__close">
                <div>
                    <img src="medias/logo_w.png" alt="Logo de la pagina web">
                    <h2>Sign up to Tasks</h2>
                    <input type="text" name="username" placeholder="Username..." id="register__username">
                    <p class="register__error" id="register__error__un"></p>
                    <input type="text" name="password" placeholder="Password..." id="register__password">
                    <p class="register__error" id="register__error__pw"></p>
                    <input type="text" name="password" placeholder="Repeat password..." id="register__rpassword">
                    <label><input type="checkbox" name="save" id="register__save"> Recordarme en este dispositivo.</label>
                    <p class="register__error" id="register__error__rpw"></p>
                    <p class="register__error" id="register__error"></p>
                    <p class="wanna" id="wanna_reg">I wanna sign in</p>
                </div>
                <button id="register__button">Sign up</button>
            </div>
            <div id="login__form" class="lr__form">
                <img src="medias/close.png" alt="Cerrar login" class="login__close">
                <div>
                    <img src="medias/logo_w.png" alt="Logo de la pagina web">
                    <h2>Sign in to Tasks</h2>
                    <input type="text" name="username" placeholder="Username..." id="login__username">
                    <input type="text" name="password" placeholder="Password..." id="login__password">
                    <label ><input type="checkbox" name="save" id="login__save"> Recordarme en este dispositivo.</label>
                    <p id="login__fg"><a href="#">Forgot password?</a></p>
                    <p id="login__error"></p>
                    <p> <span class="wanna" id="wanna_log">I wanna sign up</span> · <span class="wanna" id="delogin">Sign Out</span> </p>
                </div>
                <button id="login__button">Sign in</button>
            </div>
    </div>

    <nav>
        <div id="tasks_filter">
            <div id="create_tasks">
                <div id="open_task">
                    <p class="nselect">ADD TASK</p>
                </div>
                <div id="open_filters" class="nselect"> &#62; </div>
            </div>
            <div id="nav_inputs_filter" class="navbar__opened">
                <div id="nav_fields_filter">
                    <input type="text" id="word_filter" placeholder="Word...">
                    <select id="input_subject_filter">
                        <option value="">Subject...</option>
                        <option value="Ocio">Ocio</option>
                        <option value="Instituto">Intituto</option>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Cumpleanyos">Cumpleaños</option>
                        <option value="Reunion">Reunion</option>
                    </select>
                    <select id="done_day_filter">
                        <option value="">Todas...</option>
                        <option value="N" selected>No hechas</option>
                        <option value="H">Hechas</option>
                    </select>
                    <!-- <input type="text" id="l_day_filter" placeholder="Last Day"> -->
                </div>
                <div id="nav_check_filter">
                    <label class="check_box_lbl"> <input type="checkbox" title="Invert Sort" id="check_order"> Reverse Sort </label>
                    <label class="check_box_lbl"> <input type="checkbox" title="Ungroup Days" id="check_day_gruop"> Group </label>
                    <label class="check_box_lbl"> <input type="checkbox" title="Not Birthdays" id="check_not_bds"> Show Birthddays </label>
                </div>
                
            </div>
            <div id="switch">
                <div id="show_tasks" class="nselect">Task Panel</div>
                <div id="show_calendar" class="nselect">Calendar</div>
            </div>

        </div>
    </nav>
    <div id=tasks-calendar>
        <div id="tasks">

            <!-- ======================= CREATE/EDITE TASK ======================= -->
            <div id="edit-create" style="display: none;">
                <div>
                    <div id="card">
                        <p id="edit_create_p" class="nselect">CREATE</p>
                        <div id="tasks_creator">
                            <div id="task_creator_inputs">

                                <input type="text" id="name_input" placeholder="Task Name">

                                <div id="date_inputs">
                                    <input type="text" id="day_input" placeholder="Day">
                                    <select id="month_input">
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                    <input type="text" id="year_input" placeholder="Year">
                                </div>

                                <select id="subject_input">
                                    <option value="Instituto">Intituto</option>
                                    <option value="Ocio">Ocio</option>
                                    <option value="Trabajo">Trabajo</option>
                                    <option value="Cumpleanyos">Cumpleaños</option>
                                    <option value="Reunion">Reunion</option>
                                </select>

                                <div id="r_inputs">
                                    <select id="resol_input">
                                        <option value="N">No Hecha</option>
                                        <option value="H">Hecha</option>
                                    </select>
                                    <input type="text" id="percentaje_input" placeholder="%">
                                </div>

                                <label class="check_box_lbl"> <input type="checkbox" title="TO DO" id="check_type_input"> EN EJECUCIÓN </label>

                                <textarea id="desc_input" placeholder="Task description..."></textarea>
                            </div>
                            <div id="button_task_creator">
                                <p class="nselect">+</p>
                            </div>
                        </div>
                        <div id="close_card_button" class="nselect"><img src="medias/close.svg" alt="close image"></div>
                    </div>
                    <div id="delete_task">DELETE TASK</div>
                </div>
            </div>

            <div id="tasks_group">
                <div id="fast_tasks_group"></div>
                <div id="normal_tasks_group"> <i> No se ha encontrado nada. </i> </div>
            </div>


        </div>
        <div id="calendar">
            <div id="change_calendar">
                <div class="nselect" id="cc_right">&#60</div>
                <div class="nselect" id="month_name">Enero</div>
                <div class="nselect" id="cc_left">&#62</div>
            </div>
            <div id="days_group">

            </div>
        </div>
    </div>

    <!-- CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9/core.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9/sha256.js"></script>

    <script src="js/onload.js" content-type="text/javascript"></script>

    <script src="js/date.js"></script>
    <script src="js/conecctions.js"></script>

    <script src="js/open_close_tasks.js"></script>

    <script src="js/register.js"></script>
    <script src="js/login.js"></script>
    <script src="js/delogin.js"></script>
    <script src="js/get_user_tasks.js"></script>
    <script src="js/edit_task.js"></script>
    <script src="js/delete_task.js"></script>
    <script src="js/add_task.js"></script>

    <script src="js/change_bds.js"></script>

    <script src="js/generate_calendar.js" content-type="text/javascript" ></script>
    <script src="js/generate_tasks.js" content-type="text/javascript" ></script>
    <script src="js/resize_task.js" content-type="text/javascript" ></script>

    <script src="js/navbar_manager.js" content-type="text/javascript" ></script>

    <script src="js/upload.js" content-type="text/javascript" ></script>
    <script src="js/encrypt.js" content-type="text/javascript" ></script>

    <!-- Default Statcounter code for Acolmenero https://acolmenero.xyz/ -->
    <script type="text/javascript">
        var sc_project=12507478; 
        var sc_invisible=1; 
        var sc_security="5f1c3e22"; 
    </script>
    <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async ></script>
    <noscript>
        <div class="statcounter">
            <a title="Web Analytics" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/12507478/0/5f1c3e22/1/" alt="Web Analytics"></a>
        </div>
    </noscript>
    <!-- End of Statcounter Code -->

</body>
</html>