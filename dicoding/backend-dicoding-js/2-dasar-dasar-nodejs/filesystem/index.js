const fs = require("fs");
const path = require("node:path");

const data = fs.readFileSync(path.resolve(__dirname, "notes.txt"), "UTF-8");
console.log(data);
