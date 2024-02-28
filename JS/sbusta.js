


function buyCards(){
    
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

    document.getElementById("coins5").onclick = ( ()=>{
        if(utentiRegistrati[index].crediti >=5){

            utentiRegistrati[index].crediti -= 5
            utentiRegistrati[index].spesatotale += 5
        utentiRegistrati[index].sbustate += 1

    
            localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
            alert("5 cards comprati!")
            document.getElementById("sbusta").classList.add('d-none');
    
            document.getElementById("mostra").classList.remove('d-none');
            sbusta(5)
        }else{
            alert("non hai abbastanza crediti")
        }


    })
    document.getElementById("coins10").onclick = ( ()=>{
        if(utentiRegistrati[index].crediti >=10){

        utentiRegistrati[index].crediti -= 10
        utentiRegistrati[index].spesatotale += 10
        utentiRegistrati[index].sbustate += 1


        localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
        alert("10 cards comprati!")
        document.getElementById("sbusta").classList.add('d-none');

        document.getElementById("mostra").classList.remove('d-none');
        sbusta(10)
        }else{
            alert("non hai abbastanza crediti")

        }

    })
    document.getElementById("coins20").onclick = ( ()=>{
        if(utentiRegistrati[index].crediti >=50){

        utentiRegistrati[index].crediti -= 50
        utentiRegistrati[index].spesatotale += 50
        utentiRegistrati[index].sbustate += 1


        localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));
        alert("50 cards comprati!")
        document.getElementById("sbusta").classList.add('d-none');

        document.getElementById("mostra").classList.remove('d-none');
        sbusta(50)
        }else{
            alert("non hai abbastanza crediti")
            
        }
    })
  
}
function sbusta(n){
    
    
    
    
    // location.reload();
    
    
    fetch('../JS/eroi.json')
    .then(response => response.json())
    .then(data =>{
    
       document.getElementById("sbustamento").innerText="Ecco le tue nuove " + n + " carte"
       utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
       utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];
   
       let index = utentiRegistrati.findIndex(element => {
           if (element.nomeUtente === utenteLoggato) {
               return true
           }
       });
       
       for (let q = 0; q < n; q++) {

                //fase dove metto le carte dentro il profilo
                let estratto = data[getRandomInt(0,1562)]

                // let estratto = data[getRandomInt(0,1562)]
                //prova per fare i primi dieci 
                // let e
                stratto = data[q]
                utentiRegistrati[index].figurine.push(estratto)
                localStorage.setItem('datiUtente', JSON.stringify(utentiRegistrati));

                //fase di rendering


                var card = document.getElementById('card-film');
                console.log(estratto)


                     
                var clone = card.cloneNode(true);
                clone.id = 'badge-' + q;

                clone.getElementsByClassName('card-title')[0].innerHTML =   estratto.name
                if (estratto.description  && estratto.description.length >70){

                    clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
                }else{
                    clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

                }
                
                clone.getElementsByClassName('btn-primary')[0].href = "\personaggio.html" + "?id=" +  estratto.id 
                
                clone.getElementsByClassName('card-text')[1].innerHTML =    " possiedi " + checkDoppione(estratto.id) + " coppia/e"
                
                
                clone.getElementsByClassName('card-img-top')[0].src =estratto.thumbnail.path +"."+ estratto.thumbnail.extension;
                card.after(clone);
                clone.classList.remove('d-none');
                document.getElementById('loading').classList.add('d-none')

                showInfo()
            }
        alert("ti rimangono "+ utentiRegistrati[index].crediti+  " crediti" );

       
}).catch(erro =>{console.log(erro)})
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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





