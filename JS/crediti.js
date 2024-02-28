

 function debug(){
   var mail = document.getElementById('mailUser').value;
   var options = document.getElementById('favhero').value;
 
   console.log(mail, options)
}

  

function unique(){
    //conta quante carte unici abbiamo in totale
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

function buyCoins(){
    //funzione che gestisce l'acquisto delle monete
    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });

    var isCreditCard = utentiRegistrati[index].cc


    document.getElementById("coins5").onclick = ( ()=>{
        if(!isCreditCard){

            var modal = document.getElementById('myModal');
            
            modal.classList.add('show');
            modal.style.display = 'block';
        }else{
            utentiRegistrati[index].crediti +=5
            utentiRegistrati[index].spesatotale += 5
    
                
            localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
            alert("5 coins comprati!")
            window.location="crediti.html";


        }
       
    })
    document.getElementById("coins10").onclick = ( ()=>{
        if(!isCreditCard){

            var modal = document.getElementById('myModal');
            
            modal.classList.add('show');
            modal.style.display = 'block';
        }else{
            utentiRegistrati[index].crediti += 10
            utentiRegistrati[index].spesatotale += 10
    
                
            localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
            alert("10 coins comprati!")
            window.location="crediti.html";


        }
       

    })
    document.getElementById("coins20").onclick = ( ()=>{


        console.log(isCreditCard)
        if(!isCreditCard){

            var modal = document.getElementById('myModal');
            
            modal.classList.add('show');
            modal.style.display = 'block';
        }else{
            
            utentiRegistrati[index].crediti += 2000
            utentiRegistrati[index].spesatotale += 2000
    
            localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
            alert("2000 coins comprati!")
            window.location="crediti.html";


        }

        
        // window.location="crediti.html";
    })
  
}
  
  


function cartacredito(e){
    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
    utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

    let index = utentiRegistrati.findIndex(element => {
        if (element.nomeUtente === utenteLoggato) {
            return true
        }
    });

    //metto la carta di credito 

    utentiRegistrati[index].cc = true 
    localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));

    window.location="crediti.html";


}