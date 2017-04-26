<?php

    $con = mysqli_connect("localhost","root","mysqlpass","pooltemp");

    $sql ="SELECT * FROM(       
        SELECT * FROM pooltemp.temperature ORDER BY id DESC LIMIT 10
        ) sub
        ORDER BY id ASC;";

    $result = $con->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["date"] . " " . $row["smallT"] . " " . $row["largeT"] . " " . $row["innerT"] . " " . $row["outerT"] . " " . $row["time"] . ";";
        }
    } else {
        echo "0 results";
    }
?>