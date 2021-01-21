'use strict';

const fs = require('fs');
//const path = require('path');
const json = require('big-json');
const { features } = require('process');

let path =
  '../public/data/Tucson_Police_Calls_for_Service_2018_4326_esri.geojson';
// '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326_selected.geojson';
// '../public/data/Tucson_Police_Incidents__2018_1.json'  //esri original

const readStream = fs.createReadStream(path);
const parseStream = json.createParseStream();

// parseStream.on('data', function (pojo) {
//   // => receive reconstructed POJO
//   let output = { type: 'FeatureCollection', features: [] };
//   output.features = pojo.features.map((d) => {
//     return {
//       properties: {
//         id: d.properties.objectid_1,
//         // date: d.properties.ACTDATE,
//         year: d.properties.ACT_YEAR,
//         // fullDate: d.properties.ACTDATETIME,
//         eventType: d.properties.NATURECODE,
//       },
//       geometry: d.geometry,
//     };
//   });
//   console.log(JSON.stringify(output));
// });

parseStream.on('data', function (pojo) {
  // => receive reconstructed POJO
  let output = { type: 'FeatureCollection', features: [] };
  output.features = pojo.features.map((d) => {
    return {
      properties: {
        id: d.properties.OBJECTID,
        // date: d.properties.ACTDATE,
        year: d.properties.YEAR_OCCU,
        // fullDate: d.properties.ACTDATETIME,
        eventType: d.properties.CrimeType,
      },
      geometry: d.geometry,
    };
  });
  console.log(JSON.stringify(output));
});

//esri geojson
// parseStream.on('data', function (pojo) {
//   // => receive reconstructed POJO
//   let output = { type: 'FeatureCollection', features: [] };
//   output.features = pojo.features.map((d) => {
//     return {
//       properties: {
//         id: d.attributes.OBJECTID,
//         // date: d.properties.ACTDATE,
//         year: d.attributes.YEAR_REPT,
//         // fullDate: d.properties.ACTDATETIME,
//         eventType: d.attributes.CrimeType,
//       },
//       geometry: d.geometry,
//     };
//   });
//   console.log(JSON.stringify(output));
// });

readStream.pipe(parseStream);
