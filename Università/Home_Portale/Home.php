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

header('Content-Type: application/json');

$utente = $_SESSION["utente_CF"];
$x = $_SESSION["utente_tipologia"];
$conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
$func = mysqli_real_escape_string($conn, $_GET["t"]);

//POST
if($func == "CaricaPost"){
    $queryCDL = " SELECT Codice_CDL FROM $x WHERE CF = '$utente' ";
    $ris = mysqli_query($conn , $queryCDL);
    $entry = mysqli_fetch_assoc($ris);
    $CDL = $entry['Codice_CDL'];
    $query = "SELECT p.* FROM post p 
              WHERE  p.CF IN(SELECT CF FROM studente WHERE Codice_CDL = '$CDL') 
              || p.CF IN(SELECT CF FROM docente WHERE Codice_CDL = '$CDL') 
              || p.CF IN(SELECT CF FROM tutor WHERE Codice_CDL = '$CDL') ";
    $res = mysqli_query($conn , $query);
    $results = array();
    while($line = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $results[] = $line;
    }
    $queryLike = "SELECT count(m.Post_ID) AS conta FROM mipiace m right join post p on m.Post_ID = p.ID GROUP BY p.ID" ;
    $resLike = mysqli_query($conn , $queryLike);
    $risultati = array();
    while($line = mysqli_fetch_array($resLike , MYSQLI_ASSOC)){
    $risultati[] = $line;
    }
    $queryNomi = "SELECT distinct(m.CF) , p.ID FROM mipiace m right join post p on m.Post_ID = p.ID" ;
    $resNomi = mysqli_query($conn , $queryNomi);
    $risultatiNomi = array();
    while($line = mysqli_fetch_array($resNomi , MYSQLI_ASSOC)){
    $risultatiNomi[] = $line;
    }
    if ($res) {
        $array = ["CF" => $utente , "Risultati"=> $results , "mipiace" => $risultati , "nomi" => $risultatiNomi];
        echo json_encode($array);
        mysqli_close($conn);
        exit;
    }
}

if($func == "CreaPost"){
    $Titolo = mysqli_real_escape_string($conn, $_GET["x"]);
    $Testo = mysqli_real_escape_string($conn, $_GET["y"]);
    $queryN = "SELECT Nome , Cognome FROM $x WHERE CF = '$utente' ";
    $ris = mysqli_query($conn , $queryN);
    $entry = mysqli_fetch_assoc($ris);
    $Nome = $entry['Nome'];
    $Cognome = $entry['Cognome'];
    $now = date("Y-m-d");
    if(!empty($Titolo) && !empty($Testo)){
        $query = " INSERT INTO post(ID , Titolo , text , CF , Nome , Cognome , datapost) VALUES(NULL , '$Titolo' ,  '$Testo' , '$utente' , '$Nome' , '$Cognome' , '$now')" ;
        $res = mysqli_query($conn , $query);
        $query1 = "SELECT * FROM post ORDER BY ID DESC LIMIT 1";
        $ris = mysqli_query($conn , $query1);
        if ($ris) {
            echo json_encode(mysqli_fetch_assoc($ris));
            mysqli_close($conn);
            exit;
        }else{
            echo json_encode("errore");
            mysqli_close($conn);
            exit;
        }
    }else{
        echo json_encode("campi");
        mysqli_close($conn);
        exit;
    }
}

if($func == "RimuoviPost"){
    $ID = mysqli_real_escape_string($conn, $_GET["x"]);

        $queryN = "SELECT * FROM commento WHERE Post_ID = '$ID'";
        if(mysqli_query($conn , $queryN)){
            $queryR = "DELETE FROM commento WHERE Post_ID = '$ID'" ;
            $risultato = mysqli_query($conn , $queryR);
        }
        $queryM = "SELECT * FROM mipiace WHERE Post_ID = '$ID'";
        if(mysqli_query($conn , $queryM)){
            $queryLike = "DELETE FROM mipiace WHERE Post_ID = '$ID'" ;
            $ris = mysqli_query($conn , $queryLike);
        }
        $query = "DELETE FROM post WHERE ID = '$ID'" ;
        $res = mysqli_query($conn , $query);
        if ($res) {
            echo json_encode("$ID");
            mysqli_close($conn);
            exit;
        }else{
            echo json_encode("errore");
            mysqli_close($conn);
            exit;
        }
}

