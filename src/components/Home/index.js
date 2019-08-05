import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { getIcon } from "../../utils/icon";
import {
  LOAD_WEATHER,
  LOAD_PHOTOS
} from '../../constants/actionTypes';
import Map from '../Map/';
import 'moment/locale/pl'
import Preloader from '../Preloader/';
moment.locale('pl')

const Promise = global.Promise;

const mapStateToProps = state => ({
  weather: state.weather.main ? state.weather.main : [],
  photos: state.photos ? state.photos : []
});

const mapDispatchToProps = dispatch => ({
  loadWeather: payload =>
    dispatch({ type: LOAD_WEATHER, payload }),
  loadPhotos: payload =>
    dispatch({ type: LOAD_PHOTOS, payload })

});

class Home extends React.Component {

  state = {
    onload: false
  }

  loadWeather = (data) => {

    this.setState({ onLoad: true });

    Promise.all([agent.Weather.get(data,true)]).then((value) => {
      this.props.loadWeather(value);

      setTimeout(() => {
        this.setState({ onLoad: false });
      }, 500);

      this.props.loadPhotos(
        Promise.all([agent.Photos.get(value[0].name)])
      );

    })

    this.setState({ location: data })
    
  }



  render() {

    if (this.state.onLoad) {

      return (<Preloader />);

    }

    const { weather, city, photos } = this.props;

    return (
      <div className="home-page">
        <div>
          <div className="hero" style={{ 'background-image': `url("${photos[0] ? photos[0].src.landscape : ''}")` }}>
            <div className="container">
              <div className="find-location">

                <Map loadWeather={this.loadWeather} location={this.state.location} />

              </div>
            </div>
          </div>
          <div className="forecast-table">
            <div className="container">
              <div className="forecast-container">
                {weather.main &&

                  <div className="today forecast">

                    <div className="forecast-header">
                      <div className="day">{moment().format('dddd')}</div>
                      <div className="date">{moment().format('DD MMM')}</div>
                    </div> {/* .forecast-header */}
                    <div className="forecast-content">
                      <div className="location">{weather.name}</div>
                      <div className="degree">
                        <div className="num">{weather.main.temp} <sup>o</sup>C</div>
                        <div className="forecast-icon">
                          <img src={`/images/icons/${getIcon(weather.weather[0].icon)}`} alt width={70} />
                        </div>
                      </div>
                      <div className="location">{weather.weather[0].description}</div>
                      <span><img src="/images/icon-umberella.png" alt />{weather.main.humidity}%</span>
                      <span><img src="/images/icon-wind.png" alt />{weather.wind.speed}km/h</span>

                    </div>
                  </div>
                }


              </div>
            </div>
          </div>
          <main className="main-content">


          </main> {/* .main-content */}
          <footer className="site-footer">

          </footer> {/* .site-footer */}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
