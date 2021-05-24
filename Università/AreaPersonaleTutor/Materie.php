<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }

    $utente = $_SESSION["utente_CF"];
    $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
    $query = "SELECT m.Nome , cdl.Nome FROM tutor t join materia m on t.CF = m.Tutor join insegnamenti i on m.Codice = i.Codice_Materia join corso_di_laurea cdl on i.Codice_CDL = cdl.Codice  WHERE CF = '$utente' ";
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