const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');

// The file has a structure:
// categories: [
//    { id: 'face', ... },
//    { id: 'upper', ... },
//    { id: 'down', ... },
//    { id: 'bikini', ... }
// ]

// We can just use string manipulation since the objects are well defined by { id: '...',
// But wait, the lines are fixed.

let lines = code.split('\n');

let before = lines.slice(0, 18);
let face = lines.slice(18, 62);
let upper = lines.slice(62, 90);
let down = lines.slice(90, 118);
let bikini = lines.slice(118, 148);
let after = lines.slice(148);

// We need bikini (with comma at end?), down (with comma), upper (with comma), face (without comma at end of object if it's the last one)
// Currently bikini is the last one so it doesn't have a comma, face has a comma.
// We can just join them and fix the commas.

let joined = [
    ...before,
    ...bikini.map(l => l.replace(/}$/, '},')), // bikini originally ended with }
    ...down,
    ...upper,
    ...face,
    ...after
];

// Let's just do it dynamically to be safe:

let newCode = code.replace(/categories: \[\s*\{[\s\S]*?\}\s*\]/, match => {
    let faceMatch = match.match(/\{\s*id: 'face'[\s\S]*?(?=\},\s*\{\s*id: 'upper')/);
    let upperMatch = match.match(/\{\s*id: 'upper'[\s\S]*?(?=\},\s*\{\s*id: 'down')/);
    let downMatch = match.match(/\{\s*id: 'down'[\s\S]*?(?=\},\s*\{\s*id: 'bikini')/);
    let bikiniMatch = match.match(/\{\s*id: 'bikini'[\s\S]*?(?=\}\s*\])/);
    
    return `categories: [\n        ${bikiniMatch[0]}},\n        ${downMatch[0]}},\n        ${upperMatch[0]}},\n        ${faceMatch[0]}\n    ]`;
});

fs.writeFileSync('src/components/ServicesData.jsx', newCode);
console.log('Reordered categories in ServicesData.jsx');
