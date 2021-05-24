function onResponse(promise){
  return promise.json()
}

fetch("Richieste_Home.php?q=Esegui&t=Notizie").then(onResponse).then(OnJsonNotizie);

//CARICO CONTENUTI DINAMICAMENTE
function OnJsonNotizie(json){
let Notizie = document.querySelector("#Notizie");
let n = 10;
if(json.length<10)
    n=json.lenght;
  
  for(let i=0;i<json.length;i++){
    let container = document.createElement('div');
    container.classList.add('Contenitore');
    Notizie.appendChild(container);
    let item = document.createElement('div');
    item.classList.add('Items');
    container.appendChild(item);
    let title = document.createElement('strong');
    title.textContent = json[i].titolo;
    let paragraph = document.createElement('p');
    paragraph.textContent = json[i].Descrizione;
    let img = document.createElement('img');
    img.src = json[i].img_src;
    item.appendChild(title);
    item.appendChild(paragraph);
    item.appendChild(img);
    let Data = document.createElement('span');
    Data.classList.add('Data');
    container.appendChild(Data);
    let em = document.createElement('em');
    em.textContent = json[i].data_notizia;
    Data.appendChild(em);
  }
}
fetch("Richieste_Home.php?q=Esegui&t=Eventi").then(onResponse).then(OnJsonEventi);
//CARICO CONTENUTI DINAMICAMENTE
function OnJsonEventi(json){
let Eventi = document.querySelector("#Eventi");
  let n = 10;
  if(json.length<10)
      n=json.length;
  for(let i=0;i<n;i++){
    let Evento = document.createElement('div');
    Evento.classList.add('Evento');
    Eventi.appendChild(Evento);
    let title = document.createElement('strong');
    title.textContent = json[i].Titolo;
    let paragraph = document.createElement('p');
    paragraph.textContent = json[i].Descrizione;
    Evento.appendChild(title);
    Evento.appendChild(paragraph);
  }

}

//Eseguo il fetch
fetch('Richieste_Home.php?q=Esegui&t=meteo').then(onResponse).then(onJson);
  
function onResponse(response) {
      return response.json();
}

    function onJson(json) {
      //Creo i vari div con dentro i contenuti utili del json
      let div = document.querySelector("#Meteo");
      let newDiv = document.createElement('span');
      newDiv.classList.add('info_meteo');
      div.appendChild(newDiv);
      let citta = document.createElement('strong');
      citta.textContent = json.request.query;
      let temp = document.createElement('em');
      temp.textContent = json.current.temperature +'°';
      newDiv.appendChild(citta);
      newDiv.appendChild(temp);
      let img = document.createElement('img');
      img.src = json.current.weather_icons;
      div.appendChild(img);
    }
