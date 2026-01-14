import net from "net";

const server = net.createServer((socket) => {
    socket.on("data", (chuck) => {
        const raw = chuck.toString();

        // Manual HTTP parsing
        const [requestLine, ...headerLine] = raw.split("\r\n"); //split request
        const [method, path, version] = requestLine.split(" "); // parse request line
        const headers = {}; // parse headers
        for (const line of headerLine) {
            if (line === "") break;
            const [key, value] = line.split(": ");
            headers[key.toLowerCase()] = value;
        }

        const body = "Hello";

        socket.write(
            `HTTP/1.1 200 OK\r\n` +
                `Content-Length: ${body.length}\r\n` +
                `Connection: close\r\n` +
                `\r\n` +
                body
        );

        socket.end();
    });
});

// TCP open a network port
server.listen(3000);

//response  - text over TCP
/**
 * GET /hello HTTP/1.1
Host: localhost:3000
Connection: keep-alive
Cache-Control: max-age=0
sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Cookie: session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjk1OGFkYTU4ZTUxZWIyNDU4MzZlMWI5In19; session.sig=L-w0cEqtXni-LoqDllBwHfQNccY
If-None-Match: W/"5-qvTGHdzF6KLavt4PO0gs2a6pQ00"
*/

/**
 * class IncomingMessage {
  constructor() {
    this.method = '';
    this.url = '';
    this.headers = {};
    this.body = null;
  }
}
 */

/**
 * class ServerResponse {
  constructor(socket) {
    this.socket = socket;
    this.headers = {};
    this.statusCode = 200;
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }

  write(body) {
    this.socket.write(body);
  }

  end(body) {
    const headerText = this._buildHeaders(body);
    this.socket.write(headerText + body);
    this.socket.end();
  }
}
 */
