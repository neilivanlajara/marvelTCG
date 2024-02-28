function loadImg(e){
    console.log(e)
    console.log(document.getElementById('favhero').value)
    
    console.log(document.getElementById('favhero').value.split('&')[0])
    console.log("più")
    console.log(document.getElementById('favhero').value.split('&')[1])

    document.getElementById('img').src=document.getElementById('favhero').value.split('&')[1]
    document.getElementById('img').classList.remove('d-none')

}


function controllaForm(e){ 
    console.log(document.getElementById('password1').value)
    console.log(document.getElementById('password2').value)
    alert("ciao"+document.getElementById('emailUtente').value )
    var mail = document.getElementById('emailUtente').value
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // var check = !mail.match(mailformat)
    // console.log(check)
    alerts =""
    
    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

   utentiRegistrati.map(element => {
        if (element.nomeUtente == document.getElementById('nomeUtente').value) {
            trovato = true 
            alerts+= "utente esistente; \n"
        }
        if (element.email == document.getElementById('emailUtente').value) {
          trovato = true 
          alerts+= "mail esistente; \n"
      }
    });


    if((document.getElementById('password1').value!= document.getElementById('password2').value)){
        alerts+= "password non uguali; \n"
       
    }   
    
    // if(trovato){
    //   alerts+= "utente esistente; \n"

    // }
    
    if(!mail.match(mailformat)){
        alerts+="formato mail non valida;  \n"
    }

    if(alerts.length !=0){
        document.getElementById('alert').classList.remove('d-none')
        document.getElementsByClassName('errore')[0].textContent =alerts
        e.preventDefault()

    }else{
        alert("faccio lo storage")
        store()

    }
    
}



function store(e) {

    let trovato = false;
    let figurine = []; 

    let crediti = 0;
    let sbustate = 0;
    let spesatotale = 0;
    let cc = false //carte di credito 
    var options = document.getElementById('favhero').value.split('&')[0];
    
    console.log(options);
    
    let datiUtente = JSON.parse(localStorage.getItem('datiUtente')) || [];
    var utenti = {
        nomeUtente: document.getElementById('nomeUtente').value,      
        pw: document.getElementById('password1').value,
        email: document.getElementById('emailUtente').value,
        preferenze: options,
        figurine: figurine, 
        sbustate: sbustate,
        spesatotale: spesatotale,
        cc: cc,
        crediti: crediti
    };



    for (let i = 0; i < datiUtente.length; i++) {
        if (utenti.nomeUtente == datiUtente[i].nomeUtente) {
            trovato = true
            break
        }
    }

  
        console.log(utenti)
        datiUtente.push(utenti);
        console.log(datiUtente)
        localStorage.setItem('datiUtente', JSON.stringify(datiUtente));
        alert('Il tuo account è stato creato', utenti);
        window.location="login.html";
    
}

function showPassword() {
    var x = document.getElementById("passwordUser");
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
}

function favhero(){
  

    let dropdown = document.getElementById('favhero');
    
    
   
      fetch('../JS/eroi.json')
      .then(response => response.json())
      .then(data =>{
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].name)
            option = document.createElement('option');
              option.text = data[i].name
              option.value = data[i].name+ '&'+data[i].thumbnail.path +"."+ data[i].thumbnail.extension;;
              dropdown.add(option);
          } 
          
   }).catch(erro =>{console.log(erro)})
}


function showPassword() {
    var x = document.getElementById("password1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    var x = document.getElementById("password2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

