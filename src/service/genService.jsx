import axios from "axios";

//const INSTRUCTOR = "in28minutes";
//const COURSE_API_URL = "http://localhost:8080";
//const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`;

class GenService {
  // constructor(props) {
  //   this.state = {
  //     summarizerData: {},
  //     paragraph: "Sending Hello To JAVA"
  //   };
  // }
  //retrieveAll() {
  //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class=Scientist&Subject=Albert_Einstein');
  //}
  retrieveAllNew(sname) {
    //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class='+var1+'&Subject='+var2);  // added variables to retrieve
    // sname = sname.toString();
    // if (sname.includes(" ")) {
    //   sname = sname.replace(" ", "_");
    // }
    return axios.get("/getinfo?Subject=" + sname);
    // added variables to retrieve
  }

  retrieveAllSimilar(sname) {
    //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class='+var1+'&Subject='+var2);  // added variables to retrieve
    // sname = sname.toString();
    // if (sname.includes(" ")) {
    //   sname = sname.replace(" ", "_");
    // }
    return axios.get("/getSimilar?Subject=" + sname);
  }
  retrieveThubmnail(sname) {
    //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class='+var1+'&Subject='+var2);  // added variables to retrieve
    // sname = sname.toString();
    // if (sname.includes(" ")) {
    //   sname = sname.replace(" ", "_");
    // }
    return axios.get("/getThumnail?Subject=" + sname);
    // added variables to retrieve
  }
  retrieveThubmnailWiki(sname) {
    //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class='+var1+'&Subject='+var2);  // added variables to retrieve
    // sname = sname.toString();
    // if (sname.includes(" ")) {
    //   sname = sname.replace(" ", "_");
    // }
    return axios.get("/getImage?Subject=" + sname);
    // added variables to retrieve
  }
  retrieveAllOld(sname) {
    //return axios.get('http://localhost:8080/resttest/v1/resource1/getinfo?Class='+var1+'&Subject='+var2);  // added variables to retrieve
    // sname = sname.toString();
    // if (sname.includes(" ")) {
    //   sname = sname.replace(" ", "_");
    // }
    return axios.get("/getinfold?Subject=" + sname); // added variables to retrieve
  }

  retrieveWikiData(sname) {
    return axios.get("/getWikidata?Subject=" + sname); // added variables to retrieve
  }

  retrievePronunciation(sname) {
    return axios.get("/getPronunciation?Subject=" + sname); // added variables to retrieve
  }

  // pAll() {
  //   const summarizerData = {
  //     paragraph: this.state.paragraph,
  //     creationDate: "2019-03-10T00:58:23",
  //     summarizedSentences: null
  //   };
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     "Content-Type": "application/json"
  //   };
  //   axios
  //     .get(
  //       //"http://localhost:8080/user/?paragraph=" + summarizerData.paragraph,
  //       "http://localhost:8080/resttest/v1/resource1/getinfo?Class=Scientist&Subject=Albert_Einstein",
  //       //"http://localhost:8080/resttest/v1/resource1/getinfo?Class="+var1+"&Subject="+var2,
  //       {
  //         headers
  //       }
  //     )
  //     .then(res => console.log(res.data));
  //   //console.log(summarizerData.paragraph);
  // }
}

export default new GenService();
