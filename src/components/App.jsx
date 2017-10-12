import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import vis from 'vis';

import { switchText } from '../actions/actions';
import { ParseNetwork } from '../lib/Network';


class App extends Component{
    render(){
        return <div ref={ graph => {this.graphCanvas = graph} }></div>;
    }

    componentDidMount(){
        
        console.log(this.props.network);
        let { roots } = this.props.network;

        let d = ParseNetwork(roots);
        let nodes = new vis.DataSet(d.networkNodes);
        let edges = new vis.DataSet(d.networkEdges);

        // create a network
        var container = this.graphCanvas;

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};

        // initialize your network!
        var network = new vis.Network(container, data, options);
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


