<?php

    include("connection.php");

    $con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);

    $table_name = $_POST['table_name'];

    $name = $_POST['name']; 
    $desc = $_POST['desc']; 
    $subject = $_POST['subject']; 
    $porcentaje = $_POST['porcentaje']; 
    $done = $_POST['done']; 
    $date = $_POST['date']; 
    
    $type = $_POST['type']; 

    
    $sentencia = "INSERT INTO $table_name VALUES( NULL, '$name', '$desc', '$subject', '$porcentaje', '$done', '$date', $type )";


    if (mysqli_query($con, $sentencia)) {

        $output = "0". $table_name;

    } else {

        $output = "-Error occurred: " . mysqli_error($con) . ", " . $table_name;

    }
    

    echo $output;

?>