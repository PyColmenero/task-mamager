<?php

    function get_tasks($query){

        include("connection.php");

        $con = mysqli_connect('localhost', $database_user, $database_pasw);
        mysqli_select_db($con, $database_name);
        
        if($con->connect_errno >0){
            echo "Unable to connect Database";
            exit;
        }
        if(!$result = $con->query($query)){
            echo "n".$query;
            exit;
        }
        
        $res = array();
        while($row = $result->fetch_assoc()){
            array_push($res, array(
                "id"            => $row["idTask"],
                "name"          => $row["nameTask"],
                "description"   => $row["descriptionTask"],
                "subject"       => $row["subjectTask"],
                "porcentaje"    => $row["porcentajeTask"],
                "done"    => $row["doneTask"],
                "date"           => $row["dateTask"],
                "type"         => $row["typeTask"],
            ));
        }

        $con->close();
        
        return $res;
    }

    $table_name = $_POST["table_name"];
    $orderby = $_POST["orderby"];
    $word_filter = $_POST["word_filter"];
    $subject_filter = $_POST["subject_filter"];
    $done_filter = $_POST["done_filter"];

    $sentencia = "SELECT * FROM $table_name WHERE idTask > 0 $word_filter $subject_filter $done_filter ORDER BY dateTask $orderby, nameTask";
    $usuarios = get_tasks($sentencia);
    
    echo "0".json_encode($usuarios);

?>