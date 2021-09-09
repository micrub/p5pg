const static = require('node-static');
const http = require('http');
const path = require('path');
const config = require('config');

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
function getPublicSource() {
    return publicContentSource();
}

const PUBLIC_SRC = getPublicSource();
const SERVER_ROOT = new(static.Server)(PUBLIC_SRC);

function staticContentRequestListener(staticContentRoot = SERVER_ROOT) {
    // TODO refactor for custom static root folders
    process.env.PUBLIC_SRC = PUBLIC_SRC;
    return (req, res) => {
        staticContentRoot.serve(req, res);
    };
}

//TODO jsdocs
function startHttpd(options = {}, 
    requestListener = staticContentRequestListener(), 
    onListen) {
    const server = http.createServer(options, requestListener);
    // TODO refactor for custom static root folders
    const rootFolder = process.env.PUBLIC_SRC;
    if (!onListen) {
        onListen = defaultListener(server);
    }
    server.listen(8080,'localhost', onListen);

    if(config.livereload) {
        var livereload = require('livereload');
        var lrserver = livereload.createServer();
        lrserver.watch(path.join(rootFolder,'sketches'));
    }


    function defaultListener(server) {
        return () => {
            const instanceAddress = server.address();
            const port = instanceAddress.port;
            const address = instanceAddress.address;


            //TODO print source directory
            function formatMessage(address, port, rootFolder) {
                let msg = 'Start http-static on '; 
                msg += `'http://${address}:${port}', ${rootFolder}`;
                return msg;
            }
            
            console.info(formatMessage(address, port, rootFolder));
        };
    }
}
//TODO lyfecicle managed using npm runscript

// eslint-disable-next-line no-unused-vars
const server = startHttpd();
// TODO stop on signal
// server.stop(()=>{
//     log('stopped')
// })

