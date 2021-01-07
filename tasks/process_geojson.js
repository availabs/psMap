'use strict';

const fs = require('fs');
//const path = require('path');
const json = require('big-json');
const { features } = require('process');

let path =
  '../public/data/Tucson_Police_Calls_for_Service_2018_2020_Open_Data4326.geojson';

const readStream = fs.createReadStream(path);
const parseStream = json.createParseStream();

parseStream.on('data', function (pojo) {
  // => receive reconstructed POJO
  let output = { type: 'FeatureCollection', features: [] };
  output.features = pojo.features.map((d) => {
    return {
      properties: {
        id: d.properties.objectid_1,
        date: d.properties.ACTDATE,
        year: d.properties.ACT_YEAR,
        fullDate: d.properties.ACTDATETIME,
        eventType: d.properties.NATURECODE,
        eventDesc: d.properties.NatureCodeDesc,
      },
      geometry: d.geometry,
    };
  });
  console.log(JSON.stringify(output));
});

readStream.pipe(parseStream);
