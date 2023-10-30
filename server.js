

function setEnv() {
    require("dotenv").config({
        path: 'src/environments/.env'
    });

    const envsub = require("envsub");

    let options = {
        envFiles: [
            `${__dirname}/src/assets/.env`,
        ]
    }

    let templateFile = `${__dirname}/src/assets/env.sample.js`;
    let outputFile = `${__dirname}/src/assets/env.js`;

    envsub({templateFile, outputFile, options})
}

function server() {
    const express = require("express");
    const cors = require("cors");
    const path = require("path");

    const PKG_NAME = "frontend-hideyoshi.com";

    const app = express();
    app.use(cors());

    app.use(express.static(`${__dirname}/dist/${PKG_NAME}`));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(`${__dirname}/dist/${PKG_NAME}/index.html`));
    });

    app.listen(process.env.PORT || 5000);
}


setEnv();
server();
