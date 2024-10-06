export class HTTPParser {

    parseRequest(request: string) {
        const requestLines = request.split('\r\n');

        if (requestLines.length === 0) {
            throw new Error('Invalid HTTP request');
        }

        const path = requestLines[0].split(' ')[1];


        return path

    }
}