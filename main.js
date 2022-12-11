const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./output.txt'));


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


//console.log(allLinks);
const main = async (url) => {
    const response = await fetch(url);
    const html = await response.text();

    //console.log(html);

    const $ = cheerio.load(html);
    //let tabs = [];
    //let tab = [];
    const articles = $('.d-grid').children().map(function (i, e) {

        // const title = $(this).find('.card-title').text();
        // const imgLink = $(this).find('img').attr('src');
        // const imgClass = $(this).find('img').attr('class');
        // const productPageUrl = 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'); 
        // const badgeContent = $(this).find('.badge').text();

        // tabs.push({
        //     title,
        //     productPageUrl,
        //     imgLink,
        //     imgClass,
        //     badgeContent
        // });
        let tab = {
            title : $(this).find('.card-title').text(),
            imgLink : $(this).find('img').attr('src'),
            imgClass : $(this).find('img').attr('class'),
            productPageUrl : 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'),
            productPage  : ["description","price"],
            badgeContent : $(this).find('.badge').text()
        };

        
        const json = JSON.stringify(tab)
        console.log(json)+ console.log(",");
        
        //console.log(tab);
        //myConsole.log(tab);
        myConsole.log(json) + myConsole.log(",");
        
        //return tab;

    })
    //let articlesJson = JSON.stringify(articles);
    //console.dir(articlesJson, {'maxArrayLength': null, 'maxStringLength': null})
    //console.dir(articles, {'maxArrayLength': null})
    //console.log(articles.get())
    //myConsole.log(articles.get());
    
};

let i = 0;

allLinks = nextPageOnUrl();

while(i<8) {
    //console.log(urlTab[i])
    let url = allLinks[i];
    main(url);

    i++;
}

//console.log(str);
// const title = $(this).find('.card-title').text();
//     const imgLink = $(this).find('img').attr('src');
//     const imgClass = $(this).find('img').attr('class');
//     const productPageUrl = 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'); 
//     const badgeContent = $(this).find('.badge').text();