import React from 'react';
import MapLayer from 'AvlMap/MapLayer';
import length from '@turf/length';
import * as d3 from 'd3-scale';
import DisplayComponent from './DisplayComponent.js';

// const COLOR = 'rgba(255, 255, 255, 0.95)'
const api = 'http://lor.availabs.org:9010';
//const api = 'http://localhost:8080'

class ServiceCallLayer extends MapLayer {
  onAdd(map) {
    console.log('gonna fetch');
    fetch('/data/test_data.json')
      .then((r) => r.json())
      .then((data) => {
        console.log('got data', data);
        this.serviceCallData = data.features.map((d) => d.properties);
        this.forceUpdate();

        map.addSource('service-calls-src', {
          type: 'geojson',
          data: data,
        });

        map.addLayer({
          id: 'service-calls',
          type: 'circle',
          source: 'service-calls-src',
          paint: {
            'circle-radius': 4,
            'circle-color': '#B42222',
          },
        });

        map.addLayer({
          id: 'service-calls-heatmap',
          source: 'service-calls-src',
          type: 'heatmap',
          paint: {
            'heatmap-radius': 8,
            // 'heatmap-color': {
            //   stops: [
            //     [0.0, 'blue'],
            //     [0.5, 'yellow'],
            //     [1.0, 'red'],
            //   ],
            // },
          },
        });
      });
    let somedata = map.querySourceFeatures('service-calls-src');
    console.log('source data', somedata);
  }
}

export default (props = {}) =>
  new ServiceCallLayer(' ', {
    active: true,
    serviceCallData: [],
    sources: [],
    layers: [],
    onHover: {
      layers: ['service-calls'],
      dataFunc: function (feature) {
        console.log('hover', feature);
      },
    },
    onClick: {
      layers: ['service-calls'],
      dataFunc: function (feature) {
        console.log('onClick', feature);
      },
    },
    popover: {
      layers: ['service-calls'],
      dataFunc: function (feature, map) {
        return [
          ...Object.keys(feature.properties).map((k) => [
            k,
            feature.properties[k],
          ]),
        ];
      },
    },
    infoBoxes: {
      Overview: {
        comp: DisplayComponent,
        show: true,
      },
    },
  });

function median(values) {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
