import React, { Component } from 'react';
import LoginNavBar from './LoginNavBar';
import LogoSearchHeader from './LogoSearchHeader';
import MainNav from './MainNav';
import './Nav.css'

function Headers(props){
return (
    <div class="header">
        <div className="container-fluid center grey darken-4">
            <div className="container row">
                <LoginNavBar />
            </div>
        </div>
        <div className="container row">
            <LogoSearchHeader />
            <div className="row">
                <MainNav />
            </div>
        </div>
    </div>
    )
}
export default Headers;