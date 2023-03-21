import React from 'react';

const MapComponent = () => {
  return (
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
            title="Folium Map"
            src="/assets/map.html" // Change this to the path of the generated map.html
            style={{ border: 'none', width: '100%', height: '100%' }}
        />
      </div>
  );
};

export default MapComponent;