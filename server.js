const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path");

const PKG_NAME = "frontend-hideyoshi.com";

const app = express();
app.use(cors());
app.use(compression());

const distFolder = path.join(process.cwd(), `dist/${PKG_NAME}/browser`);
app.use(express.static(distFolder, {
    maxAge: '1y'
}));

app.get("/*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${PKG_NAME}/browser/index.html`));
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Node Express server for ${PKG_NAME} listening on http://localhost:${process.env.PORT || 5000}`);
});
