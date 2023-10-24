<div align="center">
  <a href="https://github.com/HideyoshiNakazone/hideyoshi.com">
    <img src="https://drive.google.com/uc?export=view&id=1ka1kTMcloX_wjAlKLET9VoaRTyRuGmxQ" width="100" height="100" allow="autoplay"\>
  </a>
</div>


# frontend-hideyoshi.com

Made using Angular2+, this project was made as the frontend of the [hideyoshi.com project](https://github.com/HideyoshiNakazone/hideyoshi.com). All code in this repo is distributed freely by the GPLv3 License.


## Environment Variables

For the execution of this project a `src/assets/env.js` file must be created using the template `src/assets/env.sample.js`. In there the following environment variables must be set:

`PORT`

`BACKEND_URL`

`BACKEND_OAUTH_URL`


## Usage

Installing Dependencies:

```bash
npm install
```

Building Project

```bash
npm install -g @angular/cli@16
ng build --configuration=production
```

Serving Files using Express Node.js

```bash
npm start
```


## Authors

- [@HideyoshiNakazone](https://github.com/HideyoshiNakazone)

