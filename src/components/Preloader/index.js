import React, { Component } from 'react';



class Preloader extends Component{

    render(){
        return (
            <div className={"preloader"}>
                <img src='/images/loading-icon-png-14.jpg' className={"logo"} alt="logo"/>
            </div>
        )
    }
}



export default Preloader;