

function alreadyLogin(){
    UtenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato')) || [];

    return UtenteLoggato.length
}


function check(e) {
    if(alreadyLogin()!=0){
            UtenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato')) || [];

            // alert("Nome utente o Password non corretti")
            document.getElementById('alert').classList.remove('d-none')
            document.getElementsByClassName('errore')[0].textContent = UtenteLoggato+ " è già loggato "
            
            if (confirm("Fai logout di "+ UtenteLoggato+ " ?" ) == true) {
                localStorage.removeItem("UtenteLoggato");}
            e.preventDefault()
        
    }else{

        utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
       
        var userName = document.getElementById('userName').value;  
        var userPw = document.getElementById('passwordUser').value; 
        let trovato = false;
        
        for (i = 0; i < utentiRegistrati.length; i++) {        
            if(userName == utentiRegistrati[i].nomeUtente && userPw == utentiRegistrati[i].pw) {
                localStorage.setItem('UtenteLoggato', JSON.stringify(utentiRegistrati[i].nomeUtente))
                trovato = true;          
            } 
        }
    
        
        
        if (trovato == false) {
            alert(trovato)
            // alert("Nome utente o Password non corretti")
            document.getElementById('alert').classList.remove('d-none')
            document.getElementsByClassName('errore')[0].textContent = "Pass / username sbagliato"
            e.preventDefault()
    
        }
    }

}

function showPassword() {
    var x = document.getElementById("passwordUser");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

