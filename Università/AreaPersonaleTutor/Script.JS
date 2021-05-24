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
}

//Materie che insegna

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
    materia.textContent = json[i][0];
    let cdl = document.createElement('p');
    cdl.textContent = json[i][1];
    items.appendChild(titolo1);
    items.appendChild(materia);
    items.appendChild(titolo2);
    items.appendChild(cdl);
    }

    //FINE MATERIE INSEGNATE
}