// const PORT = 8800
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// const { response } = require('express')
// const express = require('express')

// const app = express()

//const url = 'http://vps-a47222b1.vps.ovh.net:8484/product/page/1'

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
let articles = [];
const getFakeTee = async (url) => {
	const response = await fetch(url);
	const body = await response.text();
    const $ = cheerio.load(body);
	//console.log(body); // prints a chock full of HTML richness

    $('.card',body).each(('.card-title') => {

        const title = $(this).find('.card-title').text()
        const imgLink = $(this).find('img').attr('src')
        const imgClass = $(this).find('img').attr('class')
        const productPageUrl = 'http://vps-a47222b1.vps.ovh.net:8484' + $(this).find('a').attr('href') 
        const badgeContent = $(this).find('.badge').text()
        
        articles.push({
            title,
            productPageUrl,
            imgLink,
            imgClass,
            badgeContent
        });
      });
	//console.log(articles);
};

allLinks = nextPageOnUrl();
//console.log(allLinks)






let i = 0;
while(i<8) {
    //console.log(urlTab[i])
    let url = allLinks[i];
    //console.log(url)
    let urlReturn =  getFakeTee(url);
    articles.push({
        url,
        urlReturn
    });
    i++;
    console.log(articles)
 }




