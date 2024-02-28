function favhero(){
  utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

  //scorro su tutti gli utenti
  let index = JSON.parse(localStorage.getItem('datiUtente')).findIndex(element => {
      if (element.nomeUtente === JSON.parse(localStorage.getItem('UtenteLoggato'))) {

          return true
      }
  });

  //assegno all utente corrente
  let utenteCollegato = utentiRegistrati[index]
  // console.log(utenteCollegato)
    let dropdown = document.getElementById('favhero');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text= utenteCollegato.preferenze
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;


      fetch('../JS/eroi.json')
      .then(response => response.json())
      .then(data =>{
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
              option.text = data[i].name
              option.value = data[i].name;
              dropdown.add(option);
          }

   }).catch(erro =>{console.log(erro)})
}

function showInfo(){

    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let trovato = false;
    let nomeUtenteModify = true;

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });


    console.log("ciao", utentiRegistrati[index])

    // body
    document.getElementById('userName').value = utentiRegistrati[index].nomeUtente
    document.getElementById('mailUser').value = utentiRegistrati[index].email
    document.getElementById('favhero').value  = utentiRegistrati[index].preferenze

    // nav
    document.getElementById('profilonav').textContent  = utentiRegistrati[index].nomeUtente
    document.getElementById('crediti').textContent  = utentiRegistrati[index].crediti + " crediti"

    //stats
    // document.getElementById('sbustate').textContent  = "Bustine aperte: "+ utentiRegistrati[index].sbustate

    // <h3 id="sbustate">Stats</h3>

    // <h3 id="spesatotale">Stats</h3>
    // <h3 id="numerofigurine">Stats</h3>
    // <h3 id="doppioni">Stats</h3>
    // <h3 id="carte uniche">Stats</h3>
    // nav
    document.getElementById('profilonav').textContent  = utentiRegistrati[index].nomeUtente
    document.getElementById('crediti').textContent  = utentiRegistrati[index].crediti + " crediti"
    document.getElementById('carte').textContent  = unique().length+ "/ 1562 carte"

}

function eliminaAccount() {

  utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'));
  tuttiUtenti = JSON.parse(localStorage.getItem('datiUtente')) || [];
  console.log(tuttiUtenti)

  let index = tuttiUtenti.findIndex(element => {
      if (element.email === utenteLoggato) {
          return true
      }
  });

  if (confirm("Sei sicuro di voler eliminare il tuo account?") == true) {
      localStorage.removeItem("UtenteLoggato");
      tuttiUtenti.splice(index, 1);
      localStorage.setItem('datiUtente', JSON.stringify(tuttiUtenti));
      window.location="registrazione.html";
  } else {
      window.location="profilo.html";
  }
}
function eliminaCC() {


  utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'));
  tuttiUtenti = JSON.parse(localStorage.getItem('datiUtente')) || [];
  console.log(tuttiUtenti)

  let index = tuttiUtenti.findIndex(element => {
      if (element.nomeUtente === utenteLoggato) {
          return true
      }
  });

  console.log(tuttiUtenti[index].cc)

  if(!tuttiUtenti[index].cc){
    console.log("non ci sono carte collegate")
    alert("non ci sono carte collegate")
  }else{
    console.log("elimino!")
    alert("elimino la carta collegata")

    tuttiUtenti[index].cc = false 

    localStorage.setItem('datiUtente', JSON.stringify(tuttiUtenti));

  }

}


function unique(){
  utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
  utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
  
  
  let index = utentiRegistrati.findIndex(element => {
      if (element.nomeUtente === utenteLoggato) {
          return true
      }
  });
  if(utentiRegistrati[index].figurine.length>0){

      let conta = utentiRegistrati[index].figurine.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      return conta
  }
  return []

}

function changeInfo(){
  //setto l'utente collegato
  utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'));
  utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

  let index = utentiRegistrati.findIndex(element => {
      if (element.nomeUtente === utenteLoggato) {
          return true
      }
  });

  var options = document.getElementById('favhero').value;
  var mail = document.getElementById('mailUser').value;
  //controllo formato
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  if (!document.getElementById('mailUser').value.match(mailformat)){
      alert("formato mail non valida")
  }else{
    console.log(options)
    utentiRegistrati[index].email = mail
    utentiRegistrati[index].preferenze = options

    localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
    window.location="profilo.html";

    alert("modificato!!")
  }
}

function logout() {

  if (confirm("Sei sicuro di voler effettuare il Logout?") == true) {
      localStorage.removeItem("UtenteLoggato");
      window.location="login.html";
  } else {
      window.location="profilo.html";
  }
}


function changePW(){
  //setto l'utente collegato
  utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'));
  utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

  let index = utentiRegistrati.findIndex(element => {
      if (element.nomeUtente === utenteLoggato) {
          return true
      }
  });

  var pw1= document.getElementById('passwordUser1').value;
  var pw2= document.getElementById('passwordUser2').value;
  var pw3 = document.getElementById('passwordUser3').value;
  //controllo formato
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;


  //caso1 passworld attuale sbagliata
  if(pw1 != utentiRegistrati[index].pw){
    alert("passwordcorrente sbagliata")
  }else if (pw2!=pw3){
    alert("le due password nuove non corrispondono")
  }else if(pw2==pw1){
    alert("ma hai messo lo stesso password!! non lo accetto!")
  }else{
    utentiRegistrati[index].pw = pw2
    localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
    alert("password modificata!")
    window.location="profilo.html";

  }
}
function debug(){
  var mail = document.getElementById('mailUser').value;
  var options = document.getElementById('favhero').value;

  console.log(mail, options)
}

function showPassword() {
  var x = document.getElementById("passwordUser1");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  var x = document.getElementById("passwordUser2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  var x = document.getElementById("passwordUser3");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

