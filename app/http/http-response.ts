import { formatHeaders, CRLF } from "./http-common";

export type StatusCode = "200" | "400" | "500" | "404";

export class HTTPResponse {
    statusCode: StatusCode = "200";
    reason: string = "";
    headers: { [key: string]: string } = {};
    body: string = "";

    constructor(init: Partial<HTTPResponse> = {}) {
        Object.assign(this, init);
    }

    responseFullyFormatted(): string {
        const statusLine = `HTTP/1.1 ${this.statusCode} ${this.reason}`;
        const headerString = formatHeaders(this.headers);

        const response = `${statusLine}${CRLF}${headerString}${CRLF}${CRLF}${this.body}`;
        return response;
    }
}