import { formatHeaders, CRLF } from "./http-common";
import { compressionHandler } from "./http-compression-handler";

export type StatusCode = "200" | "400" | "500" | "404";

export class HTTPResponse {
    statusCode: StatusCode = "200";
    reason: string = "";
    headers: { [key: string]: string } = {};
    body: string | Buffer = "";

    constructor(init: Partial<HTTPResponse> = {}) {
        Object.assign(this, init);
    }

    responseFullyFormatted(): string | Buffer {
        const statusLine = `HTTP/1.1 ${this.statusCode} ${this.reason}`;
        let bodyBuffer = Buffer.isBuffer(this.body) ? this.body : Buffer.from(this.body);

        const shouldCompress = this.headers["Accept-Encoding"]?.includes("gzip");
        if (shouldCompress && bodyBuffer.length > 0) {
            bodyBuffer = compressionHandler.compress(bodyBuffer);
            this.headers["Content-Encoding"] = "gzip";
        }

        this.headers["Content-Length"] = bodyBuffer.length.toString();
        const headerString = formatHeaders(this.headers);
        const responseHead = `${statusLine}${CRLF}${headerString}${CRLF}${CRLF}`;

        return shouldCompress || Buffer.isBuffer(this.body)
            ? Buffer.concat([Buffer.from(responseHead), bodyBuffer])
            : responseHead + bodyBuffer.toString();
    }
}