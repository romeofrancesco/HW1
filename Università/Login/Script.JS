function checkPw(event) {
    const input = event.currentTarget;
    if (formStatus[input.name] = input.value.length >= 8) {
        input.classList.remove('error');
        input.parentNode.querySelector('span').textContent = "";
    } else {
        input.classList.add('error');
        input.parentNode.querySelector('span').textContent = "La password contiene meno di 8 caratteri.";
        input.parentNode.querySelector('span').classList.add('error');
    }
    checkForm();
}
function checkForm() {
    Object.keys(formStatus).length !== 1 || 
    Object.values(formStatus).includes(false);
}

const formStatus = {'upload': true};
document.getElementsByName('PW')[0].addEventListener('blur', checkPw);