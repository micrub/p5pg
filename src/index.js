

const static = require('node-static');
const http = require('http');
const path = require('path');

// TODO handle hot reload

/**
 * return default static content local fs path
 * @date 2021-09-09
 * @throws {InvalidArgumentException}
 * @returns {string}
 */
function publicContentSource() {
  let publicPath = path.join(__dirname, '../public');

  try {
     // A TypeError is thrown if any of the path segments is not a string.
     publicPath = path.join(__dirname, '../public'); 
     return publicPath;
  } catch (error) {
    // folowing clause is for node v14
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      throw new Error('Directory ' + __dirname + '../public' + ' not found,');
    } else {
      throw error;
    }
  }
}

const SERVER_ROOT = new(static.Server)(publicContentSource());

const options = {};

function requestListener(staticContentRoot = SERVER_ROOT) {
  return (req, res) => {
    staticContentRoot.serve(req, res);
  };
}

const server = http.createServer(options, requestListener());

server.listen(8080,()=> {
  console.warn(`http-static running on UNKNOWN|8080 host an port.`);
});

