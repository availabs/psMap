import React from 'react';

const DisplayComponent = ({ layer }) => {
  const colors = {
    primary: '#333',
    light: '#aaa',
  };

  return (
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
          Service Call Layer
          <span style={{ float: 'right' }}>
            <input type="checkbox" />
          </span>
        </div>
        <div>
          <h4>Total number of calls: {layer.serviceCallData.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default DisplayComponent;
