
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
    
   

    // nav
    document.getElementById('profilonav').textContent  = utentiRegistrati[index].nomeUtente
    document.getElementById('crediti').textContent  = utentiRegistrati[index].crediti + " crediti"
    document.getElementById('carte').textContent  = unique().length+ "/ 1562 carte"

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
  
function logout() {
    
if (confirm("Sei sicuro di voler effettuare il Logout?") == true) {
localStorage.removeItem("UtenteLoggato");
window.location="login.html";
}
}
