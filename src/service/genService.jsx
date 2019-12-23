import axios from "axios";

//const INSTRUCTOR = "in28minutes";
const COURSE_API_URL = "http://localhost:8080";
//const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`;

class GenService {
  constructor(props) {
    this.state = {
      summarizerData: {},
      paragraph: "Sending Hello To JAVA"
    };
  }

  retrieveAll() {
    return axios.get(`${COURSE_API_URL}`);
  }

  pAll() {
    const summarizerData = {
      paragraph: this.state.paragraph,
      creationDate: "2019-03-10T00:58:23",
      summarizedSentences: null
    };
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    axios
      .post(
        "http://localhost:8080/user/?paragraph=" + summarizerData.paragraph,
        {
          headers
        }
      )
      .then(res => console.log(res.data));
    console.log(summarizerData.paragraph);
  }
}

export default new GenService();
