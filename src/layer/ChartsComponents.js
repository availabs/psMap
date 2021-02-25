import React, { Component } from 'react';
import * as d3 from 'd3';
import BarChart from './BarChartComponent';
import LineChart from './LineChartComponent';
import RankingChart from './RankingChartComponent';
import { values } from 'lodash';

const Charts = ({ layer }) => {
  const colors = {
    primary: '#333',
    light: '#aaa',
  };
  // const callsByYear = d3.group(layer.serviceCallData, (d) => d.year);
  // console.log('callsByYear', callsByYear);

  // const callsByYearEventtype = d3.groups(
  //   layer.serviceCallData,
  //   (d) => d.year,
  //   (d) => d.eventType,
  // );
  // console.log('callsByYearEventtype', callsByYearEventtype);

  const callsByYearByEventCount = d3.rollups(
    layer.serviceCallData,
    (v) => v.length,
    (d) => d.year,
    // (d) => d.eventType,
    (d) => d.crimeCategory,
  );
  const data = callsByYearByEventCount;
  console.log('data', data);

  const callsByEventByYearCount = d3.rollups(
    layer.serviceCallData,
    (v) => v.length,
    // (d) => d.eventCode,
    (d) => d.eventType,
    (d) => d.year,
  );
  const data_line = callsByEventByYearCount;
  console.log('data_line', data_line);

  //formating data with below formatData function
  // data = [
  //           [2018,[["CKWELF  ", 22399],["DV      ", 19082],....[]],
  //           [2019,[["CKWELF  ", 22399],["DV      ", 19082],....[]],
  //           [2020,[["CKWELF  ", 22399],["DV      ", 19082],....[]],
  //         ]

  // newData =[
  //           {"year": 2018, "ACCIDENT": 1234,"FIGHT": 2365,....},
  //           { "year":2019, "ACCIDENT": 2365, ....}, {'year: 2020,...},
  //           {     }
  //          ]

  // // data_line = [ ["TRAFFIC ACCIDENT/PRP DMG/OTHER MOTOR VEHC",
  //                    [["2018", 1195],
  //                     ["2019", 1195],
  //                     ["2020", 1195]
  //                    ]
  //                  ],
  //                 ]
  // lineData = [
  //                {  "id": "ACCIDENT", "data": [{"x": "2018","y": 16},{"x": "2019","y": 110},{"x": "2020","y": 127}] },
  //                {  "id": "BURGLRY", "data": [{"x": "2018","y": 100},{"x": "2019","y": 120},{"x": "2020","y": 129}] },
  //                {  }
  //                ]

  //Format Barchart data
  function formatData(inArray) {
    let outJson = [];
    for (let i = 0; i < inArray.length; i++) {
      let obj = { year: inArray[i][0] };
      let attrs = inArray[i][1];

      for (let j = 0; j < attrs.length; j++) {
        let key = attrs[j][0];
        obj[key.replace(/\s+$/, '')] = attrs[j][1];
        //  or .trim() ,
      }

      outJson.push(obj);
    }
    return outJson;
  }

  const newData = formatData(data);

  console.log('newData-------------', newData);

  const size = layer.serviceCallData.length;
  console.log('layer.serviceCallData--', layer.serviceCallData);
  //const size = layer.serviceCallData;

  const view = size === 327659 || 0;

  // const obj = newData[0];

  // const size = Object.keys(obj).length;
  console.log('size---', size, view);

  //format Linechart Data
  function formatLineData(inArray) {
    let outJson = [];
    for (let i = 0; i < inArray.length; i++) {
      let crimeType = inArray[i][0];
      let attrs = inArray[i][1];

      // let attr = attrs.reduce((a, c) => {
      //   a[c] = c;
      //   return a;
      // }, {});
      // console.log('attr-----', attr);

      let yearAttrs = [];
      let obj = { id: crimeType, data: yearAttrs };

      for (let j = 0; j < attrs.length; j++) {
        let childObj = { x: attrs[j][0], y: attrs[j][1] };

        yearAttrs.push(childObj);
      }
      outJson.push(obj);
    }
    return outJson;
  }

  const lineData = formatLineData(data_line);

  console.log('lineData-------------', lineData);

  ////////test other charts

  //   piechart
  //   data = [
  //   {
  //     "id": "javascript",
  //     "label": "javascript",
  //     "value": 496,
  //     "color": "hsl(11, 70%, 50%)"
  //   },
  //   {
  //     "id": "lisp",
  //     "label": "lisp",
  //     "value": 531,
  //     "color": "hsl(158, 70%, 50%)"
  //   },
  // ]

  ///////////////////

  return (
    console.log('Chart layer', layer),
    (
      <div style={{ backgroundColor: '#fff', padding: 15 }}>
        <div
          style={{
            fontSize: '1.3em',
            fontWeigh: 500,
            borderBottom: `1px solid ${colors.primary}`,
            color: colors.primary,
          }}
        >
          Number of incidents by Crime Category
        </div>
        <div style={{ height: 250 }}>
          <BarChart data={newData} />
        </div>

        <div
          style={{
            fontSize: '1.3em',
            fontWeigh: 500,
            borderBottom: `1px solid ${colors.primary}`,
            color: colors.primary,
          }}
        >
          Number of incidents under each crime category
        </div>

        <div style={{ height: 400 }}>
          {view ? (
            'only available after a crime category is selected'
          ) : (
            <LineChart data={lineData} />
          )}
        </div>
        <div
          style={{
            fontSize: '1.3em',
            fontWeigh: 500,
            borderBottom: `1px solid ${colors.primary}`,
            color: colors.primary,
          }}
        >
          Ranking of incidents under each crime category
        </div>
        <div style={{ height: 400 }}>
          {view ? (
            'only available after a crime category is selected'
          ) : (
            <RankingChart data={lineData} />
          )}
        </div>
      </div>
    )
  );
};

export default Charts;
