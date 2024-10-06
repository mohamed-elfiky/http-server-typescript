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
        const emptyLine = "\r\n";
        const headerString = Object.entries(this.headers)
            .map(([key, value]) => `${key}: ${value}`)
            .join(emptyLine);

        const response = `HTTP/1.1 ${this.statusCode} ${this.reason}${emptyLine}${headerString}${emptyLine}${this.body}`;
        return response;
    }
}