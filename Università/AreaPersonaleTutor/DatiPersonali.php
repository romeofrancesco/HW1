<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }

    $utente = $_SESSION["utente_CF"];
    $x = $_SESSION["utente_tipologia"];
    $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
    $query = "SELECT * FROM $x WHERE CF = '$utente'";
    $res = mysqli_query($conn, $query);
    if ($res) {
        $val = mysqli_fetch_assoc($res);
        echo json_encode($val);
        mysqli_close($conn);
        exit;
    }
?>