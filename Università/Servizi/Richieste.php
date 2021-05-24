<?php

    $client_id = 'dc7ba9720563484389c9708a03be1cba'; 
    $client_secret = '9e054cc7b1e840eb924b46ac53c00581';

    $func=$_GET['x'];

if($func == 'spotify'){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,'https://accounts.spotify.com/api/token' );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_POST, 1 );
    curl_setopt($ch, CURLOPT_POSTFIELDS,'grant_type=client_credentials' ); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret)));
    $token=json_decode(curl_exec($ch), true);
    curl_close($ch);
    $Nome = urlencode($_GET["y"]);
    $url = 'https://api.spotify.com/v1/search?q='.$Nome. '&type=playlist';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token'])); 
    $res=curl_exec($ch);
    curl_close($ch);
    echo $res;
}

if($func == 'news'){
$key = "1385c12a-57bc-4f75-ab93-8a8992208879";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://content.guardianapis.com/search?page=1&q=university&show-fields=thumbnail&api-key=' .$key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $res = curl_exec($ch);
    curl_close($ch);
    echo $res;
}

?>
