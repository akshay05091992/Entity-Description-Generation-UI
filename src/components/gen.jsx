import React, { Component } from "react";
import GenService from "../service/genService";
//import axios from "axios";
class Gen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagenew: null,
      messageold: null,
          };
    this.refreshGen = this.refreshGen.bind(this);
  }
  
  componentDidMount() {
    this.refreshGen();
    document.getElementById("searchInput").value = "";
    
   }
      
  refreshGen() {
    GenService.retrieveAllNew(this.props.sname) // Removed HARDCODED
      .then(response => {
        console.log(response);
        this.setState({ messagenew: response.data });
      });
                         
    // Code for fetching LD2NL OLD_Version Data
      
    // GenService.retrieveAllOld(this.props.sname) // Removed HARDCODED
    //   .then(response => {
    //     console.log(response);
    //    this.setState({ messageold: response.data });
    //   });
      
    }
  
     render()
  
  {
    
    return (
      <React.Fragment>
        <div class="output2">

       
        <p class = "output"><b>You Searched:</b> {this.props.sname}</p>
        
        <p class = "output"><b>Searched from </b> {this.props.data}</p>
        
        <p class = "output"><b>Summary</b></p>
        
        <p class = "output1" id = "output1">{this.state.messagenew==null?"Loading...":this.state.messagenew}</p>
        
        {/* <p class = "output">Old Version</p>
        
        <p class = "output1">{this.state.messageold}</p> */}

        </div>
       
      </React.Fragment>
    );
  }
}

export default Gen;
