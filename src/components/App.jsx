import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { switchText } from '../actions/actions';

class App extends Component{
    render(){
        return (
            <div>
                <div>Hello {this.props.text?'React':'Redux'}</div>
                <button onClick={this.props.changeText}></button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    text: state.text
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeText: () => {
            dispatch(switchText());
        }
    }
}

const AppRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppRoot;


