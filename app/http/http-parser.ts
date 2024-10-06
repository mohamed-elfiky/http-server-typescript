import { parseHeaders, type Headers, type Method } from './http-common';

export class HTTPParser {

    parseRequest(request: string): { path: string, headers: Headers, method: Method, body: string } {
        const requestLines = request.split('\r\n');

        if (requestLines.length === 0) {
            throw new Error('Invalid HTTP request');
        }

        const [method, path, httpVersion] = requestLines[0].split(' ');

        const headers = parseHeaders(requestLines.slice(1));

        const body = requestLines[requestLines.length - 1];

        return { path, headers, method: method as Method, body };
    }
}