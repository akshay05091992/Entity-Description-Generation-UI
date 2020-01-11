import React, { Component } from "react";
import ReactDOM from "react-dom";
import Gen from "./gen";
class Side extends Component {
  constructor() {
    super();

    this.state = {
      data: "DBPEDIA",
      messagenew: null,
      messageold: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({
      data: event.target.value
       });
     
  }

  handleSubmit(event) {
    event.preventDefault();
    ReactDOM.render(
      <Gen
        //classname={this.props.classname}
        sname={this.props.sname}
        data={this.state.data}
        download={this.download}
      />,
      document.getElementById("gen")
    );
   
  }
  //for downloading....
  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('gen').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  // axios({
        //   url: 'http://localhost:8080/resttest/v1/resource1/getinfo?Subject=',
        //   method: 'GET',
        //   responseType: 'blob', // important
        // }).then((response) => {
        //   const url = window.URL.createObjectURL(new Blob([response.data]));
        //   const link = document.createElement('a');
        //   link.href = url;
        //   link.setAttribute('download', 'file.pdf');
        //   document.body.appendChild(link);
        //   link.click();
        // });
  // download = () => {
  // 		fetch(this.messagenew)
	// 		.then(response => {
	// 			response.blob().then(blob => {
	// 				let url = window.URL.createObjectURL(blob);
	// 				let a = document.createElement('a');
	// 				a.href = url;
	// 				a.download = 'Summary.text';
	// 				a.click();
	// 			});
  //       //window.location.href = response.url;	
  //   });
    
  // }
//   download(){  
//   var newdata = new Blob([''], {type: 'text/plain'});
//   var csvURL = window.URL.createObjectURL(newdata);
//  let tempLink = document.createElement('a');
//   tempLink.href = csvURL;
//   tempLink.setAttribute('download', 'filename.text');
//   tempLink.click()
  
//   }    

  render() {
    return (
      <React.Fragment>
        <div class="container">
          <form onSubmit={this.handleSubmit}>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="DBPEDIA"
                  class="form-check-input"
                  checked={this.state.data === "DBPEDIA"}
                  onChange={this.handleChange}
                  />
                DBPEDIA
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="WIKIDATA"
                  class="form-check-input"
                  checked={this.state.data === "WIKIDATA"}
                  onChange={this.handleChange}
                  disabled
                />
                WIKIDATA
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="BOTH"
                  class="form-check-input"
                  checked={this.state.data === "BOTH"}
                  onChange={this.handleChange}
                 disabled
                />
                BOTH
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Generate
            </button>
            <button type="submit" class="btn btn-primary" onClick={this.downloadTxtFile}>
            {/* <a type="submit" class="btn btn-primary" href="javascript.void(0)" download="data.text">    */}
                          Download 
                           
                          {/* </a> */}
              </button>

                      </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Side;
 