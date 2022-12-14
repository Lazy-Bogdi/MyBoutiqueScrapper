const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const { json } = require('express');
const myConsole = new console.Console(fs.createWriteStream('./output.json'));
const myConsoleProduct = new console.Console(fs.createWriteStream('./productDescriptionPage.json'));


/************************************FONCTIONS************************************/
function nextPageOnUrl() {
    let i = 0;
    let numPage = 1;
    urlTab = [];
    while(i<=7){
        
        const url = 'http://vps-a47222b1.vps.ovh.net:8484/product/page/' + numPage;
        urlTab[i] = url;
        numPage++;
        i++;
    }
    return urlTab;
}

function changeMyFile (){

fs.readFile('./output.json', 'utf8', (err, data) => {
    if (err) throw err;
  
    // replace the last character with a new string
    const newData = data.slice(0, -2) + ']';
  
    // write the updated data to the file
    fs.writeFile('./output.json', newData, 'utf8', (err) => {
      if (err) throw err;
    });
  });
}

 /*********************************************************/

//console.log(allLinks);


const main = async (url) => {
    const response = await fetch(url);
    const html = await response.text();

    //console.log(html);

    const $ = cheerio.load(html);
    //let tabs = [];
    //let tab = [];
    const articles = $('.d-grid').children().map(function (i, e) {

        let tab = {
            title : $(this).find('.card-title').text(),
            imgLink : $(this).find('img').attr('src'),
            imgClass : $(this).find('img').attr('class'),
            productPageUrl : 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'),
            //productPage  : ["description","price"],
            badgeContent : $(this).find('.badge').text()
        };

        
        const json = JSON.stringify(tab);
        //console.log(json)+ console.log(",");
        
        //console.log(tab.productPageUrl);
        //myConsole.log(tab);
        myConsole.log(json) + myConsole.log(",");
        
        //return tab;

    })
    //removeLastCharacter('./output.txt');
    //let articlesJson = JSON.stringify(articles);
    //console.dir(articlesJson, {'maxArrayLength': null, 'maxStringLength': null})
    //console.dir(articles, {'maxArrayLength': null})
    //console.log(articles.get())
    //myConsole.log(articles.get());
    
};

/********************************************************/

const notMain = async (url) => {
    
    const response = await fetch(url);
    const html = await response.text();

    console.log(html);

    const $ = cheerio.load(html);
    let tabs = [];
    let tab = [];
    const articles = $('.pb-3').each(function (i, e) {

        let tab = {
            description : $(this).find('.p-1').find('h3').text().trim().replace('\n', '')
        };

        
        const json = JSON.stringify(tab);
        console.log(json)+ console.log(",");
        
        console.log(tab.description);

        console.log("+");
        myConsole.log(tab);
        myConsoleProduct.log(json) + myConsoleProduct.log(",");
        
        return tab;

    })
    
};

/*******************************************************/
function getDataArray() {

    const dataArray = [];
  

    for (let i = 0; i < data.length; i++) {
        let currentString = '';
  
        
        currentString = currentString + data[i]['productPageUrl'];
        

        dataArray.push(currentString);
    }
  
    //Return the dataArray
    return dataArray;
  }

/************************************FIN FONCTIONS************************************/

let i = 0;
allLinks = nextPageOnUrl();

while(i<8) {
    //console.log(urlTab[i])
    let url = allLinks[i];
    main(url)
    //removeLastCharacter('./output.txt');

    i++;
}
myConsole.log("[");
setTimeout(changeMyFile, 1500);


// setTimeout(function () {
//     fs.readFile("./output.json", "utf8", (err, data) => {
//         if (err) {
//         console.error(err);
//         return;
//         }
    
//         let jsonData = JSON.parse(data)
//         //console.log(jsonData);
//         if (Array.isArray(jsonData)) {
//             jsonData.forEach(obj => {
//                 //console.log(obj.productPageUrl);
//             });
//         } else {
//             console.log("not an array");
//         }
//   })},2000);


  const data = require('./output.json');
  

let j=0;
//let urlP = '';
//console.log(j);
const dataArray = getDataArray(); 
//console.log(dataArray[2]);
while(j < dataArray.lenght ) {
    console.log(j);
    // console.log(dataArray[j]);
    j++
//notMain(url);
}