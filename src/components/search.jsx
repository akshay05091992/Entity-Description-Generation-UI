import React, { Component } from "react";
import ReactDOM from "react-dom";
import Side from "./side";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // classname: null,
      sname: null
    };
  }
  myChangeHandler = event => {
    function camelize(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    let itemname = camelize(event.target.value);
    itemname = itemname.replace(/ /g, "_");
    let nam = event.target.name;
    let val = itemname;
    this.setState({ [nam]: val });
  };
  
 
  render() {
    ReactDOM.render(
      // classname={this.state.classname}
      <Side sname={this.state.sname} />,
      document.getElementById("side")
      
    );
    return (      
      <React.Fragment>
        <form id="inputform">
          {/* <input
            type="text"
            placeholder="Class"
            id="classInput"
            name="classname"
            onChange={this.myChangeHandler}
          />{" "}
          &nbsp; */}
          <input
            type="text"
            class="form-control"
            placeholder="Type your search here"
            id="searchInput"
            name="sname"
            onChange={this.myChangeHandler}             
            
          />
         
        </form>
      </React.Fragment>
    );
  }
}
export default Search;
