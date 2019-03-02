import React, {Component} from 'react';
import MiniNavBar from './MiniNavBar'
import Carousel from './Carousel'
import Content from './Content'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css'
import '../styles/home.css'

class Home extends Component{
    constructor(){
        super();
        this.state={
            showAlert:false,
        }
    }

    componentDidMount(){
        console.log('got to did mount')
        if (this.props.location.search=="?added=item"){this.setState({showAlert:true})}
    }

    render(){
        return(
            <div className="col s12 home">

            <SweetAlert
               show={this.state.showAlert}
               title="Item Added!"
               text="We have updated your cart. Continue shopping, or click on the cart to proceed to checkout."
               onConfirm={() => this.setState({ showAlert: false })}
           />
                <Carousel />
                <MiniNavBar />
                <Content />
            </div>
        )
    }
}

export default Home;