import React, { Component } from "react";
import GenService from "../service/genService";
//import axios from "axios";
class Gen extends Component {
  state = {
    loading: true,
    person: null,
    et: "ffff",
  };

  constructor(props) {
    super(props);
    this.state = {
      messagenew: null,
      messageold: null,
      loading: true,
      similar: null,
    };

    this.refreshGen = this.refreshGen.bind(this);
  }

  async componentDidMount() {
    const url =
      "http://cors-anywhere.herokuapp.com/www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
      this.props.userInput +
      "&language=en&format=json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person: data.search[0]});
    this.refreshGen();
    this.setState({ loading: false });
    //document.getElementById("searchInput").value = "";
  }

  refreshGen() {
    GenService.retrieveAllNew(this.props.userInput) // Removed HARDCODED
      .then((response) => {
        console.log(response);
        this.setState({ messagenew: response.data });
      });

    GenService.retrieveAllSimilar(this.props.userInput)
       .then((response) => {
         console.log(response);
         var res = response.data.split(" ");
         for(var i = 0; i < res.length; i++){
           if(res[i] != ""){
             var li = document.createElement("li");
             li.appendChild(document.createTextNode(res[i]))
             document.getElementById("similaritems").append(li)
           }
         }
         this.setState({ similar: response.data })
    });
    // Code for fetching LD2NL OLD_Version Data

    // GenService.retrieveAllOld(this.props.sname) // Removed HARDCODED
    //   .then(response => {
    //     console.log(response);
    //    this.setState({ messageold: response.data });
    //   });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.person) {
      return (
        <div>
          <p class="output1" id="output1">
            Timeout or Could not find a mtach
          </p>
        </div>
      );
    }
    return (
      <React.Fragment>
       <ul class="nav nav-tabs">
            <li class="active"><a href="#output1" data-toggle="tab">Summary</a></li>
            <li><a href="#output2" data-toggle="tab">Similar Entities</a></li>
        </ul>

      <div class="tab-content">
          <div class="tab-pane active" id="output1">
            <div class="output2">
          <p class="output">
            <b>You Searched:</b> {this.props.userInput}
          </p>

          <p class="output">
            <b>Searched from </b> {this.props.data}
          </p>

          <div class="output">
            <b>wikidata dump</b>
            <p>id:{this.state.person.id}</p>
            <p>title:{this.state.person.title}</p>
            <p> pageid:{this.state.person.pageid}</p>
            <p> concepturi:{this.state.person.concepturi}</p>
            <p> label:{this.state.person.label}</p>
            <p> description:{this.state.person.description}</p>
          </div>

          <p class="output">
            <b>Summary</b>
          </p>

          <p class="output1" id="output1">
            {this.state.messagenew == null
              ? "Loading..."
              : this.state.messagenew}
          </p>

          {/* <p class = "output">Old Version</p>
        
        <p class = "output1">{this.state.messageold}</p> */}
        </div>
          </div>
          <div class="tab-pane" id="output2">
            <ul id = "similaritems">
            </ul>
          </div>
      </div>
        
      </React.Fragment>
    );
  }
}

export default Gen;
