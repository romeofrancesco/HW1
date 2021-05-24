<?php
    require_once '../DB/LOG.php';

    if (!isset($_GET["q"])) {
        echo "Pagina non trovata.";
        exit;
    }

header('Content-Type: application/json');

$conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
$func = $_GET["t"];

//PRENDE TUTTE LE NOTIZIE
if($func == "Notizie"){
    $query  = " SELECT * FROM notizie ";
    $res = mysqli_query($conn , $query);
    $results = array();
    while($line = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $results[] = $line;
    }
    if ($res) {
        echo json_encode($results);
        mysqli_close($conn);
        exit;
    }
}
//PRENDE TUTTI GLI EVENTI
if($func == "Eventi"){
    $query  = " SELECT * FROM eventi ";
    $res = mysqli_query($conn , $query);
    $results = array();
    while($line = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $results[] = $line;
    }
    if ($res) {
        echo json_encode($results);
        mysqli_close($conn);
        exit;
    }
}
//METEO

$key = 'ec831b6edf8e1e81d4c994e06384bfe6';
if($func == "meteo"){

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://api.weatherstack.com/current?access_key=' .$key. '&query=Catania');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $res = curl_exec($ch);
    curl_close($ch);
    echo $res;
}