const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

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
    const articles = $('.d-grid').children().map(function (i, e) {
        return {
            title : $(this).find('.card-title').text(),
            imgLink : $(this).find('img').attr('src'),
            imgClass : $(this).find('img').attr('class'),
            productPageUrl : 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'), 
            badgeContent : $(this).find('.badge').text()
        }

    }).toArray();
    console.log(articles)
    
};

let i = 0;
allLinks = nextPageOnUrl();
while(i<8) {
    //console.log(urlTab[i])
    let url = allLinks[i];
    main(url);
    i++;
}
// const title = $(this).find('.card-title').text();
//     const imgLink = $(this).find('img').attr('src');
//     const imgClass = $(this).find('img').attr('class');
//     const productPageUrl = 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href'); 
//     const badgeContent = $(this).find('.badge').text();