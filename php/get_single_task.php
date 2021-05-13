<?php

    function get_tasks($query){

        include("connection.php");

        $con = mysqli_connect('localhost', $database_user, $database_pasw);
        mysqli_select_db($con, $database_name);
        
        if($con->connect_errno >0){
            echo "Unable to connect Database";
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
    $taskID = $_POST["taskID"];

    $usuarios = get_tasks("SELECT * FROM $table_name WHERE idTask = $taskID");
    echo "0".json_encode($usuarios);

?>