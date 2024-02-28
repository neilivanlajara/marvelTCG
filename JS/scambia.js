// function trade(){
//     utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
//     utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

//     let index = utentiRegistrati.findIndex(element => {
//         if (element.nomeUtente === utenteLoggato) {
//             return true
//         }
//     });
//     console.log(datiUtente)

//     let dropdown = document.getElementById('favhero');
//     dropdown.length = 0;
//     let defaultOption = document.createElement('option');
//     defaultOption.text= 'eroe preferito?'
//     dropdown.add(defaultOption);
//     dropdown.selectedIndex = 0;
    
   
//       fetch('../JS/eroi.json')
//       .then(response => response.json())
//       .then(data =>{
//         for (let i = 0; i < data.length; i++) {
//             option = document.createElement('option');
//               option.text = data[i].name
//               option.value = data[i].name;
//               dropdown.add(option);
//           } 
          
//    }).catch(erro =>{console.log(erro)})
// }

function init(){

    var query = window.location.search;
    const initId = new URLSearchParams(query).get('id');
    if(initId!=null){
        openTrade++
    }
    finalizeTrade1(initId)
    let element = document.getElementById("scambio1");
    element.value = initId;

}
let tradeCard1=  ""
let tradeCard2= ""
let openTrade = -1

function trade1(){
    //ciclo su figurine, pusho quelli che sono doppi e li filtro su unique per visualzzare
    //solo una figurina ogni volta, altrimenti visualizza n volte le carte 

    let dropdown = document.getElementById('scambio1');
    let distinct = []
    
    
    
    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    
    
    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });



    utentiRegistrati[index].figurine.map(e=>{

        if(checkDoppione(e.id)>=2){

            distinct.push(e)
            
            }

        })  
        
        distinct = distinct.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
        console.log(distinct)
        
        distinct.map( e=>{ 
            option = document.createElement('option');
            option.text = e.name
            option.value = e.id;
            dropdown.add(option);
          
        })
          
}
function trade2(){
  

    let dropdown = document.getElementById('scambio2');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text= 'carta che cerco'
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
   
      fetch('../JS/eroi.json')
      .then(response => response.json())
      .then(data =>{
        for (let i = 0; i < data.length; i++) {


                option = document.createElement('option');
                  option.text = data[i].name
                  option.value = data[i].id;
                  dropdown.add(option);
            
          } 
          
   }).catch(erro =>{console.log(erro)})
}
function finalizeTrade1(e){
    trade1ID = e
    console.log("quello che passo", e)
    fetch('../JS/eroi.json')
      .then(response => response.json())
      .then(data =>{

            data.map( q=>{
                // console.log(q.id==e)// va bene lo stesso dai :( 
                if(q.id==e){
                    showCard1(q)
                    tradeCard1 = q
                }
            })
            
         }).catch(erro =>{console.log(erro)})

    openTrade++
    if(openTrade==2){
        document.getElementById('schedaBottoneScambia').classList.remove('d-none')
    }
    
}
function finalizeTrade2(e){
    trade12D = e
    console.log("quello che passo", e)
    fetch('../JS/eroi.json')
      .then(response => response.json())
      .then(data =>{

            data.map( q=>{
                // console.log(q.id==e)// va bene lo stesso dai :( 
                if(q.id==e){
                    tradeCard2 = q
                    console.log(tradeCard2)
                    showCard2(q)
                }
            })
            
         }).catch(erro =>{console.log(erro)})


         console.log(e)

         if(e!=null){

             openTrade++
         }
         if(openTrade==2){
             document.getElementById('schedaBottoneScambia').classList.remove('d-none')
         }
    
}

function showCard1(estratto){
        var card = document.getElementById('card-film');              

        card.getElementsByClassName('card-title')[0].innerHTML =   estratto.name
        if (estratto.description  && estratto.description.length >70){

            card.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
        }else{
            card.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

        }
        
        card.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  estratto.id 
        card.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  estratto.id 
        
        card.getElementsByClassName('card-text')[1].innerHTML = "possiedi " + checkDoppione(estratto.id) + " coppia/e"
        
        
        card.getElementsByClassName('card-img-top')[0].src =estratto.thumbnail.path +"."+ estratto.thumbnail.extension;
        card.classList.remove('d-none');
}
function showCard2(estratto){
    
    var card = document.getElementById('card-film-2');              

    card.getElementsByClassName('card-title')[0].innerHTML =   estratto.name
    if (estratto.description  && estratto.description.length >70){

        card.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
    }else{
        card.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

    }
    
    card.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  estratto.id 
    
    card.getElementsByClassName('card-text')[1].innerHTML = "possiedi " + checkDoppione(estratto.id) + " coppia/e"
    
    
    card.getElementsByClassName('card-img-top')[0].src =estratto.thumbnail.path +"."+ estratto.thumbnail.extension;
    card.classList.remove('d-none');
    

}

function checkDoppione(id){
    
    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
   
    let count = 0 
    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });

    utentiRegistrati[index].figurine.findIndex(element =>{
        if(element.id === id){
            count = count +1 
        }
    })

    return count 
}

function handleTrade(){
    //le mie info 
    
    let utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    let utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
    let scambiUtente = JSON.parse(localStorage.getItem('scambiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });

    ///////////////////INFO UTENTE /////////////////////////
    //     nomeUtente: document.getElementById('userName').value,      
    //     pw: document.getElementById('passwordUser').value, 
    //     email: document.getElementById('mailUser').value,
    //     preferenze: options,
    //     figurine: figurine, 
    //     sbustate: sbustate,
    //     spesatotale: spesatotale,
    //     crediti: crediti
    ////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    // IDEA: (mittente, messagioInviato, messaggioRicevuto, destinatario, status)
    // 
    // SCAMBIO: (utenteChePropone, cartaChePropone, cartaCheVuole, utenteCheAccetta, status )
    //
    // scambio: (idScambio, user1, card1, card2, user2, status)
    ///////////////////////////////////////////////////////
    utentiRegistrati[index].nomeUtente
    
    var card1 = ""
     fetch('../JS/eroi.json')
    .then(response => response.json())
    .then(data =>{

          data.map( q=>{
              // console.log(q.id==e)// va bene lo stesso dai :( 
              if(q.id==document.getElementById("scambio1")){
                    card1=q
              }
          })
          
       }).catch(erro =>{console.log(erro)})
    
    var card2 =""
     fetch('../JS/eroi.json')
    .then(response => response.json())
    .then(data =>{

            data.map( q=>{
                // console.log(q.id==e)// va bene lo stesso dai :( 
                if(q.id==document.getElementById("scambio2")){
                    card2= q
                }
            })
            
        }).catch(erro =>{console.log(erro)})
   

    var scambio = {
        idscambio : utentiRegistrati[index].nomeUtente +""+tradeCard1.id+ tradeCard2.id,
        user1 : utentiRegistrati[index].nomeUtente,
        user2 : null,
        card1 : tradeCard1 ,
        card2 : tradeCard2,
        status : false

    };

    
    scambiUtente.push(scambio)
    localStorage.setItem('scambiUtente', JSON.stringify(scambiUtente));

    window.location="marketplace.html";

    
    alert("scambio registrato! "+ scambio.user1 + " propone "+ tradeCard1.name+ " in cambio di "+ tradeCard2.name + " ") 
}


