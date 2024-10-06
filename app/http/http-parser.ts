import { parseHeaders, type Headers } from './http-common';

export class HTTPParser {

    parseRequest(request: string): { path: string, headers: Headers } {
        const requestLines = request.split('\r\n');

        if (requestLines.length === 0) {
            throw new Error('Invalid HTTP request');
        }

        const path = requestLines[0].split(' ')[1];
        const headers = parseHeaders(requestLines.slice(1));

        console.log(headers)

        return { path, headers };
    }
}