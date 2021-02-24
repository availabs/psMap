import React from 'react';
import ReactDOM from 'react-dom';
import { values } from 'lodash';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [
        'All Categories',
        'Accident',
        'Assist',
        'Emergency',
        'Other',
        'Property',
        'Quality of Life',
        'Violation',
        'Violent',
      ],
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.selectByCategory(event.target.value);
    //this.selectByCategory(event.target.value);
    //this.props.layer.updateData('crimeCategory', event.target.value);
    console.log('event---', event.target.value);
    console.log('layer1---', this.props.layer);
  }

  render() {
    return (
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
          {this.state.values.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

// export default Dropdown;
