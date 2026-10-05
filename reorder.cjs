const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesData.jsx', 'utf8');

let newCode = code.replace(/categories: \[\s*\{[\s\S]*?\}\s*\]/, match => {
    let faceMatch = match.match(/\{\s*id: 'face'[\s\S]*?(?=\},\s*\{\s*id: 'upper')/);
    let upperMatch = match.match(/\{\s*id: 'upper'[\s\S]*?(?=\},\s*\{\s*id: 'down')/);
    let downMatch = match.match(/\{\s*id: 'down'[\s\S]*?(?=\},\s*\{\s*id: 'bikini')/);
    let bikiniMatch = match.match(/\{\s*id: 'bikini'[\s\S]*?(?=\}\s*\])/);
    
    return `categories: [\n        ${bikiniMatch[0]}},\n        ${downMatch[0]}},\n        ${upperMatch[0]}},\n        ${faceMatch[0]}\n    ]`;
});

fs.writeFileSync('src/components/ServicesData.jsx', newCode);
console.log('Reordered categories in ServicesData.jsx');
