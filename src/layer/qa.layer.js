import React from 'react';
import MapLayer from 'AvlMap/MapLayer';
import length from '@turf/length';
import * as d3 from 'd3-scale';
import DisplayComponent from './DisplayComponent.js';
import Charts from './chartsComponents';

class ServiceCallLayer extends MapLayer {
  onAdd(map) {
    console.log('gonna fetch');
    fetch('/data/Tucson_PS_18_20.json')
      // fetch('/data/test_data_1.json')
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
          // maxzoom: 20,
          paint: {
            // 'heatmap-color': [
            //   'interpolate',
            //   ['linear'],
            //   ['heatmap-density'],
            //   0,
            //   'rgba(33,102,172,0)',
            //   0.2,
            //   'rgb(103,169,207)',
            //   0.4,
            //   'rgb(209,229,240)',
            //   0.6,
            //   'rgb(253,219,199)',
            //   0.8,
            //   'rgb(239,138,98)',
            //   1,
            //   'rgb(178,24,43)',
            // ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              12,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              1,
              10,
              0,
            ],

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
    // let somedata = map.querySourceFeatures('service-calls-src');
    // console.log('source data', somedata);
  }
}

export default (props = {}) =>
  new ServiceCallLayer(' ', {
    active: true,
    serviceCallData: [],
    sources: [],
    layers: [],

    meta: 'Not Defined Yet',

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
      Charts: {
        comp: Charts,
        show: true,
      },
    },

    modals: {
      RingModal: {
        title: 'Tree Ring Widths',
        comp: ({ layer }) => {
          return (
            <div>
              <Charts meta={layer.meta} />
            </div>
          );
        },

        show: false,
      },
    },
  });
