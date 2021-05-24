<?php 
    include '../DB/LOG.php';
    if (checkAuth()) {
        header('Location: ..\Home_Portale\Home_Portale.php');
        exit;
    }

    if (!empty($_POST["CF"]) && !empty($_POST["PW"]) && !empty($_POST["accesso"]))
    {
        $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
        $CF = mysqli_real_escape_string($conn, $_POST['CF']);
        $Password = mysqli_real_escape_string($conn, $_POST['PW']);
        $x = $_POST['accesso'];
        $query = " SELECT * FROM $x WHERE CF = '$CF' ";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['PW'], $entry['password'])) {



                $_SESSION["utente_CF"] = $_POST["CF"];
                $_SESSION["utente_tipologia"] = $x;
                //$_SESSION["_agora_user_id"] = $entry['id'];
                header("Location: ..\Home_Portale\Home_Portale.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "Accesso fallito, controlla di aver inserito tutte le credenziali correttamente.";
    }
    else if (isset($_POST["CF"]) || isset($_POST["PW"]) || isset($_POST["accesso"])) {
        $error = "Inserisci codice fiscale, password ed effettua una scelta.";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="stylesheet" href="Login.css">
        <script src="Script.JS" defer></script>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
<body>
    <header>
        <img src="../Foto/Logo.png">
        <strong>UNIVERSITA' DEGLI STUDI DI ROMEO</strong>

        <div id="link">
            <a href="..\Home_Universitaria\Home_Universitaria.php">HOME</a>
        </div>
    </header>

    <section>
        <div id="Foto">
            <div id="Accesso">
            <form id='Prof_Studente' action='Login.php' method='POST'>
                <div id="Dati">
                    <input type="text" name="CF" placeholder="Codice fiscale..." <?php if(isset($_POST["CF"])){echo "value=".$_POST["CF"];} ?>>
                    <input type="password" name="PW" placeholder="Password..." <?php if(isset($_POST["PW"])){echo "value=".$_POST["PW"];} ?>>
                    <span></span>
                </div>
                <div id="Dati1">
                    <label><input type="radio" name="accesso" value="Docente">Docente</label>
                    <label><input type="radio" name="accesso" value="Tutor">Tutor</label>
                    <label><input type="radio" name="accesso" value="Studente">Studente</label>
                <label>&nbsp;<input id="Accedi" type='submit' value="Accedi" name="Credenziali"></label>		
                </div>
            </form>
            <?php
                if (isset($error)) {
                    echo "<span class='error'>$error</span>";
                }
                
            ?>
            <p>Non sei ancora iscritto? Scopri come iscriverti qui: <a href="..\Iscrizione\Iscrizione.php">Registrati</a> </p>
            </div>
        </div>
    </section>
</body>
</html>