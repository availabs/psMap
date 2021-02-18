import React from 'react';

const DisplayComponent = ({ layer }) => {
  const colors = {
    primary: '#333',
    light: '#aaa',
  };

  return (
    console.log('layer', layer),
    (
      <div style={{ backgroundColor: '#fff', padding: 15 }}>
        <div>
          <div
            style={{
              fontSize: '1.3em',
              fontWeigh: 500,
              borderBottom: `1px solid ${colors.primary}`,
              color: colors.primary,
            }}
          >
            Tucson Police Incidents (2018-2020)
            {/* <span style={{ float: 'right' }}>
              <input type="checkbox" />
            </span> */}
          </div>
          <div>
            <h4>Total number of incidents: {layer.serviceCallData.length}</h4>
          </div>
        </div>
      </div>
    )
  );
};

export default DisplayComponent;
