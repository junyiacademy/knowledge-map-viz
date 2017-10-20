import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import vis from 'vis';

import { switchText } from '../actions/actions';
import { ParseNetwork } from '../lib/Network';


class App extends Component{
    render(){
        return (
            <div 
                ref={ graph => {this.graphCanvas = graph} }
                style={{height: '100vh'}}
                ></div>
        )
    }

    componentDidMount(){
        
        console.log(this.props.network);
        let { roots, settings } = this.props.network;

        let d = ParseNetwork(roots, settings);
        console.log(d);
        let nodes = new vis.DataSet(d.networkNodes);
        let edges = new vis.DataSet(d.networkEdges);

        // create a network
        let container = this.graphCanvas;

        // provide the data in the vis format
        let data = {
            nodes: nodes,
            edges: edges
        };
        let options = settings;

        // initialize your network!
        let network = new vis.Network(container, data, options);
        window.network = network;

        network.on('click', (e) => {
            console.log(e);
        });
    }
}

const mapStateToProps = (state, ownProps) => ({
    network: state.network,
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const AppRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppRoot;


