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

  function formatData(inArray) {
    let outJson = [];
    for (let i = 0; i < inArray.length; i++) {
      let obj = { year: inArray[i][0] };
      let attrs = inArray[i][1];
      for (let j = 0; j < attrs.length; j++) {
        obj[attrs[j][0]] = attrs[j][1];
      }
      outJson.push(obj);
    }
    return outJson;
  }
  const newData = formatData(data);

  console.log('newData-------------', newData);

  // const ary2018 = data[0];
  // console.log('ary18', ary2018);

  // const value18 = ary2018[0];
  // console.log('v18', value18);

  //const newData = [{ year: 2018, [data[0]]}, {year:2019, [data[1]]}, {year:2020, [data[2]]} ];
  // console.log('newData--', newData);

  // const entries = Object.entries(data);

  // console.log('entries', entries);

  // const values = Object.values(data)

  //let newData = [{year:Object.keys(data), Object.values(data).map(key)=> {key,data[key]}}]

  // Array.from(
  //   data,
  //   ([key, values]) => console.log('key, values------', key, values),

  //   // (newData = []),
  //   // (newData[i].year = key),
  //   // (newData[i].accident = values.map((d) => d.ACCIDENT)),
  // );

  //const fight = callsByYearEventtype.get(2019).length;

  // const Year19 = [
  //   {
  //     year: 2019,
  //     FIGHT: fight,
  //   },
  // ];

  // console.log('Year19', Year19);

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
