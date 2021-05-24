<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }

    $utente = $_SESSION["utente_CF"];
    $x = $_SESSION["utente_tipologia"];
    $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));

    $query = "SELECT m.Nome , e.Voto , e.Lode  FROM studente s join esame e on s.Matricola = e.Studente join materia m on m.Codice = e.Codice_Materia WHERE s.CF = '$utente' ";
    $res = mysqli_query($conn, $query);
    $results = array();
    while($line = mysqli_fetch_array($res, MYSQLI_NUM)){
        $results[] = $line;
    }
    if ($res) {
        echo json_encode($results);
        mysqli_close($conn);
        exit;
    }
?>