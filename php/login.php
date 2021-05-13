<?php
    
    session_start();
    include("connection.php");

    /*$con = mysqli_connect('localhost', $database_user, $database_pasw);
    mysqli_select_db($con, $database_name);*/
    $con = mysqli_init();
	$success = mysqli_real_connect($con, 'localhost', $database_user, $database_pasw, $database_name, $database_port);

    $output = "Error connection";

	if($success)
	{
        $name = $_POST['username'];
        $pass = $_POST['password']; 
        $save = $_POST['save']; 
    
        $sentencia = "SELECT * FROM $usertable WHERE nameUser = '$name' AND passwordUser = '$pass'";
        $result = mysqli_query($con, $sentencia);
        $num = mysqli_num_rows($result);
        
        // obtenemos nuestra ID
        $id = mysqli_fetch_row($result); 
        if( $id != null) $id = $id[0];
    
        $output = "";
    
        if($num == 0)
        {
            $output = "-Username and passwords do not match.";
        }
        else
        {
            $output = "0".$id;

            if($save == "true"){
                $datalogin = $name . "@" . $pass;
                setcookie("data-login", $datalogin, time() + (86400)*30, "/"); // 86400 = 1 day
            }
            

        }

        $con->close();
	}


    echo $output;


?>