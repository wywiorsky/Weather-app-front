import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import History from '../components/History';

import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {
    weather: state.weather,
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
    
      this.props.onRedirect();
    }
  }


  render() {

      return (
        <div className="site-content">
          <Header/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/history" component={History}/>
            </Switch>
        </div>
      );
    

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
