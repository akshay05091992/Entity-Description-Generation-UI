import axios from "axios";
class GenService {
  retrieveAllNew(sname) {
    return axios.get("/getinfo?Subject=" + sname);
  }

  retrieveAllSimilar(sname) {
    return axios.get("/getSimilar?Subject=" + sname);
  }
  retrieveThubmnail(sname) {
    return axios.get("/getThumnail?Subject=" + sname);
  }
  retrieveThubmnailWiki(sname) {
    return axios.get("/getImage?Subject=" + sname);
  }
  retrieveAllOld(sname) {
    return axios.get("/getinfold?Subject=" + sname);
  }

  retrieveWikiData(sname) {
    return axios.get("/getWikidata?Subject=" + sname);
  }

  retrievePronunciation(sname) {
    return axios.get("/getPronunciation?Subject=" + sname);
  }
}

export default new GenService();
