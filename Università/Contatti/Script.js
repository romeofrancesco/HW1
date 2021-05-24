function GetMap(){
fetch('Contatti_Richieste.php?em=Esegui&x=Pin').then(onResponse).then(onJsonMap);
}
function onResponse(response){
    return response.json();
}
function onJsonMap(json){
    // Inizializzo la mappa
    let map = new Microsoft.Maps.Map('#TheMap', {
        credentials: 'At_yTgCLuSt7d3Zot4qFDczSkVxRBkITsVZx4NrWKG_5rx4LhrVEUHu_GlCACepX' ,
        center : new Microsoft.Maps.Location(37.512257, 15.071188)
    });
    
    // Creo una collezione di pins da aggiungere alla mappa
    let pins = new Microsoft.Maps.EntityCollection();
    
    // Ciclo for per creare i pin
    for (let j in json){
    // Dal file contents prendo la posizione per i pin
    let position = new Microsoft.Maps.Location(json[j].Latitudine , json[j].Longitudine);
    // Creo un pin da aggiungere alla collezione
    let pin = new Microsoft.Maps.Pushpin(position , {
            color:  json[j].Colore ,
            title: json[j].Nome
    });
    // Aggiungo un pin alla collection
    pins.push(pin);
    }
    
    // Aggiugo i pins della collezione alla mappa
    map.entities.push(pins);
}
