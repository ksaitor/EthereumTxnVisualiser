import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {Graph} from 'react-d3-graph';
import {DotLoader} from 'react-spinners';
import Particles from 'react-particles-js';


import windowSize from 'react-window-size';
import "./AddressEntry.css";

const containerStyles = {
    width: '100%',
    height: '80vh',
}


const myConfig = {
    //directed: true,
    width: '1000',
    height: '1000',
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    automaticRearrangeAfterDropNode: true,
    //staticGraph: true,
    //directed: true,
    d3: {
        gravity: -200,
        linkStrength: 3
    },
    node: {
        color: 'lightgreen',
        highlightStrokeColor: 'blue',
        renderLabel: false,
        //svg: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg'
        //symbolType: 'diamond'
    },
    link: {
        highlightColor: 'lightblue',
        renderLabel: true,
        fontColor: "white",
    }
};

class CustomGraph extends Component {
    state = {
        nodeSize: 0,
    };

    setConfig(config) {
        config.node.size = 5000 / this.props.graph.nodes.length;
        config.width = this.props.windowWidth
        config.height = this.props.windowHeight
        return config;
    }


    componentDidMount = async () => {
        //this.setState({graphData: this.props.graph})
        // console.log(this.props.graph.nodes)
        // console.log(this.props.graph.edges)
    }

    componentDidUpdate = async () => {
        // console.log(this.props.graph.nodes)
        // console.log(this.props.graph.edges)
    }


    getGraphRender = () => {
        console.log(this.props.isLoading);
        if (!this.props.dataSet) {
            if (this.props.isLoading == true) {
                // setTimeOut(function(){
                //
                // }, 3000);
                return (
                    <div className="loader">
                        <DotLoader
                            sizeUnit={"px"}
                            size={200}
                            color={'lightgreen'}
                            loading={this.props.isLoading}/>
                    </div>
                );
            } else {
                return (
                        <div className="particles">
                            <Particles
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 130
                                        },
                                        "size": {
                                            "value": 3
                                        },
                                        "color": {
                                          "value": "#90EE90"
                                        }
                                    },
                                    "interactivity": {
                                        "events": {
                                            "onhover": {
                                                "enable": true,
                                                "mode": "grab"
                                            },
                                            "onclick": {
                                                "enable": true,
                                                "node": "push"
                                            }
                                        }
                                    }
                                }}
                                width={this.props.windowWidth}
                                height={this.props.windowHeight}
                                style={{zIndex: 1}}/>
                            <div className="landingPage">
                                <h1>Ethereum Visualizer</h1>
                                <h2>Search an Eth Address and trace its transactions</h2>
                            </div>
                        </div>
                );
            }
        } else {
            return (
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={this.props.graph}
                    config={this.setConfig(myConfig)}
                    style={{width: '100%!important', height: '100vh!important'}}
                    onMouseOverNode={this.props.onHoverNode}
                    onClickGraph={this.props.onClickGraph}
                    onClickNode={this.props.onClickNode}
                    onClickLink={this.props.onClickLink}
                />
            )
        }
    }

    render() {

        return (
            <div>
                {this.getGraphRender()}
            </div>
        )
    }
}

export default windowSize(CustomGraph);
