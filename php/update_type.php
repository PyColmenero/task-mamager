<?php

    // connectamos a la BBDD
    include("connection.php");

    $con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);

    // recogemos variables
    $table_name = $_POST["table_name"];
    $id = $_POST["id"];
    $type = $_POST["type"];


    $sentencia = "UPDATE $table_name SET typeTask = '$type' WHERE idTask = $id;";

    if (mysqli_query($con, $sentencia)) {

        $output = "0Task Updated ". $table_name;

    } else {

        $output = "-Error occurred: " . mysqli_error($con);

    }

    echo $output;

?>