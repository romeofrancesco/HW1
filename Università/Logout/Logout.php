<?php
    include '../DB/DB.php';

    // Distruggo la sessione esistente
    session_start();
    session_destroy();

    header('Location: ..\Login\Login.php');
?>