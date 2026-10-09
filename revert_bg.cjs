const fs = require('fs');

// Remove from App.jsx
let appPath = './src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace("import GoldenBackground from './components/GoldenBackground';\n", '');
appContent = appContent.replace("                        <GoldenBackground />\n", '');
fs.writeFileSync(appPath, appContent);

console.log('Reverted App.jsx');
