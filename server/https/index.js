module.exports = (app) => {
    const fs = require("fs");
    const https = require("https");
    return https.createServer({
        key: fs.readFileSync("./server/https/key.pem"),
        cert: fs.readFileSync("./server/https/cert.pem"),
        passphrase: 'jurek'
    }, app);
};
