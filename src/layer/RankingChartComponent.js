import React, { Component } from 'react';
import * as d3 from 'd3';
import { ResponsiveBump } from '@nivo/bump';

const RankingChart = ({ data }) => {
  console.log('lineChartdata------------------------------', data);

  // var filteredData = data.filter((obj) => {
  //   for (var key in obj) {
  //     if (
  //       obj[key] === 'TRAFFIC ACCIDENT/PRP DMG/OTHER MOTOR VEHC' ||
  //       obj[key] === 'GTA/STOLEN' ||
  //       obj[key] === 'BURGLARY/FORCIBLE ENTRY' ||
  //       obj[key] === 'ASSAULT/MINOR INJURY' ||
  //       obj[key] === 'FRAUD/DEFRAUDING' ||
  //       obj[key] === 'ROBBERY/RESIDENCE' ||
  //       obj[key] === 'DEATH/SUICIDE' ||
  //       obj[key] === 'HOMICIDE/MANSLAUGHTER' ||
  //       obj[key] === 'DISORDERLY CONDUCT/FAMILY FIGHT'
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // });

  //console.log('filteredData------------------------------', filteredData);

  return (
    // <ResponsiveLine
    //   // data={filteredData}
    //   data={data}
    //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //   xScale={{ type: 'point' }}
    //   yScale={{
    //     type: 'linear',
    //     min: 'auto',
    //     max: 'auto',
    //     stacked: false,
    //     reverse: false,
    //   }}
    //   yFormat=" >-.2f"
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     orient: 'bottom',
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: '',
    //     legendOffset: 36,
    //     legendPosition: 'middle',
    //   }}
    //   axisLeft={{
    //     orient: 'left',
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: '',
    //     legendOffset: -40,
    //     legendPosition: 'middle',
    //   }}
    //   pointSize={10}
    //   pointColor={{ theme: 'background' }}
    //   pointBorderWidth={2}
    //   pointBorderColor={{ from: 'serieColor' }}
    //   pointLabelYOffset={-12}
    //   useMesh={true}
    //   legends={[
    //     {
    //       anchor: 'bottom-right',
    //       direction: 'column',
    //       justify: false,
    //       translateX: 100,
    //       translateY: 0,
    //       itemsSpacing: 0,
    //       itemDirection: 'left-to-right',
    //       itemWidth: 80,
    //       itemHeight: 20,
    //       itemOpacity: 0.75,
    //       symbolSize: 12,
    //       symbolShape: 'circle',
    //       symbolBorderColor: 'rgba(0, 0, 0, .5)',
    //       effects: [
    //         {
    //           on: 'hover',
    //           style: {
    //             itemBackground: 'rgba(0, 0, 0, .03)',
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />

    <ResponsiveBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      colors={{ scheme: 'spectral' }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: 'serie.color' }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
      }}
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
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
    />
  );
};

export default RankingChart;