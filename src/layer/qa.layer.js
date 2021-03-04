import React from 'react';
import MapLayer from 'AvlMap/MapLayer';
import DisplayComponent from './DisplayComponent.js';
import Charts from './ChartsComponents';
import { Dropdown } from './Dropdown';

class ServiceCallLayer extends MapLayer {
  constructor(...props) {
    super(...props);

    this.state = {
      categoryVal: 'All Categories',
    };

    this.filterByCode = this.filterByCode.bind(this);
  }

  onAdd(map) {
    console.log('gonna fetch');
    // fetch('/data/Tucson_PS_18_20.json')
    // fetch('/data/test_data_clean.json')
    // fetch('/data/test_data_2018_shp_qgis_1.json')
    // fetch('/data/test_data_all_servicecall_api_merged.json')  // latest service call data --has null values which create error
    // fetch('/data/test_data_all_api_merged_yearocc.json') // incident data
    fetch('/data/tucson_api_merge_all_new_1.json') //incident data with crime category
      .then((r) => r.json())
      .then((data) => {
        //console.log('got data', data);
        this.serviceCallData = data.features.map((d) => d.properties);
        this.fullData = this.serviceCallData;
        this.geojsonFull = data;
        this.catval = 'All Categories';
        console.log('catval1----', this.catval);

        this.forceUpdate();

        map.addSource('service-calls-src', {
          type: 'geojson',
          data: data,
        });

        map.addLayer({
          id: 'service-calls',
          type: 'circle',
          source: 'service-calls-src',
          // maxzoom: 15,
          layout: {
            // make layer visible by default
            visibility: 'visible',
          },
          paint: {
            'circle-radius': 2,
            'circle-color': '#B42222',
          },
        });

        map.addLayer({
          id: 'service-calls-heatmap',
          source: 'service-calls-src',
          type: 'heatmap',
          //maxzoom: 20,
          paint: {
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
              9,
              1,
              10,
              0,
            ],
          },
        });

        map.on('moveend', (e) => {
          // console.time('----update charts----');

          var features = map.queryRenderedFeatures(e.point, {
            layers: ['service-calls'],
          });

          //  console.log('features----', features);

          this.serviceCallData = features.map((d) => d.properties);

          // console.timeEnd('----update charts----');

          this.forceUpdate();
          // console.log(
          //   'movend filter',
          //   this.serviceCallData.length,
          //   this.fullData.length,
          // );

          // filter by code or category
          // this.filterByCode('0603');
          // this.filterByCode('Violation');
        });
      });
  }

  //  catval = '';

  filterByCode(category) {
    console.log('category----', category);

    if (category === 'All Categories') {
      //resets geojson (map)
      let fullSource = this.geojsonFull;
      this.map.getSource('service-calls-src').setData(fullSource);

      //reset charts
      this.serviceCallData = this.fullData;
      this.forceUpdate();
    } else {
      let filteredSource = {
        type: 'FeatureCollection',
        features: this.geojsonFull.features.filter(
          (d) => d.properties.crimeCategory === category,
        ),
      };

      // this.setState({ categoryVal: category });

      // this.catval = category;
      // console.log('catval2----', this.catval);

      // resets geojson (map)
      this.map.getSource('service-calls-src').setData(filteredSource);

      //reset serviceCallData (charts)
      this.serviceCallData = filteredSource.features.map((d) => d.properties);

      this.forceUpdate();
    }
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
        title: '',
        comp: DisplayComponent,
        show: true,
      },
      SelectbyCatagory: {
        title: '',
        comp: ({ layer }) => {
          return (
            <div>
              <Dropdown selectByCategory={layer.filterByCode} layer={layer} />
            </div>
          );
        },
        // comp: Dropdown,
        show: true,
      },

      Charts: {
        title: '',
        comp: ({ layer }) => {
          return (
            <div>
              <Charts layer={layer} />
            </div>
          );
        },
        // comp: Charts,
        show: true,
      },
    },

    // modals: {
    //   RingModal: {
    //     title: 'Ranking',
    //     comp: Ranking,

    //     show: true,
    //   },
    // },
  });
