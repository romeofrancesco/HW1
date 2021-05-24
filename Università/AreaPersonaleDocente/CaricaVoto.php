<?php
    require_once '../DB/LOG.php';

    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }

    if (!isset($_GET["em"])) {
        echo "Pagina non trovata.";
        exit;
    }
        $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));

        $utente = $_SESSION["utente_CF"];
        $id = "null";
        $matricola = mysqli_real_escape_string($conn, $_GET["x"]);
        $data = mysqli_real_escape_string($conn, $_GET["y"]);
        $voto = mysqli_real_escape_string($conn, $_GET["z"]);
        $lode = mysqli_real_escape_string($conn, $_GET["a"]);
        $codice = mysqli_real_escape_string($conn, $_GET["b"]);
        if(strlen($matricola) == 0 || strlen($data) == 0 || strlen($voto) == 0 || strlen($lode) == 0 || strlen($codice) == 0){
            echo json_encode("Controlla di aver inserito tutti i campi.");
            mysqli_close($conn);
            exit;
        }
        if((strcmp($lode, "SI") != 0) && (strcmp($lode, "NO") !=  0)){
            echo json_encode("Controlla che il campo lode sia inserito correttamente.");
            mysqli_close($conn);
            exit;
        }
        if((strcmp($lode, "SI") == 0) && ($voto != 30)){
            echo json_encode("Il voto deve essere pari a 30 per inserire la lode.");
            mysqli_close($conn);
            exit;
        }
        if($voto > 30 || $voto < 18){
            echo json_encode("Controlla che il campo voto sia inserito correttamente.");
            mysqli_close($conn);
            exit;
        }
        $controllo = " SELECT * FROM docente d join insegnamenti i on d.CF = i.Professore join materia m on m.Codice = i.Codice_Materia join corso_di_laurea cdl on i.Codice_CDL = cdl.Codice  WHERE CF = '$utente' && m.Codice= '$codice' ";
        $res = mysqli_query($conn , $controllo);
        if(mysqli_num_rows($res) == 0){
            echo json_encode("Ricontrolla il codice materia.");
            mysqli_close($conn);
            exit;
        }  
        $query = " INSERT INTO esame values('$id' , '$matricola' , '$data' , '$voto' ,'$lode' ,'$codice') ";
            if (mysqli_query($conn, $query) ){
                echo json_encode("Voto caricato con successo.");
                mysqli_close($conn);
                exit;
            }else{
                echo json_encode("Errore di connessione al database o hai compilato i campi in modo errato.");
                mysqli_close($conn);
                exit;
            }
?>