import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';



class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 50,
      lng: 20,
      zoom: 9
    }

  }

  handleClick = (e) => {

    let params = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    }

    this.props.loadWeather(params);

  }

  render() {
    const position = [this.state.lat, this.state.lng];
    console.log(this.props)
    return (

      <LeafletMap center={position} zoom={this.state.zoom} onClick={this.handleClick}>

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.location &&
          <Marker position={this.props.location}>
          </Marker>
        }
      </LeafletMap>

    );
  }
}

export default Map;
