const fs = require('fs');

// Remove from AboutSection
let aboutPath = './src/components/AboutSection.jsx';
let aboutContent = fs.readFileSync(aboutPath, 'utf8');
fs.writeFileSync(aboutPath, aboutContent.replace(/btn-glow /g, ''));

// Remove from HeroSection
let heroPath = './src/components/HeroSection.jsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');
fs.writeFileSync(heroPath, heroContent.replace(/btn-glow /g, ''));

// Remove from index.css
let cssPath = './src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');
let idx = cssContent.indexOf('/* Golden Glowing Button with Flare */');
if(idx !== -1) {
    fs.writeFileSync(cssPath, cssContent.substring(0, idx));
}

console.log('Removed button glow');
