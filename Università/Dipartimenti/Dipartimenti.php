<!DOCTYPE html>
<html>
    <head>
        <title>Dipartimenti</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
        <script src="Script.JS" defer></script>
        <link rel="stylesheet" href="Dipartimenti.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
    <header>

        <nav>
            <div id="Logo">
                <img src="../Foto/Logo.png">
            </div>
                <div id="links">
                    <a href="..\Home_Universitaria\Home_Universitaria.php">Home</a>
                    <a href="..\Dipartimenti\Dipartimenti.php">Dipartimenti</a>
                    <a href="..\Servizi\Servizi.php">Servizi</a>
                    <a href="..\Login\Login.php">Effettua il login</a>
                    <a href="..\Iscrizione\Iscrizione.php">Registrati</a>
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

        <div id="Iscriviti">
            <a class="Button" href="..\Presentazione\Presentazione.php">Scopri molto di più!</a>
        </div>

    </header>

        <section>
                <strong id="Titolo">I NOSTRI DIPARTIMENTI</strong>  
                    <input type="text" id="Barra-ricerca" placeholder="Cerca" onkeyup="cerca()">
        <div id="Contenitore">
        
        </div>

        <div class="Hidden" id="SalvatiPerDopo">
            <strong>I tuoi salvati per dopo:</strong>
            <div id="Box">

            </div>
        </div>

        </section>

        <footer>
                <span id="TitoliDiCoda">POWERED BY FRANCESCO ROMEO <br> n° matricola O46002129</span>
                <div id="Contatti">
                    <a href="..\Contatti\Contatti.php">Chi siamo</a>
                </div>

        </footer>
    </body>

</html>