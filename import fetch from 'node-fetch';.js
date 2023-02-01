import fetch from 'node-fetch';

const fetchs = require('node-fetch');
const cheerio = require('cheerio');
let data = [];
let arr;
let urlsToScrape = [
    //https://scrapsfromtheloft.com/stand-up-comedy-scripts/
  //  'https://scrapsfromtheloft.com/comedy/emily-heller-ice-thickeners-transcript/'
 ]

 async function findScripts() {
      const response = await fetch("https://scrapsfromtheloft.com/stand-up-comedy-scripts/");
      // using await to ensure that the promise resolves
      const text = await response.text();
      const $ = cheerio.load(text);

  $('div[class="elementor-widget-container"]').find('div > article > div > h3 > a').each(function (index, element) {

  urlsToScrape.push($(element).attr('href'));

});
 


//let urls = await fetch('https://scrapsfromtheloft.com/comedy/emily-heller-ice-thickeners-transcript/');
 scriptScrapper(urlsToScrape);
}

findScripts()



  async function scriptScrapper(urls) {
   
   // let data = [];
for(const url of urls) {

    const response = await fetch(url);
    // using await to ensure that the promise resolves
    const text = await response.text();
    const $ = cheerio.load(text)

    let set = $('p').text();
    let comedianName = $('h1').text();
    let laughs = set.match(/laugh/g);
    if(laughs == null) {
        laughs = 0;
    }
    let laughNumber =  laughs.length;
   
    let splitSet = set.split(' ');
    let lengthOfSet = splitSet.length;

  data.push([comedianName, lengthOfSet, laughNumber])
 
 //checkData(data)
}

 checkData(data)
  }
  

  scriptScrapper(urlsToScrape);

  async function checkData(data) {
    await data
    console.log(data)
  }

  //if null then set laughs == 0 
//else set to length
//laughs.length