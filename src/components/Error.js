import React,{Component} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

class Error extends Component {
    componentWillMount = () => {
        //this.displayError(this.props.errors)
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.display == true) {
            this.displayError(nextProps)
            this.props.dispatch({type:"RESET_ERROR"});
        }
    }

    displayError = (data) => {
        toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar:true
        });
    };

    render = () => {
        return (
            <ToastContainer />
        )
    }
}

const mapStateToProps = (store) => {
    return {
        display:store.errors.display,
        message:store.errors.message
    }
}

export default connect(mapStateToProps)(Error)