<?php
    require_once '..\DB\LOG.php';

    if (checkAuth()) {
        header("Location: ..\Home_Portale\Home_Portale.php");
        exit;
    }   

    // Verifica l'esistenza di dati POST
    if (!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["CF"]) && !empty($_POST["data"]) && !empty($_POST["citta"]) 
        && !empty($_POST["email"]) && !empty($_POST["pw"]) && !empty($_POST["confpw"]) && !empty($_POST["CDL"]))
    {
        $error = array();
        $conn = mysqli_connect($DB['host'], $DB['user'], $DB['password'], $DB['name']) or die(mysqli_error($conn));
        //CHECK_CF
        if (strlen($_POST["CF"]) != 16){
            $error[] = "Il codice fiscale non contiene 16 caratteri.";
        }
        else{ 
        $CF = mysqli_real_escape_string($conn, $_POST['CF']);
        $res = mysqli_query($conn, "SELECT CF FROM Studente WHERE CF = '$CF'");
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Codice fiscale già in utilizzo.";
        }
        }
        //CHECK_PASSWORD
        if (strlen($_POST["pw"]) < 8){
            $error[] = "La password non rispetta le regole.";
        }
        else {
            $password = mysqli_real_escape_string($conn, $_POST['pw']);
            $password = password_hash($password, PASSWORD_BCRYPT);
        }
        //CHECK_SECONDA_PASSWORD
        if (strcmp($_POST["pw"], $_POST["confpw"]) != 0) {
            $error[] = "Le due password non corrispondono.";
        }
        //CHECK_EMAIL
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) { //https://www.php.net/manual/en/filter.filters.validate.php#:~:text=FILTER_VALIDATE_EMAIL%20is%20discarding%20valid%20e-mail%20addresses%20containing%20IDN.,necessary%20to%20convert%20the%20e-mail%20address%20to%20punycode.
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM Studente WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già in utilizzo.";
            }
        }
        //CHECK_ETA
        $data = new DateTime($_POST['data']);
        $now = new DateTime();
        $interval = $now->diff($data);
        $eta = $interval->y;
        if($eta < 17){
            $error[] = "Età non valida.";
        }
        else{
            $data = $_POST['data'];
        }
        //CHECK_CDL
        $CDL = $_POST['CDL'];
        if($CDL == 00){
            $error[] = "Corso di laurea non valido.";
        }
        //CHECK ISCRIZIONE ALL'UNIVERSITA'
        $controllo = "SELECT * FROM iscritti WHERE CF = '$CF' ";
        $ris = mysqli_query($conn , $controllo);
        if(mysqli_num_rows($ris) == 0)
        {
            $error[] ="Codice fiscale non iscritto all'università";
        }
        // REGISTRAZIONE NEL DATABASE
        if (count($error) == 0) {
            $matricola = 'null';
            $nome = mysqli_real_escape_string($conn, $_POST['nome']);
            $cognome = mysqli_real_escape_string($conn, $_POST['cognome']);
            $citta = mysqli_real_escape_string($conn, $_POST['citta']);
            $tipo = 'Regolare';

            $query = "INSERT INTO studente(Matricola , Nome , Cognome ,CF, Data_di_nascita , Età ,Citta_di_nascita, Email , password , Tipo , Codice_CDL) VALUES($matricola , '$nome', '$cognome', '$CF' , '$data' , '$eta' ,'$citta' ,'$email' , '$password' , '$tipo' , '$CDL')";
            if (mysqli_query($conn, $query)) {
                $_SESSION["utente_CF"] = $_POST["CF"];
                $_SESSION["utente_tipologia"] = "Studente";
                mysqli_close($conn);
                header("Location: ..\Home_Portale\Home_Portale.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
    else if (isset($_POST["nome"]) || isset($_POST["cognome"]) || isset($_POST["CF"]) || isset($_POST["data"]) || isset($_POST["citta"]) 
             || isset($_POST["email"]) || isset($_POST["pw"]) || isset($_POST["confpw"]) || isset($_POST["CDL"])) {
        $error = array("Alcuni campi vuoti");
    }

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Iscrizione</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
        <script src="Script.JS" defer></script>
        <link rel="stylesheet" href="Iscrizione.css">
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
            <strong>ISCRIVITI</strong>
            <div id="Contenitore">
                <form action="Iscrizione.php" name="Iscrizione" id="login" method="POST">
                    <div>
                    <div class="label">Nome <input type="text" name="nome" <?php if(isset($_POST["nome"])){echo "value=".$_POST["nome"];} ?> ></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Cognome <input type="text" name="cognome" <?php if(isset($_POST["cognome"])){echo "value=".$_POST["cognome"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">CF <input type="text" name="CF" <?php if(isset($_POST["CF"])){echo "value=".$_POST["CF"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Data di nascita <input type="date" name="data" <?php if(isset($_POST["data"])){echo "value=".$_POST["data"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Città di nascita <input type="text" name="citta" <?php if(isset($_POST["citta"])){echo "value=".$_POST["citta"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Email <input type="text" name="email" <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Password <input type="password" name="pw" id="pw" <?php if(isset($_POST["pw"])){echo "value=".$_POST["pw"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Conferma password <input type="password" name="confpw" <?php if(isset($_POST["confpw"])){echo "value=".$_POST["confpw"];} ?>></div>
                    <span></span>
                    </div>
                    <div>
                    <div class="label">Seleziona il corso di Laurea
                    <select name = 'CDL' id='CDL'>
                            <option value='00'></option>
                            <option value='01'>Ingegneria Informatica</option>
                            <option value='02'>Ingegneria Elettronica</option>
                            <option value='03'>Ingengeria Elettrica</option>
                            <option value='15'>Psicologia</option>
                            <option value='16'>Scienze dell'educazione e della formazione</option>
                            <option value='23'>Economia aziendale</option>
                            <option value='34'>Informatica</option>
                            <option value='45'>Fisioterapia</option>
                    </select>
                    </div>
                    <span></span>
                    </div>
                    <div class="label" id="submit"><input type="submit" value="Registrati" id="invio"></div>
                </form>
                <?php
                if (isset($error)) {
                    foreach ($error as $errore) {
                            echo "<span class='error'>$errore</span>";
                        }
                }
                ?>
                <p>Sei già iscritto?<a href="..\Login\Login.php">Effettua il login</a> </p>
            </div>
            </div>   
        </section>

    </body>

</html>