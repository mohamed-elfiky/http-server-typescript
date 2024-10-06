import * as net from "net";
import { HTTPResponse } from "./http/http-response";
import { HTTPParser } from "./http/http-parser";

const server = net.createServer((socket) => {
    const httpParser = new HTTPParser();

    socket.on("data", (data) => {
        const request = data.toString();
        const path = httpParser.parseRequest(request);

        if (path === "/") {
            socket.write(new HTTPResponse({ statusCode: "200", reason: "OK" }).responseFullyFormatted());
        } else {
            socket.write(new HTTPResponse({ statusCode: "404", reason: "Not Found" }).responseFullyFormatted());
        }

    })

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
