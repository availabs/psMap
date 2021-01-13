import React, { Component } from 'react';
import * as d3 from 'd3';
import BarChart from './barChartComponent';

const Charts = ({ layer }) => {
  const colors = {
    primary: '#333',
    light: '#aaa',
  };

  // const callsByYear = d3.group(layer.serviceCallData, (d) => d.year);
  // console.log('callsByYear', callsByYear);

  const callsByYearEventtype = d3.groups(
    layer.serviceCallData,

    (d) => d.year,
    (d) => d.eventType,
  );
  console.log('callsByYearEventtype', callsByYearEventtype);

  const test = callsByYearEventtype.reduce((output, row) => {
    console.log('row---', row);
    const { year, eventData } = row;
    return output;
  }, []);

  console.log('test-----', test);

  const callsByYearByEventCount = d3.rollup(
    layer.serviceCallData,
    (v) => v.length,
    (d) => d.year,
    (d) => d.eventType,
  );

  const data = callsByYearByEventCount;

  console.log('data', data);

  // const entries = Object.entries(data);

  // console.log('entries', entries);

  // const values = Object.values(data)

  //let newData = [{year:Object.keys(data), Object.values(data).map(key)=> {key,data[key]}}]

  Array.from(
    data,
    ([key, values]) => console.log('key, values------', key, values),

    // (newData = []),
    // (newData.year = key),
  );

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
        <div>
          <BarChart data={data} />
        </div>
      </div>
    )
  );
};

export default Charts;
