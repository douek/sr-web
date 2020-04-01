export default {
    fetchCardsFromLocalFile(){
        const json =  require('../data.json');
        return json;
    },
    updateLocalStorage(cardList){
        const fs = require('fs');
        fs.writeFile('../data.json',JSON.stringify(cardList), err => { 
     
            // Checking for errors 
            if (err) throw err;  
           
            console.log("Done writing"); // Success 
        }); 
    }
};