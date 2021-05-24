<?php
    require_once 'DB.php';
    session_start();

    function checkAuth() {
        if(isset($_SESSION['utente_CF'])) {
            return $_SESSION['utente_CF'];
        } else 
            return 0;
    }
?>