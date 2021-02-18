//let jsonData = require('../public/data/test_data_all_api_merged_yearocc.json');
let jsonData = require('./tuscon_incidents_all.json');
//let uniqDesc = jsonData.features.map((d) => d.properties.eventType);
// let uniqDesc = jsonData.features.map((d) => d.properties.eventCode);
// let uniqDesc = jsonData.features.map((d) => d.properties.crimeType);
let uniqDesc = jsonData.features.map((d) => d.properties.crimeCategory);

let uniq = [...new Set(uniqDesc)];
uniq.sort();

//array =array.reverse()

console.log(JSON.stringify(uniq));
