import React, { Component } from "react";
import GenService from "../service/genService";
class Gen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
    this.refreshGen = this.refreshGen.bind(this);
  }
  componentDidMount() {
    this.refreshGen();
  }
  refreshGen() {
    GenService.retrieveAll(this.props.classname,this.props.sname) // Removed HARDCODED
      .then(response => {
        console.log(response);
        this.setState({ message: response.data });
      });
    GenService.pAll();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Class: {"http://dbpedia.org/ontology/" + this.props.classname}</h1>
        <h1>Search: {"http://dbpedia.org/resource/" + this.props.sname}</h1>
        <h1>Search: {this.props.data}</h1>
        <h2>Auto Generate</h2>
        <h2>{this.state.message}</h2>

      </React.Fragment>
    );
  }
}

export default Gen;
