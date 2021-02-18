import React, { Component } from 'react';
import * as d3 from 'd3';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data }) => {
  console.log('barChartdata------------------------------', data);
  return (
    <ResponsiveBar
      data={data}
      keys={[
        //esri version of json
        // 'Traffic Accident (Property)',
        // 'Larceny',
        // 'Assault',
        // 'Sex Offense',
        // 'DUI',
        // 'Criminal Damage',
        // 'Miscellaneous',

        // for service call data
        // 'CKWELF',
        // 'FIGHT',
        // 'OTHER',
        // 'HU',
        // 'T',
        // 'DV',
        // 'ACCIDENT',
        // 'THREAT',
        // 'ASSAULT',

        // for incident data
        'TRAFFIC ACCIDENT/PRP DMG/OTHER MOTOR VEHC',
        'GTA/STOLEN',
        'BURGLARY/FORCIBLE ENTRY',
        'ASSAULT/MINOR INJURY',
        'FRAUD/DEFRAUDING',
        'ROBBERY/RESIDENCE',
        'DEATH/SUICIDE',
        'HOMICIDE/MANSLAUGHTER',
        'DISORDERLY CONDUCT/FAMILY FIGHT',
      ]}
      indexBy="year"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
