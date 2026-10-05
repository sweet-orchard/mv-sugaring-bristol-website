const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');

// The objects are separated by "\n        },\n        {\n"
// Let's find the start and end of categories.

let startMatch = code.indexOf('categories: [\n        {');
let endMatch = code.lastIndexOf('\n    ]\n});');

let prefix = code.substring(0, startMatch + 14); // up to "categories: ["
let suffix = code.substring(endMatch); // from "\n    ]\n});"

let arrayContent = code.substring(startMatch + 14, endMatch);
// Now arrayContent starts with "\n        {" and ends with "\n        }"

let items = arrayContent.split(/\n        \},\n        \{\n/g);

// items[0] starts with "\n        {\n            id: 'face'"
// items[1] is "            id: 'upper'..."
// items[2] is "            id: 'down'..."
// items[3] is "            id: 'bikini'...\n        }"

// Let's clean them up so they are just the raw content inside the objects
items[0] = items[0].replace(/^\n        \{\n/, '');
items[3] = items[3].replace(/\n        \}$/, '');

// Now we have the 4 raw contents
let face = items[0];
let upper = items[1];
let down = items[2];
let bikini = items[3];

// We want bikini, down, upper, face
let newArrayContent = `
        {
${bikini}
        },
        {
${down}
        },
        {
${upper}
        },
        {
${face}
        }`;

let newCode = prefix + newArrayContent + suffix;
fs.writeFileSync('src/components/ServicesData.jsx', newCode);
console.log('Done reordering');
