import fetch from 'node-fetch';
//const fetchs = require('node-fetch');
const cheerio = require('cheerio');


// const w = 500;
// const h = 500;
// const padding = 60;


// const xScale = d3.scaleLinear()
//                  .domain([0, d3.max(dataset, (d) => d[0])])
//                  .range([padding, w - padding]);

// const yScale = d3.scaleLinear()
//                  .domain([0, d3.max(dataset, (d) => d[1])])
//                  .range([h - padding, padding]);

// const svg = d3.select("body")
//               .append("svg")
//               .attr("width", w)
//               .attr("height", h);





// svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr("cx", (d) => xScale(d[0]))
//    .attr("cy",(d) => yScale(d[1]))
//    .attr("r", (d) => 5)
// .attr('data-date', (d) =>d[0])
// .attr('data-gdp', (d) => d[1])
// .append('title')
// .text((d) => d[2]);

   

// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text((d) =>  (d[0] + "," + d[1]))
//    .attr("x", (d) => xScale(d[0]) -20)
//    .attr("y", (d) => yScale(d[1]) - 20);

// const xAxis = d3.axisBottom(xScale);
// // Add your code below this line
// const yAxis = d3.axisLeft(yScale);
// // Add your code above this line

// svg.append("g")
//    .attr("transform", "translate(0," + (h - padding) + ")")
//    .call(xAxis);

// // Add your code below this line
// svg.append("g")
//    .attr("transform", "translate(" + padding + ",0)")
//    .call(yAxis)



let data = []
let arr;
let urlsToScrape = [
    
  //  'https://scrapsfromtheloft.com/comedy/emily-heller-ice-thickeners-transcript/'
 ]

async function findScripts() {
    let counter = 3;

   while(counter > 0) {

      const response = await fetch("https://scrapsfromtheloft.com/stand-up-comedy-scripts/");
      // using await to ensure that the promise resolves
      const text = await response.text();
      const $ = cheerio.load(text);

  $('div[class="elementor-widget-container"]').find('div > article > div > h3 > a').each(function (index, element) {

  urlsToScrape.push($(element).attr('href'));

});
 counter--
}
 scriptScrapper(urlsToScrape);
}

findScripts()


  async function scriptScrapper(urls) {
    let data = [];
for(const url of urls) {

    const response = await fetch(url);
    // using await to ensure that the promise resolves
    const text = await response.text();
    const $ = cheerio.load(text)

    let set = $('p').text();
    let comedianName = $('h1').text();
    let laughs = set.match(/laugh/g);
    let laughNumber =  laughs.length;
    let splitSet = set.split(' ');
    let lengthOfSet = splitSet.length;

  data.push([comedianName, lengthOfSet])
 checkData(data)
}
 
  }
  

  scriptScrapper(urlsToScrape);

  async function checkData(data) {
    await data
    console.log(data)
  }

  const dataset = [ [ 10764, 342,  'Tom Segura: Disgraceful (2018) – Transcript' ],
  [10046, 295,  'Ricky Gervais: SuperNature (2022) | Transcript'],
  [8857, 184,  'Sam Morril: I Got This (2020) – Transcript'] ];


//  const data = [
//                   [ 34,     78 ],
//                   [ 109,   280 ],
//                   [ 310,   120 ],
//                   [ 79,   411 ],
//                   [ 420,   220 ],
//                   [ 233,   145 ],
//                   [ 333,   96 ],
//                   [ 222,    333 ],
//                   [ 78,    320 ],
//                   [ 21,   123 ]
//                 ];

   
  

  //<span class="a-size-mini a-color-base _alm-grid-desktop_savingsMessageStyle_almAltLabelHighlight__1s4LJ aok-inline-block">33% off ($1.42)</span>
  //<span class="a-size-mini a-color-base _alm-grid-desktop_savingsMessageStyle_almAltLabelHighlight__1s4LJ aok-inline-block">29% off ($1.23)</span>