import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { values } from 'lodash';
import Charts from './ChartsComponents';
import { setActiveCategory } from 'store/modules/category';
import { DateFilter } from 'AvlMap/components/filters';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [
        { name: 'Accident', value: 'accident' },
        { name: 'Assist', value: 'assist' },
        { name: 'Emergency', value: 'emergency' },
        { name: 'Other', value: 'other' },
        { name: 'Property', value: 'property' },
        { name: 'Quality of Life', value: 'quality' },
        { name: 'Violation', value: 'violation' },
        { name: 'Violent', value: 'violent' },
      ],
      // value: {name:'All Categories', value:'all_categories'}
      value: 'all_categories',
    };
    /*
    'Accident',
        'Assist',
        'Emergency',
        'Other',
        'Property',
        'Quality of Life',
        'Violation',
        'Violent',
    */

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    //this.setState({ value[value]: value });
    this.setState({ value: value });
    //const value = event.target.value;

    const name = this.state.values.reduce((a, c) => {
      if (c.value === event.target.value) {
        a = c.name;
      }
      return a;
    }, 'All Categories');

    this.props.selectByCategory(name);

    //this.selectByCategory(event.target.value);

    console.log('event---', event.target.value);

    // Redux tries
    //this.props.setActiveCategory(value);
    // console.log(
    //   'check',
    //   this.state.values.reduce((a, c) => {
    //     if (c.value === event.target.value) {
    //       a = c.name;
    //     }
    //     return a;
    //   }, ''),
    // );
  }

  render() {
    //for redux
    //console.log('setting category in the redux', this.props.activeCategory);

    return (
      <div>
        <label style={{ width: '100%' }}>
          <div style={{ paddingBottom: 10 }}>
            <h4 style={{ color: '#efefef' }}>Filter Incidents</h4>
          </div>
          Filter by Crime Category:
          <br />
          <select
            value={this.state.value}
            onChange={this.handleChange}
            style={{ padding: 10, width: '100%', fontSize: '1.5em' }}
          >
            {/* setting up initial value */}
            <option key={0} value={'all_categories'}>
              All Categories
            </option>

            {this.state.values.map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </label>

        <Charts
          layer={this.props.layer}
          category={this.state.value}
          // serviceCallData={this.props.serviceCallData}
        />
      </div>
    );
  }
}

//redux try
// const mapStateToProps = (state) => console.log('state', state);
// const mapDispatchToProps = {
//   //setActiveCategory,
// };

export default Dropdown; //connect(mapStateToProps, mapDispatchToProps)(Dropdown);
