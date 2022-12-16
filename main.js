const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./jsonDatasOutput/output.json'));
const myConsoleProduct = new console.Console(fs.createWriteStream('./jsonDatasOutput/productDescriptionPage.json'));


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

function changeMyFile (urlJsonFile){

fs.readFile(urlJsonFile, 'utf8', (err, data) => {
    if (err) throw err;
  
    // replace the last character with a new string
    const newData = data.slice(0, -2) + ']';
  
    // write the updated data to the file
    fs.writeFile(urlJsonFile, newData, 'utf8', (err) => {
      if (err) throw err;
    });
  });
}

 /*********************************************************/




const main = async (url) => {
    const response = await fetch(url);
    const html = await response.text();

    //console.log(html);

    const $ = cheerio.load(html);
    //let tabs = [];
    //let tab = [];
    $('.d-grid').children().map(function (i, e) {

        let tab = {
            title : $(this).find('.card-title').text(),
            imgLink : $(this).find('img').attr('src'),
            imgClass : $(this).find('img').attr('class'),
            productPageUrl : 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'),
            idUrl : $(this).find('a').attr('href').replace(/-|\/product\//g, ''),
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

    //console.log(html);

    const $ = cheerio.load(html);
    $('.pb-3').each(function (i, e) {

        let tab = {
            urLone : url,
            idUrl : url.replace(/http:\/\/vps-a47222b1\.vps\.ovh\.net:8484|-|\/product\//g, ''),
            price : $(this).find('.p-1').find('h3').text().trim().replace('\n', '').replace(' ', ''),
            description : $(this).find('.p-1').find('p').text()
        };

        
        const json = JSON.stringify(tab);
        //console.log(json)+ console.log(",");
        
        //console.log(tab.description);

        //console.log("+");
        //myConsole.log(tab);
        myConsoleProduct.log(json) + myConsoleProduct.log(",");
        
        return tab;

    })
    
};

/*******************************************************/
const outputJson = async () => {
    let i = 0;
    let allLinks = await nextPageOnUrl();
    myConsole.log("[");
  
    while(i < 8) {
      let url = allLinks[i];
      await main(url);
  
      i++;
    }  
    

    changeMyFile("./jsonDatasOutput/output.json");

     }



/*******************************************************/

    const outputOnlyProduct = async () => {
        const data =  require('./jsonDatasOutput/output.json');
      
        const getDataArray = () => {
          const dataArray = [];
      
          for (let i = 0; i < data.length; i++) {
            let currentString = '';
      
            currentString = currentString + data[i]['productPageUrl'];
      
            dataArray.push(currentString);
          }
      
          return dataArray;
        }
      
        let j = 0;
        let urlP = '';
        const dataArray = getDataArray(); 
      
        myConsoleProduct.log('[');
        while (j < dataArray.length) {
          urlP = dataArray[j];
          j++;
          await notMain(urlP);
        }
        changeMyFile('./jsonDatasOutput/productDescriptionPage.json');
      }

/************************************FIN FONCTIONS************************************/



  outputJson(); 

 setTimeout(outputOnlyProduct,2000);

