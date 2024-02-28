function controllaForm(e) {
    
    var email1 = document.getElementById("InputEmail1");
    var email2 = document.getElementById("InputEmail2");
    var password1 = document.getElementById("InputPassword1");
    var password2 = document.getElementById("InputPassword2");
    var nome = document.getElementById("InputNome");
    var cognome = document.getElementById("InputCognome");
    var codice_fiscale = document.getElementById("InputCF");
    // var indirizzo = document.getElementById("InputIndirizzo").value

    var genere = document.getElementById("InputGenere");

    email1.classList.remove('border-danger');
    email2.classList.remove('border-danger');
    password1.classList.remove('border-danger');
    password2.classList.remove('border-danger');
    nome.classList.remove('border-danger');
    cognome.classList.remove('border-danger');
    genere.classList.remove('border-danger');
    var flag = true;
    var errori = "";
    if (controllaLunghezza(email1, 6)) {

        errori += "Email troppo corta";
        flag = false
    }
    if (email1.value != email2.value) {
        email1.classList.add('border-danger')
        email2.classList.add('border-danger')
        errori += "Email non corrispondenti";
        flag = false;
    }

    if (password1.value != password2.value) {
        password1.classList.add('border-danger')
        password2.classList.add('border-danger')
        errori += "<br>Password non corrispondenti";
        flag = false;
    }

    if (password1.value.length < 8) {

        errori += "<br>Password troppo corta";
        flag = false;
    }

    if (controllaLunghezza(nome, 3)) {

        errori += "<br> Nome troppo corto";
        flag = false;
    }

    if (controllaLunghezza(cognome, 5)) {

        errori += "<br> Cognome troppo corto";
        flag = false;
    }

    if (genere.value == "-1") {
        genere.classList.add('border-danger')
        errori += "<br> Seleziona il genere!";
        flag = false;
    }

    console.log(errori);

    if (!flag) {
        var alertBS = document.getElementById('alert');
        alertBS.innerHTML = errori;
        alertBS.classList.remove("d-none");
        //equivalente
        // document.getElementById('alert').innerHTML = errori;
        // document.getElementById('alert').classList.remove("d-none");
        e.preventDefault();

    }

    // alert(email1 + "\n" + email2 + "\n" + password1 + "\n" + password2
    // + "\n" + nome + "\n" + cognome + "\n" + codice_fiscale + "\n" + "\n" + genere);

    return flag;

}

function controllaLunghezza(elemento, lunghezza) {
    if (elemento.value.length >= lunghezza) {
        elemento.classList.remove('border-danger');
        return true
    }

    elemento.classList.add('border-danger');
    return false

    //equivalente
    //return elemento.value.length >= lunghezza


}

function controllaLunghezzaMassima(elemento, lunghezza) {
    if (elemento.value.length <= lunghezza) {
        elemento.classList.remove('border-danger');
        return true
    }
    elemento.classList.add('border-danger');
    return false

    //equivalente
    //return elemento.value.length >= lunghezza
}
function cancelletto(elemento) {
    if (elemento.value.includes("#")) {
        elemento.value = elemento.value.replace("#","");
        elemento.classList.add('border-warning');
        return false
    }
    return true
   
}
function controllaUguaglianza(elemento1,elemento2) {
    if (elemento1.value == elemento2.value) {
        elemento2.classList.remove('border-danger');
        return true
    }
    elemento2.classList.add('border-danger');
    return false

    //equivalente
    //return elemento1.value == elemento2.value
}