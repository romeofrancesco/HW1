<?php
    require_once '..\DB\LOG.php';
    
    if (!isset($_GET["q"])) {
        echo "Non dovresti essere qui";
        exit;
    }
    header('Content-Type: application/json');
    
    $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']);
    $email = mysqli_real_escape_string($conn, $_GET["q"]);
    $query = "SELECT email FROM studente WHERE email = '$email'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));

    mysqli_close($conn);
?>