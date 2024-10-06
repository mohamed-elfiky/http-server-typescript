import * as net from "net";
import { HTTPResponse } from "./http/http-response";
import { HTTPParser } from "./http/http-parser";

const server = net.createServer((socket) => {
    const httpParser = new HTTPParser();

    socket.on("data", (data) => {
        const request = data.toString();
        const { path } = httpParser.parseRequest(request);
        let response: HTTPResponse;

        if (path === "/") {
            response = new HTTPResponse({ statusCode: "200", reason: "OK" });
        } else if (path.startsWith("/echo/")) {
            const resource = path.slice(6);

            response = new HTTPResponse({
                statusCode: "200", reason: "OK", headers: {
                    "Content-Type": "text/plain",
                    "Content-Length": resource.length.toString(),
                }, body: resource
            });
        } else {
            response = new HTTPResponse({ statusCode: "404", reason: "Not Found" });
        }

        socket.write(response.responseFullyFormatted());

    })

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
