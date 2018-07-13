import * as http from 'http';

import App from '../App';

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);

function normalizePort(val: number|string): number|string|boolean {

    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) return val;
    else if (port > 0) return port;
    else return false;

}