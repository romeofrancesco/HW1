const section= document.querySelector('section');
const div = document.createElement('div');
div.classList.add('visualizza_punti');
section.appendChild(div);
const Contenitore = document.createElement('div');
Contenitore.classList.add('container');
div.appendChild(Contenitore);
const punto1 = document.createElement('div');
punto1.classList.add('punto');
punto1.setAttribute("id" , "punto1");
const punto2 = document.createElement('div');
punto2.classList.add('punto');
punto2.setAttribute("id" , "punto2");
const punto3 = document.createElement('div');
punto3.classList.add('punto');
punto3.setAttribute("id" , "punto3");
Contenitore.appendChild(punto1);
Contenitore.appendChild(punto2);
Contenitore.appendChild(punto3);
document.body.classList.add('no-scroll');
setTimeout(EliminaCaricamento , 4000 , div);

function EliminaCaricamento(div){
    div.remove();
    document.body.classList.remove('no-scroll');

}

function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    const seconds = Math.floor(diffInMilliSeconds);
    diffInMilliSeconds -= seconds * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} giorno fa ` : `${days} giorni fa `;
      return difference;
    }
    else{
        if(hours>0)
        {
        difference += (hours === 0 || hours === 1) ? `${hours} ora fa ` : `${hours} ore fa `;
        return difference;
        }
        else if(minutes>0)
        {
            difference += (minutes === 0 || minutes === 1) ? `${minutes} minuto fa` : `${minutes} minuti fa`; 
            return difference;
        }
        else
        {
            difference += (seconds === 0 || minutes === 1) ? `${seconds} secondo fa` : `${seconds} secondi fa`; 
            return difference;
        }
    }
  }

//Crea il post dati in ingresso i dati
function CaricaPost(CF , json , num , nomi){
    const post = document.querySelector("#post");
    const cont = document.querySelectorAll(".Contenitore")[0];
    const div = document.createElement('div');
    div.classList.add('Contenitore');
    div.dataset.name = json.ID;
    if(!cont){
        post.appendChild(div);
    }
    else{
        post.insertBefore(div , cont);
    }
    const title = document.createElement('strong');
    title.textContent = json.Titolo;
    const text = document.createElement('p');
    text.textContent = json.text;
    const Creatore = document.createElement('em');
    Creatore.textContent = json.Nome + " " + json.Cognome;
    const Data = document.createElement('i');
    Data.textContent = json.datapost;
    const Bottone = document.createElement('button');
    Bottone.classList.add('Button');
    Bottone.textContent = "Mostra i commenti";
    Bottone.addEventListener('click' , mostraCommenti);
    if(CF === json.CF){
        const rimuovi = document.createElement('img');
        rimuovi.classList.add('Button_img');
        rimuovi.src = "../Foto/x.png";
        rimuovi.addEventListener('click' , function(){Mostra_conferma(json.ID);});
        div.appendChild(rimuovi);
    }
    const Commenta = document.createElement('button');
    Commenta.classList.add('Button');
    Commenta.textContent = "Invia il commento.";
    Commenta.addEventListener('click' , InviaCommento);
    const textarea = document.createElement('textarea');
    textarea.classList.add('area');
    textarea.style.resize = "none";
    textarea.maxlength = "500";
    const newdiv = document.createElement('div');
    newdiv.classList.add('like');
    const p = document.createElement('p');
    p.textContent = num;
    p.style.fontWeight = "bolder";
    const img = document.createElement('img');
    img.src = "../Foto/like-vuoto.png";
    img.addEventListener('click' , AggiungiLike);
    for(let nome of nomi){
        if(nome.CF === CF && nome.ID === json.ID){
            img.src = "../Foto/like-pieno.png";
            img.removeEventListener('click' , AggiungiLike);
            img.addEventListener('click' , RimuoviLike);
        }
    }
    newdiv.appendChild(img);
    newdiv.appendChild(p);
    div.appendChild(title);
    div.appendChild(text);
    div.appendChild(newdiv);
    div.appendChild(Creatore);
    div.appendChild(Data);
    div.appendChild(Bottone);
    div.appendChild(textarea);
    div.appendChild(Commenta);
}
function OnResponse(response) {
    return response.json();
}
fetch("Home.php?em=Esegui&t=CaricaPost").then(OnResponse).then(OnJsonCaricaPost);
document.querySelector("#CreaPost").addEventListener('click' , VisualizzaCreazionePost);

//Carico dinamicamente i post
function OnJsonCaricaPost(json){
    console.log(json);
    let n = json.Risultati.length;
    if(json.Risultati.length > 10)
        n = 10;
    if(n === 0 ){
        let title = document.createElement('p');
        title.textContent = "Non ci sono post";
        title.classList.add('no-post');
        post.appendChild(title);
    }
    for(let i=0;i<n;i++){
        CaricaPost(json.CF , json.Risultati[i] , json.mipiace[i].conta , json.nomi);
    }
}
//Creo un post
function VisualizzaCreazionePost(event){
    event.currentTarget.classList.add('hidden');
    let ok = document.querySelector("#Carica");
    ok.classList.remove('hidden');
    ok.classList.add('Contenitore');
    event.currentTarget.removeEventListener('click' , VisualizzaCreazionePost);
    document.querySelector("#CaricaPost").addEventListener('click' , CreaPost);
}
function CreaPost(event){
    let input = document.querySelector("#Carica input");
    let textarea = document.querySelector("#Carica textarea");
    fetch("Home.php?em=Esegui&t=CreaPost&x=" + encodeURIComponent(String(input.value)) +"&y=" + encodeURIComponent(String(textarea.value))).then(OnResponse).then(OnJsonCreaPost);
    input.value = "";
    textarea.value = "";
    let ok = document.querySelector("#Carica");
    ok.classList.remove('Contenitore');
    ok.classList.add('hidden');
    let via = document.querySelector("#CreaPost");
    via.classList.remove('hidden');
    event.currentTarget.removeEventListener('click' , CreaPost);
    document.querySelector("#CreaPost").addEventListener('click' , VisualizzaCreazionePost);
}
function OnJsonCreaPost(json){
    if(json === 'errore'){
        alert("Errore del caricamente del post.")
    }
    else if(json === 'campi'){
        alert("Errore del caricamente del post, controlla di aver inserito tutti i campi.")
    }
    else{
        let nomi = [];
        CaricaPost(json.CF , json , 0 , nomi );
        let p;
        if( p = document.querySelector('.no-post') )
            p.remove();
    }
}

//Elimino il post
function Mostra_conferma(ID){
    const section= document.querySelector('section');
    const div = document.createElement('div');
    div.classList.add('visualizza');
    section.appendChild(div);
    const elimina = document.createElement('div');
    elimina.classList.add('Elimina');
    div.appendChild(elimina);
    const richiesta = document.createElement('strong');
    richiesta.textContent = "Sei sicuro di voler eliminare il post?";
    elimina.appendChild(richiesta);
    const scelta = document.createElement('div');
    scelta.classList.add('scelta');
    elimina.appendChild(scelta);
    const yes = document.createElement('button');
    yes.textContent = "Si";
    yes.addEventListener('click' , function(){EliminaPost(ID);});
    const no = document.createElement('button');
    no.textContent = "No";
    no.addEventListener('click' , NoEliminaPost);
    scelta.appendChild(yes);
    scelta.appendChild(no);
    document.body.classList.add('no-scroll');
}

function NoEliminaPost(event){
document.querySelector('.visualizza').remove();
document.body.classList.remove('no-scroll');
}

function EliminaPost(ID){
document.querySelector('.visualizza').remove();
document.body.classList.remove('no-scroll');
fetch("Home.php?em=Esegui&t=RimuoviPost&x=" + encodeURIComponent(String(ID))).then(OnResponse).then(OnJsonRimuoviPost);
}
function OnJsonRimuoviPost(json){
if(json === "errore"){
    alert("Errore durante la rimozione del post");
}
else{
    const divs = document.querySelectorAll(".Contenitore");
    for(let div of divs){
        if(div.dataset.name === json)
        div.remove();
    }
    if(divs.length === 1)
    {
        const post = document.querySelector("#post");
        let title = document.createElement('p');
        title.classList.add('no-post');
        title.textContent = "Non ci sono post.";
        post.appendChild(title);
    }
}
}

//Mostro i commenti
function mostraCommenti(event){
    let tasto = event.currentTarget;
    let padre = tasto.parentNode;
    let ID = padre.dataset.name;
    tasto.textContent = "Nascondi i commenti.";
    tasto.removeEventListener('click' , mostraCommenti);
    tasto.addEventListener('click' , nascondiCommenti);
    fetch("Home.php?em=Esegui&t=MostraCommenti&x=" + encodeURIComponent(String(ID))).then(OnResponse).then(OnJsonCommenti);
}
function OnJsonCommenti(json){
    let divs = document.querySelectorAll(".Contenitore");
    if(json.Risultato === '0'){
        for(let div of divs){
            if(div.dataset.name === json.ID){
            let commento = document.createElement('div');
            commento.classList.add('commenti');
            commento.dataset.name = "commento" + json.ID;
            div.appendChild(commento);
            let title = document.createElement('p');
            title.classList.add('no-commenti');
            title.textContent = "Non ci sono commenti";
            div.style.height = "60vh";
            commento.appendChild(title);
            return;
            }
        }
    }
    for(let div of divs){
        if(div.dataset.name === json.Risultati[0].Post_ID){
        let commento = document.createElement('div');
        commento.classList.add('commenti');
        commento.dataset.name = "commento" + json.Risultati[0].Post_ID;
        div.appendChild(commento);
        div.style.height = "60vh";
        for(let i=0; i<json.Risultati.length;i++){
            const comm = document.createElement('div');
            comm.classList.add('comment');
            comm.dataset.name = "commento" + json.Risultati[i].ID;
            commento.appendChild(comm);
            const Persona = document.createElement('strong');
            Persona.textContent = json.Risultati[i].Nome + " " + json.Risultati[i].Cognome;
            const text = document.createElement('p');
            text.textContent = json.Risultati[i].text;
            const data = document.createElement('em');
            let now = new Date();
            data.textContent= timeDiffCalc(Date.parse(json.Risultati[i].datacommento) , Date.parse(now));
            if(json.Risultati[i].CF === json.ID){
                const rimuovi = document.createElement('img');
                rimuovi.classList.add('Button_commento');
                rimuovi.src = "../Foto/x.png";
                rimuovi.addEventListener('click' , function(){RimuoviCommento(json.Risultati[i].ID);});
                comm.appendChild(rimuovi);
            }
            comm.appendChild(Persona);
            comm.appendChild(text);
            comm.appendChild(data);
        }
    }
    }
}

//Nascondo i commenti
function nascondiCommenti(event){
    let tasto = event.currentTarget;
    let padre = tasto.parentNode;
    let post = padre.getElementsByClassName("commenti")[0];
    if( post )
    {
    post.remove();
    }
    padre.style.height = "45vh";
    tasto.textContent = "Mostra i commenti.";
    tasto.removeEventListener('click' , nascondiCommenti);
    tasto.addEventListener('click' , mostraCommenti);
}

//Carico un commento
function InviaCommento(event){
    let tasto = event.currentTarget;
    let padre = tasto.parentNode;
    let ID = padre.dataset.name;
    let input = padre.querySelector(".area");
    fetch("Home.php?em=Esegui&t=CaricaCommento&x=" + encodeURIComponent(String(ID)) +"&y=" + encodeURIComponent(String(input.value))).then(OnResponse).then(OnJsonCaricaCommento);
    input.value = "";
}
function OnJsonCaricaCommento(json){
    if(json === 'errore'){
        alert("Errore del caricamente del post.")
    }
    else if(json === 'campi'){
        alert("Errore del caricamente del post, controlla di aver inserito tutti i campi.")
    }
    else{
    let divs = document.querySelectorAll(".Contenitore");
    for(let div of divs){
        let commento = div.getElementsByClassName("commenti")[0];
        if(div.dataset.name === json.Post_ID){
            if(commento){
                let p;
                if( p = commento.querySelector('.no-commenti') )
                    p.remove();
                const comment = document.createElement('div');
                comment.classList.add('comment');
                commento.appendChild(comment);
                comment.dataset.name = "commento" + json.ID;
                const Persona = document.createElement('strong');
                Persona.textContent = json.Nome + " " + json.Cognome;
                const text = document.createElement('p');
                text.textContent = json.text;
                const data = document.createElement('em');
                let now = new Date();
                data.textContent= timeDiffCalc(Date.parse(json.datacommento) , Date.parse(now));
                const rimuovi = document.createElement('img');
                rimuovi.classList.add('Button_commento');
                rimuovi.src = "../Foto/x.png";
                rimuovi.addEventListener('click' , function(){RimuoviCommento(json.ID);});
                comment.appendChild(rimuovi);
                comment.appendChild(Persona);
                comment.appendChild(text);
                comment.appendChild(data);
        }
        }
    }
    }
}

//Elimino il commento
function RimuoviCommento(ID){
    fetch("Home.php?em=Esegui&t=RimuoviCommento&x=" + encodeURIComponent(String(ID))).then(OnResponse).then(OnJsonRimuoviCommento);
}
function OnJsonRimuoviCommento(json){
if(json === "errore"){
    alert("Errore durante la rimozione del commento");
}
else{
    let commenti = document.querySelectorAll(".comment");
    for(let comm of commenti){
        let papa = comm.parentNode;
        if(comm.dataset.name === "commento" + json)
            comm.remove();
        let conta = papa.querySelectorAll(".comment");
        if(conta.length === 0)
        {
            let title = document.createElement('p');
            title.classList.add('no-commenti');
            title.textContent = "Non ci sono commenti";
            papa.appendChild(title);
        }
    }
}
}

//Aggiungo il mi piace
function AggiungiLike(event){
    let img = event.currentTarget;
    img.src = "../Foto/like-pieno.png";
    let papa = img.parentNode;
    let num = papa.querySelector('p');
    let numero = parseInt(num.textContent);
    num.textContent = numero + 1;
    let nonno = papa.parentNode;
    let ID = nonno.dataset.name;
    fetch('Home.php?em=Esegui&t=AggiungiLike&x='+ encodeURIComponent(String(ID))).then(OnResponse).then(OnJsonAggiungiLike);
    img.removeEventListener('click' , AggiungiLike);
    img.addEventListener('click' , RimuoviLike);
}
function OnJsonAggiungiLike(json){
    if(json === "errore"){
        alert("Non è stato possibile aggiungere il like riprova più tardi.");
    }
}

//Rimuovo il mi piace
function RimuoviLike(event){
    let img = event.currentTarget;
    img.src = "../Foto/like-vuoto.png";
    let papa = img.parentNode;
    let num = papa.querySelector('p');
    let numero = parseInt(num.textContent);
    num.textContent = numero - 1;
    let nonno = papa.parentNode;
    let ID = nonno.dataset.name;
    fetch('Home.php?em=Esegui&t=RimuoviLike&x='+ encodeURIComponent(String(ID))).then(OnResponse).then(OnJsonRimuoviLike);
    img.removeEventListener('click' , RimuoviLike);
    img.addEventListener('click' , AggiungiLike);
}
function OnJsonRimuoviLike(json){
    if(json === "errore"){
        alert("Non è stato possibile rimuovere il like riprova più tardi.");
    }
}