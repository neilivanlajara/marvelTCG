function viewTrades(){
    
    let utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    let scambiUtente = JSON.parse(localStorage.getItem('scambiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });

    scambiUtente.map(e =>{
        if(!e.status ){
            viewPendingTrades(e)
        }else{
            viewFinisheedTrades(e)
        }
    })
}; 
function viewPendingTrades(e){
    var card = document.getElementById('schedaTransazioni');

                 
    var clone = card.cloneNode(true);
    clone.getElementsByClassName('user1')[0].textContent =   e.user1

    clone.getElementsByClassName('card-title')[0].innerHTML =   e.card1.name
    clone.getElementsByClassName('card-title')[1].innerHTML =   e.card2.name
    clone.getElementsByClassName('card-img-top')[0].src =e.card1.thumbnail.path +"."+ e.card1.thumbnail.extension;
    clone.getElementsByClassName('card-img-top')[1].src =e.card2.thumbnail.path +"."+ e.card2.thumbnail.extension;

    // if (estratto.description  && estratto.description.length >70){
    //     clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
    // }else{
    //     clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

    // }
    
    clone.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  e.card1.id 
    clone.getElementsByClassName('btn btn-primary')[1].href = "\personaggio.html" + "?id=" +  e.card2.id 
    clone.getElementsByClassName('btn btn-primary')[2].value = e.idscambio

    // clone.getElementsByClassName('card-quant')[0].innerHTML = "possiedi " + checkDoppione(estratto.id) + " coppie"
    // clone.getElementsByClassName('btn btn-primary')[1].href = "\scambia.html" + "?id=" +  estratto.id 
    
    
    
    card.after(clone);
    clone.classList.remove('d-none');

};
function viewFinisheedTrades(e){
    var card = document.getElementById('schedaTransazioniTerminate');

                 
    var clone = card.cloneNode(true);
    clone.getElementsByClassName('user1')[0].textContent =   e.user2 +" riceve"

    clone.getElementsByClassName('card-title')[0].innerHTML =   e.card1.name
    clone.getElementsByClassName('card-title')[1].innerHTML =   e.card2.name
    clone.getElementsByClassName('card-img-top')[0].src =e.card1.thumbnail.path +"."+ e.card1.thumbnail.extension;
    clone.getElementsByClassName('card-img-top')[1].src =e.card2.thumbnail.path +"."+ e.card2.thumbnail.extension;

    // if (estratto.description  && estratto.description.length >70){
    //     clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
    // }else{
    //     clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

    // }
    
    clone.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  e.card1.id 
    clone.getElementsByClassName('btn btn-primary')[1].href = "\personaggio.html" + "?id=" +  e.card2.id 
    // clone.getElementsByClassName('btn btn-primary')[2].value = e.user2
    clone.getElementsByClassName('user2')[0].innerHTML =  e.user1 + " riceve"

    // clone.getElementsByClassName('card-quant')[0].innerHTML = "possiedi " + checkDoppione(estratto.id) + " coppie"
    // clone.getElementsByClassName('btn btn-primary')[1].href = "\scambia.html" + "?id=" +  estratto.id 
    
    
    
    card.after(clone);
    clone.classList.remove('d-none');

};

function handleTrade(idscambio){
    // console.log(idscambio)


    let utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    let scambiUtente = JSON.parse(localStorage.getItem('scambiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });


    //condizioni scambio:
    //1) user1 non dev'essere user2
    //2) user2 deve avere la carta che card2 nella collezione 
    //3) card2 per user2 deve essere una carte doppia 
    scambiUtente.map(els=>{
        console.log(els.idscambio==idscambio)
        if(els.idscambio == idscambio){
            
            //questo è uguale ad indexof -> -1 se non esiste altrimenti esiste!!!
           let check =  utentiRegistrati[index].figurine.findIndex(x=>{
                if(x.id==els.card2.id){
                    return true 
                }

            })  
            // console.log(check)

            if(els.user1 === utentiRegistrati[index].nomeUtente){ // condizione 1 
                alert("non puoi scambiarti da solo le carte")
            }else if( check==-1){                //condizione 2
                alert("non possiedi la carta nella collezione")
            }else{


                //andiamo a trovare l'indice del nostro idscambio nell'array degli scambi
                //proprio come si fa in utenteRegistrati e utenteCollegato

                let index = scambiUtente.findIndex(element => {
                    if (element.idscambio === idscambio) {
                        return true
                    }
                });
                
                if(cartaDoppia(scambiUtente[index].card2.id)>1){

                    alert("scambio in corso!")
                    replaceCard(scambiUtente[index])
                    scambiUtente[index].status = true 
                    scambiUtente[index].user2 = utenteLoggato
                    localStorage.setItem('scambiUtente', JSON.stringify(scambiUtente));
                    window.location="marketplace.html";
                }else{
                    alert("non puoi scambiare carte non doppie ")
                }


            }       
        }
    })


}

function replaceCard(idscambio){
    //faccio lo scambio faccendo un push della carta1 e uno splice della carta2
   
    
    console.log(idscambio)
    console.log( "in replaceCard()")
    let utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))

    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === idscambio.user1) {
            return true
        }
    });
    let index2 = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    })
    // utentiRegistrati[index].figurine.map(e=>{
    //     console.log(e.id)
    // })
    // console.log(utentiRegistrati[index])
    utentiRegistrati[index].figurine.map( e=>{
        console.log(e)
    })
    console.log("dopo")

    let togliere = utentiRegistrati[index].figurine.findIndex(element =>{
        if(element.id== idscambio.card1.id) {
            return true 
        }
    })
    utentiRegistrati[index].figurine.splice(togliere,1)
    utentiRegistrati[index].figurine.push(idscambio.card2)

    let togliere2 = utentiRegistrati[index2].figurine.findIndex(element =>{
        if(element.id== idscambio.card2.id) {
            return true 
        }
    })
    utentiRegistrati[index2].figurine.splice(togliere2,1)
    utentiRegistrati[index2].figurine.push(idscambio.card1)

   

    // utentiRegistrati[index2].figurine.map( u => u.id !== idscambio.card2.id ? u : idscambio.card1)
    console.log(idscambio.card2.id)
    utentiRegistrati[index2].figurine.map( e=>{
        console.log(e.name)
    })
    localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));

    alert("scambio finito")

    let scambiUtente = JSON.parse(localStorage.getItem('scambiUtente')) || [];
    
    let indexScambio = scambiUtente.findIndex(element => {
        if (element.idscambio === idscambio) {
            return true
        }
    });

    // //modifico lo scambio 
    // scambiUtente[indexScambio].status = true 
    // scambiUtente[indexScambio].user2 = utenteLoggato
    // localStorage.setItem('scambiUtente', JSON.stringify(scambiUtente));
    // localStorage.setItem('scambiUtente', JSON.stringify(scambiUtente));



}   


function cartaDoppia(id){
    let count = 0
    let utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });


    //vado a vedere se l'utente loggato può scambiare la carte se lo ha doppio 

    utentiRegistrati[index].figurine.map(e =>{
            if(e.id==id){
                count++
            }
        }
    )
     return count 
}