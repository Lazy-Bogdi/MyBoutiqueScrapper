const PORT = 8800
const axios = require('axios')
const cheerio = require('cheerio')
// const { response } = require('express')
const express = require('express')

const app = express()

const url = 'http://vps-a47222b1.vps.ovh.net:8484/'

axios(url)
    .then(response => {
        const html = response.data
        console.log(html)
        const $ = cheerio.load(html)
        const articles = []

        $('.card', html).each(function() {
            const title = $(this).find('.card-body').find('.card-title').text()
            const img = $(this).find('img').attr('src')
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url,
                img

            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

