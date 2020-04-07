export default {
    fetchCardsFromLocalFile(){
        const json =  require('../data.json');
        return json;
    },
    updateLocalStorage(data){
        const fs = require('fs');
        fs.writeFile('../data.json',JSON.stringify(data), err => { 
     
            // Checking for errors 
            if (err) throw err;  
           
            console.log("Done writing"); // Success 
        }); 
    }
};