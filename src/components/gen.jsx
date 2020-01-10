import React, { Component } from "react";
import GenService from "../service/genService";
class Gen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagenew: null,
      messageold: null
    };
    this.refreshGen = this.refreshGen.bind(this);
  }
  componentDidMount() {
    this.refreshGen();
  }
  refreshGen() {
    GenService.retrieveAllNew(this.props.sname) // Removed HARDCODED
      .then(response => {
        console.log(response);
        this.setState({ messagenew: response.data });
      });
    GenService.retrieveAllOld(this.props.sname) // Removed HARDCODED
      .then(response => {
        console.log(response);
        this.setState({ messageold: response.data });
      });
    //    GenService.pAll();
  }
  render() {
    return (
      <React.Fragment>
        <div class="output2">

        {/* <h1>Class: {"http://dbpedia.org/ontology/" + this.props.classname}</h1> */}
        <p class = "output">Search: {"http://dbpedia.org/resource/" + this.props.sname}</p>
        
        <p class = "output">Search: {this.props.data}</p>
        
        <p class = "output">New Version</p>
        
        <p class = "output1">{this.state.messagenew} I am the albet in the name of the world is the world in the world</p>
        
        <p class = "output">Old Version</p>
        
        <p class = "output1">{this.state.messageold} I am the albet in the name of the world is the world in the world I am the albet in the name of the world is the world in the world </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Gen;
