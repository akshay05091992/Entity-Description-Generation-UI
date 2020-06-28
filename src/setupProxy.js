const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/getinfo",
    createProxyMiddleware({
      target: "http://localhost:8080/resttest/v1/resource1",
    })
  ),
    app.use(
      "/getSimilar",
      createProxyMiddleware({
        target: "http://localhost:8080/resttest/v1/resource1",
      })
    ),
    app.use(
      "/getThumnail",
      createProxyMiddleware({
        target: "http://localhost:8080/resttest/v1/resource1",
      })
    ),
    app.use(
      "/getImage",
      createProxyMiddleware({
        target: "http://localhost:8080/resttest/v1/resource1",
      })
    ),
    app.use(
      "/getPronunciation",
      createProxyMiddleware({
        target: "http://localhost:8080/resttest/v1/resource1",
      })
    ),
    app.use(
      "/getWikidata",
      createProxyMiddleware({
        target: "http://localhost:8080/resttest/v1/resource1",
      })
    ),
    app.use(
      "/getinfold",
      createProxyMiddleware({
        target: "http://localhost:7000/resttest/v2/resource1",
        changeOrigin: true,
      })
    );
};
