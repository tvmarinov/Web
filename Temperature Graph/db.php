<?php

    $timeDifference = 2;

    $con = mysqli_connect("localhost","root","mysqlpass","pooltemp");
    
    $jsondata = file_get_contents('Private IP with temperatures in JSON format'); 


    $data = json_decode($jsondata, true);

    $date_time = getdate();

    $date = $date_time['year'] . "-" . $date_time['mon'] . "-" . $date_time['mday'];
    $temp = $data['List'][0]['TempC'];
    $temp2 = $data['List'][1]['TempC'];
    $temp3 = $data['List'][2]['TempC'];
    $temp4 = $data['List'][3]['TempC'];
    $time = $date_time ['hours']+$timeDifference . ":" . $date_time ['minutes'] . ":" . $date_time ['seconds'];


    if(!empty($data)){
        $sql = "INSERT INTO temperature (date, smallT, largeT, innerT, outerT, time )
        VALUES ('$date', '$temp', '$temp2', '$temp3', '$temp4', '$time')";
    }else
    {
        $sql = "INSERT INTO temperature (date, smallT, largeT, innerT, outerT, time )
        VALUES ('$date', null, null, null, null, '$time')";
    }
    

    $parseArr = array('date' => $date, 'smallT' => $temp, 'largeT' => $temp2, 'innerT' => $temp3, 'time' => $time, 'outerT' => $temp4);

    echo json_encode($parseArr);
    
    $con->query($sql);
?>