//COMMENTO

if($func == "RimuoviCommento"){
    $ID = mysqli_real_escape_string($conn, $_GET["x"]);
        $query = "DELETE FROM commento WHERE ID = '$ID'" ;
        $res = mysqli_query($conn , $query);
        if ($res) {
            echo json_encode("$ID");
            mysqli_close($conn);
            exit;
        }else{
            echo json_encode("errore");
            mysqli_close($conn);
            exit;
        }
}
if($func == "MostraCommenti"){
    $id = mysqli_real_escape_string($conn, $_GET["x"]);
    $query = "SELECT * FROM commento WHERE Post_ID = '$id' ";
    $res = mysqli_query($conn , $query);
    if(mysqli_num_rows($res) == 0)
    {
        $array = ['Risultato'=> '0' , 'ID' => $id];
        echo json_encode($array);
        mysqli_close($conn);
        exit;
    }
    $results = array();
    while($line = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $results[] = $line;
    }
    if ($res) {
        $array = ['ID'=>$utente , 'Risultati' => $results];
        echo json_encode($array);
        mysqli_close($conn);
        exit;
    }
}
if($func == "CaricaCommento"){
    $queryN = "SELECT Nome , Cognome FROM $x WHERE CF = '$utente' ";
    $ris = mysqli_query($conn , $queryN);
    $entry = mysqli_fetch_assoc($ris);
    $Nome = $entry['Nome'];
    $Cognome = $entry['Cognome'];
    $now = date('Y-m-d H:i:s');
    $ID = mysqli_real_escape_string($conn, $_GET["x"]);
    $Text = mysqli_real_escape_string($conn, $_GET["y"]);
    if(!empty($Text)){
    $query = "INSERT INTO commento(ID , Post_ID , CF , Nome , Cognome , text , datacommento) VALUES(NULL , '$ID' ,  '$utente' , '$Nome' , '$Cognome' , '$Text', '$now')" ;
    $res = mysqli_query($conn , $query);
    $query1 = "SELECT * FROM commento ORDER BY ID DESC LIMIT 1";
    $ris = mysqli_query($conn , $query1);
    if ($ris) {
        echo json_encode(mysqli_fetch_assoc($ris));
        mysqli_close($conn);
        exit;
    }else{
        echo json_encode("errore");
        mysqli_close($conn);
        exit; 
    }
    }else{
        echo json_encode("campi");
        mysqli_close($conn);
        exit;   
    }
}

//LIKE

if($func == "RimuoviLike"){
    $ID = mysqli_real_escape_string($conn, $_GET["x"]);
        $query = "DELETE FROM mipiace WHERE Post_ID = '$ID' AND CF = '$utente' " ;
        $res = mysqli_query($conn , $query);
        if ($res) {
            echo json_encode("$ID");
            mysqli_close($conn);
            exit;
        }else{
            echo json_encode("errore");
            mysqli_close($conn);
            exit;
        }
}

if($func == "AggiungiLike"){
    $ID = mysqli_real_escape_string($conn, $_GET["x"]);
        $query = "INSERT INTO mipiace(Post_ID , CF) VALUES( '$ID' , '$utente') " ;
        $res = mysqli_query($conn , $query);
        if ($res) {
            echo json_encode("$ID");
            mysqli_close($conn);
            exit;
        }else{
            echo json_encode("errore");
            mysqli_close($conn);
            exit;
        }
}
?>