var http = require('http');
var request = require('request');

function get(path, success, error){ //http://nodejs.org/dist/index.json
   http.get(path, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
         error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
         error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
      }
      if (error) {
         console.error(error.message);
         // consume response data to free up memory
         res.resume();
         return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
         try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            success(parsedData);
         } catch (e) {
            console.error(e.message);
         }
      });
   }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
      error(e.message)
   });
}

function doRequest(url) {
   return new Promise ((resolve, reject) => {
      request(url, (error, res, body) => {
         if (!error && res.statusCode === 200) {
            resolve(body);
         } else {
            reject(error);
         }
      });
   });
}

module.exports = {
   get: get,
   request: doRequest
}