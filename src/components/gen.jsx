import React, { Component } from "react";
import GenService from "../service/genService";
//import axios from "axios";
class Gen extends Component {
  state = {
    loading: true,
    person: null,
    et: "ffff",
    errorsimilar: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      messagenew: "Loading...",
      messageold: null,
      loading: true,
      similar: null,
      errorsimilar: false,
      image: "",
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
        GenService.retrieveAllSimilar(this.props.userInput)
       .then((response) => {
         
         if(response.status == 200){
           var res = response.data.split(" ");
           for(var i = 0; i < res.length; i++){
           if(res[i] != ""){
             var li = document.createElement("li");
             li.appendChild(document.createTextNode(res[i]))
             document.getElementById("similaritems").append(li)
             }
           }  
         }else{
           this.setState({ errorsimilar: true})
         }
         
         this.setState({ similar: response.data })
    }).catch((error) => {
      this.setState({ errorsimilar: true})
    })

    GenService.retrieveThubmnail(this.props.userInput)
    .then((response) => {
         console.log(response);
         if(response.status == 200){
           this.setState({ image : response.data  }) 
         }else{
           this.setState({ image: ""})
         }
    }).catch((error) => {
      this.setState({ image: ""})
    })
    GenService.retrieveAllNew(this.props.userInput) // Removed HARDCODED
      .then((response) => {
        
        if(response.status == 200){
          this.setState({ messagenew: response.data });  
        }else{
          this.setState({ messagenew: "Error or Timeout, Refresh!" });
        }
        
      }).catch((error) => {
      this.setState({ messagenew: "Error or Timeout, Refresh!"})
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
          <img class = "thumb-image" src = { this.state.image } />
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
            { this.state.messagenew }
          </p>    

          {/* <p class = "output">Old Version</p>
        
        <p class = "output1">{this.state.messageold}</p> */}
        </div>
          </div>
          <div class="tab-pane" id="output2">
            <ul id = "similaritems">
          { this.state.errorsimilar == false
            ? " "
              : <p class = "error">Error or Timeout, Refresh!</p>  }
             </ul>
          </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Gen;
