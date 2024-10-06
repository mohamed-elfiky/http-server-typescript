import * as net from "net";
import { HTTPResponse } from "./http/http-response";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {

    const httpResponse = new HTTPResponse({
        statusCode: "200", reason: "OK"
    });


    socket.write(Buffer.from(httpResponse.responseFullyFormatted()))

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");
