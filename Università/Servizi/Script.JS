//SPOTIFY
const pulsante = document.querySelector('#Ricerca_playlist');
pulsante.addEventListener('submit', search);
function search(event)
{
	event.preventDefault();
  	// Leggo l'opzione scelta dall'utente
	const tipo = document.querySelector('#Mood').value;
    if(tipo === ''){
        alert("Effettua una scelta tra quelle possibili!");
    }
    else{
        fetch('Richieste.php?x=spotify&y=' + encodeURIComponent(String(tipo))).then(onResponse).then(onJson);
    }
}
function onResponse(promise){
    return promise.json();
}
function onJson(json){
    //Leggo il JSON per vedere cosa ritorna
    const contenitore = document.querySelector('#Contenitore');
    let music_view = document.createElement('div');
    music_view.setAttribute('id' , 'Music');
    contenitore.innerHTML = "";
    contenitore.appendChild(music_view);
    let n = 8;
    //Inserisco dinamicamente gli elementi dalle API nella sezione adatta
    for(let i = 0; i < n; i++)
    {
        let elemento = document.createElement('div');
        elemento.classList.add('items');
        music_view.appendChild(elemento);
        let title = document.createElement('a');
        title.classList.add('title');
        if(json.playlists.items[i].name.length > 15){
        title.textContent = json.playlists.items[i].name.substr(0,15) + "...";
        }
        else{
        title.textContent = json.playlists.items[i].name;
        }
        title.href = json.playlists.items[i].external_urls.spotify;

        let img = document.createElement('img');
        img.src = json.playlists.items[i].images[0].url;

        elemento.appendChild(title);
        elemento.appendChild(img);     
    }

}


//NEWS

fetch('Richieste.php?x=news').then(onResponseNews).then(onJsonNews);

function onResponseNews(response){
    return response.json();
}

function onJsonNews(json){
    //Leggo il JSON per vedere cosa ritorna
    const div = document.querySelector('#News');
    let n = json.response.results.length;
    if(n > 8)
         n = 8;
    //Inserisco dinamicamente gli elementi dalle API nella sezione adatta
    for(let i=0;i<n;i++)
    {
        let title = document.createElement('a');
        title.classList.add('title');
        title.href = json.response.results[i].webUrl;
        title.innerText = json.response.results[i].webTitle;
        let img = document.createElement('img');
        img.src = json.response.results[i].fields.thumbnail;
        let newDiv = document.createElement('div');
        newDiv.classList.add('Notizia');
        div.appendChild(newDiv);
        newDiv.appendChild(title);
        newDiv.appendChild(img);
    }
}