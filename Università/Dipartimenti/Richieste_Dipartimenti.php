<?php
    require_once '../DB/LOG.php';

    if (!isset($_GET["q"])) {
        echo "Pagina non trovata.";
        exit;
    }

header('Content-Type: application/json');

$conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
$func = mysqli_real_escape_string($conn, $_GET["t"]);

//PRENDE TUTTI I DIPARTIMENTI
if($func == "Dipartimenti"){
    $query  = " SELECT * FROM dipartimento ";
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
//PRENDE LA DESCRIZIONE
if($func == "Descrizione"){
$Nome = mysqli_real_escape_string($conn, $_GET["x"]);
    $query  = " SELECT * FROM dipartimento WHERE Nome = '$Nome' ";
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
