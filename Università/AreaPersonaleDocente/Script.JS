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
function OnResponse(response) {
    return response.json();
}

//Carico la pagina
fetch("DatiPersonali.php").then(OnResponse).then(OnJsonDati);

function OnJsonDati(json) {
    const all = document.querySelector('#ALL');

//INIZIO PARTE ANAGRAFICA
    const div = document.createElement('div');
    div.classList.add('Contenitore');
    all.appendChild(div);
    const TITLE = document.createElement('h1');
    TITLE.textContent = "DATI PERSONALI";
    div.appendChild(TITLE);

    const item1 = document.createElement('div');
    item1.classList.add('item');
    div.appendChild(item1);
    const title1 = document.createElement('strong');
    title1.textContent = "Nome: "
    const campo1 = document.createElement('p');
    campo1.textContent = json.Nome;
    item1.appendChild(title1);
    item1.appendChild(campo1);

    const item2 = document.createElement('div');
    item2.classList.add('item');
    div.appendChild(item2);
    const title2 = document.createElement('strong');
    title2.textContent = "Cognome: "
    const campo2 = document.createElement('p');
    campo2.textContent = json.Cognome;
    item2.appendChild(title2);
    item2.appendChild(campo2);

    const item3 = document.createElement('div');
    item3.classList.add('item');
    div.appendChild(item3);
    const title3 = document.createElement('strong');
    title3.textContent = "CF: "
    const campo3 = document.createElement('p');
    campo3.textContent = json.CF;
    item3.appendChild(title3);
    item3.appendChild(campo3);

    const item4 = document.createElement('div');
    item4.classList.add('item');
    div.appendChild(item4);
    const title4 = document.createElement('strong');
    title4.textContent = "Città: "
    const campo4 = document.createElement('p');
    campo4.textContent = json.Città;
    item4.appendChild(title4);
    item4.appendChild(campo4);

    const item5 = document.createElement('div');
    item5.classList.add('item');
    div.appendChild(item5);
    const title5 = document.createElement('strong');
    title5.textContent = "Data di nascita: "
    const campo5 = document.createElement('p');
    campo5.textContent = json.Data;
    item5.appendChild(title5);
    item5.appendChild(campo5);

    const item6 = document.createElement('div');
    item6.classList.add('item');
    div.appendChild(item6);
    const title6 = document.createElement('strong');
    title6.textContent = "Email: "
    const campo6 = document.createElement('p');
    campo6.textContent = json.email;
    item6.appendChild(title6);
    item6.appendChild(campo6);

    const item7 = document.createElement('div');
    item7.classList.add('item');
    div.appendChild(item7);
    const title7 = document.createElement('strong');
    title7.textContent = "Numero di materie insegnate: "
    const campo7 = document.createElement('p');
    campo7.textContent = json.n_materie;
    item7.appendChild(title7);
    item7.appendChild(campo7);
//FINE PARTE ANAGRAFICA
}

//Carico le materie che insegna
fetch("Materie.php").then(OnResponse).then(OnJsonMaterie);

function OnJsonMaterie(json){
    const all = document.querySelector('#ALL');
    //INIZIO MATERIE INSEGNATE
    const div4 = document.createElement('div');
    div4.classList.add('Contenitore1');
    all.appendChild(div4);
    const TITOLO = document.createElement('h1');
    TITOLO.textContent = "MATERIE";
    div4.appendChild(TITOLO);
    

    for(let i=0; i<json.length; i++){
    let items = document.createElement('div');
    items.classList.add('itemMaterie');
    div4.appendChild(items);
    let titolo1 = document.createElement('strong');
    titolo1.textContent = "Nome: "
    let materia = document.createElement('p');
    let titolo2 = document.createElement('strong');
    titolo2.textContent = "CDL: "
    materia.textContent = json[i][0] + "(Codice:" + json[i][2] + ")";
    let cdl = document.createElement('p');
    cdl.textContent = json[i][1];
    items.appendChild(titolo1);
    items.appendChild(materia);
    items.appendChild(titolo2);
    items.appendChild(cdl);
    }

    //FINE MATERIE INSEGNATE
}

//Carica un voto

