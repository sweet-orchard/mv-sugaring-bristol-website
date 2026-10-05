const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');
let lines = code.split('\n');

let before = lines.slice(0, 18); // 0 to 17
let face = lines.slice(18, 62);  // 18 to 61
let upper = lines.slice(62, 90); // 62 to 89
let down = lines.slice(90, 118); // 90 to 117
let bikini = lines.slice(118, 148); // 118 to 147
let after = lines.slice(148);

// ensure proper commas
face[face.length - 1] = face[face.length - 1].replace(/,$/, '');
upper[upper.length - 1] = upper[upper.length - 1].replace(/,$/, '') + ',';
down[down.length - 1] = down[down.length - 1].replace(/,$/, '') + ',';
bikini[bikini.length - 1] = bikini[bikini.length - 1].replace(/,$/, '') + ',';

let newLines = [
    ...before,
    ...bikini,
    ...down,
    ...upper,
    ...face,
    ...after
];

fs.writeFileSync('src/components/ServicesData.jsx', newLines.join('\n'));
console.log('Reordered successfully.');
