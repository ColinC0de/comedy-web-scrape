//latest

import fetch from 'node-fetch';

//const fetch = require('node-fetch');
const cheerio = require('cheerio');
let data = []



async function findScripts() {
    let counter = 10;
    let urlsToScrape = [];
    
    
        const response = await fetch("https://scrapsfromtheloft.com/stand-up-comedy-scripts/");
        // using await to ensure that the promise resolves
        const text = await response.text();
      
       const $ = cheerio.load(text);

       while(counter > 0) {
      // let list = [];
$('div[class="elementor-widget-container"]').find('div > article > div > h3 > a').each(function (index, element) {
  urlsToScrape.push($(element).attr('href'));
  //console.log(urlsToScrape)
});
//console.log(urlsToScrape);

   //  let url =  $('a').attr('href');
     //   urlsToScrape.push(url);
      // urlsToScrape.push(url);
    // console.log(url)
         //grab div with name: class="elementor-widget-container"

   //grab every a tag and href inside a tag

   //push url into urlsToScrape
 // console.log(set)
 counter--
 //console.log(counter)
}

 scriptScrapper(urlsToScrape);
}

findScripts()


  async function scriptScrapper(urlsToScrape) {
    //console.log(urlsToScrape)
    let data = [];
for(const url of urlsToScrape) {


    const response = await fetch(url);
    // using await to ensure that the promise resolves
    const text = await response.text();
    const $ = cheerio.load(text)


  
  
  let set = $('p').text();
  let comedianName = $('h1').text();
  
  

  let arr = set.match(/laugh/g);
  let splitSet = set.split(' ')
  let lengthOfSet = splitSet.length

  data.push([comedianName, lengthOfSet])

}
console.log(data)
  }
 console.log('hi')

  //scriptScrapper(urlsToScrape);
  //async function changeArr(arr) {
  //  console.log(arr)
   // let laughs = arr.filter(item => item === "laugh")
  // / console.log(laughs)
 // }

  //async function checkData(data) {
   // console.log(data)
 // }