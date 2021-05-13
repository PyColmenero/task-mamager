<?php

    // connectamos a la BBDD
    include("connection.php");

    $con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);

    // recogemos variables
    $table_name = $_POST["table_name"];
    $taskID = $_POST["taskID"];


    // INTENTAMOS CREAR LA TABLA, si la ID existe
    $sentencia = "DELETE FROM $table_name WHERE idTask = $taskID";

    if (mysqli_query($con, $sentencia)) {

        $output = "0Deleted Succesfully ". $table_name;

    } else {

        $output = "-Error occurred: " . mysqli_error($con);

    }

    echo $output;

?>