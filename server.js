const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Function to serve HTML pages
function servePage(res, filePath, statusCode) {
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 - Internal Server Error");
            return;
        }

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
}

// Create Server
const server = http.createServer((req, res) => {

    if (req.url === "/style.css") {

        const cssPath = path.join(__dirname, "public", "style.css");

        fs.readFile(cssPath, (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end();
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/css"
            });

            res.end(data);

        });

    }

    else if (req.url === "/" || req.url === "/home") {

        servePage(
            res,
            path.join(__dirname, "pages", "home.html"),
            200
        );

    }

    else if (req.url === "/about") {

        servePage(
            res,
            path.join(__dirname, "pages", "about.html"),
            200
        );

    }

    else if (req.url === "/contact") {

        servePage(
            res,
            path.join(__dirname, "pages", "contact.html"),
            200
        );

    }

    else {

        servePage(
            res,
            path.join(__dirname, "pages", "404.html"),
            404
        );

    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});