//Carico dinamicamente il blocco per aggiungere il voto
const all = document.querySelector('#ALL');
const div = document.createElement('div');
div.classList.add('Contenitore');
all.appendChild(div);
const Titolo = document.createElement('h1');
Titolo.textContent = "CARICA VOTO";
div.appendChild(Titolo);
const div1 = document.createElement('div');
div1.classList.add('item');
div.appendChild(div1);
const testo1 = document.createElement('p');
testo1.textContent = "Matricola: ";
div1.appendChild(testo1);
const input1 = document.createElement('input');
input1.type = "text";
input1.setAttribute("name" , "Studente");
div1.appendChild(input1);

const div2 = document.createElement('div');
div2.classList.add('item');
div.appendChild(div2);
const testo2 = document.createElement('p');
testo2.textContent = "Data: ";
div2.appendChild(testo2);
const input2 = document.createElement('input');
input2.type = "date";
input2.setAttribute("name" , "Data_Esame");
div2.appendChild(input2);

const div3 = document.createElement('div');
div3.classList.add('item');
div.appendChild(div3);
const testo3 = document.createElement('p');
testo3.textContent = "Voto: ";
div3.appendChild(testo3);
const input3 = document.createElement('input');
input3.type = "number";
input3.setAttribute("name" , "Voto");
div3.appendChild(input3);

const div4 = document.createElement('div');
div4.classList.add('item');
div.appendChild(div4);
const testo4 = document.createElement('p');
testo4.textContent = "Lode: ";
div4.appendChild(testo4);
const input4 = document.createElement('input');
input4.type = "text";
input4.setAttribute("name" , "Lode");
div4.appendChild(input4);

const div5 = document.createElement('div');
div5.classList.add('item');
div.appendChild(div5);
const testo5 = document.createElement('p');
testo5.textContent = "Codice materia: ";
div5.appendChild(testo5);
const input5 = document.createElement('input');
input5.type = "text";
input5.setAttribute("name" , "Materia");
div5.appendChild(input5);

const div6 = document.createElement('div');
div6.classList.add('Invio');
div.appendChild(div6);
const invio = document.createElement('button');
invio.textContent = "Carica voto";
invio.classList.add('Invio_button')
div6.appendChild(invio);
const testo6 = document.createElement('p');
testo6.classList.add('hidden');
testo6.textContent = "";
div.appendChild(testo6);
invio.addEventListener("click" , CaricaVoto);

function CaricaVoto(event){
    let Studente = document.getElementsByName('Studente')[0];
    let Data_Esame = document.getElementsByName('Data_Esame')[0];
    let Voto =document.getElementsByName('Voto')[0];
    let Lode = document.getElementsByName('Lode')[0];
    let Materia =document.getElementsByName('Materia')[0];

    fetch("CaricaVoto.php?em=Esegui&x=" + encodeURIComponent(String(Studente.value)) + "&y=" + encodeURIComponent(String(Data_Esame.value)) + "&z="  +encodeURIComponent(String(Voto.value)) + "&a="  + encodeURIComponent(String(Lode.value.toUpperCase())) + "&b=" +encodeURIComponent(String(Materia.value))).then(OnResponse).then(OnJsonCaricaVoto);
}

function OnJsonCaricaVoto(json){
    let bottone = document.querySelectorAll('.Invio_button')[0];
    let nonno = bottone.parentNode.parentNode;
    let errore = nonno.childNodes[7];
    errore.classList.remove('hidden');
    errore.classList.remove('ok');
    errore.classList.remove('error');
    if(json === "Voto caricato con successo."){
        errore.classList.add('ok');
        errore.textContent = json;
    }
    else if(json === "Ricontrolla il codice materia."){
        errore.classList.add('error');
        errore.textContent = json;
    }  
    else if(json === "Controlla di aver inserito tutti i campi."){
        errore.classList.add('error');
        errore.textContent = json;
    }  
    else if(json === "Controlla che il campo lode sia inserito correttamente."){
        errore.classList.add('error');
        errore.textContent = json;
    }  
    else if(json === "Controlla che il campo voto sia inserito correttamente."){
        errore.classList.add('error');
        errore.textContent = json;
    }    
    else {
        errore.classList.add('error');
        errore.textContent = json;
    }  
}
