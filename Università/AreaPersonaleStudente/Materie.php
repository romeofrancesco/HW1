<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }

    $utente = $_SESSION["utente_CF"];
    $x = $_SESSION["utente_tipologia"];
    $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));

    $query = "SELECT m.Nome , cdl.Nome , d.Nome FROM studente s join insegnamenti i on i.Codice_CDL = s.Codice_CDL join materia m on i.Codice_Materia = m.Codice join corso_di_laurea cdl on cdl.Codice = s.Codice_CDL join dipartimento d on d.codice = cdl.codice_DIP WHERE s.CF = '$utente' ";
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