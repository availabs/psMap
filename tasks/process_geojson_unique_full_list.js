'use strict';

const fs = require('fs');
//const path = require('path');
const json = require('big-json');
const { features } = require('process');

let path =
  // '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326_api_merge.geojson';
  //'../public/data/Tucson_Police_incidents_2018_2020_Open_Data_api_merged.geojson';

  // '../public/data/Tucson_Police_Calls_for_Service_2018_4326_esri.geojson';
  // '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326_selected.geojson';
  // '../public/data/Tucson_Police_Incidents__2018_1.json'  //esri original
  '../public/data/Tucson_Police_Incidents_-_2018_-_Open_Data.json'; //api original

const readStream = fs.createReadStream(path);
const parseStream = json.createParseStream();

// csv combined original and merged geojson api
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
//         //eventTypeCode: d.properties.NATURECODE,
//         eventType: d.properties.NatureCodeDesc,
//       },
//       geometry: d.geometry,
//     };
//   });
//   console.log(JSON.stringify(output));
// });

//api geojson for incidents data
parseStream.on('data', function (pojo) {
  // => receive reconstructed POJO
  let output = pojo.features.reduce((out, current) => {
    // let yearOcc =  d.properties.DATE_OCCU.substring(0,4)
    // console.log('yearOcc---',yearOcc)
    let { CrimeCategory, CrimeType, OFFENSE, STATUTDESC } = current.properties;
    if (!out[OFFENSE]) {
      out[OFFENSE] = {
        STATUTDESC,
        CrimeType,
        CrimeCategory,
      };
    }
    return out;
  }, {});

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
