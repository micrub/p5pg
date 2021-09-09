const static = require('node-static');
const http = require('http');
const path = require('path');

// TODO handle hot reload

/**
 * Custom InvalidArgumentException error type
 * @date 2021-09-09
 * @param {any} message
 * @returns {any}
 */
class InvalidArgumentException extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = 'InvalidArgumentException';
    }
}

/**
 * Return default static content local fs path
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
        // folowing clause is for node v14 error handling
        if (error.code === 'ERR_INVALID_ARG_TYPE') {
            const message =`Directory ${__dirname }../public` + ' not found.';
            throw new InvalidArgumentException(message);
        } else {
            throw error;
        }
    }
}

//TODO refactor to di
//TODO jsdocs
const SERVER_ROOT = new(static.Server)(publicContentSource());
function staticContentRequestListener(staticContentRoot = SERVER_ROOT) {
    return (req, res) => {
        staticContentRoot.serve(req, res);
    };
}

//TODO jsdocs
function startHttpd(options = {}, 
    requestListener = staticContentRequestListener(), 
    onListen) {
    const server = http.createServer(options, requestListener);

    if (!onListen) {
        onListen = defaultListener(server);
    }
    server.listen(8080, onListen);

    function defaultListener(server) {
        return () => {
            console.warn(`http-static running on ${  server.port}` );
        };
    }
}
//TODO lyfecicle managed using npm runscript
startHttpd();

