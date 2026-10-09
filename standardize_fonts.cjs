const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'HeroSection.jsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // H2
  content = content.replace(/<h2([^>]*)className="([^"]*)"/g, (match, p1, p2) => {
    let newClass = p2.replace(/text-(3|4|5|6)xl(\s*(md|lg):text-(3|4|5|6|7)xl)*/g, '').trim();
    newClass += ' text-4xl md:text-5xl lg:text-6xl';
    return `<h2${p1}className="${newClass.trim().replace(/\s+/g, ' ')}"`;
  });

  // H3
  content = content.replace(/<h3([^>]*)className="([^"]*)"/g, (match, p1, p2) => {
    let newClass = p2.replace(/text-(xl|2xl|3xl|4xl)(\s*(md|lg):text-(xl|2xl|3xl|4xl))*/g, '').trim();
    newClass += ' text-2xl md:text-3xl';
    return `<h3${p1}className="${newClass.trim().replace(/\s+/g, ' ')}"`;
  });

  // Paragraphs
  content = content.replace(/<p([^>]*)className="([^"]*)"/g, (match, p1, p2) => {
    if (p2.includes('uppercase') || p2.includes('tracking') || p2.includes('text-xs') || p2.includes('text-[11px]')) return match;
    if (p2.includes('italic') && (p2.includes('text-xl') || p2.includes('text-2xl') || p2.includes('text-3xl'))) return match;

    let newClass = p2.replace(/text-(sm|base|lg|xl|\[15px\]|\[17px\])(\s*(md|lg):text-(sm|base|lg|xl|\[15px\]|\[17px\]))*/g, '').trim();
    newClass = newClass.replace(/leading-(relaxed|loose|\[1\.8\])/g, '').trim();
    
    newClass += ' text-base md:text-[17px] leading-[1.8]';
    return `<p${p1}className="${newClass.trim().replace(/\s+/g, ' ')}"`;
  });

  fs.writeFileSync(filePath, content);
});
console.log('Standardized font sizes');
