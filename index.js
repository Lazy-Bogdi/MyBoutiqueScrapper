// const PORT = 8800
const axios = require('axios')
const cheerio = require('cheerio')
// const { response } = require('express')
// const express = require('express')

// const app = express()

//const url = 'http://vps-a47222b1.vps.ovh.net:8484/product/page/1'

function nextPageOnUrl() {
    let i = 0
    let numPage = 1
    urlTab = []
    while(i<=7){
        
        const url = 'http://vps-a47222b1.vps.ovh.net:8484/product/page/' + numPage
        urlTab[i] = url
        numPage++
        i++
    }
    return urlTab
}
allLinks = nextPageOnUrl()
//console.log(allLinks)


let i = 0
let articles = []

while(i<8) {
   //console.log(urlTab[i])
   let url = urlTab[i]
   axios(url)
    .then(response => {
        const html = response.data
        //let articlesLenghth = 0
        //console.log(html)
        const $ = cheerio.load(html)
        

        $('.card', html).each(function() {
            const title = $(this).find('.card-title').text()
            const imgLink = $(this).find('img').attr('src')
            const imgClass = $(this).find('img').attr('class')
            const productPage = $(this).find('a').attr('href')
            const badgeContent = $(this).find('.badge').text()

            articles.push({
                title,
                productPage,
                imgLink,
                imgClass,
                badgeContent
            })
        })
        //articlesLenghth = articles.length 
        //console.log(articlesLenghth)
        //console.dir(articles, {'maxArrayLength': null})
        //console.dir(articles)
    }).catch(err => console.log(err))
   i++
   
}


// axios(url)
//     .then(response => {
//         const html = response.data
//         // console.log(html)
//         const $ = cheerio.load(html)
//         const articles = []

//         $('.card', html).each(function() {
//             const title = $(this).find('.card-title').text()
//             const imgLink = $(this).find('img').attr('src')
//             const imgClass = $(this).find('img').attr('class')
//             const productPage = $(this).find('a').attr('href')
//             const badgeContent = $(this).find('.badge').text()

//             articles.push({
//                 title,
//                 productPage,
//                 imgLink,
//                 imgClass,
//                 badgeContent
//             })
//         })
        
//     }).catch(err => console.log(err))

