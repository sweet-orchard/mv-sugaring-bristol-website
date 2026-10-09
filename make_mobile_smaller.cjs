const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'HeroSection.jsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // H2: Change text-4xl -> text-3xl
  content = content.replace(/text-4xl md:text-5xl lg:text-6xl/g, 'text-3xl md:text-5xl lg:text-6xl');

  // H3: Change text-2xl -> text-xl
  content = content.replace(/text-2xl md:text-3xl/g, 'text-xl md:text-2xl');

  // P: Change text-base -> text-sm
  content = content.replace(/text-base md:text-\[17px\]/g, 'text-sm md:text-[17px]');

  // In AboutSection, there was text-base md:text-[17px] on the motion.div wrapper
  content = content.replace(/text-base md:text-\[17px\]/g, 'text-sm md:text-[17px]');

  fs.writeFileSync(filePath, content);
});
console.log('Made mobile font sizes smaller');
