import * as net from "net";
import { HTTPResponse } from "./http/http-response";
import { HTTPParser } from "./http/http-parser";
import fileHandler from './http/http-file-handler'

const server = net.createServer((socket) => {
    const httpParser = new HTTPParser();

    socket.on("data", (data) => {
        const request = data.toString();
        const { path, headers, method, body } = httpParser.parseRequest(request);
        let response: HTTPResponse;

        if (path === "/") {
            response = new HTTPResponse({ statusCode: "200", reason: "OK" });
        } else if (path.startsWith("/echo/")) {
            const resource = path.slice(6);
            response = new HTTPResponse({
                statusCode: "200", reason: "OK", headers: {
                    "Content-Type": "text/plain",
                    "Content-Length": resource.length.toString(),
                    ...headers
                }, body: resource
            });
        } else if (path.startsWith("/user-agent")) {
            const userAgent = headers["User-Agent"] || '';

            response = new HTTPResponse({
                statusCode: "200", reason: "OK", headers: {
                    "Content-Type": "text/plain",
                    "Content-Length": userAgent.length.toString(),
                }, body: userAgent
            });
        } else if (path.startsWith("/files/")) {
            const filePath = path.slice(7);
            if (method === "GET") {
                try {
                    const fileContent = fileHandler.getFile(filePath);
                    response = new HTTPResponse({
                        statusCode: "200",
                        reason: "OK",
                        headers: {
                            "Content-Type": "application/octet-stream",
                            "Content-Length": fileContent.length.toString(),
                        },
                        body: fileContent
                    })

                } catch (error: any) {
                    if (error.code === "ENOENT") {
                        response = new HTTPResponse({ statusCode: "404", reason: "Not Found" });
                    } else {
                        response = new HTTPResponse({ statusCode: "500", reason: "Internal Server Error" });
                    }
                }
            } else if (method === "POST") {
                fileHandler.saveFile(filePath, body);
                response = new HTTPResponse({ statusCode: "201", reason: "Created" });
            }

        }
        else {
            response = new HTTPResponse({ statusCode: "404", reason: "Not Found" });
        }

        socket.write(response.responseFullyFormatted());

    })

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
