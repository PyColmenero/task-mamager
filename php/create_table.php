<?php

    // connectamos a la BBDD
    include("connection.php");

    $con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);

    // recogemos variables
    $name = $_POST["username"];

    // obtenemos nuestra ID
    $sql = mysqli_query($con, "SELECT * FROM $usertable WHERE nameUser = '$name'");
    $id = mysqli_fetch_row($sql);
    $id = $id[0];

    // INTENTAMOS CREAR LA TABLA, si la ID existe
    if( strlen($id) > 0){
        $table_name = "task_table_" . $id;
        $sentencia = "CREATE TABLE $table_name (idTask INT AUTO_INCREMENT PRIMARY KEY, nameTask VARCHAR(255), descriptionTask VARCHAR(2048), subjectTask VARCHAR(12), porcentajeTask INT, doneTask VARCHAR(1), dateTask DATE, typeTask VARCHAR(1) );";

        if (mysqli_query($con, $sentencia)) {

            $output = "0Table created ". $table_name;
    
        } else {
    
            $output = "-Error occurred: " . mysqli_error($con);
    
        }

    } else {

        $output = "Username not found: " . $name;

    }
    
    


    echo $output;

?>