const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path");

const PKG_NAME = "frontend-hideyoshi.com";

const app = express();
app.use(cors());

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }))
app.use(express.static(`${__dirname}/dist/${PKG_NAME}`));

app.get("/*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${PKG_NAME}/index.html`));
});

app.listen(process.env.PORT || 5000);
