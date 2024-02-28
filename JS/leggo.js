const fs = require('fs');




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function sbusta(){
    let jsonData =[]
    fs.readFile('eroi1.json', 'utf8', (err, data) => {
        if (err) {
        console.error('Si è verificato un errore durante la lettura del file:', err);
        return;
        }


        // Qui hai accesso ai dati del file JSON come stringa
        let jsonData = JSON.parse(data); // Converte la stringa in un oggetto JavaScript
        console.log(jsonData.length)
                
        var clean = jsonData.filter((jsonData, index, self) =>
        index === self.findIndex((t) => (t.id === jsonData.id )))

        console.log(clean.length)
                // jsonData.forEach(element => {
        //     console.log(element)
        // });
        // let t = jsonData.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
        // console.log(t)
        // for (let index = 0; index < 10; index++) {
        //     let i = getRandomInt(0,498)
        //     console.log(jsonData[i].name)
        // }
        var q = JSON.stringify(clean)
        fs.writeFile('eroi1.json', q, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('File JSON creato correttamente!');
          });
    });
  
}

sbusta()