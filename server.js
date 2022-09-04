const express = require('express');
const path = require('path');

const PKG_NAME = "frontend-hideyoshi.com";

const app = express();

app.use(express.static(`${__dirname}/dist/${PKG_NAME}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${PKG_NAME}/index.html`));
});

app.listen(process.env.PORT || 5000);