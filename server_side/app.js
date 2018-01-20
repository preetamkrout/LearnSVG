const http = require("http");
const fs = require("fs");
let sLastSign = "";

const server = http.createServer(function (req, res) {
    if (req.url.indexOf("/savepath") !== -1) {
        switch (req.method) {
            case "GET":
                console.log("WE HIT A GET");
                if (sLastSign) {
                    res.setHeader("Content-Type", "application/json");
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.write(sLastSign);
                } else {
                    res.writeHead(200, "No Last Sign", {
                        "Access-Control-Allow-Origin": "*"
                    });
                }
                res.end();
                break;
            case "POST":
                console.log("WE HIT A POST");
                var jsonString = '';
                req.on('data', function (data) {
                    jsonString += data;
                });
                req.on('end', function () {
                    sLastSign = jsonString;
                    res.writeHead(200, "Saved", {
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end();
                });
                break;
            default:
                break;
        }
    }
});

server.listen(9000);
console.log("Listening on localhost:9000");