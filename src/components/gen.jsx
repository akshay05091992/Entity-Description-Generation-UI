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
        {/* <h1>Class: {"http://dbpedia.org/ontology/" + this.props.classname}</h1> */}
        <h1>Search: {"http://dbpedia.org/resource/" + this.props.sname}</h1>
        &nbsp;
        <h1>Search: {this.props.data}</h1>
        &nbsp;
        <h1>New Version</h1>
        &nbsp;
        <h2>{this.state.messagenew}</h2>
        &nbsp;
        <h1>Old Version</h1>
        &nbsp;
        <h2>{this.state.messageold}</h2>
      </React.Fragment>
    );
  }
}

export default Gen;
