function getPrefix() {
    if (process.argv.includes('--prod') || process.argv.includes('-p')) {
        return `${__dirname}/dist/frontend-hideyoshi.com`
    }
    return `${__dirname}/src`
}

function readDotEnv() {
    const dotenv = require('dotenv')
    dotenv.config()
}

function setEnv() {
    readDotEnv()
    let prefix = getPrefix()

    let templateFile = `${prefix}/assets/env.sample.js`
    let outputFile = `${prefix}/assets/env.js`

    const envsub = require('envsub')

    envsub({templateFile, outputFile}).then(() => {}).catch((err) => {
        console.error(err)
    });
}

setEnv()
