import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table } from "reactable";
import { calculate } from "../../utils/distance";
import { getIcon } from "../../utils/icon";
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import {
  LOAD_WEATHER,
  LOAD_WEATHER_STATS,
  LOAD_WEATHER_HISTORY
} from '../../constants/actionTypes';
import { geolocated } from 'react-geolocated';
import 'moment/locale/pl'
import Preloader from '../Preloader/';
moment.locale('pl')

const Promise = global.Promise;

const mapStateToProps = state => ({
  weather: state.weather.main ? state.weather.main : [],
  stats: state.weather.stats ? state.weather.stats : [],
  history: state.weather.history ? state.weather.history : [],
  photos: state.photos ? state.photos : []
});

const mapDispatchToProps = dispatch => ({
  loadWeather: payload =>
    dispatch({ type: LOAD_WEATHER, payload }),

  loadStats: payload =>
    dispatch({ type: LOAD_WEATHER_STATS, payload }),

  loadHistory: payload =>
    dispatch({ type: LOAD_WEATHER_HISTORY, payload })

});

class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      perPage: 10,
      currentPage: 0,
      onload: false
    };

  }

  loadWeather = (data) => {
    this.props.loadWeather(
      Promise.all([agent.Weather.get(data, false)])
    );
  }

  loadStats = () => {
    this.props.loadStats(
      Promise.all([agent.Stats.get()])
    );
  }

  loadHistory = () => {

    this.setState({ onLoad: true });

    Promise.all([agent.History.get(parseInt(this.state.currentPage) + 1)]).then((value) => {
      this.props.loadHistory(value);

      setTimeout(() => {
        this.setState({ onLoad: false });
      }, 500);

    })
  }

  handlePageClick = (data) => {
    const selectedPage = parseInt(data.selected);

    this.setState({ currentPage: selectedPage }, () => {
      this.loadHistory();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {

      let params = {
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude
      }

      this.loadWeather(params);
    }
  }

  componentDidMount() {
    this.loadStats();
    this.loadHistory();
  }



  render() {

    const { weather, stats, history } = this.props;




    return (

      [
      ( this.state.onLoad ? <Preloader /> : '')
      ,
      <div className="home-page">
        <div>
          <div className="forecast-table">
            <div className="container">
              <div className="forecast-container">
                {weather.main &&

                  <div className="today forecast">

                    <div className="forecast-header">
                      <div className="day">{moment().format('dddd')}</div>
                      <div className="date">{moment().format('DD MMM')}</div>
                    </div>
                    <div className="forecast-content">
                      <div className="location">{weather.name}</div>
                      <div className="degree">
                        <div className="num">{parseFloat(weather.main.temp).toFixed(2)} <sup>o</sup>C</div>
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
            {stats.avg_temp &&
              <div className="fullwidth-block">
                <div className="container">
                  <h2 className="section-title">Statystyki</h2>
                  <div className="row">
                    <div className="col-md-2 col-sm-6">
                      <div className="live-camera">
                        Srednia temperatura
                      <h3 className="location"> {parseFloat(stats.avg_temp).toFixed(2)} <sup>o</sup>C</h3>
                        <small className="date"></small>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-6">
                      <div className="live-camera">
                        Minimalna temperatura
                      <h3 className="location"> {parseFloat(stats.min_temp).toFixed(2)} <sup>o</sup>C</h3>
                        <small className="date"></small>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-6">
                      <div className="live-camera">
                        Maksymalna temperatura
                      <h3 className="location"> {parseFloat(stats.max_temp).toFixed(2)} <sup>o</sup>C</h3>
                        <small className="date"></small>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-6">
                      <div className="live-camera">
                        Liczba wyszukiwań
                      <h3 className="location"> {stats.counter}</h3>
                        <small className="date"></small>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="live-camera">
                        Najczęsciej wyszukiwane
                      <h3 className="location"> {stats.most_common_city}</h3>
                        <small className="date"></small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            {history.data &&
              <div className="fullwidth-block">
                <div className="container">
                  <h2 className="section-title">Historia Wyszukiwań</h2>
                  <div className="row">
                    <div className="col-md-12">

                      <Table className="table" data={history.data.map(value => {
                        value['odleglosc'] = calculate(value.lat, _.get(this.props, 'coords.latitude'), value.lng, _.get(this.props, 'coords.longitude')) + 'km';
                        return value;
                      })} />

                      {history.pages && history.pages > 1 &&
                        <ReactPaginate
                          previousLabel={"← Previous"}
                          nextLabel={"Next →"}
                          breakLabel={<span className="gap">...</span>}
                          pageCount={this.props.history.pages}
                          marginPagesDisplayed={15}
                          onPageChange={this.handlePageClick}
                          forcePage={this.state.currentPage}
                          containerClassName={"pagination justify-content-center col-md-12"}
                          previousLinkClassName={"page-item"}
                          nextLinkClassName={"page-item"}
                          previousClassName={"page-link"}
                          nextClassName={"page-link"}
                          disabledLinkClassName={"disabled"}
                          activeLinkClassName={"active"}
                          activeClassName={"active"}
                          pageClassName={"page-link"}
                          breakLinkClassName={"page-link"}
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>

            }

          </main> {/* .main-content */}
          <footer className="site-footer">

          </footer> {/* .site-footer */}
        </div>

      </div>]
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  }
})(connect(mapStateToProps, mapDispatchToProps)(History));
