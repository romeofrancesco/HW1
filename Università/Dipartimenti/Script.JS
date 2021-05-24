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
let conta = 0;
const Pulsante = "../Foto/+1.png";
const PulsanteCliccato = "../Foto/+2.png";
function onResponse(promise){
  return promise.json();
}

fetch("Richieste_Dipartimenti.php?q=Esegui&t=Dipartimenti").then(onResponse).then(OnJsonDipartimenti);


//Caricamento dinamicamente tutti i contenuti
function OnJsonDipartimenti(json){
  let Contenitore = document.querySelector("#Contenitore");
  for(let i=0;i<json.length;i++){
        let div = document.createElement('div');
        div.classList.add('Items');
        div.dataset.name = json[i].Nome;
        Contenitore.appendChild(div);
        const newDiv = document.createElement('div');
        newDiv.classList.add('Intestazione');
        div.appendChild(newDiv);
        const newTitle = document.createElement('strong');
        newTitle.textContent = json[i].Nome;
        const newPreferito = document.createElement('img');
        newPreferito.classList.add('Preferito');
        newPreferito.classList.add('Pointer');
        newPreferito.src = Pulsante;
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newPreferito);
        newPreferito.addEventListener('click' , AggiungiAiPreferiti);
        newImg = document.createElement('img');
        newImg.src = json[i].img_src;
        div.appendChild(newImg);
        const newScopri = document.createElement('button');
        newScopri.classList.add('Scopri');
        newScopri.classList.add('Pointer');
        newScopri.textContent = "Clicca per saperne di più"
        div.appendChild(newScopri);
        newScopri.addEventListener('click' , TestOn);
    }
}
//Fine caricamento dinamico di tutti i contenuti

//Inizio tasto ricerca
function cerca() {
    const input = document.querySelector("#Barra-ricerca");
    const filter = input.value.toUpperCase();
    const table = document.querySelector("#Contenitore");
    const items = table.querySelectorAll(".Items");
  
    for (let i = 0; i < items.length; i++) 
    {
      let titolo  = items[i].querySelector("strong");
      if (titolo) {
      let  txtValue = titolo.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          items[i].style.display = "";
        } 
        else {
          items[i].style.display = "none";
        }

      }

    }

  }
//Fine tasto ricerca

//Inizio scopri di più
function TestOn(event){
    const item = event.currentTarget;
    item.textContent = "Clicca per saperne di meno";
    const container = item.parentNode;
    const Name = container.dataset.name;
    item.removeEventListener('click' , TestOn);
    item.addEventListener('click' , TestOff);
    fetch("Richieste_Dipartimenti.php?q=Esegui&t=Descrizione&x=" +  encodeURIComponent(String(Name))).then(onResponse).then(OnJsonMostraPiu);
}
function OnJsonMostraPiu(json){
  let div=document.querySelectorAll('.Items');
  for(let divs of div)
  {
      if(divs.dataset.name===json[0].Nome)
      {
          const newDesc=document.createElement('p');
          newDesc.textContent=json[0].Descrizione;
          divs.appendChild(newDesc);
      }
  }
}

function TestOff(event){
    const item = event.currentTarget;
    item.textContent = "Clicca per saperne di più";
    const container = item.parentNode;
    let Descrizione  = container.querySelector('p');
    Descrizione.remove();

    item.addEventListener('click' , TestOn);
    item.removeEventListener('click' , TestOff);

}
//Fine scopri di più

//Inizio aggiungi ai preferiti
function AggiungiAiPreferiti(event){
  const item = event.currentTarget;
  item.classList.add('Impossible');
  item.classList.remove('Pointer');
  item.src = PulsanteCliccato;

  if(conta === 0){
    let Salvati = document.querySelector("#SalvatiPerDopo");
    Salvati.classList.remove('Hidden')
  }  

    const container = item.parentNode;
    const BigContainer = container.parentNode;
    const Name = BigContainer.dataset.name;
    conta++;
    item.removeEventListener('click' , AggiungiAiPreferiti);
    fetch("Richieste_Dipartimenti.php?q=Esegui&t=Descrizione&x=" +  encodeURIComponent(String(Name))).then(onResponse).then(OnJsonPreferiti);
}

function OnJsonPreferiti(json){
    const newDiv = document.createElement('div');
    newDiv.classList.add('ElementoSalvato')
    const newTitle = document.createElement('p');
    const newImg = document.createElement('img');
    newTitle.textContent = json[0].Nome;
    newImg.src = json[0].img_src;
    const newButton = document.createElement('button');
    newButton.textContent = "Rimuovi";
    newButton.classList.add('Pointer');
    newButton.addEventListener('click' , RimuoviDaiPreferiti);
    let Salvato = document.querySelector("#Box");
    Salvato.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newButton);
}

function RimuoviDaiPreferiti(event){
  const item = event.currentTarget;
  const container = item.parentNode;

  const title = container.querySelector('p').textContent;
  const section = document.querySelectorAll('.Items');

    for(let s of section)
      {
        let Titolo = s.querySelector('strong').textContent;
        if(Titolo === title){
            const button = s.querySelector('.Preferito');
            button.src = Pulsante;
            button.classList.remove('Impossible');
            button.classList.add('Pointer');
            button.addEventListener('click' , AggiungiAiPreferiti);
        }

       }

  container.remove();

  conta--;
  if(conta === 0){
    const Salvati = document.querySelector("#SalvatiPerDopo");
    Salvati.classList.add('Hidden');
  }

}
//Fine aggiungi ai preferiti
