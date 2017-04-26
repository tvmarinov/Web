<?php

    $con = new mysqli("localhost","root","mysqlpass","pooltemp");

    $dataArr = array(array(),array(),array());

    $fromDate = $_GET['fromDate'];
    $toDate = $_GET['toDate'];
    
    if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
    }   

    $sql = "SELECT * FROM temperature WHERE temperature.date BETWEEN '$fromDate' AND '$toDate'";

    $result = $con->query($sql);

    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["date"] . " " . $row["smallT"] . " " . $row["largeT"] . " " . $row["innerT"] . " " . $row["time"] . ";";
        }
    } else {
        echo "0 results";
    }

    

     $con->close();

?>