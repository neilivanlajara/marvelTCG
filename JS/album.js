let l = 0 
let perPage = 10 

let r = 10

function prev(){
    if(l != 0){
        l = l- 10
        r = r-10
    }
    showList (l,r)
    document.getElementById('currpage').placeholder= "ok"
}
function next(){
    l = l +10
    r = r + 10
    showList (l,r)

}

function remove(){
  var doc = document.getElementById("schedaCoins");
  while(doc.childNodes[0]){
      
      doc.removeChild(doc.childNodes[0]);
  }

}

function inputManuale(value){
    let page = value * 10 
    showList(page-10, page )
}

function showList (left, right){
  
  remove()
  var doc = document.getElementById('schedaCoins')
  
  fetch('../JS/eroi.json')
  .then(response => response.json())
  .then(data =>{
    
    data.slice(left,right).map( (e,i)=>{
           
              document.getElementById('currpage').placeholder= " " + ((right/10) ) +  " /" +  Math.ceil(data.length / perPage)
              const buttonLink = document.createElement('a');
              buttonLink.id ="schedaCoins"
              buttonLink.textContent = "#"+ (i+1+left) + " " + e.name;
              buttonLink.href= "\personaggio.html" + "?id=" +  e.id 
              doc.appendChild(buttonLink)
      }
  
      )


     })
        
                
  //   for (let index = 0; index < 4; index++) {
  //     const buttonLink = document.createElement('a');
  //     buttonLink.className = 'btn btn-primary';
  //     buttonLink.textContent = 'Scheda personaggio';
  //     buttonLink.href= "ciaoo"
  //     doc.appendChild(buttonLink)
  // }

             
 }

// function lista(){
//      fetch('../JS/eroi.json')
//      .then(response => response.json())
//      .then(data =>{
        
//         console.log(data)
//         var charactersList = document.getElementById("characters-list")
//         let count = 0 
//         data.sort(function(a, b) {
//             var nameA = a.name.toUpperCase();
//             var nameB = b.name.toUpperCase();
//             if (nameA < nameB) {
//               return -1;
//             }
//             if (nameA > nameB) {
//               return 1;
//             }
//             return 0;
//           });
//         data.map(e =>{
            
//             var row = document.createElement('tr');

//             var idCell = document.createElement('td');
//             idCell.textContent = e.id;
//             row.appendChild(idCell);
          
//             var nameCell = document.createElement('td');
//             nameCell.textContent = e.name;
//             row.appendChild(nameCell);
          
//             charactersList.appendChild(row);
//             count++
//         })
//         console.log(count)
//      }).catch(erro =>{console.log(erro)})

//  }



//  var charactersPerPage = 20;
//  var currentPage = 1;
//  var totalPages = 0;
//  var charactersData = [];
 
//  function displayCharacters() {
//    var startIndex = (currentPage - 1) * charactersPerPage;
//    var endIndex = startIndex + charactersPerPage;
//    var charactersToDisplay = charactersData.slice(startIndex, endIndex);
 
//    var charactersList = document.getElementById('characters-list');
//    charactersList.innerHTML = '';
 
//    charactersToDisplay.forEach(function(character) {
//      var row = document.createElement('tr');
 
//      var idCell = document.createElement('td');
//      idCell.textContent = character.id;
//      row.appendChild(idCell);
 
//      var nameCell = document.createElement('td');
//      nameCell.textContent = character.name;
//      row.appendChild(nameCell);
 
//      charactersList.appendChild(row);
//    });
//  }
 
//  function goToPage(page) {
//    if (page < 1 || page > totalPages) {
//      return;
//    }
 
//    currentPage = page;
//    displayCharacters();
//  }
 
//  function generatePagination() {
//    var paginationContainer = document.getElementById('pagination');
//    paginationContainer.innerHTML = '';
 
//    for (var i = 1; i <= totalPages; i++) {
//      var button = document.createElement('button');
//      button.textContent = i;
//      button.addEventListener('click', function() {
//        goToPage(parseInt(this.textContent));
//      });
 
//      paginationContainer.appendChild(button);
//    }
//  }
 
//  function fetchData() {
//     fetch('../JS/eroi.json')
//      .then(response => response.json())

//      .then(function(data) {
//        charactersData = data;
//        totalPages = Math.ceil(charactersData.length / charactersPerPage);
//        displayCharacters();
//      })
//      .catch(function(error) {
//        console.log('Si è verificato un errore:', error);
//      });
//  }
 
//  fetchData();
 

 