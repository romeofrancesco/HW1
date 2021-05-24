<?php 
    require_once '../DB/LOG.php';
    if (!$userid = checkAuth()) {
        header("Location: ..\Login\Login.php");
        exit;
    }
?>
<?php
    if( $_SESSION["utente_tipologia"] == "Docente")
        $x = "../AreaPersonaleDocente/AreaPersonaleDocente.php";
    if($_SESSION["utente_tipologia"] == "Tutor")
        $x = "../AreaPersonaleTutor/AreaPersonaleTutor.php";
    if($_SESSION["utente_tipologia"] == "Studente")
        $x = "../AreaPersonaleStudente/AreaPersonaleStudente.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Home portale</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="stylesheet" href="Home_Portale.css">
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
                    <a href = "<?php echo $x; ?>"  >Area personale</a>
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
        <button id = "CreaPost" value = "Crea_post">Crea nuovo post</button>
        <div id="Carica"class = "hidden">
                <input type="text" name = "Titolo" placeholder = "Inserisci il titolo..." maxlength="250">
                <textarea id="Testo" name = "Testo" placeholder = "Inserisci il testo..." maxlength="500"></textarea>
                <button id = "CaricaPost" value = "Crea_post">Crea nuovo post</button>
                <p class = 'hidden'> Riempi entrambi i campi. </p>
        </div>
        <div id = "post">

        </div>
    </section>
</body>
</html>