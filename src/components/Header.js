import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  render() {
    return (
      <div className="site-header">
      <div className="container">
        <a href="index.html" className="branding">
          <img src="images/logo.png" alt className="logo" />
          <div className="logo-type">
            <h1 className="site-title">Pogoda</h1>
 
          </div>
        </a>
        {/* Default snippet for navigation */}
        <div className="main-navigation">
          <button type="button" className="menu-toggle"><i className="fa fa-bars" /></button>
          <ul className="menu">
         <li><Link to= "/">Mapa</Link></li>
         <li><Link to= "/history">Historia</Link></li>
          </ul> {/* .menu */}
        </div> {/* .main-navigation */}
      
      </div>
    </div> 
    );
  }
}

export default Header;
