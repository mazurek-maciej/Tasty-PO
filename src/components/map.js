import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.674357, lng: 17.927382}}    
    >
        {props.isMarkerShown && <Marker position={{ lat: 50.674357, lng: 17.927382}}/>}
    </GoogleMap>
)));

export default Map;