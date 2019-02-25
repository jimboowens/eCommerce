import React, {Component} from 'react';
import MiniNavBar from './MiniNavBar'
import Carousel from './Carousel'
import Content from './Content'
import '../styles/home.css'

class Home extends Component{
    render(){
        return(
            <div className="col s12 home">
                <Carousel />
                <MiniNavBar />
                <Content />
            </div>
        )
    }
}

export default Home;