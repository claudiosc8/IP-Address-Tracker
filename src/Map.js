import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Icon } from "leaflet";
import Pin from './images/icon-location.svg'



const myIcon = new Icon({
    iconUrl: Pin,
    iconSize: [46, 55],
    iconAnchor: [23, 55],
    popupAnchor: [-3, -76],
});

function MapComponent({center, error}) {

    return (

        <Map zoomControl={false} center={error ? [0,0] : center} zoom={error ? 2 : 13} className='map'>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          />
          {!error && <Marker position={center} icon={myIcon} />}
        </Map>

      )

}

export default MapComponent;
