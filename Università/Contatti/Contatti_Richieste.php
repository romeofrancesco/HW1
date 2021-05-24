<?php
    include '../DB/DB.php';

    if (!isset($_GET["em"])) {
        echo "Pagina non trovata.";
        exit;
    }

header('Content-Type: application/json');

$conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
$func = mysqli_real_escape_string($conn, $_GET["x"]);

//POST
if($func == "Pin"){
        $query = "SELECT dip.Nome , s.Latitudine , s.Longitudine , s.Colore FROM sede s JOIN dipartimento dip ON s.Codice_DIP = dip.Codice";
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
?>