<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }
?>

<?php
    if (!empty($_POST["newPw"]) && !empty($_POST["confPw"]) &&!empty($_POST["oldPw"])){
        $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
        $error = array();
        $ok = null;
        $utente = $_SESSION["utente_CF"];
    
        if (strlen($_POST["newPw"]) >= 8 && strcmp($_POST["newPw"], $_POST["confPw"]) == 0) {
                $password = mysqli_real_escape_string($conn, $_POST['newPw']);
                $password = password_hash($password, PASSWORD_BCRYPT);
        }else{
            $error[] = "Le due password non corrispondono.";
        }

        $oldPw = $_POST["oldPw"];
        $oldPw = password_hash($oldPw, PASSWORD_BCRYPT);
        $controllo = "SELECT password FROM docente WHERE CF = '$utente' " ;
        $ris = mysqli_query($conn , $controllo);
        $true = mysqli_fetch_assoc($ris);
        if (!password_verify($_POST['oldPw'], $true['password'])) {
            $error[] = "La password inserita non è corretta.";
        }

        if(count($error) == 0){
                $query = "UPDATE docente SET password = '$password' WHERE CF = '$utente' ";
                if (mysqli_query($conn, $query) && count($error) == 0) {
                    $ok = "Password cambiata con successo.";
                    mysqli_close($conn);
                }else {
                    $error[] = "Errore di connessione al Database";
                }
        }
    }else if (isset($_POST["newPw"]) || isset($_POST["confPw"]) || isset($_POST["oldPw"])) {
        $error[] = "Non hai compilato tutti i campi";
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Area personale</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="stylesheet" href="AreaPersonaleDocente.css">
        <script src="Script.JS" defer></script>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
<body>
    <header>
    <nav>
            <div id="Logo">
                <img src="../Foto/Logo.png">
            </div>
                <div id="links">
                    <a href="..\Home_Portale\Home_Portale.php">Home</a>
                    <a href="..\Logout\Logout.php">Logout</a>
                </div>
            <div id="menu">
            <div></div>
            <div></div>
            <div></div>
            </div>
        </nav>
        <span id="Principale">
            <strong>Università degli studi di Romeo</strong>
        </span>
    </header>

    <section>
    <div id="ALL">
        <div class="Contenitore">
                <h1>MODIFICA PASSWORD</h1>
                <form action="AreaPersonaleDocente.php" name="Password" id="Password" method="POST">
                <div class="item"> <p>Password attuale: </p> <input type="password" name= "oldPw" > </div>
                <div class="item"> <p>Nuova password: </p> <input type="password" name= "newPw" > </div>
                <div class="item"> <p>Nuova password: </p> <input type="password" name= "confPw" > </div>
                <div class="Invio"><input type="submit" value="Cambia password" ></div>
                </form>
                <?php
                if(isset($error)) {
                    foreach ($error as $errore) {
                            echo "<span class='error'>$errore</span>";
                        }
                }
                ?>
                <?php
                if(isset($ok)) {
                    echo "<span class='ok'>$ok</span>";
                }
                ?>
        </div>
    </section>
</body>
</html>