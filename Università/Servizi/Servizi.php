<!DOCTYPE html>
<html>
    <head>
        <title>Servizi</title>
        <link rel="icon" href="../Foto/Logo.png">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="Servizi.css">
        <script src="Script.JS" defer></script>
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
<h1>Notizie del giorno</h1>
        <div id="News">
            
        </div>
        <form id='Ricerca_playlist'>
			<h1>Scegli il tuo mood</h1>
            <strong>Ti consigliamo la playlist adatta <br></strong>
			<select id='Mood' name="Mood">
                <option value=''></option>
				<option value='Coding'>Coding</option>
				<option value='Relaxing'>Relaxing</option>
				<option value='Focussing'>Focussing</option>
			</select>
			<label>&nbsp;<input class="submit" type='submit' value="Cerca!"></label>		
		</form>
        <div id="Contenitore">

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