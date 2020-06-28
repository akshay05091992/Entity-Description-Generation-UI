import React, { Component } from "react";
import GenService from "../service/genService";
import Axios from "axios";
//import ReactDOM from "react-dom";
// import Highlighter from "react-highlight-words";

class Gen extends Component {
  state = {
    loading: true,
    person: null,
    et: "ffff",
    errorsimilar: false,
    thumbnailImage: "",
    similar: null,
    sname: "",
    audio: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      messagenew: "Loading...",
      messageold: "Loading...",
      messagewiki: "Loading...",
      loading: true,
      similar: null,
      errorsimilar: false,
      image: "",
      imageWiki: "",
      thumbnailImage: "",
      sname: "",
      wsubject: "",
      wpredicate: "",
      audio: ""
    };

    this.refreshGen = this.refreshGen.bind(this);
    this.createItems = this.createItems.bind(this);
  }

  async componentDidMount() {
    const url =
      "http://cors-anywhere.herokuapp.com/www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
      this.props.userInput +
      "&language=en&format=json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person: data.search[0] });
    this.setState({ sname: this.props.userInput });
    this.refreshGen();
    this.setState({ loading: false });
    document.getElementById("audio").style = "display:none";
    document.getElementById("audio-button").addEventListener("click",function (event){
      document.getElementById("audio").play();
    });
    console.log(this.props.userInput);

    //document.getElementById("searchInput").value = "";
  }

  async createItems() {
    if (this.state.similar !== null && this.state.similar.indexOf(" ") !== -1) {
      var res = this.state.similar.split(" ");
      var name = "";

      for (var i = 0; i < res.length; i++) {
        name = res[i];
        if (name === "") {
          continue;
        }
        console.log("name" + name);
        if (name.lastIndexOf("/") !== -1) {
          name = name.substring(name.lastIndexOf("/") + 1, name.length);
        }
        this.name = name;
        await GenService.retrieveThubmnail(name).then((response) => {
          if (response.status === 200) {
            this.setState({ thumbnailImage: response.data });
            this.create();
          } else {
            this.setState({ errorsimilar: true });
          }
        });
      }
    }
  }

  sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  async loadSummary(name) {
    document.getElementById("output1href").click();
    console.log("new name" + name);
    const url =
      "http://cors-anywhere.herokuapp.com/www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
      name +
      "&language=en&format=json";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person: data.search[0] });
    this.setState({ sname: name });
    document.getElementById("searchInput").setAttribute("disabled", false);
    document.getElementById("searchInput").value = name;
    var elem = document.getElementsByClassName("lielement");
    for (var i = 0; i < elem.length; i++) {
      elem[i].remove();
    }

    this.refreshGen();
  }

  create() {
    var ul = document.getElementById("similaritems");
    var li = document.createElement("li");
    var div = document.createElement("div");
    var img = document.createElement("img");
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    var name = this.name;
    // while (name.indexOf("_") !== -1) {
    //   name = name.replace("_", " ");
    // }
    a.onclick = () => {
      this.loadSummary(name);
    };
    console.log("name122" + name);
    var text = document.createTextNode("   " + name);
    img.setAttribute("src", this.state.thumbnailImage);
    img.setAttribute("alt", "Loading");
    img.setAttribute("class", "thumb-image-small");
    div.setAttribute("class", "similar-box");
    div.appendChild(img);
    div.appendChild(text);
    a.appendChild(div);
    li.setAttribute("class", "lielement");
    li.appendChild(a);
    ul.appendChild(li);
  }

  refreshGen() {
    console.log("name in regresh"+this.state.sname);
    console.log("name2 in regresh"+this.props.userInput);
    if (this.state.sname === "" || this.state.sname === null) {
      let s = document.getElementById("searchInput").value;
      this.setState({ sname: s });
    }
    var regex = "";
    Axios({
      method: "get",
      url:
        "http://cors-anywhere.herokuapp.com/api.redirect-checker.net/?url=http://dbpedia.org/resource/" +
        this.state.sname +
        "&format=json",
      //   "&maxResults=5&format=json",
    }).then((response) => {
      var len = response.data.data.length - 1;
      var path = response.data.data[len].request.info.idn.path;
      regex = path.replace("/page/", "");

      console.log(regex);
      this.setState({ sname: regex });
      if(this.props.value === "dbpedia"){
        for(const s of document.getElementsByClassName("wikidatasummary")){
          s.style = "display:none";  
        }
        document.getElementById("wikiImage").style = "display:none";
        
      }else if(this.props.value === "wikidata"){
        for(const s of document.getElementsByClassName("dbpediasummary")){
          s.style = "display:none";  
        }
        document.getElementById("dbImage").style = "display:none";
      }
      if(this.props.value === "dbpedia" || this.props.value === "both"){
        GenService.retrieveThubmnail(this.state.sname)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.setState({ image: response.data });
          } else {
            this.setState({ image: "" });
          }
        })
        .catch((error) => {
          this.setState({ image: "" });
        });
        GenService.retrieveAllNew(this.state.sname) // Removed HARDCODED
          .then((response) => {
            if (response.status === 200) {
              this.setState({ messagenew: response.data });
              // ReactDOM.render(
              //   <Highlighter
              //     highlightClassName="YourHighlightClass"
              //     searchWords={[
              //       "They",
              //       "Her",
              //       "His",
              //       "He",
              //       "She",
              //       "It",
              //       "was a German Scientist",
              //     ]}
              //     caseSensitive={true}
              //     textToHighlight={this.state.messagenew}
              //   />,
              //   document.getElementById("outputnew")
              // );
            } else {
              this.setState({ messagenew: "Error or Timeout, Refresh!" });
            }
          })
          .catch((error) => {
            // console.log("hfffff");
            this.setState({ messagenew: "Error or Timeout, Refresh!" });
          });
       }
      GenService.retrieveAllSimilar(this.state.sname).then((response) => {
        if (response.status === 200) {
          //  console.log("Hello" + response.data);
          this.setState({ similar: response.data });

          this.createItems();
        } else {
          this.setState({ errorsimilar: true });
        }
      });

      GenService.retrievePronunciation(this.state.person.id).then((response) => {
        if (response.status === 200) {
          //  console.log("Hello" + response.data);
          this.setState({ audio: response.data });
          document.getElementById("audio-button").style = "display:inline-block";
        } else {
          this.setState({ audio: "" });
          document.getElementById("audio-button").style = "display:none";
        }
      });

      // Code for fetching LD2NL OLD_Version Data
      if(this.props.value === "dbpedia" || this.props.value === "both"){
      GenService.retrieveAllOld(this.state.sname) // Removed HARDCODED
        .then((response) => {
          if (response.status === 200) {
            this.setState({ messageold: response.data });
          } else {
            this.setState({ messageold: "Error or Timeout, Refresh!" });
          }
        })
        .catch((error) => {
          this.setState({ messageold: "Error or Timeout, Refresh!" });
        });
      }
      if(this.props.value === "wikidata" || this.props.value === "both"){
      GenService.retrieveThubmnailWiki(this.state.person.id)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.setState({ imageWiki: response.data });
          } else {
            this.setState({ imageWiki: "" });
          }
        })
        .catch((error) => {
          this.setState({ imageWiki: "" });
        });
      GenService.retrieveWikiData(this.state.person.id) // Removed HARDCODED
        .then((response) => {
          if (response.status === 200) {
            this.setState({ messagewiki: response.data });
          } else {
            this.setState({ messagewiki: "Error or Timeout, Refresh!" });
          }
        })
        .catch((error) => {
          this.setState({ messagewiki: "Error or Timeout, Refresh!" });
        });
        }
      });
    //this.setState({ sname: this.props.userInput });
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
          <li id="summarytab" class="active">
            <a id="output1href" href="#output1" data-toggle="tab">
              Summary
            </a>
          </li>
          <li id="similartab">
            <a href="#output2" data-toggle="tab">
              Similar Entities
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="output1">
            <img class="thumb-image" id = "wikiImage" src={this.state.imageWiki} alt="Loading" />
            <div class="output2">
              <p class="output">
                <b>You Searched:</b> {this.state.sname}
                <svg id="audio-button" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
                <audio id="audio" src={this.state.audio}></audio>
              </p>
              <p class="output">
                <b>Searched from </b> {this.props.value}
                {/* <b>Searched from </b> {this.props.data} */}
              </p>
              <p class="output wikidatasummary">
                <b>------------WIKIDATA--------------</b>
              </p>
              <p class="output wikidatasummary">
                <b>wikidata Summary</b>
              </p>
              <p class="output1 wikidatasummary" id="output1">
                {this.state.messagewiki}
              </p>
              <p class="output dbpediasummary">
                <b>------------DBPEDIA--------------</b>
              </p>
              <img class="thumb-image"  id = "dbImage" src={this.state.image} alt="Loading" />
              <p class="output dbpediasummary">
                <b>Old Summary</b>
              </p>
              <p class="output1 dbpediasummary" id="output1">
                {this.state.messageold}
              </p>
              <p class="output dbpediasummary">
                <b>New Summary</b>
              </p>
              <p class="output1 dbpediasummary" id="outputnew">
                {this.state.messagenew}
              </p>
              {/* <p class="output">
                <b>654654645456456454564564656564</b>
              </p>
              <p class="output1" id="boo"></p> */}
              {/* <p class = "output">Old Version</p>
        
        <p class = "output1">{this.state.messageold}</p> */}
            </div>
          </div>
          <div class="tab-pane" id="output2">
            <ul id="similaritems">
              {this.state.errorsimilar === false ? (
                " "
              ) : (
                <p class="error">Error or Timeout, Refresh!</p>
              )}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gen;
