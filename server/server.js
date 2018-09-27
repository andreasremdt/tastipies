const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

module.exports = express()
  .set("x-powered-by", false)
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "..", "client", "build")))
  .use("/api", apiRouter)
  .use("/auth", authRouter)
  .get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
  )
  .listen(process.env.PORT || 8080, () =>
    console.info(`Server is up and running on port ${process.env.PORT || 8080}`)
  );
