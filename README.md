# Search Directory Front End API

> API for front-end of chat repository. Used by Front-End UI and others sources.

Based on Nodejs/Express

##Git Repository structure

* Branch master : production branch, contains code deployed in production. Stable.
* Branch dev : development branch, contains current development. Stable.
* Other branches : unstable development

## NPM command

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# run unit test
npm run test:unit

# get code coverage
npm run coverage

# generate html code coverage
npm run coverage:html

# serve in production mode
npm run start
```

**/!\ for debug only**

If problems with self certificate, set env var NODE_TLS_REJECT_UNAUTHORIZED to 0 before running npm run dev
``` bash
NODE_TLS_REJECT_UNAUTHORIZED='0' npm run dev
```

For production purpose, add certificate as request option.

## Configuration

Available environment var to set :

   * *RUN_HOST* : host for production server (default : localhost)
   * *RUN_PORT* : port for production server to listen to (default : 4000) 
   * *CHATBOT_REPOSITORY_URL* : url for chatbot repositroy (default : https://pubsecbotdir.kmt.orange.com) 

