import React, { Component } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Link,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  src: `http://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf`,
});
Font.register({
  family: "Lato",
  src: `http://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf`,
});
Font.register({
  family: "Lato Italic",
  src: `http://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf`,
});
Font.register({
  family: "Lato Bold",
  src: `http://fonts.gstatic.com/s/lato/v11/8TPEV6NbYWZlNsXjbYVv7w.ttf`,
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
  },
  image: {
    marginBottom: 60,
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontfamily: "Lato Bold",
    textAlign: "center",
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
  //head
  hcontainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
  },
  hdetailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },
  hlinkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  hname: {
    fontSize: 24,
    fontfamily: "Lato Bold",
  },
  hsubtitle: {
    fontSize: 10,
    justifySelf: "flex-end",
    fontfamily: "Lato",
  },
  hlink: {
    fontfamily: "Lato",
    fontSize: 10,
    color: "blue",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  //headend
  //left
  lcontainer: {
    marginBottom: 10,
  },
  lschool: {
    fontfamily: "Lato Bold",
    fontSize: 10,
  },
  ldegree: {
    fontfamily: "Lato",
    fontSize: 10,
  },
  lcandidate: {
    fontfamily: "Lato Italic",
    fontSize: 10,
  },
  //leftend
  //title
  ttitle: {
    fontfamily: "Lato Bold",
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  //titleend
  //skills
  stitle: {
    fontfamily: "Lato Bold",
    fontSize: 11,
    marginBottom: 10,
  },
  sskills: {
    fontfamily: "Lato",
    fontSize: 10,
    marginBottom: 10,
  },
  //skillsend

  //right
  rcontainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,

    "@media max-width: 400": {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  rentryContainer: {
    marginBottom: 10,
  },
  rdate: {
    fontSize: 11,
    fontFamily: "Lato Italic",
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
  },
  rdetailContainer: {
    flexDirection: "row",
  },
  rdetailLeftColumn: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  rdetailRightColumn: {
    flexDirection: "column",
    flexGrow: 9,
  },
  rbulletPoint: {
    fontSize: 10,
  },
  rdetails: {
    fontSize: 10,
    fontFamily: "Lato",
  },
  rheaderContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rleftColumn: {
    flexDirection: "column",
    flexGrow: 9,
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
  },
  rrightColumn: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-end",
    justifySelf: "flex-end",
  },
  rtitle: {
    fontSize: 11,
    color: "black",
    textDecoration: "none",

    fontfamily: "Lato Bold",
  },
  //rightend
  //para
  pitem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  pbulletPoint: {
    width: 10,
    fontSize: 10,
  },
  pitemContent: {
    flex: 1,
    fontSize: 12,
    fontfamily: "Lato",
  },
  //paraend
  dtitle: {
    fontfamily: "Lato Bold",
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase",
    textAlign: "center",
  },
  wpitem: {
    flexDirection: "row",
    marginBottom: 120,
  },
});

class Download extends Component {
  render() {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.hcontainer}>
            <View style={styles.hdetailColumn}>
              <Text style={styles.hname}>{this.props.name}</Text>
              <Text style={styles.hsubtitle}>Summary Report</Text>
            </View>
            <View style={styles.hlinkColumn}>
              <Link
                src="https://github.com/akshay05091992/Entity-Description-Generation-UI"
                style={styles.hlink}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.leftColumn}>
              {this.props.db === "both" || this.props.db === "wikidata" ? (
                <Image
                  src={"http://cors-anywhere.herokuapp.com/" + this.props.wim}
                  style={styles.image}
                />
              ) : null}

              {this.props.db === "both" || this.props.db === "dbpedia" ? (
                <Image
                  src={"http://cors-anywhere.herokuapp.com/" + this.props.dim}
                  style={styles.image}
                />
              ) : null}
            </View>
            <View style={styles.rcontainer}>
              {this.props.db === "both" || this.props.db === "wikidata" ? (
                <div className="wksum">
                  <Text style={styles.dtitle}>WIKI</Text>
                  <View style={styles.rentryContainer}>
                    <View style={styles.rheaderContainer}>
                      <View style={styles.rleftColumn}>
                        <Text style={styles.rtitle}>SUMMARY</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.wpitem}>
                    <Text style={styles.pitemContent}>{this.props.ws}</Text>
                  </View>
                </div>
              ) : null}
              {this.props.db === "both" || this.props.db === "dbpedia" ? (
                <div>
                  <Text style={styles.dtitle}>DBPEDIA</Text>
                  <View style={styles.rentryContainer}>
                    <View style={styles.rheaderContainer}>
                      <View style={styles.rleftColumn}>
                        <Text style={styles.rtitle}>OLD SUMMARY</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.pitem}>
                    <Text style={styles.pitemContent}>{this.props.dolds}</Text>
                  </View>
                  <View style={styles.rentryContainer}>
                    <View style={styles.rheaderContainer}>
                      <View style={styles.rleftColumn}>
                        <Text style={styles.rtitle}>NEW SUMMARY</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.pitem}>
                    <Text style={styles.pitemContent}>{this.props.dnews}</Text>
                  </View>
                </div>
              ) : null}
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}

export default Download;
