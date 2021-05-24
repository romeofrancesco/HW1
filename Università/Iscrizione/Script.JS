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
function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

function checkNome(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.name] = input.value.length > 0) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "Inserisci il nome.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}

function checkCognome(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.name] = input.value.length > 0) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "Inserisci il cognome.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}

function checkCF(event) {
    const input = event.currentTarget;
    if(formStatus[input.name] = input.value.length < 16 ) {
        input.parentNode.parentNode.querySelector('span').textContent = "Il codice fiscale deve contenere 16 caratteri.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
        input.classList.add('error');
        formStatus.CF = false;
        checkForm();
    } else {
        fetch("check_CF.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckCF);
    }    
}

function jsonCheckCF(json) {
    if (formStatus.CF = !json.exists) {
        document.getElementsByName('CF')[0].classList.remove('error');
        document.getElementsByName('CF')[0].parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        document.getElementsByName('CF')[0].parentNode.parentNode.querySelector('span').textContent = "Codice fiscale già in utilizzo.";
        document.getElementsByName('CF')[0].parentNode.parentNode.querySelector('span').classList.add('error');
        document.getElementsByName('CF')[0].classList.add('error');
    }
    checkForm();
}


function checkData(event) {
    const input = event.currentTarget;
    const data = new Date(input.value);
    const Oggi = new Date();
    let Anni = ( Oggi.getFullYear() - data.getFullYear() );

    if (Oggi.getMonth() < data.getMonth() || Oggi.getMonth() === data.getMonth() && Oggi.getDate() < data.getDate()) 
    {
        Anni--;
    }

    if (Anni > 17) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "Età minore di quella consentita.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}

function checkCitta(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.name] = input.value.length > 0) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "Inserisci la città.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}

function checkEmail(event) {
    const input = event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase())) {
        input.parentNode.parentNode.querySelector('span').textContent = "Email non valida";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
        input.classList.add('error');
        formStatus.email = false;
        checkForm();
    } else {
        fetch("check_email.php?q="+encodeURIComponent(String(input.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
    }
}
function jsonCheckEmail(json) {
    if (formStatus.email = !json.exists) {
        document.getElementsByName('email')[0].classList.remove('error');
        document.getElementsByName('email')[0].parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        document.getElementsByName('email')[0].parentNode.parentNode.querySelector('span').textContent = "Email già in utilizzo";
        document.getElementsByName('email')[0].parentNode.parentNode.querySelector('span').classList.add('error');
        document.getElementsByName('email')[0].classList.add('error');
    }
    checkForm();
}

function checkPw(event) {
    const input = event.currentTarget;
    if (formStatus[input.name] = input.value.length >= 8) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "La passowrd contiene meno di 8 caratteri.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}

function checkConfPw(event) {
    const input = event.currentTarget;
    if (formStatus[input.name] = input.value === document.getElementsByName('pw')[0].value) {
        input.classList.remove('error');
        input.parentNode.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.parentNode.querySelector('span').textContent = "La password non corrisponde con quella inserita in precedenza.";
        input.parentNode.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}
function checkCDL(event){
        const input = event.currentTarget;
        if (formStatus[input.name] = input.value !== 00) {
            input.classList.remove('error');
            input.parentNode.parentNode.querySelector('span').textContent = "";
        } else {
            input.classList.add('error');
            input.parentNode.parentNode.querySelector('span').textContent = "Devi selezionare un corso di laurea.";
            input.parentNode.parentNode.querySelector('span').classList.add('error');
        }
        checkForm();
    }

function checkForm() {
    Object.keys(formStatus).length !== 9 || 
    Object.values(formStatus).includes(false);
}

const formStatus = {'upload': true};
document.getElementsByName('nome')[0].addEventListener('blur', checkNome);
document.getElementsByName('cognome')[0].addEventListener('blur', checkCognome);
document.getElementsByName('CF')[0].addEventListener('blur', checkCF);
document.getElementsByName('data')[0].addEventListener('blur', checkData);
document.getElementsByName('citta')[0].addEventListener('blur', checkCitta);
document.getElementsByName('email')[0].addEventListener('blur', checkEmail);
document.getElementsByName('pw')[0].addEventListener('blur', checkPw);
document.getElementsByName('confpw')[0].addEventListener('blur', checkConfPw);
document.getElementById('CDL').addEventListener('blur', checkCDL);
