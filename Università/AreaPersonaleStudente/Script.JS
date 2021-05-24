function OnResponse(response) {
    return response.json();
}
//Carico dati anagrafici
fetch("DatiPersonali.php").then(OnResponse).then(OnJsonDati);

function OnJsonDati(json) {
    const all = document.querySelector('#ALL');

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

    const itemM = document.createElement('div');
    itemM.classList.add('item');
    div.appendChild(itemM);
    const titleM = document.createElement('strong');
    titleM.textContent = "Matricola: "
    const campoM = document.createElement('p');
    campoM.textContent = json.Matricola;
    itemM.appendChild(titleM);
    itemM.appendChild(campoM);

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
    campo4.textContent = json.Citta_di_nascita;
    item4.appendChild(title4);
    item4.appendChild(campo4);

    const item5 = document.createElement('div');
    item5.classList.add('item');
    div.appendChild(item5);
    const title5 = document.createElement('strong');
    title5.textContent = "Data: "
    const campo5 = document.createElement('p');
    campo5.textContent = json.Data_di_nascita;
    item5.appendChild(title5);
    item5.appendChild(campo5);

    const item6 = document.createElement('div');
    item6.classList.add('item');
    div.appendChild(item4);
    const title6 = document.createElement('strong');
    title6.textContent = "Email: "
    const campo6 = document.createElement('p');
    campo6.textContent = json.Email;
    item6.appendChild(title6);
    item6.appendChild(campo6);

    const item7 = document.createElement('div');
    item7.classList.add('item');
    div.appendChild(item7);
    const title7 = document.createElement('strong');
    title7.textContent = "Studente: "
    const campo7 = document.createElement('p');
    campo7.textContent = json.Tipo;
    item7.appendChild(title7);
    item7.appendChild(campo7);
}
//Carico tutte le materie del corso di laurea

fetch('Materie.php').then(OnResponse).then(OnJsonMaterie);

function OnJsonMaterie(json){
    const all = document.querySelector('#ALL');
    const div = document.createElement('div');
    div.classList.add('Contenitore');
    all.appendChild(div);
    const TITLE = document.createElement('h1');
    TITLE.textContent = json[0][2].toUpperCase();
    div.appendChild(TITLE);

    const item1 = document.createElement('div');
    item1.classList.add('item');
    div.appendChild(item1);
    const title1 = document.createElement('strong');
    title1.textContent = "Corso di laurea: "
    const campo1 = document.createElement('p');
    campo1.textContent = json[0][1];
    item1.appendChild(title1);
    item1.appendChild(campo1);


    for(let i=0; i<json.length;i++){
    let item = document.createElement('div');
    item.classList.add('item');
    div.appendChild(item);
    let title = document.createElement('strong');
    title.textContent = "Materia: "
    let campo = document.createElement('p');
    campo.textContent = json[i][0];
    item.appendChild(title);
    item.appendChild(campo);
    }

}

//Carico esito esami
fetch('Voti.php').then(OnResponse).then(OnJsonEsami);

function OnJsonEsami(json){
    const all = document.querySelector('#ALL');
    const div = document.createElement('div');
    div.classList.add('Contenitore1');
    all.appendChild(div);
    const TITLE = document.createElement('h1');
    TITLE.textContent = "RIEPILOGO ESAMI: ";
    div.appendChild(TITLE);

    if(json.length === 0){
        let title = document.createElement('strong');
        title.textContent = "Non hai ancora nessun esame registrato."
        div.appendChild(title);
        return;
    }

    for(let i=0; i<json.length;i++){
    let item = document.createElement('div');
    item.classList.add('item');
    div.appendChild(item);
    let title = document.createElement('strong');
    title.textContent = "Materia: "
    let campo = document.createElement('p');
    campo.textContent = json[i][0] + " " + json[i][1];
    item.appendChild(title);
    item.appendChild(campo);
    if(json[i][2] === "SI"){
        campo.textContent = json[i][0] + " " + json[i][1] + "L";
    } 
    }
}

