let l = 0 
let perPage = 5

let r = 5

function prev(){
    if(l != 0){
        l = l- 5
        r = r-5
    }
    showList (l,r)
}
function next(){
    l = l +5
    r = r + 5
    showList (l,r)

}

function inputManuale(value){
    let page = value * 5
    l = page - 5
    r = page

    showList(page-5, page )
}
function showList (left, right){
  
    remove()

    
    utenteLoggato = JSON.parse(localStorage.getItem('UtenteLoggato'))
   utentiRegistrati = JSON.parse(localStorage.getItem('datiUtente')) || [];

   let index = utentiRegistrati.findIndex(element => {
       if (element.nomeUtente === utenteLoggato) {
           return true
       }
   });

    data =  albumClean(utentiRegistrati[index].figurine)
      


      data.slice(left,right).map( (e,i)=>{
             
                document.getElementById('currpage').placeholder= " " + ((right/5) ) +  " /" +  Math.ceil(data.length / perPage)
                cards(e)
        }
    
        )
  
  
       
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

        let total = utentiRegistrati[index].figurine.length
        
        let conta = utentiRegistrati[index].figurine.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
        return conta
    }
    return []

}
  

//
      
function remove(){
    var doc = document.getElementById("film");
    while(doc.childNodes[1]){
        
        doc.removeChild(doc.childNodes[0]);
    }

}
function cerca(){
// getMultiSearch(value)
input = document.getElementById("input").value
// alert(document.getElementById("input").value)
getMultiSearch(input)
}

function cards(estratto) {
    creaCard()



            var card = document.getElementById('card-film');

                 
            var clone = card.cloneNode(true);
            clone.id = 'badge-' + estratto.id;

            clone.getElementsByClassName('card-title')[0].innerHTML =   estratto.name
            if (estratto.description  && estratto.description.length >70){
                clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description.substring(0, 70) + " ..."
            }else{
                clone.getElementsByClassName('card-text')[0].innerHTML =   estratto.description

            }
            
            clone.getElementsByClassName('btn btn-primary')[0].href = "\personaggio.html" + "?id=" +  estratto.id 
            clone.getElementsByClassName('card-quant')[0].innerHTML = "possiedi " + checkDoppione(estratto.id) + " coppie"
            
            clone.getElementsByClassName('btn btn-primary')[1].href = "\scambia.html" + "?id=" +  estratto.id 
            if(checkDoppione(estratto.id)===1){
                clone.getElementsByClassName('btn btn-primary')[1].remove('d-none')

            }
            
            
            
            
            clone.getElementsByClassName('card-img-top')[0].src =estratto.thumbnail.path +"."+ estratto.thumbnail.extension;
            card.after(clone);
            clone.classList.remove('d-none');

}

function creaCard(){
//visto che ogni volta devo andare a rimuvore i childs per non sdoppiare le ricerce
//questa funziona è uguale a come avere il div nascosto da clonare in html però ogni volta viene creato 
//dinamicamente perché altrimenti verrebe rimosso 
const div = document.createElement('div');
div.id = 'card-film';
div.style.width = '300px';
div.style.height = '650px';



div.className = 'd-none';

const innerDiv = document.createElement('div');
innerDiv.className = 'card';

const img = document.createElement('img');
img.className = 'card-img-top';
img.alt = '...';
img.style.width = 'auto'; 


const cardBodyDiv = document.createElement('div');
cardBodyDiv.className = 'card-body';

const cardTitle = document.createElement('h5');
cardTitle.className = 'card-title';
cardTitle.textContent = 'Card title';


const buttonLink = document.createElement('a');
buttonLink.className = 'btn btn-primary';
buttonLink.textContent = 'scheda personaggio';

const buttonScambia = document.createElement('a');
buttonScambia.className = 'btn btn-primary';
buttonScambia.textContent = 'Scambia';
buttonScambia.style.backgroundColor = 'green'; 


const quantity = document.createElement('h6');
quantity.className = 'card-quant';
quantity.textContent = 'card-quant';

const cardText = document.createElement('p');
cardText.className = 'card-text';
cardText.textContent = "Some quick example text to build on the card title and make up the bulk of the card's content.";

// Costruzione della struttura gerarchica degli elementi
cardBodyDiv.appendChild(cardTitle);
cardBodyDiv.appendChild(cardText);
cardBodyDiv.appendChild(buttonLink);
cardBodyDiv.appendChild(quantity);
cardBodyDiv.appendChild(buttonScambia);



innerDiv.appendChild(img);
innerDiv.appendChild(cardBodyDiv);
div.appendChild(innerDiv);

// Aggiunta dell'elemento al documento HTML
const container = document.getElementById('film'); // Sostituisci 'container' con l'id del tuo elemento genitore
container.appendChild(div);

}

// return un album senza doppioni 
function albumClean(data){
    return data.filter((jsonData, index, self) =>
        index === self.findIndex((t) => (t.id === jsonData.id )))
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

