import React, { Component } from 'react';
import * as d3 from 'd3';
import BarChart from './barChartComponent';
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

  // const test = callsByYearEventtype.reduce((output, row) => {
  //   console.log('row---', row);
  //   const { year, eventData } = row;
  //   return output;
  // }, []);
  // console.log('test-----', test);

  const callsByYearByEventCount = d3.rollups(
    layer.serviceCallData,
    (v) => v.length,
    (d) => d.year,
    (d) => d.eventType,
  );

  const data = callsByYearByEventCount;

  console.log('data', data);

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

  function formatData(inArray) {
    let outJson = [];
    for (let i = 0; i < inArray.length; i++) {
      //if (inArray[i][0] === 2018) {
      let obj = { year: inArray[i][0] };
      let attrs = inArray[i][1];

      for (let j = 0; j < attrs.length; j++) {
        // let str = obj[attrs[j][0]];
        let key = attrs[j][0];
        obj[key.replace(/\s+$/, '')] = attrs[j][1];
        //  or .trim()
      }

      outJson.push(obj);
      //}
    }
    return outJson;
  }

  const newData = formatData(data);

  console.log('newData-------------', newData);

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
          Event Type by year
        </div>
        <div style={{ height: 350 }}>
          <BarChart data={newData} />
        </div>
      </div>
    )
  );
};

export default Charts;
