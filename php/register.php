<?php
    
    include("connection.php");

    $con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);

    $name = $_POST['username'];
    $pass = $_POST['password']; 

    $s = "SELECT * FROM $usertable WHERE nameUser = '$name'";
    $result = mysqli_query($con, $s);
    $num = mysqli_num_rows($result);
    
    $output = "2aa";

    if($num != 0)
    {
        $output = "1Username is taken";
    }
    else
    {

        $sentencia = "INSERT INTO $usertable VALUES( NULL, '$name', '$pass' )";

        if (mysqli_query($con, $sentencia)) {

            $output = "0". $name;

        } else {

            $output = "-Error occurred: " . mysqli_error($con);

        }
        
    }

    echo $output;

    // . ": " . 

?>