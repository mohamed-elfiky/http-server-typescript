export type Headers = { [key: string]: string };
export type StatusCode = "200" | "400" | "404" | "500" | "201";
export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type Encodings = "gzip";

export const CRLF = '\r\n';

export function parseHeaders(headerLines: string[]): Headers {
    const headers: Headers = {};
    for (const line of headerLines) {
        if (line === '') break;
        const [key, value] = line.split(': ', 2);
        if (key && value) {
            if (key === "Accept-Encoding") {

                const encodingList = value.split(',').map(encoding => encoding.trim());

                if (encodingList.includes("gzip")) {
                    headers["Content-Encoding"] = "gzip"

                }
            } else {
                headers[key] = value;
            }
        }
    }
    return headers;
}

export function formatHeaders(headers: Headers): string {
    return Object.entries(headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join(CRLF);
}

